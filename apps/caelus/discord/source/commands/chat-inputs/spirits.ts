import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	ApplicationCommandOptionType,
	MessageFlags,
} from "@discordjs/core";
import {
	type SpiritIds,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
	spirits,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../../discord.js";
import { search, searchAutocomplete, spiritsHistory } from "../../features/spirits.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("spirits.command-name", { ns: "commands" }),

	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "history": {
				await spiritsHistory(interaction, {
					type:
						(options.getInteger("order") as SpiritsHistoryOrderTypes | null) ??
						SpiritsHistoryOrderType.Natural,
					page: 1,
					newMessage: true,
				});

				return;
			}
			case "search": {
				const spirit = spirits().get(options.getInteger("query", true) as SpiritIds);

				if (!spirit) {
					await client.api.interactions.reply(interaction.id, interaction.token, {
						content: t("spirits.not-encountered-spirit", {
							lng: interaction.locale,
							ns: "features",
						}),
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
