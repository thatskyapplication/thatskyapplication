import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { browse, today } from "../../features/shard-eruption.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("shard-eruption.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "browse": {
				await browse(interaction, 0);
				return;
			}
			case "today": {
				await today(interaction, { newMessage: true });
			}
		}
	},
} as const;
