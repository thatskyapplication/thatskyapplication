import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	ComponentType,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import {
	dailyGuidesResponse,
	distributionData,
	fetchDailyGuides,
	interactive,
	questAutocomplete,
	set,
} from "../../features/daily-guides.js";
import { SUPPORT_SERVER_GUILD_ID, SUPPORT_SERVER_INVITE_URL } from "../../utility/configuration.js";
import { INFORMATION_ACCENT_COLOUR } from "../../utility/constants.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("daily-guides.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "set":
				await client.api.interactions.createAutocompleteResponse(
					interaction.id,
					interaction.token,
					{
						choices: questAutocomplete(
							new OptionResolver(interaction).getFocusedOption().value,
							interaction.locale,
						),
					},
				);
		}
	},
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		if (interaction.data.guild_id === SUPPORT_SERVER_GUILD_ID) {
			const options = new OptionResolver(interaction);

			switch (options.getSubcommand()) {
				case "interactive": {
					await interactive(interaction as APIChatInputApplicationCommandGuildInteraction, {
						locale: interaction.locale,
					});

					return;
				}
				case "set": {
					await set(interaction as APIChatInputApplicationCommandGuildInteraction, options);
					return;
				}
			}

			return;
		}

		await dailyGuidesResponse(interaction);
	},
} as const;
