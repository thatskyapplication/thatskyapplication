import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { isDailyQuest } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../../discord.js";
import pino from "../../pino.js";
import { questAutocomplete, questResponse } from "../../services/quests.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("quest.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		await client.api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
			choices: questAutocomplete(
				new OptionResolver(interaction).getFocusedOption().value,
				interaction.locale,
			),
		});
	},
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);
		const daily = options.getInteger("daily", true);

		if (!isDailyQuest(daily)) {
			pino.error(interaction, "Unknown daily quest.");

			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "Woah, that's a daily we do not know. Maybe try another?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: questResponse(daily, interaction.locale),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
