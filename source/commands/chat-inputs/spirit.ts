import {
	type AutocompleteInteraction,
	type ButtonInteraction,
	type ChatInputCommandInteraction,
	Locale,
} from "discord.js";
import { t } from "i18next";
import { parseSpiritSwitch, search, searchAutocomplete } from "../../services/spirit.js";

export default {
	name: t("spirit.command-name", { lng: Locale.EnglishGB, ns: "commands" }),

	async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "search": {
				await this.search(interaction);
				return;
			}
		}
	},
	async autocomplete(interaction: AutocompleteInteraction) {
		await searchAutocomplete(interaction);
	},
	async search(interaction: ChatInputCommandInteraction) {
		await search(interaction);
	},
	async parseSpiritSwitch(interaction: ButtonInteraction) {
		await parseSpiritSwitch(interaction);
	},
} as const;
