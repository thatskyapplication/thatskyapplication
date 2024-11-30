import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { Catalogue } from "../../models/Catalogue.js";

export default {
	name: t("catalogue.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		await Catalogue.viewCatalogue(interaction);
	},
} as const;
