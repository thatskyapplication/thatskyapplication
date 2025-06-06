import {
	type APIChatInputApplicationCommandInteraction,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { distributionData } from "../../features/daily-guides.js";

export default {
	name: t("daily-guides.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: distributionData(interaction.locale),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
