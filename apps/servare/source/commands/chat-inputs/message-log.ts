import type { APIChatInputApplicationCommandGuildInteraction } from "@discordjs/core";
import { client } from "../../discord.js";
import { setupResponse } from "../../features/message-log.js";
import type { Guild } from "../../models/discord/guild.js";

export default {
	name: "message-log" as const,
	async chatInput(interaction: APIChatInputApplicationCommandGuildInteraction, guild: Guild) {
		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			await setupResponse(guild.id),
		);
	},
} as const;
