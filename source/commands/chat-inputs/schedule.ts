import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { schedule } from "../../services/schedule.js";

export default {
	name: t("schedule.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		await schedule(interaction);
	},
} as const;
