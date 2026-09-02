import type { DiscordSDK } from "@discord/embedded-app-sdk";
import type { Snowflake } from "@discordjs/core/http-only";

const PARTICIPANTS_UPDATE_EVENT = "ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE" as const;
const AVATAR_SIZE = 64 as const;
const DEFAULT_AVATAR_VARIANTS = 6n as const;
const REFRESH_THROTTLE = 10_000 as const;

interface Participant {
	avatarURL: string;
	id: Snowflake;
	name: string;
}

interface InstanceParticipant {
	avatar?: string | null | undefined;
	global_name?: string | null | undefined;
	id: string;
	nickname?: string | undefined;
	username: string;
}

let discordSdk: DiscordSDK | null = null;
let refreshedAt = 0;
let refreshing: Promise<void> | null = null;
let profiles = new Map<Snowflake, Participant>();
const absent = new Set<Snowflake>();
const listeners = new Set<() => void>();

function emit() {
	for (const listener of listeners) {
		listener();
	}
}

export function subscribeToParticipants(listener: () => void) {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
}

export function profilesSnapshot() {
	return profiles;
}

export function profileFor(userId: Snowflake) {
	return profiles.get(userId) ?? null;
}

function avatarURL({ avatar, id }: InstanceParticipant) {
	return avatar
		? `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=${AVATAR_SIZE}`
		: `https://cdn.discordapp.com/embed/avatars/${(BigInt(id) >> 22n) % DEFAULT_AVATAR_VARIANTS}.png`;
}

function learn(instanceParticipants: readonly InstanceParticipant[]) {
	const next = new Map(profiles);

	for (const participant of instanceParticipants) {
		absent.delete(participant.id);

		next.set(participant.id, {
			avatarURL: avatarURL(participant),
			id: participant.id,
			name: participant.nickname ?? participant.global_name ?? participant.username,
		});
	}

	profiles = next;
	emit();
}

function pause(milliseconds: number) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, milliseconds);
	});
}

async function refresh() {
	const sdk = discordSdk;

	if (sdk === null) {
		return;
	}

	const remaining = REFRESH_THROTTLE - (Date.now() - refreshedAt);

	if (remaining > 0) {
		await pause(remaining);
	}

	if (discordSdk !== sdk) {
		return;
	}

	refreshedAt = Date.now();
	const { participants } = await sdk.commands.getInstanceConnectedParticipants();
	learn(participants);
}

export async function ensureProfiles(userIds: readonly Snowflake[]) {
	const missing = userIds.filter((userId) => !profiles.has(userId) && !absent.has(userId));

	if (missing.length === 0) {
		return;
	}

	refreshing ??= refresh().finally(() => {
		refreshing = null;
	});

	await refreshing;

	for (const userId of missing) {
		if (!profiles.has(userId)) {
			absent.add(userId);
		}
	}
}

export async function initialiseParticipants(sdk: DiscordSDK) {
	discordSdk = sdk;
	absent.clear();
	refreshedAt = Date.now();
	const { participants } = await sdk.commands.getInstanceConnectedParticipants();
	learn(participants);

	await sdk.subscribe(PARTICIPANTS_UPDATE_EVENT, ({ participants: updated }) => {
		learn(updated);
	});
}
