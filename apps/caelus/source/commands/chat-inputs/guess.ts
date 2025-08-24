import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { GuessType, type GuessTypes } from "@thatskyapplication/utility";
import { t } from "i18next";
import { guess, guessEvent, leaderboard } from "../../features/guess.js";
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
		const difficulty = options.getInteger("difficulty") as GuessTypes | null;

		switch (difficulty) {
			case GuessType.Events: {
				await guessEvent({ interaction, type: difficulty, streak: 0 });
				return;
			}
			default: {
				await guess(interaction, GuessType.Original, 0);
				return;
			}
		}
	},
	async leaderboard(
		interaction: APIChatInputApplicationCommandInteraction,
		options: OptionResolver,
	) {
		await leaderboard(interaction, options.getInteger("difficulty", true) as GuessTypes);
	},
} as const;
