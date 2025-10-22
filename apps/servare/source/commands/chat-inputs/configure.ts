import type { APIChatInputApplicationCommandGuildInteraction } from "@discordjs/core";
import { client } from "../../discord.js";
import { setupResponse as setupResponseMessageLog } from "../../features/message-log.js";
import { setupResponse as setupResponseReport } from "../../features/report.js";
import type { Guild } from "../../models/discord/guild.js";
import { OptionResolver } from "../../utility/option-resolver.js";

async function report(interaction: APIChatInputApplicationCommandGuildInteraction, guild: Guild) {
	await client.api.interactions.reply(
		interaction.id,
		interaction.token,
		await setupResponseReport(guild),
	);
}

async function messageLog(interaction: APIChatInputApplicationCommandGuildInteraction) {
	await client.api.interactions.reply(
		interaction.id,
		interaction.token,
		await setupResponseMessageLog(interaction.guild_id),
	);
}

export default {
	name: "configure",
	async chatInput(interaction: APIChatInputApplicationCommandGuildInteraction, guild: Guild) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "report": {
				await report(interaction, guild);
				return;
			}
			case "message-log": {
				await messageLog(interaction);
				return;
			}
		}
	},
} as const;
