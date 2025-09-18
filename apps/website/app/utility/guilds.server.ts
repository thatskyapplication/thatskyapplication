import { PermissionFlagsBits } from "@discordjs/core/http-only";
import { guildCache } from "~/cache.server.js";
import discord from "~/discord.js";
import type { DiscordUser, TokenExchange } from "./types.js";

export async function getUserAdminGuilds(discordUser: DiscordUser, tokenExchange: TokenExchange) {
	const cached = guildCache.get(discordUser.id);

	if (cached) {
		return cached;
	}

	const guilds = await discord.users.getGuilds(undefined, {
		auth: { prefix: "Bearer", token: tokenExchange.access_token },
	});

	const guildsWithAdmin = guilds.filter(
		(guild) =>
			(BigInt(guild.permissions) & PermissionFlagsBits.Administrator) ===
			PermissionFlagsBits.Administrator,
	);

	guildCache.set(discordUser.id, guildsWithAdmin, 5);
	return guildsWithAdmin;
}
