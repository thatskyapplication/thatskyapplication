import { setInterval } from "node:timers";
import type { Snowflake } from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import { Coalescer, type InFlight, store, touch } from "./cache.js";
import { APPLICATION_ID } from "./config.js";
import { rest } from "./discord.js";
import { connectedUserIds } from "./instances.js";
import pino from "./pino.js";

const VERIFICATION_TIME_TO_LIVE = 60_000 as const;
const VERIFICATION_MISS_TIME_TO_LIVE = 2_000 as const;
const VERIFICATION_FAILURE_GRACE = 600_000 as const;
const VERIFICATION_CLEANUP_INTERVAL = 300_000 as const;
const MAXIMUM_INSTANCES = 10_000 as const;
const INSTANCE_GONE_STATUS = 404 as const;
const NO_USERS: ReadonlySet<Snowflake> = new Set();

interface ActivityInstance {
	users: readonly Snowflake[];
}

interface Verification {
	at: number;
	users: ReadonlySet<Snowflake>;
}

const verified = new Map<string, Verification>();

const refreshesInFlight = new Coalescer<ReadonlySet<Snowflake> | null>();

function serving(instanceId: string, entry: Verification) {
	return (
		Date.now() - entry.at <= VERIFICATION_FAILURE_GRACE && connectedUserIds(instanceId).size > 0
	);
}

function remember(instanceId: string, users: ReadonlySet<Snowflake>) {
	store(verified, instanceId, { at: Date.now(), users }, MAXIMUM_INSTANCES, serving);
}

setInterval(() => {
	const now = Date.now();

	for (const [instanceId, entry] of verified) {
		if (now - entry.at > VERIFICATION_FAILURE_GRACE) {
			verified.delete(instanceId);
		}
	}
}, VERIFICATION_CLEANUP_INTERVAL).unref();

export function forgetInstance(instanceId: string) {
	verified.delete(instanceId);
	refreshesInFlight.cancel(instanceId);
}

async function fetchInstanceUsers(instanceId: string, inFlight: InFlight) {
	let instance: ActivityInstance;

	try {
		instance = (await rest.get(
			`/applications/${APPLICATION_ID}/activity-instances/${instanceId}`,
		)) as ActivityInstance;
	} catch (error) {
		pino.warn(error, "Failed to verify an activity instance.");

		if (!(error instanceof DiscordAPIError) || error.status !== INSTANCE_GONE_STATUS) {
			return null;
		}

		if (!inFlight.cancelled) {
			remember(instanceId, NO_USERS);
		}

		return NO_USERS;
	}

	const users: ReadonlySet<Snowflake> = new Set(instance.users);

	if (!inFlight.cancelled) {
		remember(instanceId, users);
	}

	return users;
}

function refreshInstanceUsers(instanceId: string) {
	return refreshesInFlight.run(instanceId, (inFlight) => fetchInstanceUsers(instanceId, inFlight));
}

export async function inActivityInstance(instanceId: string, userId: Snowflake) {
	const cached = touch(verified, instanceId);

	if (cached !== undefined) {
		const age = Date.now() - cached.at;

		if (age <= VERIFICATION_TIME_TO_LIVE && cached.users.has(userId)) {
			return true;
		}

		if (age <= VERIFICATION_MISS_TIME_TO_LIVE) {
			return false;
		}
	}

	const users = await refreshInstanceUsers(instanceId);

	if (users !== null) {
		return users.has(userId);
	}

	const current = touch(verified, instanceId);

	return (
		current !== undefined &&
		Date.now() - current.at <= VERIFICATION_FAILURE_GRACE &&
		current.users.has(userId)
	);
}
