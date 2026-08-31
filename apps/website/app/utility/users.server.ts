import type { APIUser, Snowflake } from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import { userCache } from "~/cache.server.js";
import discord from "~/discord.js";
import pino from "~/pino.js";

const USER_CACHE_TIME_TO_LIVE_MINUTES = 60 as const;

export async function resolveUsers(userIds: readonly Snowflake[]) {
	const users = new Map<Snowflake, APIUser>();
	const unknownUserIds: Snowflake[] = [];
	const failedUserIds: Snowflake[] = [];
	const uncachedUserIds: Snowflake[] = [];

	for (const userId of userIds) {
		const cached = userCache.get(userId);

		if (!cached) {
			uncachedUserIds.push(userId);
		} else if (cached.user) {
			users.set(userId, cached.user);
		} else {
			unknownUserIds.push(userId);
		}
	}

	const results = await Promise.allSettled(
		uncachedUserIds.map((userId) => discord.users.get(userId)),
	);

	for (const [index, result] of results.entries()) {
		const userId = uncachedUserIds[index]!;

		if (result.status === "fulfilled") {
			userCache.set(userId, { user: result.value }, USER_CACHE_TIME_TO_LIVE_MINUTES);
			users.set(userId, result.value);
			continue;
		}

		if (result.reason instanceof DiscordAPIError && result.reason.status === 404) {
			userCache.set(userId, { user: null }, USER_CACHE_TIME_TO_LIVE_MINUTES);
			unknownUserIds.push(userId);
			continue;
		}

		pino.error(result.reason, `Failed to resolve Discord user ${userId}.`);
		failedUserIds.push(userId);
	}

	return { failedUserIds, unknownUserIds, users };
}
