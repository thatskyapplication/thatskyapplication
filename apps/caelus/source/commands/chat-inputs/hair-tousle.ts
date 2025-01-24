import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { hairTousle } from "../../services/hair-tousle.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("hair-tousle.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);
		await hairTousle(interaction, options.getUser("user", true), options.getMember("user"));
	},
} as const;
