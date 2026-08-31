import type { APIUser, Snowflake } from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import { CDN } from "@thatskyapplication/utility";
import { userCache } from "~/cache.server.js";
import type { UserChipUser } from "~/components/UserChip.js";
import { CDN_URL } from "~/config.server.js";
import discord from "~/discord.js";
import { publicProfilesQuery } from "~/features/sky-profile/sky-profile-repository.server.js";
import pino from "~/pino.js";
import { avatarURL, defaultAvatarURL } from "~/utility/functions.js";

const USER_CACHE_TIME_TO_LIVE_MINUTES = 60 as const;
const USER_CHIP_ICON_SIZE = 64 as const;

const cdn = new CDN(CDN_URL);

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

export async function resolveUserChips(userIds: readonly Snowflake[]) {
	const skyProfilePackets =
		userIds.length === 0
			? []
			: await publicProfilesQuery()
					.select(["user_id", "name", "icon"])
					.where("user_id", "in", userIds)
					.$narrowType<{ name: string }>()
					.execute();

	const skyProfiles = new Map(skyProfilePackets.map((packet) => [packet.user_id, packet]));
	const { users } = await resolveUsers(userIds.filter((userId) => !skyProfiles.has(userId)));

	return new Map<Snowflake, UserChipUser>(
		userIds.map((userId) => {
			const skyProfile = skyProfiles.get(userId);

			if (skyProfile) {
				return [
					userId,
					{
						iconURL: skyProfile.icon
							? cdn.skyProfileIconURL(userId, skyProfile.icon)
							: defaultAvatarURL(userId),
						id: userId,
						name: skyProfile.name,
						skyProfile: true,
					},
				];
			}

			const user = users.get(userId);

			return [
				userId,
				{
					iconURL: user ? avatarURL(user, { size: USER_CHIP_ICON_SIZE }) : defaultAvatarURL(userId),
					id: userId,
					name: user ? (user.global_name ?? user.username) : null,
					skyProfile: false,
				},
			];
		}),
	);
}
