import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { SEASONAL_CANDLES_PER_DAY, SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "seasonal-candle";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const start = options.getInteger("start", true);
		const goal = options.getInteger("goal", true);

		if (start >= goal) {
			await interaction.reply({
				content: "The goal has already been achieved.",
				ephemeral: true,
			});

			return;
		}

		const amountRequired = goal - start;
		const amountRequiredString = `${amountRequired} seasonal candle${amountRequired === 1 ? "" : "s"}`;
		const resultWithoutSeasonPass = Math.ceil(amountRequired / SEASONAL_CANDLES_PER_DAY);
		const resultWithoutSeasonPassString = `${resultWithoutSeasonPass} day${resultWithoutSeasonPass === 1 ? "" : "s"}`;
		const resultWithSeasonPass = Math.ceil(amountRequired / SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS);
		const resultWithSeasonPassString = `${resultWithSeasonPass} day${resultWithSeasonPass === 1 ? "" : "s"}`;
		await interaction.reply(`Start: ${start}\nGoal: ${goal}\n\nIt would take ${resultWithoutSeasonPassString} to receive ${amountRequiredString}.\nWith a Season Pass, it would take ${resultWithSeasonPassString} to receive ${amountRequiredString}.`);
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "A calculator for seasonal candles.",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.Integer,
					name: "start",
					description: "The starting number of seasonal candles.",
					minValue: 0,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: "goal",
					description: "The desired number of seasonal candles.",
					minValue: 0,
					required: true,
				},
			],
		};
	}
}
