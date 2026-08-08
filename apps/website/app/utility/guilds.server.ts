import {
	PermissionFlagsBits,
	type RESTGetAPICurrentUserGuildsResult,
	type Snowflake,
} from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import { redirect } from "react-router";
import { guildCache } from "~/cache.server.js";
import discord from "~/discord.js";
import { DiscordAuthorisationError, getAccessToken } from "./discord-oauth.server.js";

async function getUserAdminGuilds(userId: Snowflake) {
	const cached = guildCache.get(userId);

	if (cached) {
		return cached;
	}

	const accessToken = await getAccessToken(userId);
	let guilds: RESTGetAPICurrentUserGuildsResult;

	try {
		guilds = await discord.users.getGuilds(undefined, {
			auth: { prefix: "Bearer", token: accessToken },
		});
	} catch (error) {
		if (error instanceof DiscordAPIError && error.status === 401) {
			throw new DiscordAuthorisationError();
		}

		throw error;
	}

	const guildsWithAdmin = guilds.filter(
		(guild) =>
			(BigInt(guild.permissions) & PermissionFlagsBits.Administrator) ===
			PermissionFlagsBits.Administrator,
	);

	guildCache.set(userId, guildsWithAdmin, 5);
	return guildsWithAdmin;
}

export async function requireUserAdminGuilds(userId: Snowflake, url: URL) {
	try {
		return await getUserAdminGuilds(userId);
	} catch (error) {
		if (error instanceof DiscordAuthorisationError) {
			throw redirect(`/login?returnTo=${encodeURIComponent(String(url))}`);
		}

		throw error;
	}
}
