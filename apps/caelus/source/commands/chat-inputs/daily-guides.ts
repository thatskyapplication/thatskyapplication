import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { distributionData, interactive, set } from "../../features/daily-guides.js";
import { questAutocomplete } from "../../services/quests.js";
import { SUPPORT_SERVER_GUILD_ID } from "../../utility/configuration.js";
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

		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: distributionData(interaction.locale),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
