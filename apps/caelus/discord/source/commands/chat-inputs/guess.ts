import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { GuessType, type GuessTypes } from "@thatskyapplication/utility";
import { t } from "i18next";
import { guessEvent, guessSpirit, leaderboard } from "../../features/guess.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("guess.command-name", { ns: "commands" }),
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
		const type = options.getInteger("type", true) as GuessTypes;

		switch (type) {
			case GuessType.Spirits:
			case GuessType.SpiritsHard: {
				await guessSpirit({ interaction, type, streak: 0 });
				return;
			}
			case GuessType.Events: {
				await guessEvent({ interaction, type, streak: 0 });
				return;
			}
		}
	},
	async leaderboard(
		interaction: APIChatInputApplicationCommandInteraction,
		options: OptionResolver,
	) {
		await leaderboard(interaction, options.getInteger("type", true) as GuessTypes);
	},
} as const;
