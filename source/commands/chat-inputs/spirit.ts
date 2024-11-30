import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	Locale,
} from "@discordjs/core";
import { t } from "i18next";
import { search, searchAutocomplete } from "../../services/spirit.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("spirit.command-name", { lng: Locale.EnglishGB, ns: "commands" }),

	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "search": {
				await search(interaction, options);
				return;
			}
		}
	},
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		const options = new OptionResolver(interaction);
		await searchAutocomplete(interaction, options);
	},
} as const;
