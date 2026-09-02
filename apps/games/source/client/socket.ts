import {
	SOCKET_CLOSE_APPLICATION_MAXIMUM,
	SOCKET_CLOSE_APPLICATION_MINIMUM,
	SOCKET_PATH,
	SocketClose,
} from "../guess.js";
import { currentAccessToken, currentLocale, type StateResponse, type Strings } from "./api.js";

const RECONNECT_DELAY = 1_000 as const;
const RECONNECT_MAXIMUM_DELAY = 15_000 as const;
const RECONNECT_ATTEMPTS_MAXIMUM = 40 as const;
const RECONNECT_FAILURES_MAXIMUM = 12 as const;

interface SocketHandlers {
	onState: (state: StateResponse) => void;
	onUnavailable: (code: number) => void;
}

function endpoint(instanceId: string) {
	const url = new URL(SOCKET_PATH, window.location.href);
	url.protocol = url.protocol === "http:" ? "ws:" : "wss:";
	url.searchParams.set("instanceId", instanceId);
	return url.href;
}

export function recoverableClose(code: number) {
	return code < SOCKET_CLOSE_APPLICATION_MINIMUM || code > SOCKET_CLOSE_APPLICATION_MAXIMUM;
}

export function socketMessage(code: number, strings: Strings) {
	switch (code) {
		case SocketClose.HandshakeInvalid:
			return strings.connectionRejected;
		case SocketClose.AuthenticationFailed:
			return strings.connectionExpired;
		case SocketClose.AuthenticationTimeout:
			return strings.connectionTimedOut;
		case SocketClose.NotInInstance:
			return strings.connectionElsewhere;
		case SocketClose.ConnectionLimit:
			return strings.connectionLimit;
		default:
			return strings.connectionLost;
	}
}

function reconnectDelay(attempt: number) {
	const base = Math.min(RECONNECT_DELAY * 2 ** attempt, RECONNECT_MAXIMUM_DELAY);
	return Math.round(base / 2 + Math.random() * (base / 2));
}

export function connectSocket(instanceId: string, { onState, onUnavailable }: SocketHandlers) {
	let socket: WebSocket | null = null;
	let closed = false;
	let attempt = 0;
	let failures = 0;

	const stop = (code: number) => {
		if (closed) {
			return;
		}

		closed = true;
		socket = null;
		onUnavailable(code);
	};

	const open = () => {
		if (closed) {
			return;
		}

		const active = new WebSocket(endpoint(instanceId));
		socket = active;

		active.addEventListener("open", () => {
			active.send(JSON.stringify({ locale: currentLocale(), token: currentAccessToken() }));
		});

		active.addEventListener("message", (event: MessageEvent<string>) => {
			attempt = 0;
			failures = 0;

			try {
				onState(JSON.parse(event.data) as StateResponse);
			} catch (error: unknown) {
				console.warn(`Ignored an unreadable activity update: ${String(error)}.`);
			}
		});

		active.addEventListener("close", ({ code }) => {
			if (closed) {
				return;
			}

			console.warn(`The activity socket closed with code ${code}.`);

			if (!recoverableClose(code)) {
				stop(code);
				return;
			}

			const wait = reconnectDelay(attempt);
			attempt++;

			if (code !== SocketClose.GoingAway) {
				failures++;
			}

			if (failures > RECONNECT_FAILURES_MAXIMUM || attempt > RECONNECT_ATTEMPTS_MAXIMUM) {
				stop(code);
				return;
			}

			setTimeout(open, wait);
		});
	};

	open();

	return () => {
		closed = true;
		socket?.close();
		socket = null;
	};
}
