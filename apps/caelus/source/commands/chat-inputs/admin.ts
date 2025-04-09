import type {
	APIApplicationCommandAutocompleteInteraction,
	APIChatInputApplicationCommandGuildInteraction,
	APIChatInputApplicationCommandInteraction,
} from "@discordjs/core";
import { client } from "../../discord.js";
import {
	ai,
	customStatus,
	interactive,
	setQuest,
	setTravellingRock,
} from "../../services/admin.js";
import { questAutocomplete } from "../../services/quests.js";
import { isGuildChatInputCommand } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: "admin",
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "set-quest":
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
		if (!isGuildChatInputCommand(interaction)) {
			return;
		}

		const options = new OptionResolver(interaction);

		switch (options.getSubcommandGroup(false) ?? options.getSubcommand()) {
			case "ai": {
				await ai(interaction, options);
				return;
			}
			case "custom-status": {
				await customStatus(interaction, options);
				return;
			}
			case "daily-guides": {
				await this.dailyGuides(interaction, options);
			}
		}
	},
	async dailyGuides(
		interaction: APIChatInputApplicationCommandGuildInteraction,
		options: OptionResolver,
	) {
		switch (options.getSubcommand()) {
			case "interactive": {
				await interactive(interaction);
				return;
			}
			case "set-quest": {
				await setQuest(interaction, options);
				return;
			}
			case "set-travelling-rock": {
				await setTravellingRock(interaction, options);
				return;
			}
		}
	},
} as const;
