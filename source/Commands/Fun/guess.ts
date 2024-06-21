import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	ApplicationCommandOptionType,
} from "discord.js";
import {
	GUESS_DIFFICULTY_LEVEL_VALUES,
	GuessDifficultyLevel,
	GuessDifficultyLevelToName,
	guess,
	guildLeaderboard,
	leaderboard,
} from "../../Structures/Guess.js";
import { NOT_IN_CACHED_GUILD_RESPONSE } from "../../Utility/Constants.js";
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
				type: ApplicationCommandOptionType.Subcommand,
				name: "game",
				description: "Begin the guessing game!",
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
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "leaderboard",
				description: "View the leaderboard!",
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: "difficulty",
						description: "What difficulty would you like to view?",
						choices: GUESS_DIFFICULTY_LEVEL_VALUES.map((guessDifficultyLevel) => ({
							name: GuessDifficultyLevelToName[guessDifficultyLevel],
							value: guessDifficultyLevel,
						})),
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: "server",
						description: "Scope the leaderboard to your server?",
					},
				],
			},
		],
	} as const satisfies Readonly<ApplicationCommandData>;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "game":
				await this.game(interaction);
				return;
			case "leaderboard":
				await this.leaderboard(interaction);
		}
	}

	private async game(interaction: ChatInputCommandInteraction) {
		const difficulty = interaction.options.getInteger("difficulty") ?? GuessDifficultyLevel.Original;
		await guess(interaction, difficulty, 0);
	}

	private async leaderboard(interaction: ChatInputCommandInteraction) {
		const difficulty = interaction.options.getInteger("difficulty", true);
		const server = interaction.options.getBoolean("server") ?? false;

		if (server) {
			if (interaction.inCachedGuild()) {
				await guildLeaderboard(interaction, difficulty);
			} else {
				await interaction.reply(NOT_IN_CACHED_GUILD_RESPONSE);
			}
		} else {
			await leaderboard(interaction, difficulty);
		}
	}
})();
