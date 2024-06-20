import {
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	type ApplicationCommandData,
	ApplicationCommandOptionType,
} from "discord.js";
import {
	GUESS_DIFFICULTY_LEVEL_VALUES,
	GuessDifficultyLevel,
	GuessDifficultyLevelToName,
	guess,
} from "../../Structures/Guess.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "guess",
		description: "Begin a Sky guessing game! How many can you get right in a row?",
		type: ApplicationCommandType.ChatInput,
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
		options: [
			{
				type: ApplicationCommandOptionType.Integer,
				name: "difficulty",
				description: "Adjust the difficulty level!",
				choices: GUESS_DIFFICULTY_LEVEL_VALUES.map((guessDifficultyLevel) => ({
					name: GuessDifficultyLevelToName[guessDifficultyLevel],
					value: guessDifficultyLevel,
				})),
			},
		],
	} as const satisfies Readonly<ApplicationCommandData>;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const difficulty = interaction.options.getInteger("difficulty") ?? GuessDifficultyLevel.Original;
		await guess(interaction, difficulty, 0);
	}
})();
