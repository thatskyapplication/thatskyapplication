import {
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIEmbed,
	type APIMessageComponentButtonInteraction,
	ButtonStyle,
	ComponentType,
	type GatewayGuildCreateDispatchData,
	type InteractionsAPI,
	MessageFlags,
	type Snowflake,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import {
	type ElderSpirit,
	GUESS_DIFFICULTY_LEVEL_VALUES,
	GuessDifficultyLevel,
	GuessDifficultyLevelToName,
	type GuideSpirit,
	type SeasonalSpirit,
	type StandardSpirit,
	formatEmoji,
	formatEmojiURL,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { spirits } from "../data/spirits/index.js";
import { ELDER_SPIRITS, STANDARD_SPIRITS } from "../data/spirits/realms/index.js";
import { currentSeasonalSpirits } from "../data/spirits/seasons/index.js";
import ModestDancer from "../data/spirits/seasons/performance/modest-dancer.js";
import { client } from "../discord.js";
import type { GuessPacket } from "../models/Guess.js";
import type { Guild } from "../models/discord/guild.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE,
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
import { getRandomElement, interactionInvoker, isChatInputCommand } from "../utility/functions.js";
import { SPIRIT_COSMETIC_EMOJIS_ARRAY } from "../utility/guess.js";

export function isGuessDifficultyLevel(level: number): level is GuessDifficultyLevel {
	return GUESS_DIFFICULTY_LEVEL_VALUES.includes(level);
}

function getAnswer(): [Snowflake, StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit] {
	// Get a random emoji as the answer.
	const emoji = getRandomElement(SPIRIT_COSMETIC_EMOJIS_ARRAY)!;

	// Find what spirit uses this emoji.
	let spirit: StandardSpirit | SeasonalSpirit | ElderSpirit | GuideSpirit;

	if (emoji === FRIEND_ACTION_EMOJIS.DuetDance.id) {
		// Early exit due to multiple sources.
		spirit = ModestDancer;
	} else {
		spirit = spirits().find((spirit) =>
			(spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
				? spirit.current
				: spirit.items)!.some((item) => CosmeticToEmoji[item.cosmetics[0]!]?.id === emoji),
		)!;
	}

	return [emoji, spirit];
}

function getOptions(difficulty: GuessDifficultyLevel) {
	// Get the answer.
	const [emoji, spirit] = getAnswer();
	pino.info({ emoji, spirit }, "options");
	const foundAnswers = new Set<StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit>();

	// Generate other answers.
	if (difficulty === GuessDifficultyLevel.Original) {
		const filtered = spirits().filter((original) => original.id !== spirit.id);

		while (foundAnswers.size < 2) {
			const randomSpirit = getRandomElement(filtered)!;
			foundAnswers.add(randomSpirit);
		}
	} else {
		let filtered: (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[];

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
			const randomSpirit = getRandomElement(filtered)!;
			foundAnswers.add(randomSpirit);
		}
	}

	return {
		answer: spirit,
		emoji,
		options: [spirit, ...foundAnswers].sort(() => Math.random() - 0.5),
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
		custom_id: `${index === 0 ? GUESS_ANSWER_1 : index === 1 ? GUESS_ANSWER_2 : GUESS_ANSWER_3}§${answer.id}§${option.id}§${difficulty}§${streak}§${timeoutTimestamp}`,
		label: t(`spirits.${option.id}`, { lng: interaction.locale, ns: "general" }),
		style: ButtonStyle.Secondary,
	}));

	const endGameButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${GUESS_END_GAME}§${answer.id}§null§${difficulty}§${streak}§${timeoutTimestamp}`,
		label: "End Game",
		style: ButtonStyle.Danger,
	};

	// Retrieve the highest streak.
	const invoker = interactionInvoker(interaction);
	const highestStreak = await pg<GuessPacket>(Table.Guess).where({ user_id: invoker.id });
	const difficultyString = GuessDifficultyLevelToName[difficulty];
	const streakString = highestStreak[0]?.[GuessDifficultyToStreakColumn[difficulty]] ?? 0;

	// Respond.
	const response:
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [
			{
				type: ComponentType.ActionRow,
				components: buttons,
			},
			{
				type: ComponentType.ActionRow,
				components: [endGameButton],
			},
		],
		content: "",
		embeds: [
			{
				color: DEFAULT_EMBED_COLOUR,
				description: `Guess <t:${Math.floor(timeoutTimestamp / 1_000)}:R>!`,
				footer: {
					text: `Difficulty: ${difficultyString} | Streak: ${streak} | Highest: ${streakString}`,
				},
				image: { url: formatEmojiURL(emoji as `${bigint}`) },
				title: "Where does this come from?",
			},
		],
	};

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}

function tryAgainComponent(difficulty: GuessDifficultyLevel): APIButtonComponentWithCustomId {
	return {
		type: ComponentType.Button,
		custom_id: `${GUESS_TRY_AGAIN}§${difficulty}`,
		label: "Try Again?",
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
		await client.api.interactions.updateMessage(interaction.id, interaction.token, ERROR_RESPONSE);
		return;
	}

	if (Date.now() > parsedTimeoutTimestamp) {
		await update(parsedDifficulty, invoker.id, parsedStreak, interaction.guild_id);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.ActionRow,
					components: [tryAgainComponent(parsedDifficulty)],
				},
			],
			content: "Too late!",
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
		await client.api.interactions.updateMessage(interaction.id, interaction.token, ERROR_RESPONSE);
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
	const { locale, message } = interaction;
	let description: string;

	if (interaction.data.custom_id.startsWith(GUESS_END_GAME)) {
		description = "Game ended.";
	} else {
		description = `Your guess: ${t(`spirits.${guess}`, {
			lng: locale,
			ns: "general",
		})} ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}`;
	}

	const embed = {
		...message.embeds[0]!,
		description,
		title: t(`spirits.${answer}`, { lng: locale, ns: "general" }),
	};

	const invoker = interactionInvoker(interaction);
	await update(difficulty, invoker.id, streak, interaction.guild_id);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [tryAgainComponent(difficulty)],
			},
		],
		embeds: [embed],
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
		await client.api.interactions.updateMessage(interaction.id, interaction.token, ERROR_RESPONSE);
		return;
	}

	await guess(interaction, difficulty, 0);
}

async function update(
	difficulty: GuessDifficultyLevel,
	userId: Snowflake,
	streak: number,
	guildId: Snowflake | undefined,
) {
	const column = GuessDifficultyToStreakColumn[difficulty];

	await pg<GuessPacket>(Table.Guess)
		.insert({
			user_id: userId,
			[column]: streak,
			// @ts-expect-error https://github.com/knex/knex/issues/5465
			guild_ids: JSON.stringify(guildId ? [guildId] : []),
		})
		.onConflict("user_id")
		.merge({
			[column]: streak,
			guild_ids: guildId
				? pg.raw(
						`
							CASE
								WHEN NOT EXISTS (
									SELECT 1
									FROM jsonb_array_elements_text(${Table.Guess}.guild_ids) AS element
									WHERE element = ?
								)
								THEN ${Table.Guess}.guild_ids || ?::jsonb
								ELSE ${Table.Guess}.guild_ids
							END
						`,
						[guildId, JSON.stringify([guildId])],
					)
				: pg.raw(`${Table.Guess}.guild_ids`),
		})
		.where(`${Table.Guess}.${[column]}`, "<", streak)
		.orWhere(`${Table.Guess}.${[column]}`, "is", null);
}

export async function updateGuildIds(userId: Snowflake, guildId: Snowflake) {
	await pg<GuessPacket>(Table.Guess)
		.update({ guild_ids: pg.raw("guild_ids || ?::jsonb", [JSON.stringify(guildId)]) })
		.where({ user_id: userId });
}

export async function removeGuildId(userId: Snowflake, guildId: Snowflake) {
	await pg<GuessPacket>(Table.Guess)
		.update({
			guild_ids: pg.raw(
				`COALESCE((SELECT jsonb_agg(element) FROM jsonb_array_elements(??) AS element WHERE element != to_jsonb(?::text)), '[]'::jsonb)`,
				[`${Table.Guess}.guild_ids`, guildId],
			),
		})
		.where({ user_id: userId });
}

export async function handleGuildCreate(guild: GatewayGuildCreateDispatchData) {
	const userIds = (await pg<GuessPacket>(Table.Guess).select("user_id")).map((row) => row.user_id);

	const requestedGuildMembers = await client.requestGuildMembers({
		guild_id: guild.id,
		user_ids: userIds,
	});

	const data = requestedGuildMembers.members.reduce<Record<Snowflake, Snowflake>>(
		(data, member) => {
			data[member.user.id] = guild.id;
			return data;
		},
		{},
	);

	const userGuildData = Object.entries(data).map(([user_id, guild_id]) => ({
		user_id,
		guild_id,
	}));

	if (userGuildData.length === 0) {
		return;
	}

	await pg.raw(`
		WITH updated_data (user_id, guild_id) AS (
			VALUES ${userGuildData.map(({ user_id, guild_id }) => `('${user_id}', '${guild_id}')`).join(", ")}
		)
		UPDATE ${Table.Guess}
		SET guild_ids = guild_ids || to_jsonb(updated_data.guild_id::text)
		FROM updated_data
		WHERE ${Table.Guess}.user_id = updated_data.user_id;
	`);
}

export async function handleGuildRemove(guildId: Snowflake) {
	await pg.raw(
		`
		WITH affected_rows AS (
			SELECT user_id, guild_ids
			FROM ${Table.Guess}
			WHERE guild_ids @> to_jsonb(?::text)
		)
		UPDATE ${Table.Guess}
		SET guild_ids = COALESCE(
			(
				SELECT jsonb_agg(element)
				FROM jsonb_array_elements_text(affected_rows.guild_ids) AS element
				WHERE element != ?
			),
			'[]'::jsonb
		)
		FROM affected_rows
		WHERE ${Table.Guess}.user_id = affected_rows.user_id
		`,
		[guildId, guildId],
	);
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

	const embed: APIEmbed = {
		color: DEFAULT_EMBED_COLOUR,
		description: guessPacketsLeaderboard
			.map((row) => `${row.rank}. <@${row.user_id}>: ${row[column]}`)
			.join("\n"),
		title: `${GuessDifficultyLevelToName[difficulty]} Leaderboard`,
	};

	if (guessPacketInvoker) {
		embed.footer = {
			text: `You: #${guessPacketInvoker[`${column}_rank`]} (${guessPacketInvoker[column]})`,
		};
	}

	const response:
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [
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
		],
		embeds: [embed],
	};

	if (isChatInput) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}

export async function guildLeaderboard(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	guild: Guild,
	difficulty: GuessDifficultyLevel,
) {
	const column = GuessDifficultyToStreakColumn[difficulty];

	const results = await pg(Table.Guess)
		.where(pg.raw("guild_ids @> ?", [JSON.stringify([guild.id])]))
		.and.whereNotNull(column)
		.orderBy(column, "desc");

	if (results.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "No one in this server has played this game yet!",
		});

		return;
	}

	const invokerId = interaction.member.user.id;
	const you = results.findIndex((row) => row.user_id === invokerId);

	await client.api.interactions.reply(interaction.id, interaction.token, {
		embeds: [
			{
				description: results
					.slice(0, 10)
					.map((row, index) => `${index + 1}. <@${row.user_id}>: ${row[column]}`)
					.join("\n"),
				color: DEFAULT_EMBED_COLOUR,
				footer: {
					text: `${guild.name}${you === -1 ? "" : ` | You: #${you + 1} (${results[you]![column]})`}`,
				},
				title: `${GuessDifficultyLevelToName[difficulty]} Leaderboard`,
			},
		],
	});
}
