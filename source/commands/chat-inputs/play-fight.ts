import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { playFight } from "../../services/play-fight.js";

export default {
	name: t("play-fight.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		await playFight(interaction);
	},
} as const;
