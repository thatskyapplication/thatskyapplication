import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { bonk } from "../../services/bonk.js";

export default {
	name: t("bonk.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		await bonk(interaction);
	},
} as const;
