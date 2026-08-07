import type {
	APIApplicationCommandAutocompleteInteraction,
	APIChatInputApplicationCommandGuildInteraction,
	APIChatInputApplicationCommandInteraction,
} from "@discordjs/core";
import { t } from "i18next";
import {
	DailyGuidesDistributionType,
	type DailyGuidesDistributionTypes,
} from "@thatskyapplication/utility";
import { client } from "../../discord.js";
import { dailyGuidesResponse, questAutocomplete, set } from "../../features/daily-guides.js";
import { SUPPORT_SERVER_GUILD_ID } from "../../utility/configuration.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("daily-guides.command-name", { ns: "commands" }),
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.requireSubcommand()) {
			case "set":
				await client.api.interactions.createAutocompleteResponse(
					interaction.id,
					interaction.token,
					{
						choices: questAutocomplete(
							new OptionResolver(interaction).requireFocusedOption().value,
							interaction.locale,
						),
					},
				);
		}
	},
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		if (interaction.data.guild_id === SUPPORT_SERVER_GUILD_ID) {
			switch (options.requireSubcommand()) {
				case "set": {
					await set(interaction as APIChatInputApplicationCommandGuildInteraction, options);
					return;
				}
			}

			return;
		}

		await dailyGuidesResponse(
			interaction,
			(options.getInteger("type") as DailyGuidesDistributionTypes | null) ??
				DailyGuidesDistributionType.Compact,
		);
	},
} as const;
