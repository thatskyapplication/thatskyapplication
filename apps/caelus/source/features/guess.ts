import type { Collection } from "@discordjs/collection";
import {
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIContainerComponent,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	type Locale,
	MessageFlags,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import {
	currentSeasonalSpirits,
	ELDER_SPIRITS,
	type ElderSpirit,
	formatEmoji,
	formatEmojiURL,
	GUESS_DIFFICULTY_LEVEL_VALUES,
	GuessDifficultyLevel,
	GuessDifficultyLevelToName,
	type GuideSpirit,
	getRandomElement,
	type SeasonalSpirit,
	SpiritId,
	type SpiritIds,
	STANDARD_SPIRITS,
	type StandardSpirit,
	spirits,
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import pg from "../pg.js";
import {
	DEFAULT_EMBED_COLOUR,
	GUESS_ANSWER_1,
	GUESS_ANSWER_2,
	GUESS_ANSWER_3,
	GUESS_END_GAME,
	GUESS_LEADERBOARD_BACK_CUSTOM_ID,
	GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER,
	GUESS_LEADERBOARD_NEXT_CUSTOM_ID,
	GUESS_TIMEOUT,
	GUESS_TRY_AGAIN,
} from "../utility/constants.js";
import { CosmeticToEmoji, FRIEND_ACTION_EMOJIS, MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker, isChatInputCommand } from "../utility/functions.js";
import { SPIRIT_COSMETIC_EMOJIS_ARRAY } from "../utility/guess.js";

export interface GuessPacket {
	user_id: string;
	streak: number | null;
	type: GuessDifficultyLevel;
}

type GuessUserRanking = GuessPacket & { streak: number; rank: number };

export function isGuessDifficultyLevel(level: number): level is GuessDifficultyLevel {
	return GUESS_DIFFICULTY_LEVEL_VALUES.includes(level);
}

function getAnswer(): [Snowflake, SpiritIds] {
	// Get a random emoji as the answer.
	const emoji = getRandomElement(SPIRIT_COSMETIC_EMOJIS_ARRAY)!;

	// Find what spirit uses this emoji.
	let spiritId: SpiritIds;

	if (emoji === FRIEND_ACTION_EMOJIS.DuetDance.id) {
		// Early exit due to multiple sources.
		spiritId = SpiritId.ModestDancer;
	} else {
		spiritId = spirits().find((spirit) =>
			(spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
				? spirit.current
				: spirit.items
			).some((items) =>
				items.some((item) => item && CosmeticToEmoji[item.cosmetics[0]]?.id === emoji),
			),
		)!.id;
	}

	return [emoji, spiritId];
}

function getOptions(difficulty: GuessDifficultyLevel) {
	// Get the answer.
	const [emoji, spiritId] = getAnswer();
	const foundAnswers = new Set<SpiritIds>();

	// Generate other answers.
	if (difficulty === GuessDifficultyLevel.Original) {
		const filtered = spirits().clone();
		filtered.delete(spiritId);

		while (foundAnswers.size < 2) {
			const randomSpirit = filtered.random()!;
			foundAnswers.add(randomSpirit.id);
		}
	} else {
		const spirit = spirits().get(spiritId)!;

		let filtered: Collection<
			SpiritIds,
			StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit
		>;

		// Collect spirits from the same realm or season.
		if (spirit.isStandardSpirit()) {
			filtered = STANDARD_SPIRITS.filter(
				(original) => original.id !== spirit.id && original.realm === spirit.realm,
			);
		} else if (spirit.isElderSpirit()) {
			filtered = ELDER_SPIRITS.filter((original) => original.id !== spirit.id);
		} else {
			filtered = currentSeasonalSpirits().filter(
				(original) => original.id !== spirit.id && original.seasonId === spirit.seasonId,
			);
		}

		while (foundAnswers.size < 2) {
			const randomSpirit = filtered.random()!;
			foundAnswers.add(randomSpirit.id);
		}
	}

	return {
		answer: spiritId,
		emoji,
		options: [spiritId, ...foundAnswers].sort(() => Math.random() - 0.5),
	};
}

export async function guess(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	difficulty: GuessDifficultyLevel,
	streak: number,
) {
	const { answer, emoji, options } = getOptions(difficulty);

	// Set the timeout timestamp.
	const timeoutTimestamp = DiscordSnowflake.timestampFrom(interaction.id) + GUESS_TIMEOUT;

	// Create buttons from the answers.
	const buttons: APIButtonComponentWithCustomId[] = options.map((option, index) => ({
		type: ComponentType.Button,
		custom_id: `${index === 0 ? GUESS_ANSWER_1 : index === 1 ? GUESS_ANSWER_2 : GUESS_ANSWER_3}§${answer}§${option}§${difficulty}§${streak}§${timeoutTimestamp}`,
		label: t(`spirits.${option}`, { lng: interaction.locale, ns: "general" }),
		style: ButtonStyle.Secondary,
	}));

	const endGameButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${GUESS_END_GAME}§${answer}§null§${difficulty}§${streak}§${timeoutTimestamp}`,
		label: t("guess.end-game", { lng: interaction.locale, ns: "features" }),
		style: ButtonStyle.Danger,
	};

	// Retrieve the highest streak.
	const invoker = interactionInvoker(interaction);

	const highestStreak =
		(
			await pg<GuessPacket>(Table.Guess)
				.select("streak")
				.where({ user_id: invoker.id, type: difficulty })
				.first()
		)?.streak ?? 0;

	// Respond.
	const components: [APIMessageTopLevelComponent] = [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `## ${t("guess.title", { lng: interaction.locale, ns: "features" })}`,
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: t("guess.guess-in", {
						lng: interaction.locale,
						ns: "features",
						time: `<t:${Math.floor(timeoutTimestamp / 1_000)}:R>`,
					}),
				},
				{
					type: ComponentType.MediaGallery,
					items: [
						{
							media: {
								url: formatEmojiURL(emoji as `${bigint}`),
								height: 64,
								width: 64,
							},
						},
					],
				},
				{
					type: ComponentType.ActionRow,
					components: buttons,
				},
				{
					type: ComponentType.ActionRow,
					components: [endGameButton],
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: `-# Difficulty: ${GuessDifficultyLevelToName[difficulty]} | Streak: ${streak} | Highest: ${highestStreak}`,
				},
			],
		},
	];

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components,
			flags: MessageFlags.IsComponentsV2,
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, { components });
	}
}

function tryAgainComponent(
	difficulty: GuessDifficultyLevel,
	locale: Locale,
): APIButtonComponentWithCustomId {
	return {
		type: ComponentType.Button,
		custom_id: `${GUESS_TRY_AGAIN}§${difficulty}`,
		label: t("guess.try-again", { lng: locale, ns: "features" }),
		style: ButtonStyle.Primary,
	};
}

export async function answer(interaction: APIMessageComponentButtonInteraction) {
	const { message } = interaction;
	const invoker = interactionInvoker(interaction);

	if (message.interaction_metadata!.user.id !== invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "You didn't start this game!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const [, answer, guessedAnswer, difficulty, streak, timeoutTimestamp] =
		interaction.data.custom_id.split("§");

	const parsedDifficulty = Number(difficulty);
	const parsedStreak = Number(streak);
	const parsedTimeoutTimestamp = Number(timeoutTimestamp);

	if (!isGuessDifficultyLevel(parsedDifficulty)) {
		throw new Error(`Invalid guessing game difficulty level: ${difficulty}`);
	}

	if (Date.now() > parsedTimeoutTimestamp) {
		await update(parsedDifficulty, invoker.id, parsedStreak);

		(interaction.message.components![0]! as APIContainerComponent).components.splice(2, 1, {
			type: ComponentType.TextDisplay,
			content: "Too late!",
		});

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: interaction.message.components,
		});

		return;
	}

	if (guessedAnswer !== answer) {
		await endGame(interaction, answer!, guessedAnswer!, parsedDifficulty, parsedStreak);
		return;
	}

	await guess(interaction, parsedDifficulty, parsedStreak + 1);
}

export async function parseEndGame(interaction: APIMessageComponentButtonInteraction) {
	const { message } = interaction;
	const invoker = interactionInvoker(interaction);

	if (message.interaction_metadata!.user.id !== invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "You didn't start this game!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const [, answer, guess, rawDifficulty, rawStreak] = interaction.data.custom_id.split("§");
	const difficulty = Number(rawDifficulty);

	if (!isGuessDifficultyLevel(difficulty)) {
		throw new Error(`Invalid guessing game difficulty level: ${rawDifficulty}`);
	}

	const streak = Number(rawStreak);
	await endGame(interaction, answer!, guess!, difficulty, streak);
}

async function endGame(
	interaction: APIMessageComponentButtonInteraction,
	answer: string,
	guess: string,
	difficulty: GuessDifficultyLevel,
	streak: number,
) {
	const { locale } = interaction;
	let description: string;

	if (interaction.data.custom_id.startsWith(GUESS_END_GAME)) {
		description = t("guess.game-ended", { lng: locale, ns: "features" });
	} else {
		description = `${t("guess.your-guess", { lng: locale, ns: "features" })}: ${t(
			`spirits.${guess}`,
			{
				lng: locale,
				ns: "general",
			},
		)} ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}`;
	}

	const invoker = interactionInvoker(interaction);
	await update(difficulty, invoker.id, streak);

	(interaction.message.components![0]! as APIContainerComponent).components.splice(2, 1, {
		type: ComponentType.TextDisplay,
		content: `### ${t(`spirits.${answer}`, { lng: locale, ns: "general" })}\n${description}`,
	});

	(interaction.message.components![0]! as APIContainerComponent).components.splice(4, 2, {
		type: ComponentType.ActionRow,
		components: [tryAgainComponent(difficulty, locale)],
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: interaction.message.components,
	});
}

export async function tryAgain(interaction: APIMessageComponentButtonInteraction) {
	const { message } = interaction;
	const invoker = interactionInvoker(interaction);

	if (message.interaction_metadata!.user.id !== invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "You didn't start this game!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const customId = interaction.data.custom_id;
	const difficulty = Number(customId.slice(customId.indexOf("§") + 1));

	if (!isGuessDifficultyLevel(difficulty)) {
		throw new Error(`Invalid guessing game difficulty level: ${difficulty}`);
	}

	await guess(interaction, difficulty, 0);
}

async function update(difficulty: GuessDifficultyLevel, userId: Snowflake, streak: number) {
	await pg<GuessPacket>(Table.Guess)
		.insert({ user_id: userId, streak, type: difficulty })
		.onConflict(["user_id", "type"])
		.merge()
		.where(`${Table.Guess}.streak`, "<", streak)
		.orWhere(`${Table.Guess}.streak`, "is", null);
}

export async function findUser(userId: Snowflake, type: number) {
	const result = await pg
		.select<GuessUserRanking>()
		.from(
			pg(Table.Guess)
				.select(
					"user_id",
					"type",
					"streak",
					pg.raw("row_number() over (partition by type order by streak desc)::int as rank"),
				)
				.where("streak", ">", 0),
		)
		.where({ user_id: userId, type })
		.first();

	return result;
}

export async function leaderboard(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	difficulty: GuessDifficultyLevel,
) {
	const { locale } = interaction;
	const isChatInput = isChatInputCommand(interaction);

	const page = isChatInput
		? 1
		: Number(interaction.data.custom_id.slice(interaction.data.custom_id.lastIndexOf("§") + 1));

	const offset = (page - 1) * GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER;

	const guessPacketsLeaderboard = await pg(Table.Guess)
		.select<(GuessPacket & { streak: number; rank: number })[]>(
			"user_id",
			"type",
			"streak",
			pg.raw("row_number() over (partition by type order by streak desc)::int as rank"),
		)
		.where({ type: difficulty })
		.where("streak", ">", 0)
		.orderBy("rank")
		.limit(GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER + 1)
		.offset(offset);

	if (guessPacketsLeaderboard.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "There is nothing on the leaderboard. Why not be the first?",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const hasPreviousPage = offset > 0;
	const hasNextPage = guessPacketsLeaderboard.length > GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER;

	if (hasNextPage) {
		guessPacketsLeaderboard.pop();
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${GuessDifficultyLevelToName[difficulty]} Leaderboard`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: guessPacketsLeaderboard
				.map((row) => `${row.rank}. <@${row.user_id}>: ${row.streak}`)
				.join("\n"),
		},
	];

	const guessPacketInvoker = await findUser(interactionInvoker(interaction).id, difficulty);

	if (guessPacketInvoker) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `-# You: #${guessPacketInvoker.rank} (${guessPacketInvoker.streak!})`,
		});
	}

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${GUESS_LEADERBOARD_BACK_CUSTOM_ID}§${difficulty}§${page - 1}`,
					disabled: !hasPreviousPage,
					emoji: { name: "⬅️" },
					label: t("navigation-back", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${GUESS_LEADERBOARD_NEXT_CUSTOM_ID}§${difficulty}§${page + 1}`,
					disabled: !hasNextPage,
					emoji: { name: "➡️" },
					label: t("navigation-next", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	const components: [APIMessageTopLevelComponent] = [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: containerComponents,
		},
	];

	if (isChatInput) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			allowed_mentions: { parse: [] },
			components,
			flags: MessageFlags.IsComponentsV2,
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			allowed_mentions: { parse: [] },
			components,
		});
	}
}
