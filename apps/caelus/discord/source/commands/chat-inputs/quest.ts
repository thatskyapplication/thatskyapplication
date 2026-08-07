import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { isDailyQuest } from "@thatskyapplication/utility";
import { client } from "../../discord.js";
import { questAutocomplete, questResponse } from "../../features/daily-guides.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("quest.command-name", { ns: "commands" }),
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		await client.api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
			choices: questAutocomplete(
				new OptionResolver(interaction).requireFocusedOption().value,
				interaction.locale,
			),
		});
	},
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const { locale } = interaction;
		const options = new OptionResolver(interaction);
		const daily = options.requireInteger("daily");

		if (!isDailyQuest(daily)) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: t("daily-guides.quest-unknown", { lng: locale, ns: "features" }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: questResponse(daily, locale),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
