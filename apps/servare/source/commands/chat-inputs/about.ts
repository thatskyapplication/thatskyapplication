import { type APIChatInputApplicationCommandGuildInteraction, MessageFlags } from "@discordjs/core";
import { client } from "../../discord.js";
import { about } from "../../features/about.js";

export default {
	name: "about" as const,
	async chatInput(interaction: APIChatInputApplicationCommandGuildInteraction) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			embeds: [await about()],
			flags: MessageFlags.Ephemeral,
		});
	},
} as const;
