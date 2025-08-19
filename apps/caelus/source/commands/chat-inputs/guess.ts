import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { GuessType } from "@thatskyapplication/utility";
import { t } from "i18next";
import { guess, leaderboard } from "../../features/guess.js";
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
		const difficulty = options.getInteger("difficulty") ?? GuessType.Original;
		await guess(interaction, difficulty, 0);
	},
	async leaderboard(
		interaction: APIChatInputApplicationCommandInteraction,
		options: OptionResolver,
	) {
		await leaderboard(interaction, options.getInteger("difficulty", true));
	},
} as const;
