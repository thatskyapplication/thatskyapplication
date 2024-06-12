import {
	type ChatInputCommandInteraction,
	ButtonInteraction,
	ApplicationCommandType,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	MessageFlags,
} from "discord.js";
import { t } from "i18next";
import type { ElderSpirit, GuideSpirit, SeasonalSpirit, StandardSpirit } from "../../Structures/Spirits.js";
import { DEFAULT_EMBED_COLOUR } from "../../Utility/Constants.js";
import {
	type CosmeticEmojis,
	COSMETIC_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	formatEmoji,
	formatEmojiURL,
} from "../../Utility/emojis.js";
import { SPIRITS } from "../../catalogue/spirits/index.js";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand } from "../index.js";

interface GuessPacket {
	user_id: string;
	streak: number;
}

export const GUESS_ANSWER_1 = "GUESS_ANSWER_1" as const;
export const GUESS_ANSWER_2 = "GUESS_ANSWER_2" as const;
export const GUESS_ANSWER_3 = "GUESS_ANSWER_3" as const;

function getAnswer(): [CosmeticEmojis, StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit] {
	// Get a random emoji as the answer.
	const emoji = COSMETIC_EMOJIS[Math.floor(Math.random() * COSMETIC_EMOJIS.length)]!;

	// Find what spirit uses this emoji.
	const spirit = SPIRITS.find(
		(spirit) =>
			(spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
				? spirit.current
				: spirit.current ?? spirit.seasonal
			)?.some((item) => item.emoji.id === emoji.id),
	);

	// No spirit may have this emoji. Run this again, if so.
	return spirit ? [emoji, spirit] : getAnswer();
}

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "guess",
		description: "Guessing game!",
		type: ApplicationCommandType.ChatInput,
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		await this.guess(interaction, 0);
	}

	private async guess(interaction: ButtonInteraction | ChatInputCommandInteraction, streak: number) {
		const [emoji, spirit] = getAnswer();

		// Use 2 others spirits as answers.
		let filteredSpirits = SPIRITS.filter((originalSpirit) => originalSpirit.name !== spirit.name);
		const answer2 = filteredSpirits[Math.floor(Math.random() * filteredSpirits.length)]!;
		filteredSpirits = filteredSpirits.filter((originalSpirit) => originalSpirit.name !== answer2.name);
		const answer3 = filteredSpirits[Math.floor(Math.random() * filteredSpirits.length)]!;

		// Shuffle the answers.
		const answers = [spirit, answer2, answer3].sort(() => Math.random() - 0.5);

		// Create buttons from the answers.
		const buttons = answers.map((answer, index) =>
			new ButtonBuilder()
				.setCustomId(
					`${index === 0 ? GUESS_ANSWER_1 : index === 1 ? GUESS_ANSWER_2 : GUESS_ANSWER_3}§${spirit.name}§${
						answer.name
					}§${streak}`,
				)
				.setLabel(t(`spiritNames.${answer.name}`, { lng: interaction.locale, ns: "general" }))
				.setStyle(ButtonStyle.Primary),
		);

		// Retrieve the highest streak.
		const highestStreak = await pg<GuessPacket>(Table.Guess).where({ user_id: interaction.user.id });

		// Respond.
		const response = {
			components: [new ActionRowBuilder<ButtonBuilder>().setComponents(buttons)],
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setFooter({ text: `Streak: ${streak}\nHighest: ${highestStreak[0]?.streak ?? 0}` })
					.setImage(formatEmojiURL(emoji.id))
					.setTitle("What spirit does this cosmetic come from?"),
			],
		};

		if (interaction instanceof ButtonInteraction) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}

	public async answer(interaction: ButtonInteraction) {
		const { customId, locale, message, user } = interaction;

		if (message.interaction!.user.id !== user.id) {
			await interaction.reply({ content: "You didn't start this game!", flags: MessageFlags.Ephemeral });
			return;
		}

		const [, answer, guess, streak] = customId.split("§");
		const parsedStreak = Number(streak);
		const embed = EmbedBuilder.from(message.embeds[0]!);
		embed.setTitle(t(`spiritNames.${answer}`, { lng: locale, ns: "general" }));
		let description = `Your guess: ${t(`spiritNames.${guess}`, { lng: locale, ns: "general" })} `;

		if (guess !== answer) {
			description += formatEmoji(MISCELLANEOUS_EMOJIS.No);
			embed.setDescription(description);

			await pg<GuessPacket>(Table.Guess)
				.insert({ user_id: user.id, streak: parsedStreak })
				.onConflict("user_id")
				.merge(["streak"])
				.where(`${Table.Guess}.streak`, "<", parsedStreak);

			await interaction.update({ components: [], embeds: [embed] });
			return;
		}

		await this.guess(interaction, parsedStreak + 1);
	}
})();
