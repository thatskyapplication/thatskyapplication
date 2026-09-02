import { randomBytes } from "node:crypto";
import process from "node:process";
import { setInterval } from "node:timers";
import type { Snowflake } from "@discordjs/core/http-only";
import { serve } from "@hono/node-server";
import { getConnInfo } from "@hono/node-server/conninfo";
import { serveStatic } from "@hono/node-server/serve-static";
import { type Context, Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { secureHeaders } from "hono/secure-headers";
import { GuessTypeToLocaleKey, SKY_PROFILE_MAXIMUM_NAME_LENGTH } from "@thatskyapplication/utility";
import type { GameOverResponse, LeaderboardResponse, SessionResponse } from "../guess.js";
import { CDN_PROXY_PREFIX, cdnTarget } from "./cdn.js";
import { APPLICATION_ID, DISCORD_CLIENT_SECRET, PRODUCTION, REDIRECT_URI_LOGIN } from "./config.js";
import database from "./database.js";
import discord from "./discord.js";
import {
	answerGuessSession,
	hasActiveGuessSession,
	endGuessSession,
	type FinishedRound,
	guessLeaderboard,
	highestStreak,
	resolveGameOver,
	saveSkyProfileName,
	skyProfileName,
	startGuessSession,
} from "./guess.js";
import { identify, rememberToken } from "./identity.js";
import { claimPrimary, primaryFor, setFinishedRound, transferPrimary } from "./instances.js";
import { resolveLocale, translate } from "./locale.js";
import pino from "./pino.js";
import {
	answerSchema,
	claimSchema,
	endSchema,
	guessTypeQuerySchema,
	instanceIdSchema,
	nameSchema,
	primarySchema,
	startSchema,
	tokenSchema,
} from "./schemas.js";
import { clearOAuthState, getOAuthState, setOAuthState, setSessionUserId } from "./session.js";
import {
	attachSockets,
	broadcast,
	closeSockets,
	connectedAnywhere,
	connectedTo,
} from "./sockets.js";
import { buildState } from "./state.js";
import { inActivityInstance } from "./verification.js";

const MAXIMUM_BODY_BYTES = 4_096 as const;
const MAXIMUM_PAGE = 1_000 as const;
const CDN_TIMEOUT = 10_000 as const;
const CDN_MAXIMUM_BYTES = 8_388_608 as const;
const CLIENT_DIRECTORY = "./build/client" as const;
const CLOUDFLARE_ADDRESS_HEADER = "cf-connecting-ip" as const;
const UNKNOWN_ADDRESS = "unknown" as const;
const BEARER_PREFIX = "Bearer " as const;
const RATE_LIMIT_WINDOW = 60_000 as const;
const MAXIMUM_RATE_LIMIT_KEYS = 50_000 as const;
const RATE_LIMIT_PER_IDENTITY = 120 as const;
const RATE_LIMIT_PER_ADDRESS = 600 as const;
const RATE_LIMIT_PER_ADDRESS_TOKEN = 120 as const;
const RATE_LIMIT_PER_ADDRESS_UNVERIFIED = 20 as const;
const TOKEN_PATH = "/api/token" as const;
const PORT = Number(process.env.PORT ?? 3000);

type ErrorStatus = 400 | 401 | 403 | 409 | 429;

function localeFor(c: Context) {
	return resolveLocale(c.req.header("x-games-locale"), c.req.header("accept-language"));
}

function guessError(
	c: Context,
	key: string,
	status: ErrorStatus,
	options?: Record<string, unknown>,
) {
	return c.json(
		{ error: translate(localeFor(c), `games.guess.${key}`, { ns: "features", ...options }) },
		status,
	);
}

function pushFailed(error: unknown) {
	pino.error(error, "Failed to push activity state.");
}

function usesBearerToken(c: Context) {
	return c.req.header("authorization")?.startsWith(BEARER_PREFIX) === true;
}

function crossSite(c: Context) {
	if (usesBearerToken(c)) {
		return false;
	}

	const origin = c.req.header("origin");

	if (origin === undefined) {
		return true;
	}

	const host = c.req.header("host");

	return (
		origin !== `https://${APPLICATION_ID}.discordsays.com` &&
		origin !== `https://${host}` &&
		origin !== `http://${host}`
	);
}

async function readBody(c: Context): Promise<Record<string, unknown>> {
	try {
		const body: unknown = await c.req.json();
		return typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
	} catch {
		return {};
	}
}

interface RateLimitEntry {
	count: number;
	resetAt: number;
}

class RateLimiter {
	private readonly entries = new Map<string, RateLimitEntry>();
	private readonly limit: number;
	private readonly maximumKeys: number;

	public constructor(limit: number, maximumKeys: number) {
		this.limit = limit;
		this.maximumKeys = maximumKeys;
	}

	public sweep(now: number) {
		for (const [key, entry] of this.entries) {
			if (now < entry.resetAt) {
				return;
			}

			this.entries.delete(key);
		}
	}

	public exceeded(key: string) {
		const entry = this.entries.get(key);
		return entry !== undefined && Date.now() < entry.resetAt && entry.count > this.limit;
	}

	public consume(key: string) {
		const now = Date.now();
		const entry = this.entries.get(key);

		if (entry !== undefined && now < entry.resetAt) {
			entry.count += 1;
			return entry.count > this.limit;
		}

		this.entries.delete(key);

		if (this.entries.size >= this.maximumKeys) {
			this.sweep(now);

			if (this.entries.size >= this.maximumKeys) {
				return true;
			}
		}

		this.entries.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
		return false;
	}
}

const tokenRateLimiter = new RateLimiter(RATE_LIMIT_PER_ADDRESS_TOKEN, MAXIMUM_RATE_LIMIT_KEYS);
const addressRateLimiter = new RateLimiter(RATE_LIMIT_PER_ADDRESS, MAXIMUM_RATE_LIMIT_KEYS);

const unverifiedRateLimiter = new RateLimiter(
	RATE_LIMIT_PER_ADDRESS_UNVERIFIED,
	MAXIMUM_RATE_LIMIT_KEYS,
);

const identityRateLimiter = new RateLimiter(RATE_LIMIT_PER_IDENTITY, MAXIMUM_RATE_LIMIT_KEYS);

const rateLimiters: readonly RateLimiter[] = [
	tokenRateLimiter,
	addressRateLimiter,
	unverifiedRateLimiter,
	identityRateLimiter,
];

setInterval(() => {
	const now = Date.now();

	for (const rateLimiter of rateLimiters) {
		rateLimiter.sweep(now);
	}
}, RATE_LIMIT_WINDOW).unref();

function clientAddress(c: Context) {
	return (
		c.req.header(CLOUDFLARE_ADDRESS_HEADER) ?? getConnInfo(c).remote.address ?? UNKNOWN_ADDRESS
	);
}

const server = new Hono();

server.use(
	"*",
	secureHeaders({
		crossOriginResourcePolicy: "cross-origin",
		permissionsPolicy: { browsingTopics: [], camera: [], geolocation: [], microphone: [] },
		strictTransportSecurity: PRODUCTION ? "max-age=31536000; includeSubDomains" : false,
		xFrameOptions: false,
	}),
);

server.use("*", async (c, next) => {
	const start = Date.now();
	await next();
	const duration = Date.now() - start;

	pino.info(
		{ method: c.req.method, url: c.req.url, status: c.res.status, duration },
		`${c.req.method} ${c.req.path} ${c.res.status} (${duration} ms)`,
	);
});

server.use("/api/*", async (c: Context, next) => {
	const address = clientAddress(c);

	if (c.req.path === TOKEN_PATH) {
		if (tokenRateLimiter.consume(address)) {
			return guessError(c, "error-rate-limited", 429);
		}

		await next();
		return undefined;
	}

	const bearer = usesBearerToken(c);

	if (bearer && unverifiedRateLimiter.exceeded(address)) {
		return guessError(c, "error-rate-limited", 429);
	}

	const userId = await identify(c);

	const limited =
		userId === null
			? addressRateLimiter.consume(address) || (bearer && unverifiedRateLimiter.consume(address))
			: identityRateLimiter.consume(userId);

	if (limited) {
		return guessError(c, "error-rate-limited", 429);
	}

	await next();
	return undefined;
});

server.post("/api/*", bodyLimit({ maxSize: MAXIMUM_BODY_BYTES }));

server.post("/api/*", async (c, next) => {
	if (crossSite(c)) {
		return guessError(c, "error-cross-site", 403);
	}

	await next();
	return undefined;
});

server.post(TOKEN_PATH, async (c) => {
	const parsed = tokenSchema.safeParse(await readBody(c));

	if (!parsed.success) {
		return guessError(c, "error-code-required", 400);
	}

	try {
		const tokenExchange = await discord.oauth2.tokenExchange({
			client_id: APPLICATION_ID,
			client_secret: DISCORD_CLIENT_SECRET,
			grant_type: "authorization_code",
			code: parsed.data.code,
		});

		const user = await discord.users.getCurrent({
			auth: { prefix: "Bearer", token: tokenExchange.access_token },
		});

		rememberToken(tokenExchange.access_token, user.id);
		return c.json({ access_token: tokenExchange.access_token });
	} catch (error) {
		pino.error(error, "Failed to authenticate an activity.");
		return guessError(c, "error-authentication-failed", 401);
	}
});

server.get("/login", async (c) => {
	const code = c.req.query("code");
	const state = c.req.query("state");

	if (code) {
		const storedState = await getOAuthState(c);
		clearOAuthState(c);

		if (!storedState || state !== storedState) {
			return c.redirect("/");
		}

		try {
			const tokenExchange = await discord.oauth2.tokenExchange({
				client_id: APPLICATION_ID,
				client_secret: DISCORD_CLIENT_SECRET,
				grant_type: "authorization_code",
				code,
				redirect_uri: REDIRECT_URI_LOGIN,
			});

			const user = await discord.users.getCurrent({
				auth: { prefix: "Bearer", token: tokenExchange.access_token },
			});

			await setSessionUserId(c, user.id);
		} catch (error) {
			pino.error(error, "Failed to log in.");
		}

		return c.redirect("/");
	}

	const oAuthState = randomBytes(16).toString("hex");
	await setOAuthState(c, oAuthState);

	return c.redirect(
		discord.oauth2.generateAuthorizationURL({
			client_id: APPLICATION_ID,
			response_type: "code",
			redirect_uri: REDIRECT_URI_LOGIN,
			scope: "identify",
			state: oAuthState,
		}),
	);
});

server.get("/api/state", async (c) => {
	const locale = localeFor(c);
	const userId = await identify(c);
	const requested = c.req.query("instanceId") ?? null;

	if (requested !== null && !instanceIdSchema.safeParse(requested).success) {
		return guessError(c, "error-unknown-instance", 400);
	}

	if (userId !== null && requested !== null && !(await inActivityInstance(requested, userId))) {
		return guessError(c, "error-not-connected", 403);
	}

	return c.json(await buildState(userId, requested, locale));
});

server.post("/api/primary", async (c) => {
	const userId = await identify(c);

	if (!userId) {
		return guessError(c, "error-not-authenticated", 401);
	}

	const parsed = primarySchema.safeParse(await readBody(c));

	if (!parsed.success) {
		return guessError(c, "error-unknown-instance", 400);
	}

	const { instanceId, userId: targetUserId } = parsed.data;

	if (!connectedTo(instanceId, userId)) {
		return guessError(c, "error-not-connected", 403);
	}

	if (primaryFor(instanceId) !== userId) {
		return guessError(c, "error-not-in-control", 403);
	}

	if (await hasActiveGuessSession(userId)) {
		return guessError(c, "error-control-during-game", 409);
	}

	if (!connectedTo(instanceId, targetUserId)) {
		return guessError(c, "error-target-not-connected", 409);
	}

	if (await hasActiveGuessSession(targetUserId)) {
		return guessError(c, "error-target-in-game", 409);
	}

	if ((await skyProfileName(targetUserId)) === null) {
		return guessError(c, "error-target-name-required", 409);
	}

	setFinishedRound(instanceId, null);

	if (!transferPrimary(instanceId, userId, targetUserId)) {
		return guessError(c, "error-not-in-control", 403);
	}

	void broadcast(instanceId).catch(pushFailed);
	return c.json({ transferred: true });
});

server.get("/api/leaderboard", async (c) => {
	const userId = await identify(c);

	if (!userId) {
		return guessError(c, "error-not-authenticated", 401);
	}

	const locale = localeFor(c);
	const parsed = guessTypeQuerySchema.safeParse(c.req.query("type"));

	if (!parsed.success) {
		return guessError(c, "error-unknown-mode", 400);
	}

	const type = parsed.data;
	const page = Math.min(MAXIMUM_PAGE, Math.max(1, Math.trunc(Number(c.req.query("page")) || 1)));
	const { viewer, ...leaderboard } = await guessLeaderboard(type, page, userId);

	return c.json({
		...leaderboard,
		viewerLabel: viewer
			? translate(locale, "games.guess.leaderboard-you", {
					ns: "features",
					rank: viewer.rank,
					streak: viewer.streak,
				})
			: null,
		title: translate(locale, "games.guess.leaderboard-title", {
			ns: "features",
			type: translate(locale, GuessTypeToLocaleKey[type]),
		}),
	} satisfies LeaderboardResponse);
});

server.post("/api/name", async (c) => {
	const userId = await identify(c);

	if (!userId) {
		return guessError(c, "error-not-authenticated", 401);
	}

	const parsed = nameSchema.safeParse(await readBody(c));

	if (!parsed.success || !(await saveSkyProfileName(userId, parsed.data.name))) {
		return guessError(c, "name-invalid", 400, { maximum: SKY_PROFILE_MAXIMUM_NAME_LENGTH });
	}

	return c.json({ saved: true });
});

function settleRound(
	round: FinishedRound & { instanceId: string | null },
	requestedInstanceId: string | null,
) {
	const { instanceId } = round;

	if (instanceId !== null) {
		setFinishedRound(instanceId, round);
		void broadcast(instanceId).catch(pushFailed);
	}

	if (requestedInstanceId !== null && requestedInstanceId !== instanceId) {
		void broadcast(requestedInstanceId).catch(pushFailed);
	}
}

function instanceRefusal(body: Record<string, unknown>, userId: Snowflake) {
	const { instanceId } = body;

	if (typeof instanceId !== "string") {
		return connectedAnywhere(userId) ? "error-instance-required" : null;
	}

	if (!connectedTo(instanceId, userId)) {
		return "error-not-connected";
	}

	return primaryFor(instanceId) === userId ? null : "error-not-in-control";
}

server.post("/api/claim", async (c) => {
	const userId = await identify(c);

	if (!userId) {
		return guessError(c, "error-not-authenticated", 401);
	}

	const parsed = claimSchema.safeParse(await readBody(c));

	if (!parsed.success) {
		return guessError(c, "error-unknown-instance", 400);
	}

	const { instanceId } = parsed.data;

	if (!connectedTo(instanceId, userId)) {
		return guessError(c, "error-not-connected", 403);
	}

	if (await hasActiveGuessSession(userId)) {
		return guessError(c, "error-control-during-game", 409);
	}

	if ((await skyProfileName(userId)) === null) {
		return guessError(c, "error-name-required", 409);
	}

	setFinishedRound(instanceId, null);

	if (!claimPrimary(instanceId, userId)) {
		return guessError(c, "error-someone-else-in-control", 403);
	}

	void broadcast(instanceId).catch(pushFailed);
	return c.json({ claimed: true });
});

server.post("/api/start", async (c) => {
	const userId = await identify(c);

	if (!userId) {
		return guessError(c, "error-not-authenticated", 401);
	}

	const locale = localeFor(c);
	const parsed = startSchema.safeParse(await readBody(c));

	if (!parsed.success) {
		return guessError(c, "error-unknown-mode", 400);
	}

	const body = parsed.data;
	const refusal = instanceRefusal(body, userId);

	if (refusal !== null) {
		return guessError(c, refusal, 403);
	}

	if ((await skyProfileName(userId)) === null) {
		return guessError(c, "error-name-required", 409);
	}

	const startInstanceId = body.instanceId ?? null;
	const session = await startGuessSession(userId, body.type, startInstanceId, locale);

	if (session === null) {
		return guessError(c, "error-in-game", 409);
	}

	if (startInstanceId !== null) {
		setFinishedRound(startInstanceId, null);
	}

	const response = c.json({
		session,
		highestStreak: await highestStreak(userId, body.type),
	} satisfies SessionResponse);

	if (startInstanceId !== null) {
		void broadcast(startInstanceId).catch(pushFailed);
	}

	return response;
});

server.post("/api/answer", async (c) => {
	const userId = await identify(c);

	if (!userId) {
		return guessError(c, "error-not-authenticated", 401);
	}

	const locale = localeFor(c);
	const parsed = answerSchema.safeParse(await readBody(c));

	if (!parsed.success) {
		return guessError(c, "error-unknown-answer", 400);
	}

	const body = parsed.data;
	const refusal = instanceRefusal(body, userId);

	if (refusal !== null) {
		return guessError(c, refusal, 403);
	}

	const result = await answerGuessSession(userId, body.type, body.option, body.sessionId, locale);

	if (result === null) {
		return guessError(c, "error-no-game-to-answer", 409);
	}

	if ("outcome" in result) {
		settleRound(result, body.instanceId ?? null);
		return c.json({ gameOver: resolveGameOver(result, locale) } satisfies GameOverResponse);
	}

	const answered = c.json({
		session: result,
		highestStreak: await highestStreak(userId, body.type),
	} satisfies SessionResponse);

	if (typeof body.instanceId === "string") {
		void broadcast(body.instanceId).catch(pushFailed);
	}

	return answered;
});

server.post("/api/end", async (c) => {
	const userId = await identify(c);

	if (!userId) {
		return guessError(c, "error-not-authenticated", 401);
	}

	const locale = localeFor(c);
	const parsed = endSchema.safeParse(await readBody(c));

	if (!parsed.success) {
		return guessError(c, "error-unknown-mode", 400);
	}

	const body = parsed.data;
	const refusal = instanceRefusal(body, userId);

	if (refusal !== null) {
		return guessError(c, refusal, 403);
	}

	const round = await endGuessSession(userId, body.type, body.sessionId);

	if (round === null) {
		return guessError(c, "error-no-game-to-end", 409);
	}

	settleRound(round, body.instanceId ?? null);
	return c.json({ gameOver: resolveGameOver(round, locale) } satisfies GameOverResponse);
});

server.get(`${CDN_PROXY_PREFIX}/*`, async (c) => {
	const target = cdnTarget(c.req.path.slice(CDN_PROXY_PREFIX.length + 1));

	if (target === null) {
		return c.notFound();
	}

	let response: Response;

	try {
		response = await fetch(target, {
			redirect: "manual",
			signal: AbortSignal.timeout(CDN_TIMEOUT),
		});
	} catch {
		return c.notFound();
	}

	if (!response.ok || !response.body) {
		return c.notFound();
	}

	const declaredLength = response.headers.get("content-length");

	if (declaredLength === null || Number(declaredLength) > CDN_MAXIMUM_BYTES) {
		await response.body.cancel();
		return c.notFound();
	}

	return new Response(response.body, {
		headers: {
			"Cache-Control": "public, max-age=86400",
			"Content-Type": response.headers.get("content-type") ?? "application/octet-stream",
		},
	});
});

server.use("/assets/*", async (c, next) => {
	c.header("Cache-Control", "public, max-age=31536000, immutable");
	await next();
});

server.use("/assets/*", serveStatic({ root: CLIENT_DIRECTORY }));

server.get("*", async (c, next) => {
	c.header("Cache-Control", "no-cache");
	await next();
});

server.use("*", serveStatic({ root: CLIENT_DIRECTORY }));
server.get("*", serveStatic({ path: `${CLIENT_DIRECTORY}/index.html` }));

const httpServer = serve({ fetch: server.fetch, port: PORT }, ({ port }) =>
	pino.info(`Listening on port ${port}.`),
);

attachSockets(httpServer);

let shuttingDown = false;

async function shutdown(signal: NodeJS.Signals) {
	if (shuttingDown) {
		return;
	}

	shuttingDown = true;
	pino.info(`Received ${signal}. Draining in-flight requests.`);
	let exitCode = 0;

	try {
		await closeSockets();

		await new Promise<void>((resolve) => {
			httpServer.close(() => {
				resolve();
			});
		});
		await database.destroy();
	} catch (error) {
		exitCode = 1;
		pino.error(error, "Error whilst shutting down.");
	} finally {
		process.exit(exitCode);
	}
}

process.once("SIGINT", () => {
	void shutdown("SIGINT");
});

process.once("SIGTERM", () => {
	void shutdown("SIGTERM");
});
