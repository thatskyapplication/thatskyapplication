import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { krill } from "../../services/krill.js";

export default {
	name: t("krill.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		await krill(interaction);
	},
} as const;
