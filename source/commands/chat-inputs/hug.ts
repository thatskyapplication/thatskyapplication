import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { hug } from "../../services/hug.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("hug.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);
		await hug(interaction, options.getUser("user", true), options.getMember("user"));
	},
} as const;
