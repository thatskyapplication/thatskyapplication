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
import { DEFAULT_EMBED_COLOUR, ERROR_RESPONSE } from "../Utility/Constants.js";
import { getRandomElement } from "../Utility/Utility.js";
import {
	COSMETIC_EMOJIS,
	type CosmeticEmojis,
	FRIEND_ACTION_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	formatEmoji,
	formatEmojiURL,
} from "../Utility/emojis.js";
import { SPIRITS } from "../catalogue/spirits/index.js";
import { ELDER_SPIRITS, STANDARD_SPIRITS } from "../catalogue/spirits/realms/index.js";
import ModestDancer from "../catalogue/spirits/seasons/Performance/ModestDancer.js";
import { SEASON_SPIRITS } from "../catalogue/spirits/seasons/index.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import type { ElderSpirit, GuideSpirit, SeasonalSpirit, StandardSpirit } from "./Spirits.js";

export interface GuessPacket {
	user_id: string;
	streak: number | null;
	streak_hard: number | null;
	guild_ids: string[];
}

export const GUESS_ANSWER_1 = "GUESS_ANSWER_1" as const;
export const GUESS_ANSWER_2 = "GUESS_ANSWER_2" as const;
export const GUESS_ANSWER_3 = "GUESS_ANSWER_3" as const;
export const GUESS_TRY_AGAIN = "GUESS_TRY_AGAIN_CUSTOM_ID" as const;

export enum GuessDifficultyLevel {
	Original = 0,
	Hard = 1,
}

export const GUESS_DIFFICULTY_LEVEL_VALUES = Object.values(GuessDifficultyLevel).filter(
	(guessDifficultyLevel): guessDifficultyLevel is GuessDifficultyLevel =>
		typeof guessDifficultyLevel === "number",
);

function isGuessDifficultyLevel(level: unknown): level is GuessDifficultyLevel {
	return GUESS_DIFFICULTY_LEVEL_VALUES.includes(level as GuessDifficultyLevel);
}

export const GuessDifficultyLevelToName = {
	[GuessDifficultyLevel.Original]: "Original",
	[GuessDifficultyLevel.Hard]: "Hard",
} as const satisfies Readonly<Record<GuessDifficultyLevel, string>>;

const GuessDifficultyToStreakColumn = {
	[GuessDifficultyLevel.Original]: "streak",
	[GuessDifficultyLevel.Hard]: "streak_hard",
} as const satisfies Readonly<Record<GuessDifficultyLevel, string>>;

const GUESS_TIMEOUT = 30_000 as const;

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
		spirit = SPIRITS.find((spirit) =>
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
		let filtered = SPIRITS.filter((original) => original.name !== spirit.name);
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
			let filtered = SEASON_SPIRITS.filter(
				(original) => original.name !== spirit.name && original.season === spirit.season,
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

	// Retrieve the highest streak.
	const highestStreak = await pg<GuessPacket>(Table.Guess).where({ user_id: interaction.user.id });
	const difficultyString = GuessDifficultyLevelToName[difficulty];
	const streakString = highestStreak[0]?.[GuessDifficultyToStreakColumn[difficulty]] ?? 0;

	// Respond.
	const response = {
		components: [new ActionRowBuilder<ButtonBuilder>().setComponents(buttons)],
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
	const { customId, locale, message, user } = interaction;

	if (message.interaction!.user.id !== user.id) {
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
		const embed = EmbedBuilder.from(message.embeds[0]!);

		embed
			.setDescription(
				`Your guess: ${t(`spiritNames.${guessedAnswer}`, {
					lng: locale,
					ns: "general",
				})} ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}`,
			)
			.setTitle(t(`spiritNames.${answer}`, { lng: locale, ns: "general" }));

		await update(parsedDifficulty, user.id, parsedStreak, interaction.guildId);

		await interaction.update({
			components: [tryAgainComponent(parsedDifficulty)],
			embeds: [embed],
		});

		return;
	}

	await guess(interaction, parsedDifficulty, parsedStreak + 1);
}

export async function tryAgain(interaction: ButtonInteraction) {
	const { customId, message, user } = interaction;

	if (message.interaction!.user.id !== user.id) {
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

export async function leaderboard(
	interaction: ChatInputCommandInteraction,
	difficulty: GuessDifficultyLevel,
) {
	const column = GuessDifficultyToStreakColumn[difficulty];
	const results = await pg<GuessPacket>(Table.Guess).whereNotNull(column).orderBy(column, "desc");
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

	if (you !== -1) {
		embed.setFooter({ text: `You: #${you + 1} (${results[you]![column]})` });
	}

	await interaction.reply({ embeds: [embed] });
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
