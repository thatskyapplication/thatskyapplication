import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { deletePrompt } from "../../services/data.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("data.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "delete":
				await deletePrompt(interaction);
		}
	},
} as const;
