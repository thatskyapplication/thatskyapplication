import type { Snowflake } from "@discordjs/core/http-only";
import type { Context } from "hono";
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import { SESSION_SECRET } from "./config.js";

const SESSION_COOKIE_NAME = "__Host-games_session" as const;
const OAUTH_STATE_COOKIE_NAME = "__Host-games_oauth_state" as const;
const SESSION_COOKIE_MAX_AGE = 2592000 as const;
const OAUTH_STATE_COOKIE_MAX_AGE = 600 as const;
const SESSION_PURPOSE = "session" as const;
const OAUTH_STATE_PURPOSE = "state" as const;
const USER_ID_PATTERN = /^\d{17,20}$/;

function cookieOptions(maxAge: number) {
	return {
		httpOnly: true,
		maxAge,
		partitioned: true,
		path: "/",
		sameSite: "None",
		secure: true,
	} as const;
}

function unwrap(value: string | false | undefined, purpose: string) {
	if (typeof value !== "string") {
		return null;
	}

	const marker = `${purpose}:`;
	return value.startsWith(marker) ? value.slice(marker.length) : null;
}

export async function getSessionUserId(c: Context) {
	const userId = unwrap(
		await getSignedCookie(c, SESSION_SECRET, SESSION_COOKIE_NAME),
		SESSION_PURPOSE,
	);

	return userId !== null && USER_ID_PATTERN.test(userId) ? userId : null;
}

export async function setSessionUserId(c: Context, userId: Snowflake) {
	await setSignedCookie(
		c,
		SESSION_COOKIE_NAME,
		`${SESSION_PURPOSE}:${userId}`,
		SESSION_SECRET,
		cookieOptions(SESSION_COOKIE_MAX_AGE),
	);
}

export async function getOAuthState(c: Context) {
	return unwrap(
		await getSignedCookie(c, SESSION_SECRET, OAUTH_STATE_COOKIE_NAME),
		OAUTH_STATE_PURPOSE,
	);
}

export async function setOAuthState(c: Context, state: string) {
	await setSignedCookie(
		c,
		OAUTH_STATE_COOKIE_NAME,
		`${OAUTH_STATE_PURPOSE}:${state}`,
		SESSION_SECRET,
		cookieOptions(OAUTH_STATE_COOKIE_MAX_AGE),
	);
}

export function clearOAuthState(c: Context) {
	deleteCookie(c, OAUTH_STATE_COOKIE_NAME, cookieOptions(0));
}
