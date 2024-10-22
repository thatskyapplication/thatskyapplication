import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { hug } from "../../services/hug.js";

export default {
	name: t("hug.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		await hug(interaction);
	},
} as const;
