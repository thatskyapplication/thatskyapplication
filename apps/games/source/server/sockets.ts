import type { IncomingMessage } from "node:http";
import type { Duplex } from "node:stream";
import { setInterval, setTimeout } from "node:timers";
import type { Snowflake } from "@discordjs/core/http-only";
import type { ServerType } from "@hono/node-server";
import { WebSocketServer, type WebSocket } from "ws";
import { SOCKET_PATH, SocketClose } from "../guess.js";
import { originAllowed } from "./config.js";
import {
	abandonGuessSessions,
	type ExpiredRound,
	expireGuessSessions,
	type FinishedRound,
} from "./guess.js";
import { identityForToken } from "./identity.js";
import {
	joinInstance,
	setFinishedRoundForUser,
	observeConnections,
	primaryFor,
	releasePrimary,
	setFinishedRound,
} from "./instances.js";
import { type Locales, resolveLocale } from "./locale.js";
import pino from "./pino.js";
import { buildState, type SharedState, sharedStateFor } from "./state.js";
import { forgetInstance, inActivityInstance } from "./verification.js";

const INSTANCE_ID_PATTERN = /^[\w-]{1,64}$/;
const AUTHENTICATION_TIMEOUT = 10_000 as const;
const HEARTBEAT_INTERVAL = 30_000 as const;
const DISCONNECT_GRACE = 10_000 as const;
const CONNECTIONS_PER_USER = 3 as const;
const MAXIMUM_PAYLOAD = 4_096 as const;
const EXPIRY_SWEEP_INTERVAL = 2_000 as const;
const SHUTDOWN_CLOSE_TIMEOUT = 250 as const;

interface Connection {
	instanceId: string;
	locale: Locales;
	socket: WebSocket;
	userId: Snowflake;
}

interface Departure {
	instanceId: string;
	timeout: ReturnType<typeof setTimeout>;
	userId: Snowflake;
}

const connections = new Map<string, Set<Connection>>();
const instanceUsers = new Map<string, Map<Snowflake, number>>();
const connectedUsers = new Map<Snowflake, number>();
const departures = new Map<string, Departure>();

function increment<Key>(counts: Map<Key, number>, key: Key) {
	counts.set(key, (counts.get(key) ?? 0) + 1);
}

function decrement<Key>(counts: Map<Key, number>, key: Key) {
	const remaining = (counts.get(key) ?? 0) - 1;

	if (remaining > 0) {
		counts.set(key, remaining);
		return;
	}

	counts.delete(key);
}

function userIdsIn(instanceId: string): ReadonlySet<Snowflake> {
	return new Set(instanceUsers.get(instanceId)?.keys() ?? []);
}

observeConnections(userIdsIn, departing);

function highestStreakRound(rounds: readonly FinishedRound[]) {
	return rounds.reduce((highest, round) =>
		round.streak > highest.streak || (round.streak === highest.streak && round.type < highest.type)
			? round
			: highest,
	);
}

let sweeping = false;

setInterval(() => {
	if (sweeping) {
		return;
	}

	sweeping = true;

	void (async () => {
		const expired = await expireGuessSessions();

		if (expired.length === 0) {
			return;
		}

		const finishedRounds = new Map<string, ExpiredRound[]>();

		for (const round of expired) {
			const { instanceId } = round;

			if (instanceId === null) {
				setFinishedRoundForUser(round.userId, round);
				continue;
			}

			if (!connections.has(instanceId)) {
				continue;
			}

			const rounds = finishedRounds.get(instanceId);

			if (rounds === undefined) {
				finishedRounds.set(instanceId, [round]);
			} else {
				rounds.push(round);
			}
		}

		for (const [instanceId, rounds] of finishedRounds) {
			setFinishedRound(instanceId, highestStreakRound(rounds));
			await broadcast(instanceId);
		}
	})()
		.catch((error: unknown) => {
			pino.error(error, "Failed to expire activity rounds.");
		})
		.finally(() => {
			sweeping = false;
		});
}, EXPIRY_SWEEP_INTERVAL).unref();

export function connectedTo(instanceId: string, userId: Snowflake) {
	return instanceUsers.get(instanceId)?.has(userId) ?? false;
}

export function connectedAnywhere(userId: Snowflake) {
	return connectedUsers.has(userId);
}

function departing(instanceId: string, userId: Snowflake) {
	return departures.has(`${instanceId}:${userId}`);
}

function pushFailedHere(error: unknown) {
	pino.error(error, "Failed to push activity state after a departure.");
}

async function settleDeparture(instanceId: string, userId: Snowflake) {
	const moved = await releasePrimary(instanceId, userIdsIn(instanceId));
	const ended = await abandonGuessSessions(userId, instanceId);

	if (ended.length > 0) {
		setFinishedRound(instanceId, null);
	}

	if (moved || ended.length > 0) {
		await broadcast(instanceId);
	}
}

export async function broadcast(instanceId: string) {
	const instance = connections.get(instanceId);

	if (!instance) {
		return;
	}

	const primaryUserId = primaryFor(instanceId);
	const shared = new Map<Locales, SharedState>();

	await Promise.all(
		[...new Set([...instance].map((connection) => connection.locale))].map(async (locale) => {
			shared.set(locale, await sharedStateFor(primaryUserId, instanceId, locale));
		}),
	);

	await Promise.all(
		[...instance].map(async (connection) => {
			if (connection.socket.readyState !== connection.socket.OPEN) {
				return;
			}

			try {
				const state = await buildState(
					connection.userId,
					instanceId,
					connection.locale,
					shared.get(connection.locale),
				);

				connection.socket.send(JSON.stringify(state));
			} catch (error) {
				pino.error(error, "Failed to push activity state.");
			}
		}),
	);
}

function admit(connection: Connection) {
	const { instanceId, userId } = connection;
	const instance = connections.get(instanceId) ?? new Set<Connection>();
	const users = instanceUsers.get(instanceId) ?? new Map<Snowflake, number>();

	if ((users.get(userId) ?? 0) >= CONNECTIONS_PER_USER) {
		return false;
	}

	instance.add(connection);
	connections.set(instanceId, instance);
	increment(users, userId);
	instanceUsers.set(instanceId, users);
	increment(connectedUsers, userId);
	return true;
}

function remove(connection: Connection) {
	const { instanceId, userId } = connection;
	const instance = connections.get(instanceId);

	if (!instance?.delete(connection)) {
		return;
	}

	const users = instanceUsers.get(instanceId);

	if (users) {
		decrement(users, userId);
	}

	decrement(connectedUsers, userId);

	if (instance.size === 0) {
		connections.delete(instanceId);
		instanceUsers.delete(instanceId);
		forgetInstance(instanceId);
	}
}

const sockets = new WebSocketServer({ maxPayload: MAXIMUM_PAYLOAD, noServer: true });

let shuttingDown = false;

export async function closeSockets() {
	shuttingDown = true;

	for (const departure of departures.values()) {
		clearTimeout(departure.timeout);
	}

	departures.clear();
	connections.clear();
	instanceUsers.clear();
	connectedUsers.clear();
	const open = [...sockets.clients].filter((socket) => socket.readyState !== socket.CLOSED);
	sockets.close();

	if (open.length === 0) {
		return;
	}

	const drained = Promise.all(
		open.map(
			(socket) =>
				new Promise<void>((resolve) => {
					socket.once("close", () => {
						resolve();
					});
				}),
		),
	);

	const expiry = new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, SHUTDOWN_CLOSE_TIMEOUT).unref();
	});

	for (const socket of open) {
		socket.close(SocketClose.GoingAway);
	}

	await Promise.race([drained, expiry]);

	for (const socket of open) {
		socket.terminate();
	}
}

export function attachSockets(httpServer: ServerType) {
	httpServer.on("upgrade", (request: IncomingMessage, socket: Duplex, head: Buffer) => {
		const url = new URL(request.url ?? "/", "http://localhost");

		if (
			url.pathname !== SOCKET_PATH ||
			!originAllowed(request.headers.origin, request.headers.host)
		) {
			socket.destroy();
			return;
		}

		const instanceId = url.searchParams.get("instanceId");

		if (instanceId === null || !INSTANCE_ID_PATTERN.test(instanceId)) {
			socket.destroy();
			return;
		}

		const locale = resolveLocale(request.headers["accept-language"]);

		sockets.handleUpgrade(request, socket, head, (webSocket) => {
			let connection: Connection | null = null;
			let authenticating = false;
			let alive = true;
			let closed = false;

			const deadline = setTimeout(() => {
				if (connection === null) {
					webSocket.close(SocketClose.AuthenticationTimeout);
				}
			}, AUTHENTICATION_TIMEOUT);

			const ping = setInterval(() => {
				if (!alive) {
					webSocket.terminate();
					return;
				}

				alive = false;
				webSocket.ping();
			}, HEARTBEAT_INTERVAL);

			webSocket.on("pong", () => {
				alive = true;
			});

			const authenticateSafely = (token: string, sent: string | null) => {
				authenticate(token, sent).catch((error: unknown) => {
					pino.error(error, "Failed to authenticate an activity socket.");
					webSocket.terminate();
				});
			};

			const authenticate = async (token: string, sent: string | null) => {
				const identity = await identityForToken(token);

				if (closed || webSocket.readyState !== webSocket.OPEN) {
					webSocket.terminate();
					return;
				}

				if (identity.userId === null) {
					if (identity.definitive) {
						webSocket.close(SocketClose.AuthenticationFailed);
					} else {
						webSocket.terminate();
					}

					return;
				}

				const { userId } = identity;

				if (!(await inActivityInstance(instanceId, userId))) {
					webSocket.close(SocketClose.NotInInstance);
					return;
				}

				if (shuttingDown) {
					webSocket.close(SocketClose.GoingAway);
					return;
				}

				if (closed || webSocket.readyState !== webSocket.OPEN) {
					webSocket.terminate();
					return;
				}

				const admitted: Connection = {
					instanceId,
					locale: sent === null ? locale : resolveLocale(sent, request.headers["accept-language"]),
					socket: webSocket,
					userId,
				};

				if (!admit(admitted)) {
					webSocket.close(SocketClose.ConnectionLimit);
					return;
				}

				connection = admitted;
				const key = `${instanceId}:${userId}`;
				const pending = departures.get(key);

				if (pending !== undefined) {
					clearTimeout(pending.timeout);
					departures.delete(key);
				}

				await joinInstance(instanceId, userId);
				await broadcast(instanceId);
			};

			webSocket.on("message", (raw: Buffer) => {
				if (connection !== null || authenticating) {
					return;
				}

				let handshake: { locale?: unknown; token?: unknown };

				try {
					handshake = JSON.parse(raw.toString()) as { locale?: unknown; token?: unknown };
				} catch {
					webSocket.close(SocketClose.HandshakeInvalid);
					return;
				}

				if (typeof handshake.token !== "string") {
					webSocket.close(SocketClose.HandshakeInvalid);
					return;
				}

				authenticating = true;
				authenticateSafely(
					handshake.token,
					typeof handshake.locale === "string" ? handshake.locale : null,
				);
			});

			webSocket.on("close", () => {
				closed = true;
				clearTimeout(deadline);
				clearInterval(ping);

				if (connection === null) {
					return;
				}

				const { userId } = connection;
				remove(connection);

				if (shuttingDown) {
					return;
				}

				if (userIdsIn(instanceId).has(userId)) {
					void broadcast(instanceId).catch(pushFailedHere);
					return;
				}

				const key = `${instanceId}:${userId}`;
				const previous = departures.get(key);

				if (previous !== undefined) {
					clearTimeout(previous.timeout);
				}

				departures.set(key, {
					instanceId,
					timeout: setTimeout(() => {
						departures.delete(key);

						settleDeparture(instanceId, userId).catch((error: unknown) => {
							pino.error(error, "Failed to settle an activity departure.");
						});
					}, DISCONNECT_GRACE),
					userId,
				});

				void broadcast(instanceId).catch(pushFailedHere);
			});

			webSocket.on("error", (error) => {
				pino.error(error, "An activity socket errored.");
			});
		});
	});
}
