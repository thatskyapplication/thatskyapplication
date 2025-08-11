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
	distributionData,
	fetchDailyGuides,
	interactive,
	set,
} from "../../features/daily-guides.js";
import { questAutocomplete } from "../../services/quests.js";
import { SUPPORT_SERVER_GUILD_ID } from "../../utility/configuration.js";
import { INFORMATION_ACCENT_COLOUR, SUPPORT_SERVER_INVITE_URL } from "../../utility/constants.js";
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

		const { locale } = interaction;
		const components = await distributionData(locale);
		const { quest1, quest2, quest3, quest4 } = await fetchDailyGuides();

		if ([quest1, quest2, quest3, quest4].some((quest) => quest === null)) {
			components.push({
				type: ComponentType.Container,
				accent_color: INFORMATION_ACCENT_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("daily-guides.not-yet-updated", {
							lng: locale,
							ns: "features",
							url: SUPPORT_SERVER_INVITE_URL,
						}),
					},
				],
			});
		}

		await client.api.interactions.reply(interaction.id, interaction.token, {
			components,
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
