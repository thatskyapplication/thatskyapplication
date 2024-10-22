import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	type ChatInputCommandInteraction,
	EmbedBuilder,
	type Guild,
	MessageFlags,
	type Snowflake,
	TimestampStyles,
	time,
} from "discord.js";
import { t } from "i18next";
import { spirits } from "../data/spirits/index.js";
import { ELDER_SPIRITS, STANDARD_SPIRITS } from "../data/spirits/realms/index.js";
import { currentSeasonalSpirits } from "../data/spirits/seasons/index.js";
import ModestDancer from "../data/spirits/seasons/performance/modest-dancer.js";
import type { GuessPacket } from "../models/Guess.js";
import type {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	StandardSpirit,
} from "../models/Spirits.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE,
	GUESS_ANSWER_1,
	GUESS_ANSWER_2,
	GUESS_ANSWER_3,
	GUESS_DIFFICULTY_LEVEL_VALUES,
	GUESS_END_GAME,
	GUESS_LEADERBOARD_BACK_CUSTOM_ID,
	GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER,
	GUESS_LEADERBOARD_NEXT_CUSTOM_ID,
	GUESS_TIMEOUT,
	GUESS_TRY_AGAIN,
	GuessDifficultyLevel,
	GuessDifficultyLevelToName,
	GuessDifficultyToStreakColumn,
} from "../utility/constants.js";
import {
	COSMETIC_EMOJIS,
	type CosmeticEmojis,
	FRIEND_ACTION_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	formatEmoji,
	formatEmojiURL,
} from "../utility/emojis.js";
import { getRandomElement } from "../utility/functions.js";

export function isGuessDifficultyLevel(level: number): level is GuessDifficultyLevel {
	return GUESS_DIFFICULTY_LEVEL_VALUES.includes(level);
}

function getAnswer(): [
	CosmeticEmojis,
	StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
] {
	// Get a random emoji as the answer.
	const emoji = getRandomElement(COSMETIC_EMOJIS)!;

	// Find what spirit uses this emoji.
	let spirit: StandardSpirit | SeasonalSpirit | ElderSpirit | GuideSpirit | undefined;

	if (emoji === FRIEND_ACTION_EMOJIS.DuetDance) {
		// Early exit due to multiple sources.
		spirit = ModestDancer;
	} else {
		spirit = spirits().find((spirit) =>
			(spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
				? spirit.current
				: spirit.current ?? spirit.seasonal
			)?.some((item) => item.emoji?.id === emoji.id),
		);
	}

	// The emoji still may not be found. Run this again, if so.
	return spirit ? [emoji, spirit] : getAnswer();
}

function getOptions(difficulty: GuessDifficultyLevel) {
	// Get the answer.
	const [emoji, spirit] = getAnswer();
	const answers = [spirit];

	// Generate other answers.
	if (difficulty === GuessDifficultyLevel.Original) {
		let filtered = spirits().filter((original) => original.name !== spirit.name);
		const answer2 = getRandomElement(filtered)!;
		filtered = filtered.filter((original) => original.name !== answer2.name);
		const answer3 = getRandomElement(filtered)!;
		answers.push(answer2, answer3);
	} else {
		// Collect spirits from the same realm or season.
		if (spirit.isStandardSpirit()) {
			let filtered = STANDARD_SPIRITS.filter(
				(original) => original.name !== spirit.name && original.realm === spirit.realm,
			);

			const answer2 = getRandomElement(filtered)!;
			filtered = filtered.filter((original) => original.name !== answer2.name);
			const answer3 = getRandomElement(filtered)!;
			answers.push(answer2, answer3);
		}

		if (spirit.isElderSpirit()) {
			let filtered = ELDER_SPIRITS.filter((original) => original.name !== spirit.name);
			const answer2 = getRandomElement(filtered)!;
			filtered = filtered.filter((original) => original.name !== answer2.name);
			const answer3 = getRandomElement(filtered)!;
			answers.push(answer2, answer3);
		}

		if (spirit.isSeasonalSpirit() || spirit.isGuideSpirit()) {
			let filtered = currentSeasonalSpirits().filter(
				(original) => original.name !== spirit.name && original.seasonId === spirit.seasonId,
			);

			const answer2 = getRandomElement(filtered)!;
			filtered = filtered.filter((original) => original.name !== answer2.name);
			const answer3 = getRandomElement(filtered)!;
			answers.push(answer2, answer3);
		}
	}

	return { answer: spirit, emoji, options: answers.sort(() => Math.random() - 0.5) };
}

export async function guess(
	interaction: ButtonInteraction | ChatInputCommandInteraction,
	difficulty: GuessDifficultyLevel,
	streak: number,
) {
	const { answer, emoji, options } = getOptions(difficulty);

	// Set the timeout timestamp.
	const timeoutTimestamp = interaction.createdTimestamp + GUESS_TIMEOUT;

	// Create buttons from the answers.
	const buttons = options.map((option, index) =>
		new ButtonBuilder()
			.setCustomId(
				`${index === 0 ? GUESS_ANSWER_1 : index === 1 ? GUESS_ANSWER_2 : GUESS_ANSWER_3}§${answer.name}§${
					option.name
				}§${difficulty}§${streak}§${timeoutTimestamp}`,
			)
			.setLabel(t(`spiritNames.${option.name}`, { lng: interaction.locale, ns: "general" }))
			.setStyle(ButtonStyle.Secondary),
	);

	const endGameButton = new ButtonBuilder()
		.setCustomId(
			`${GUESS_END_GAME}§${answer.name}§null§${difficulty}§${streak}§${timeoutTimestamp}`,
		)
		.setLabel("End Game")
		.setStyle(ButtonStyle.Danger);

	// Retrieve the highest streak.
	const highestStreak = await pg<GuessPacket>(Table.Guess).where({ user_id: interaction.user.id });
	const difficultyString = GuessDifficultyLevelToName[difficulty];
	const streakString = highestStreak[0]?.[GuessDifficultyToStreakColumn[difficulty]] ?? 0;

	// Respond.
	const response = {
		components: [
			new ActionRowBuilder<ButtonBuilder>().setComponents(buttons),
			new ActionRowBuilder<ButtonBuilder>().setComponents(endGameButton),
		],
		content: "",
		embeds: [
			new EmbedBuilder()
				.setColor(DEFAULT_EMBED_COLOUR)
				.setDescription(
					`Guess ${time(Math.floor(timeoutTimestamp / 1_000), TimestampStyles.RelativeTime)}!`,
				)
				.setFooter({
					text: `Difficulty: ${difficultyString} | Streak: ${streak} | Highest: ${streakString}`,
				})
				.setImage(formatEmojiURL(emoji.id))
				.setTitle("Where does this come from?"),
		],
	};

	if (interaction instanceof ButtonInteraction) {
		await interaction.update(response);
	} else {
		await interaction.reply(response);
	}
}

function tryAgainComponent(difficulty: GuessDifficultyLevel) {
	return new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setCustomId(`${GUESS_TRY_AGAIN}§${difficulty}`)
			.setLabel("Try Again?")
			.setStyle(ButtonStyle.Primary),
	);
}

export async function answer(interaction: ButtonInteraction) {
	const { customId, message, user } = interaction;

	if (message.interactionMetadata!.user.id !== user.id) {
		await interaction.reply({
			content: "You didn't start this game!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const [, answer, guessedAnswer, difficulty, streak, timeoutTimestamp] = customId.split("§");
	const parsedDifficulty = Number(difficulty);
	const parsedStreak = Number(streak);
	const parsedTimeoutTimestamp = Number(timeoutTimestamp);

	if (!isGuessDifficultyLevel(parsedDifficulty)) {
		pino.warn(interaction, `Invalid guessing game difficulty level: ${difficulty}`);
		await interaction.update(ERROR_RESPONSE);
		return;
	}

	if (Date.now() > parsedTimeoutTimestamp) {
		await update(parsedDifficulty, user.id, parsedStreak, interaction.guildId);

		await interaction.update({
			components: [tryAgainComponent(parsedDifficulty)],
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

export async function parseEndGame(interaction: ButtonInteraction) {
	const { message, user } = interaction;

	if (message.interactionMetadata!.user.id !== user.id) {
		await interaction.reply({
			content: "You didn't start this game!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const [, answer, guess, rawDifficulty, rawStreak] = interaction.customId.split("§");
	const difficulty = Number(rawDifficulty);

	if (!isGuessDifficultyLevel(difficulty)) {
		pino.warn(interaction, `Invalid guessing game difficulty level: ${rawDifficulty}`);
		await interaction.update(ERROR_RESPONSE);
		return;
	}

	const streak = Number(rawStreak);
	await endGame(interaction, answer!, guess!, difficulty, streak);
}

async function endGame(
	interaction: ButtonInteraction,
	answer: string,
	guess: string,
	difficulty: GuessDifficultyLevel,
	streak: number,
) {
	const { customId, locale, message, user } = interaction;
	let description: string;

	if (customId.startsWith(GUESS_END_GAME)) {
		description = "Game ended.";
	} else {
		description = `Your guess: ${t(`spiritNames.${guess}`, {
			lng: locale,
			ns: "general",
		})} ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}`;
	}

	const embed = EmbedBuilder.from(message.embeds[0]!);

	embed
		.setDescription(description)
		.setTitle(t(`spiritNames.${answer}`, { lng: locale, ns: "general" }));

	await update(difficulty, user.id, streak, interaction.guildId);

	await interaction.update({
		components: [tryAgainComponent(difficulty)],
		embeds: [embed],
	});
}

export async function tryAgain(interaction: ButtonInteraction) {
	const { customId, message, user } = interaction;

	if (message.interactionMetadata!.user.id !== user.id) {
		await interaction.reply({
			content: "You didn't start this game!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const difficulty = Number(customId.slice(customId.indexOf("§") + 1));

	if (!isGuessDifficultyLevel(difficulty)) {
		pino.warn(interaction, `Invalid guessing game difficulty level: ${difficulty}`);
		await interaction.update(ERROR_RESPONSE);
		return;
	}

	await guess(interaction, difficulty, 0);
}

async function update(
	difficulty: GuessDifficultyLevel,
	userId: Snowflake,
	streak: number,
	guildId: Snowflake | null,
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

export async function handleGuildCreate(guild: Guild) {
	const userIds = (await pg<GuessPacket>(Table.Guess).select("user_id")).map((row) => row.user_id);
	const members = await guild.members.fetch({ user: userIds });

	const data = members.reduce<Record<Snowflake, Snowflake>>((data, member) => {
		data[member.user.id] = guild.id;
		return data;
	}, {});

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

export async function handleGuildRemove(guild: Guild) {
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
		[guild.id, guild.id],
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
	interaction: ChatInputCommandInteraction | ButtonInteraction,
	difficulty: GuessDifficultyLevel,
) {
	const isChatInputCommand = interaction.isChatInputCommand();

	const page = isChatInputCommand
		? 1
		: Number(interaction.customId.slice(interaction.customId.lastIndexOf("§") + 1));

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

	const guessPacketInvoker = await findUser(interaction.user.id);

	if (guessPacketsLeaderboard.length === 0) {
		await interaction.reply({
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

	const embed = new EmbedBuilder()
		.setColor(DEFAULT_EMBED_COLOUR)
		.setDescription(
			guessPacketsLeaderboard
				.map((row) => `${row.rank}. <@${row.user_id}>: ${row[column]}`)
				.join("\n"),
		)
		.setTitle(`${GuessDifficultyLevelToName[difficulty]} Leaderboard`);

	if (guessPacketInvoker) {
		embed.setFooter({
			text: `You: #${guessPacketInvoker[`${column}_rank`]} (${guessPacketInvoker[column]})`,
		});
	}

	const response = {
		components: [
			new ActionRowBuilder<ButtonBuilder>().setComponents(
				new ButtonBuilder()
					.setCustomId(`${GUESS_LEADERBOARD_BACK_CUSTOM_ID}§${difficulty}§${page - 1}`)
					.setDisabled(!hasPreviousPage)
					.setEmoji("⬅️")
					.setLabel("Back")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId(`${GUESS_LEADERBOARD_NEXT_CUSTOM_ID}§${difficulty}§${page + 1}`)
					.setDisabled(!hasNextPage)
					.setEmoji("➡️")
					.setLabel("Next")
					.setStyle(ButtonStyle.Secondary),
			),
		],
		embeds: [embed],
	};

	if (isChatInputCommand) {
		await interaction.reply(response);
	} else {
		await interaction.update(response);
	}
}

export async function guildLeaderboard(
	interaction: ChatInputCommandInteraction<"cached">,
	difficulty: GuessDifficultyLevel,
) {
	const column = GuessDifficultyToStreakColumn[difficulty];

	const results = await pg(Table.Guess)
		.where(pg.raw("guild_ids @> ?", [JSON.stringify([interaction.guildId])]))
		.and.whereNotNull(column)
		.orderBy(column, "desc");

	if (results.length === 0) {
		await interaction.reply("No one in this server has played this game yet!");
		return;
	}

	const you = results.findIndex((row) => row.user_id === interaction.user.id);

	const embed = new EmbedBuilder()
		.setColor(DEFAULT_EMBED_COLOUR)
		.setDescription(
			results
				.slice(0, 10)
				.map((row, index) => `${index + 1}. <@${row.user_id}>: ${row[column]}`)
				.join("\n"),
		)
		.setTitle(`${GuessDifficultyLevelToName[difficulty]} Leaderboard`);

	let footerText = interaction.guild!.name;

	if (you !== -1) {
		footerText += ` | You: #${you + 1} (${results[you]![column]})`;
	}

	embed.setFooter({ text: footerText });
	await interaction.reply({ embeds: [embed] });
}
