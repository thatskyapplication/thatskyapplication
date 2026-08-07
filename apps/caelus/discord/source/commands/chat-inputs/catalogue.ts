import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	ApplicationCommandOptionType,
} from "@discordjs/core";
import { t } from "i18next";
import { searchAutocomplete, viewSearch, viewStart } from "../../features/catalogue.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("catalogue.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const search = new OptionResolver(interaction).getString("search");

		if (search === null || search.trim().length === 0) {
			await viewStart(interaction);
			return;
		}

		await viewSearch(interaction, search);
	},
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		await searchAutocomplete(
			interaction,
			new OptionResolver(interaction).requireFocusedOption(ApplicationCommandOptionType.String),
		);
	},
} as const;
