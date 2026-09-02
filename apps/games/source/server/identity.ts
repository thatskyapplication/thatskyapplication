import { setInterval } from "node:timers";
import type { Snowflake } from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import type { Context } from "hono";
import { Coalescer, store } from "./cache.js";
import { APPLICATION_ID } from "./config.js";
import discord from "./discord.js";
import pino from "./pino.js";
import { getSessionUserId } from "./session.js";

const TOKEN_TIME_TO_LIVE = 3_600_000 as const;
const REJECTED_TIME_TO_LIVE = 60_000 as const;
const TOKEN_CLEANUP_INTERVAL = 900_000 as const;
const MAXIMUM_TOKENS = 10_000 as const;
const BEARER_PREFIX = "Bearer " as const;
const LOOKUP_WINDOW = 60_000 as const;
const LOOKUPS_PER_WINDOW = 240 as const;
const REJECTED_IDENTITY = { userId: null, definitive: true } as const;
const UNVERIFIED_IDENTITY = { userId: null, definitive: false } as const;
const MAXIMUM_TOKEN_LENGTH = 512 as const;

export type TokenIdentity = { userId: Snowflake } | { userId: null; definitive: boolean };

const tokens = new Map<string, { userId: Snowflake | null; at: number }>();
const lookupsInFlight = new Coalescer<TokenIdentity>();

setInterval(() => {
	const now = Date.now();

	for (const [token, entry] of tokens) {
		if (now - entry.at > (entry.userId === null ? REJECTED_TIME_TO_LIVE : TOKEN_TIME_TO_LIVE)) {
			tokens.delete(token);
		}
	}
}, TOKEN_CLEANUP_INTERVAL).unref();

export function rememberToken(token: string, userId: Snowflake) {
	store(tokens, token, { userId, at: Date.now() }, MAXIMUM_TOKENS);
}

let lookups = 0;
let lookupsResetAt = 0;

function lookupAllowed() {
	const now = Date.now();

	if (now >= lookupsResetAt) {
		lookups = 1;
		lookupsResetAt = now + LOOKUP_WINDOW;
		return true;
	}

	lookups += 1;

	if (lookups === LOOKUPS_PER_WINDOW + 1) {
		pino.warn("Exhausted the activity token lookup budget.");
	}

	return lookups <= LOOKUPS_PER_WINDOW;
}

async function fetchIdentityForToken(token: string): Promise<TokenIdentity> {
	try {
		const authorisation = await discord.oauth2.getCurrentAuthorizationInformation({
			auth: { prefix: "Bearer", token },
		});

		if (authorisation.application.id !== APPLICATION_ID || !authorisation.user) {
			pino.warn("Rejected an access token issued to another application.");
			store(tokens, token, { userId: null, at: Date.now() }, MAXIMUM_TOKENS);
			return REJECTED_IDENTITY;
		}

		rememberToken(token, authorisation.user.id);
		return { userId: authorisation.user.id };
	} catch (error) {
		pino.warn(error, "Failed to identify an activity token.");

		if (!(error instanceof DiscordAPIError)) {
			return UNVERIFIED_IDENTITY;
		}

		store(tokens, token, { userId: null, at: Date.now() }, MAXIMUM_TOKENS);
		return REJECTED_IDENTITY;
	}
}

export async function identityForToken(token: string): Promise<TokenIdentity> {
	const entry = tokens.get(token);

	if (
		entry &&
		Date.now() - entry.at <= (entry.userId === null ? REJECTED_TIME_TO_LIVE : TOKEN_TIME_TO_LIVE)
	) {
		return entry.userId === null ? REJECTED_IDENTITY : { userId: entry.userId };
	}

	if (token.length > MAXIMUM_TOKEN_LENGTH) {
		return REJECTED_IDENTITY;
	}

	if (lookupsInFlight.has(token)) {
		return lookupsInFlight.run(token, () => fetchIdentityForToken(token));
	}

	if (!lookupAllowed()) {
		return UNVERIFIED_IDENTITY;
	}

	return lookupsInFlight.run(token, () => fetchIdentityForToken(token));
}

async function userIdForToken(token: string) {
	return (await identityForToken(token)).userId;
}

function bearerToken(authorisation: string | undefined) {
	return authorisation?.startsWith(BEARER_PREFIX)
		? authorisation.slice(BEARER_PREFIX.length)
		: null;
}

export async function identify(c: Context) {
	const token = bearerToken(c.req.header("authorization"));
	return token === null ? getSessionUserId(c) : userIdForToken(token);
}
