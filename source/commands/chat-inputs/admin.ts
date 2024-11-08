import type {
	APIApplicationCommandAutocompleteInteraction,
	APIChatInputApplicationCommandInteraction,
} from "@discordjs/core";
import { ai, customStatus, interactive, setQuest } from "../../services/admin.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: "admin",
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "set-quest":
				await this.setQuestAutocomplete(interaction);
		}
	},
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommandGroup() ?? options.getSubcommand()) {
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
		interaction: APIChatInputApplicationCommandInteraction,
		options: OptionResolver,
	) {
		switch (options.getSubcommand()) {
			case "interactive": {
				await interactive(interaction);
				return;
			}
			case "set-quest":
				await setQuest(interaction, options);
		}
	},
} as const;
