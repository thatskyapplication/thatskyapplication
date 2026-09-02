import { setInterval } from "node:timers";
import type { Snowflake } from "@discordjs/core/http-only";
import { store, touch } from "./cache.js";
import { type FinishedRound, hasActiveGuessSession, skyProfileName } from "./guess.js";

const INSTANCE_TIME_TO_LIVE = 3_600_000 as const;
const FINISHED_ROUND_TIME_TO_LIVE = 30_000 as const;
const USER_FINISHED_ROUND_TIME_TO_LIVE = 300_000 as const;
const INSTANCE_CLEANUP_INTERVAL = 900_000 as const;
const MAXIMUM_INSTANCES = 10_000 as const;
const MAXIMUM_USER_FINISHED_ROUNDS = 10_000 as const;

interface FinishedRoundEntry {
	at: number;
	round: FinishedRound;
}

interface Instance {
	finishedRound: FinishedRoundEntry | null;
	primaryUserId: Snowflake | null;
	updatedAt: number;
}

const instances = new Map<string, Instance>();
const userFinishedRounds = new Map<Snowflake, FinishedRoundEntry>();

setInterval(() => {
	const now = Date.now();

	for (const [instanceId, instance] of instances) {
		if (now - instance.updatedAt > INSTANCE_TIME_TO_LIVE && connections(instanceId).size === 0) {
			instances.delete(instanceId);
		}
	}

	for (const [userId, finished] of userFinishedRounds) {
		if (now - finished.at > USER_FINISHED_ROUND_TIME_TO_LIVE) {
			userFinishedRounds.delete(userId);
		}
	}
}, INSTANCE_CLEANUP_INTERVAL).unref();

function liveInstance(instanceId: string) {
	const instance = touch(instances, instanceId);

	if (instance !== undefined) {
		instance.updatedAt = Date.now();
	}

	return instance;
}

export function primaryFor(instanceId: string) {
	return liveInstance(instanceId)?.primaryUserId ?? null;
}

export async function joinInstance(instanceId: string, userId: Snowflake) {
	const instance = liveInstance(instanceId);

	if (instance !== undefined && instance.primaryUserId !== null) {
		return instance.primaryUserId;
	}

	const primaryUserId = (await eligibleForPrimary(userId)) ? userId : null;
	const current = liveInstance(instanceId);

	if (current === undefined) {
		store(
			instances,
			instanceId,
			{ finishedRound: null, primaryUserId, updatedAt: Date.now() },
			MAXIMUM_INSTANCES,
		);

		return primaryUserId;
	}

	if (current.primaryUserId === null) {
		current.primaryUserId = primaryUserId;
	}

	return current.primaryUserId;
}

export function setFinishedRound(instanceId: string, round: FinishedRound | null) {
	const instance = liveInstance(instanceId);

	if (instance !== undefined) {
		instance.finishedRound = round === null ? null : { at: Date.now(), round };
	}
}

export function finishedRound(instanceId: string) {
	const finished = liveInstance(instanceId)?.finishedRound;

	return finished && Date.now() - finished.at <= FINISHED_ROUND_TIME_TO_LIVE
		? finished.round
		: null;
}

export function setFinishedRoundForUser(userId: Snowflake, round: FinishedRound) {
	store(userFinishedRounds, userId, { at: Date.now(), round }, MAXIMUM_USER_FINISHED_ROUNDS);
}

export function finishedRoundForUser(userId: Snowflake) {
	const finished = userFinishedRounds.get(userId);

	return finished && Date.now() - finished.at <= USER_FINISHED_ROUND_TIME_TO_LIVE
		? finished.round
		: null;
}

let resolveConnections: ((instanceId: string) => ReadonlySet<Snowflake>) | null = null;
let resolveDeparting: ((instanceId: string, userId: Snowflake) => boolean) | null = null;

export function observeConnections(
	onConnections: (instanceId: string) => ReadonlySet<Snowflake>,
	onDeparting: (instanceId: string, userId: Snowflake) => boolean,
) {
	resolveConnections = onConnections;
	resolveDeparting = onDeparting;
}

function connections(instanceId: string) {
	if (resolveConnections === null) {
		throw new Error("Activity connections were read before the socket server was attached.");
	}

	return resolveConnections(instanceId);
}

export function connectedUserIds(instanceId: string) {
	return connections(instanceId);
}

function primaryConnected(instanceId: string) {
	const primaryUserId = liveInstance(instanceId)?.primaryUserId ?? null;

	if (primaryUserId === null) {
		return false;
	}

	return (
		connections(instanceId).has(primaryUserId) ||
		resolveDeparting?.(instanceId, primaryUserId) === true
	);
}

export function canClaimPrimary(instanceId: string, userId: Snowflake) {
	return (
		liveInstance(instanceId) !== undefined &&
		connections(instanceId).has(userId) &&
		!primaryConnected(instanceId)
	);
}

export function claimPrimary(instanceId: string, userId: Snowflake) {
	const instance = liveInstance(instanceId);

	if (instance === undefined || !canClaimPrimary(instanceId, userId)) {
		return false;
	}

	instance.primaryUserId = userId;
	return true;
}

async function eligibleForPrimary(userId: Snowflake) {
	return (await skyProfileName(userId)) !== null && !(await hasActiveGuessSession(userId));
}

async function nextPrimary(candidates: ReadonlySet<Snowflake>) {
	for (const userId of candidates) {
		if (await eligibleForPrimary(userId)) {
			return userId;
		}
	}

	return null;
}

export async function releasePrimary(instanceId: string, remaining: ReadonlySet<Snowflake>) {
	const instance = liveInstance(instanceId);

	if (instance === undefined) {
		return false;
	}

	const departedUserId = instance.primaryUserId;

	if (departedUserId !== null && remaining.has(departedUserId)) {
		return false;
	}

	if (remaining.size === 0) {
		instances.delete(instanceId);
		return departedUserId !== null;
	}

	const nextUserId = await nextPrimary(remaining);
	const current = liveInstance(instanceId);

	if (
		current === undefined ||
		current.primaryUserId !== departedUserId ||
		nextUserId === departedUserId
	) {
		return false;
	}

	current.primaryUserId = nextUserId;
	return true;
}

export function transferPrimary(instanceId: string, fromUserId: Snowflake, toUserId: Snowflake) {
	const instance = liveInstance(instanceId);

	if (instance === undefined || instance.primaryUserId !== fromUserId) {
		return false;
	}

	instance.primaryUserId = toUserId;
	return true;
}
