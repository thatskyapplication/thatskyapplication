import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	ApplicationCommandOptionType,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { type SpiritIds, spirits } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../../discord.js";
import { search, searchAutocomplete, spiritsHistory } from "../../features/spirits.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("spirit.command-name", { lng: Locale.EnglishGB, ns: "commands" }),

	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "history": {
				await spiritsHistory(interaction);
				return;
			}
			case "search": {
				const spirit = spirits().get(options.getInteger("query", true) as SpiritIds);

				if (!spirit) {
					await client.api.interactions.reply(interaction.id, interaction.token, {
						content: "Woah, it seems we have not encountered that spirit yet. How strange!",
						flags: MessageFlags.Ephemeral,
					});

					return;
				}

				await client.api.interactions.reply(interaction.id, interaction.token, {
					components: search({ spirit, locale: interaction.locale }),
					flags: MessageFlags.IsComponentsV2,
				});

				return;
			}
		}
	},
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		await searchAutocomplete(
			interaction,
			new OptionResolver(interaction).getFocusedOption(ApplicationCommandOptionType.Integer),
		);
	},
} as const;
