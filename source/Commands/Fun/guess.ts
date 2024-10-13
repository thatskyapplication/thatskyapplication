import type { ChatInputCommandInteraction } from "discord.js";
import { guess, guildLeaderboard, leaderboard } from "../../Structures/Guess.js";
import { GuessDifficultyLevel, NOT_IN_CACHED_GUILD_RESPONSE } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly name = "guess";

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "game": {
				await this.game(interaction);
				return;
			}
			case "leaderboard": {
				await this.leaderboard(interaction);
			}
		}
	}

	private async game(interaction: ChatInputCommandInteraction) {
		if (interaction.inRawGuild()) {
			await interaction.reply(NOT_IN_CACHED_GUILD_RESPONSE);
			return;
		}

		const difficulty =
			interaction.options.getInteger("difficulty") ?? GuessDifficultyLevel.Original;

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
