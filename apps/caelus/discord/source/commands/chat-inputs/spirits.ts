import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	ApplicationCommandOptionType,
} from "@discordjs/core";
import { t } from "i18next";
import {
	type SpiritIds,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
} from "@thatskyapplication/utility";
import { searchAutocomplete, spiritsHistory, spiritsViewSpirit } from "../../features/spirits.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("spirits.command-name", { ns: "commands" }),

	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.requireSubcommand()) {
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
				await spiritsViewSpirit(interaction, options.requireInteger("query") as SpiritIds);
				return;
			}
		}
	},
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		await searchAutocomplete(
			interaction,
			new OptionResolver(interaction).requireFocusedOption(ApplicationCommandOptionType.Integer),
		);
	},
} as const;
