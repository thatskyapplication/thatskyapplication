import type {
	APIApplicationCommandAutocompleteInteraction,
	APIChatInputApplicationCommandGuildInteraction,
	APIChatInputApplicationCommandInteraction,
} from "@discordjs/core";
import {
	ai,
	customStatus,
	interactive,
	setQuest,
	setQuestAutocomplete,
	setTravellingRock,
} from "../../services/admin.js";
import { isGuildChatInputCommand } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: "admin",
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "set-quest":
				await setQuestAutocomplete(interaction, options);
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
