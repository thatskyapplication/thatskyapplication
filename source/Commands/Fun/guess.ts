import {
	type ButtonInteraction,
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from "discord.js";
import type { ElderSpirit, GuideSpirit, SeasonalSpirit, StandardSpirit } from "../../Structures/Spirits.js";
import { DEFAULT_EMBED_COLOUR } from "../../Utility/Constants.js";
import { COSMETIC_EMOJIS, MISCELLANEOUS_EMOJIS, formatEmoji, formatEmojiURL, type CosmeticEmojis } from "../../Utility/emojis.js";
import { SPIRITS } from "../../catalogue/spirits/index.js";
import pino from "../../pino.js";
import type { ChatInputCommand } from "../index.js";

export const GUESS_ANSWER_1 = "GUESS_ANSWER_1" as const;
export const GUESS_ANSWER_2 = "GUESS_ANSWER_2" as const;
export const GUESS_ANSWER_3 = "GUESS_ANSWER_3" as const;

function getAnswer(): [CosmeticEmojis, StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit] {
	// Get a random emoji as the answer.
	const emoji = COSMETIC_EMOJIS[Math.floor(Math.random() * COSMETIC_EMOJIS.length)]!;

	pino.info(emoji);

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
					}`,
				)
				.setLabel(answer.name)
				.setStyle(ButtonStyle.Primary),
		);

		// Respond.
		await interaction.reply({
			components: [new ActionRowBuilder<ButtonBuilder>().setComponents(buttons)],
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setImage(formatEmojiURL(emoji.id))
					.setTitle("What spirit does this cosmetic come from?"),
			],
		});
	}

	public async answer(interaction: ButtonInteraction) {
		const { customId, message } = interaction;
		const [, answer, guess] = customId.split("§");
		const embed = EmbedBuilder.from(message.embeds[0]!);
		embed.setTitle(answer!);
		let description = `Your guess: ${guess} `;

		if (guess !== answer) {
			description += formatEmoji(MISCELLANEOUS_EMOJIS.No);
			embed.setDescription(description);
			await interaction.update({ components: [], embeds: [embed] });
			return;
		}

		description += formatEmoji(MISCELLANEOUS_EMOJIS.Yes);
		embed.setDescription(description);
		await interaction.update({ components: [], embeds: [embed] });
	}
})();
