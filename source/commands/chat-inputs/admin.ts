import type {
	AutocompleteInteraction,
	ButtonInteraction,
	ChatInputCommandInteraction,
	ModalMessageModalSubmitInteraction,
	StringSelectMenuInteraction,
} from "discord.js";
import type { InteractiveOptions } from "../../models/Admin.js";
import {
	ai,
	customStatus,
	distribute,
	interactive,
	setDailyMessage,
	setQuest,
	setQuestAutocomplete,
	setTreasureCandles,
	treasureCandlesModalResponse,
	treasureCandlesSelectMenuResponse,
} from "../../services/admin.js";

export default {
	name: "admin",
	async autocomplete(interaction: AutocompleteInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "set-quest":
				await this.setQuestAutocomplete(interaction);
		}
	},
	async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;

		switch (options.getSubcommandGroup() ?? options.getSubcommand()) {
			case "ai": {
				await this.ai(interaction);
				return;
			}
			case "custom-status": {
				await this.customStatus(interaction);
				return;
			}
			case "daily-guides": {
				await this.dailyGuides(interaction);
			}
		}
	},
	async ai(interaction: ChatInputCommandInteraction) {
		await ai(interaction);
	},
	async customStatus(interaction: ChatInputCommandInteraction) {
		await customStatus(interaction);
	},
	async dailyGuides(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "interactive": {
				await this.interactive(interaction);
				return;
			}
			case "set-quest":
				await this.setQuest(interaction);
		}
	},
	async interactive(
		interaction:
			| ButtonInteraction
			| ChatInputCommandInteraction
			| ModalMessageModalSubmitInteraction
			| StringSelectMenuInteraction,
		options?: InteractiveOptions,
	) {
		await interactive(interaction, options);
	},
	async distribute(interaction: ButtonInteraction) {
		await distribute(interaction);
	},
	async setQuestAutocomplete(interaction: AutocompleteInteraction) {
		await setQuestAutocomplete(interaction);
	},
	async setQuest(interaction: ChatInputCommandInteraction) {
		await setQuest(interaction);
	},
	async questSwap(interaction: StringSelectMenuInteraction) {
		await this.questSwap(interaction);
	},
	async dailyMessageModalResponse(interaction: ButtonInteraction) {
		await this.dailyMessageModalResponse(interaction);
	},
	async setDailyMessage(interaction: ModalMessageModalSubmitInteraction) {
		await setDailyMessage(interaction);
	},
	async treasureCandlesModalResponse(interaction: ButtonInteraction) {
		await treasureCandlesModalResponse(interaction);
	},
	async treasureCandlesSelectMenuResponse(interaction: StringSelectMenuInteraction) {
		await treasureCandlesSelectMenuResponse(interaction);
	},
	async setTreasureCandles(interaction: ModalMessageModalSubmitInteraction) {
		await setTreasureCandles(interaction);
	},
} as const;
