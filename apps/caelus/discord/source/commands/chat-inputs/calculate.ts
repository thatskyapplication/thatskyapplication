import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { t } from "i18next";
import {
	ascendedCandles,
	eventTickets,
	seasonalCandles,
	wingedLight,
} from "../../features/calculate.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("calculate.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "ascended-candles": {
				await ascendedCandles(interaction, options);
				return;
			}
			case "event-tickets": {
				await eventTickets(interaction, options);
				return;
			}
			case "seasonal-candles": {
				await seasonalCandles(interaction, options);
				return;
			}
			case "winged-light": {
				await wingedLight(interaction, options);
				return;
			}
		}
	},
} as const;
