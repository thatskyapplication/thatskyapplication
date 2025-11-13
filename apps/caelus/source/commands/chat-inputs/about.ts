import { type APIChatInputApplicationCommandInteraction, MessageFlags } from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { about } from "../../features/about.js";

export default {
	name: t("about.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: await about(interaction.locale),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
