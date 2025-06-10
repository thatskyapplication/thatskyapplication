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
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import type { GuessPacket } from "../models/Guess.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE_COMPONENTS_V2,
	GUESS_ANSWER_1,
	GUESS_ANSWER_2,
	GUESS_ANSWER_3,
	GUESS_END_GAME,
	GUESS_LEADERBOARD_BACK_CUSTOM_ID,
	GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER,
	GUESS_LEADERBOARD_NEXT_CUSTOM_ID,
	GUESS_TIMEOUT,
	GUESS_TRY_AGAIN,
	GuessDifficultyToStreakColumn,
} from "../utility/constants.js";
import { CosmeticToEmoji, FRIEND_ACTION_EMOJIS, MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker, isChatInputCommand } from "../utility/functions.js";
import { SPIRIT_COSMETIC_EMOJIS_ARRAY } from "../utility/guess.js";

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
			).some((item) => CosmeticToEmoji[item.cosmetics[0]]?.id === emoji),
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
	const highestStreak = await pg<GuessPacket>(Table.Guess).where({ user_id: invoker.id });
	const difficultyString = GuessDifficultyLevelToName[difficulty];
	const streakString = highestStreak[0]?.[GuessDifficultyToStreakColumn[difficulty]] ?? 0;

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
					content: `-# Difficulty: ${difficultyString} | Streak: ${streak} | Highest: ${streakString}`,
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
		pino.warn(interaction, `Invalid guessing game difficulty level: ${difficulty}`);
		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);
		return;
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
		pino.warn(interaction, `Invalid guessing game difficulty level: ${rawDifficulty}`);
		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);
		return;
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
		pino.warn(interaction, `Invalid guessing game difficulty level: ${difficulty}`);
		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);
		return;
	}

	await guess(interaction, difficulty, 0);
}

async function update(difficulty: GuessDifficultyLevel, userId: Snowflake, streak: number) {
	const column = GuessDifficultyToStreakColumn[difficulty];

	await pg<GuessPacket>(Table.Guess)
		.insert({
			user_id: userId,
			[column]: streak,
		})
		.onConflict("user_id")
		.merge({ [column]: streak })
		.where(`${Table.Guess}.${[column]}`, "<", streak)
		.orWhere(`${Table.Guess}.${[column]}`, "is", null);
}

export async function findUser(userId: Snowflake) {
	const originalColumn = GuessDifficultyToStreakColumn[GuessDifficultyLevel.Original];
	const hardColumn = GuessDifficultyToStreakColumn[GuessDifficultyLevel.Hard];

	const [result] = (await pg
		.with(
			"streak_ranking",
			pg(Table.Guess)
				.select(
					"user_id",
					originalColumn,
					pg.raw(`row_number() over (order by ${originalColumn} desc) ::int as streak_rank`),
				)
				.whereNotNull(originalColumn),
		)
		.with(
			"streak_hard_ranking",
			pg(Table.Guess)
				.select(
					"user_id",
					hardColumn,
					pg.raw(`row_number() over (order by ${hardColumn} desc) ::int as streak_hard_rank`),
				)
				.whereNotNull(hardColumn),
		)
		.select(
			"streak_ranking.streak",
			"streak_ranking.streak_rank",
			"streak_hard_ranking.streak_hard",
			"streak_hard_ranking.streak_hard_rank",
		)
		.from("streak_ranking")
		.join("streak_hard_ranking", "streak_ranking.user_id", "=", "streak_hard_ranking.user_id")
		.where("streak_ranking.user_id", userId)) as {
		streak: number;
		streak_rank: number;
		streak_hard: number;
		streak_hard_rank: number;
	}[];

	return result;
}

export async function leaderboard(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	difficulty: GuessDifficultyLevel,
) {
	const isChatInput = isChatInputCommand(interaction);

	const page = isChatInput
		? 1
		: Number(interaction.data.custom_id.slice(interaction.data.custom_id.lastIndexOf("§") + 1));

	const offset = (page - 1) * GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER;
	const column = GuessDifficultyToStreakColumn[difficulty];

	const guessPacketsLeaderboard = await pg
		.with(
			"ranked_data",
			pg(Table.Guess)
				.select("user_id", column, pg.raw(`row_number() over (order by ${column} desc) as rank`))
				.whereNotNull(column),
		)
		.select("user_id", column, "rank")
		.from("ranked_data")
		.orderBy("rank")
		.limit(GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER + 1)
		.offset(offset);

	const guessPacketInvoker = await findUser(interactionInvoker(interaction).id);

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
				.map((row) => `${row.rank}. <@${row.user_id}>: ${row[column]}`)
				.join("\n"),
		},
	];

	if (guessPacketInvoker) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `-# You: #${guessPacketInvoker[`${column}_rank`]} (${guessPacketInvoker[column]})`,
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
					label: "Back",
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${GUESS_LEADERBOARD_NEXT_CUSTOM_ID}§${difficulty}§${page + 1}`,
					disabled: !hasNextPage,
					emoji: { name: "➡️" },
					label: "Next",
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
