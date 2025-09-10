import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { scheduleOverview } from "../../features/schedule.js";

export default {
	name: t("schedule.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		await scheduleOverview(interaction);
	},
} as const;
