import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { GUILD_CACHE } from "../../caches/guilds.js";
import { client } from "../../discord.js";
import { guess, guildLeaderboard, leaderboard } from "../../services/guess.js";
import { GuessDifficultyLevel, NOT_IN_CACHED_GUILD_RESPONSE } from "../../utility/constants.js";
import { isGuildChatInputCommand } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("guess.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "game": {
				await this.game(interaction, options);
				return;
			}
			case "leaderboard": {
				await this.leaderboard(interaction, options);
			}
		}
	},
	async game(interaction: APIChatInputApplicationCommandInteraction, options: OptionResolver) {
		if (!(isGuildChatInputCommand(interaction) && GUILD_CACHE.get(interaction.guild_id))) {
			await client.api.interactions.reply(
				interaction.id,
				interaction.token,
				NOT_IN_CACHED_GUILD_RESPONSE,
			);

			return;
		}

		const difficulty = options.getInteger("difficulty") ?? GuessDifficultyLevel.Original;
		await guess(interaction, difficulty, 0);
	},
	async leaderboard(
		interaction: APIChatInputApplicationCommandInteraction,
		options: OptionResolver,
	) {
		const difficulty = options.getInteger("difficulty", true);
		const server = options.getBoolean("server") ?? false;

		if (server) {
			if (isGuildChatInputCommand(interaction) && GUILD_CACHE.get(interaction.guild_id)) {
				await guildLeaderboard(interaction, difficulty);
			} else {
				await client.api.interactions.reply(
					interaction.id,
					interaction.token,
					NOT_IN_CACHED_GUILD_RESPONSE,
				);
			}
		} else {
			await leaderboard(interaction, difficulty);
		}
	},
} as const;
