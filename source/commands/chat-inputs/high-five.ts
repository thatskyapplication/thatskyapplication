import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { highFive } from "../../services/high-five.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("high-five.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);
		await highFive(interaction, options.getUser("user", true), options.getMember("user"));
	},
} as const;
