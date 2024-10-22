import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { highFive } from "../../services/high-five.js";

export default {
	name: t("high-five.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		await highFive(interaction);
	},
} as const;
