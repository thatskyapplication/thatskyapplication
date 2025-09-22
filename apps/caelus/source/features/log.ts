import type { GatewayGuildDeleteDispatchData } from "@discordjs/core";
import type { Guild } from "../models/discord/guild.js";
import pino from "../pino.js";

export function logGuild(guild: GatewayGuildDeleteDispatchData | Guild) {
	pino.info(
		"name" in guild
			? {
					id: guild.id,
					name: guild.name,
					created: guild.createdAt,
					joined: guild.joinedAt,
					owner: guild.ownerId,
					members: guild.memberCount,
					locale: guild.preferredLocale,
				}
			: {
					id: guild.id,
				},
		"Guild left",
	);
}
