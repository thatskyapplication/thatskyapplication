import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { Catalogue } from "../../models/Catalogue.js";

export default {
	name: t("catalogue.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		await Catalogue.viewCatalogue(interaction);
	},
} as const;
