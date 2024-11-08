import { t } from "i18next";
import {
	ascendedCandles,
	eventCurrency,
	seasonalCandles,
	wingedLight,
} from "../../services/calculate.js";
import { Locale } from "@discordjs/core";

export default {
	name: t("calculate.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "ascended-candles": {
				await this.ascendedCandles(interaction);
				return;
			}
			case "event-currency": {
				await this.eventCurrency(interaction);
				return;
			}
			case "seasonal-candles": {
				await this.seasonalCandles(interaction);
				return;
			}
			case "winged-light": {
				await this.wingedLight(interaction);
			}
		}
	},
	async ascendedCandles(interaction: ChatInputCommandInteraction) {
		await ascendedCandles(interaction);
	},
	async eventCurrency(interaction: ChatInputCommandInteraction) {
		await eventCurrency(interaction);
	},
	async seasonalCandles(interaction: ChatInputCommandInteraction) {
		await seasonalCandles(interaction);
	},
	async wingedLight(interaction: ChatInputCommandInteraction) {
		await wingedLight(interaction);
	},
} as const;
