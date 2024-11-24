import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { playFight } from "../../services/play-fight.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("play-fight.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);
		await playFight(interaction, options.getUser("user", true), options.getMember("user"));
	},
} as const;
