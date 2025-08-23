import type { Collection } from "@discordjs/collection";
import {
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import {
	currentSeasonalSpirits,
	ELDER_SPIRITS,
	type ElderSpirit,
	type EventIds,
	formatEmoji,
	formatEmojiURL,
	GUESS_TYPE_VALUES,
	GuessType,
	type GuessTypes,
	type GuideSpirit,
	getRandomElement,
	isEventId,
	isSpiritId,
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
import { EVENT_COSMETIC_EMOJIS, SPIRIT_COSMETIC_EMOJIS_ARRAY } from "../utility/guess.js";

export const GUESS_EVENT_OPTION_1_CUSTOM_ID = "GUESS_EVENT_OPTION_1_CUSTOM_ID" as const;
export const GUESS_EVENT_OPTION_2_CUSTOM_ID = "GUESS_EVENT_OPTION_2_CUSTOM_ID" as const;
export const GUESS_EVENT_OPTION_3_CUSTOM_ID = "GUESS_EVENT_OPTION_3_CUSTOM_ID" as const;

export interface GuessPacket {
	user_id: string;
	streak: number;
	type: GuessTypes;
	date: Date | null;
}

type GuessUserRanking = GuessPacket & { rank: number };

export function isGuessType(type: number): type is GuessTypes {
	return GUESS_TYPE_VALUES.includes(type as GuessTypes);
}

function getAnswer(): readonly [Snowflake, SpiritIds] {
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

function getOptions(type: GuessTypes) {
	// Get the answer.
	const [emoji, spiritId] = getAnswer();
	const foundAnswers = new Set<SpiritIds>();

	// Generate other answers.
	if (type === GuessType.Original) {
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

interface GuessGenerateCustomIdBaseOptions<Answer> {
	type: GuessTypes;
	emoji: Snowflake;
	answer: Answer;
	streak: number;
	timeoutTimestamp: number;
}

interface GuessGenerateCustomIdGuessOptions extends GuessGenerateCustomIdBaseOptions<SpiritIds> {
	prefix: typeof GUESS_ANSWER_1 | typeof GUESS_ANSWER_2 | typeof GUESS_ANSWER_3;
	option: SpiritIds;
}

interface GuessGenerateCustomIdEndOptions extends GuessGenerateCustomIdBaseOptions<SpiritIds> {
	prefix: typeof GUESS_END_GAME;
}

interface GuessGenerationCustomIdTryAgainOptions {
	prefix: typeof GUESS_TRY_AGAIN;
	type: GuessTypes;
}

interface GuessEventGenerateCustomIdGuessOptions
	extends GuessGenerateCustomIdBaseOptions<EventIds> {
	prefix:
		| typeof GUESS_EVENT_OPTION_1_CUSTOM_ID
		| typeof GUESS_EVENT_OPTION_2_CUSTOM_ID
		| typeof GUESS_EVENT_OPTION_3_CUSTOM_ID;
	option: EventIds;
}

type GuessGenerateCustomIdOptions =
	| GuessGenerateCustomIdGuessOptions
	| GuessGenerateCustomIdEndOptions
	| GuessGenerationCustomIdTryAgainOptions
	| GuessEventGenerateCustomIdGuessOptions;

function generateCustomId(options: GuessGenerateCustomIdOptions) {
	const { prefix, type } = options;
	return `${prefix}§${type}§${"emoji" in options ? options.emoji : null}§${"answer" in options ? options.answer : null}§${"option" in options ? options.option : null}§${"streak" in options ? options.streak : null}§${"timeoutTimestamp" in options ? options.timeoutTimestamp : null}`;
}

function parseCustomId(customId: string) {
	const [prefix, rawType, emoji, rawAnswer, rawOption, streak, timeoutTimestamp] = customId.split(
		"§",
	) as [
		GuessGenerateCustomIdOptions["prefix"],
		`${GuessTypes}`,
		Snowflake | `${null}`,
		`${SpiritIds | null}`,
		`${SpiritIds | null}`,
		`${number | null}`,
		`${number | null}`,
	];

	const type = Number(rawType);
	const answer = rawAnswer === "null" ? null : Number(rawAnswer);
	const option = rawOption === "null" ? null : Number(rawOption);

	if (!isGuessType(type)) {
		throw new Error(`Invalid guessing game type: ${type}`);
	}

	if (answer !== null && !isSpiritId(answer)) {
		throw new Error(`Invalid answer spirit id: ${rawAnswer}`);
	}

	if (option !== null && !isSpiritId(option)) {
		throw new Error(`Invalid guessed answer spirit id: ${rawOption}`);
	}

	return {
		prefix,
		type,
		emoji: streak === "null" ? null : emoji,
		answer,
		option,
		streak: streak === "null" ? null : Number(streak),
		timeoutTimestamp: timeoutTimestamp === "null" ? null : Number(timeoutTimestamp),
	};
}

function parseEventCustomId(customId: string) {
	const [prefix, rawType, emoji, rawAnswer, rawOption, streak, timeoutTimestamp] = customId.split(
		"§",
	) as [
		GuessGenerateCustomIdOptions["prefix"],
		`${GuessTypes}`,
		Snowflake | `${null}`,
		`${EventIds | null}`,
		`${EventIds | null}`,
		`${number | null}`,
		`${number | null}`,
	];

	const type = Number(rawType);
	const answer = rawAnswer === "null" ? null : Number(rawAnswer);
	const option = rawOption === "null" ? null : Number(rawOption);

	if (!isGuessType(type)) {
		throw new Error(`Invalid guessing game type: ${type}`);
	}

	if (answer !== null && !isEventId(answer)) {
		throw new Error(`Invalid answer event id: ${rawAnswer}`);
	}

	if (option !== null && !isEventId(option)) {
		throw new Error(`Invalid guessed answer event id: ${rawOption}`);
	}

	return {
		prefix,
		type,
		emoji: streak === "null" ? null : emoji,
		answer,
		option,
		streak: streak === "null" ? null : Number(streak),
		timeoutTimestamp: timeoutTimestamp === "null" ? null : Number(timeoutTimestamp),
	};
}

export async function guess(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	type: GuessTypes,
	streak: number,
) {
	const { answer, emoji, options } = getOptions(type);

	// Set the timeout timestamp.
	const timeoutTimestamp = DiscordSnowflake.timestampFrom(interaction.id) + GUESS_TIMEOUT;

	// Create buttons from the answers.
	const buttons: APIButtonComponentWithCustomId[] = options.map((option, index) => ({
		type: ComponentType.Button,
		custom_id: generateCustomId({
			prefix: index === 0 ? GUESS_ANSWER_1 : index === 1 ? GUESS_ANSWER_2 : GUESS_ANSWER_3,
			type,
			emoji,
			answer,
			option,
			streak,
			timeoutTimestamp,
		}),
		label: t(`spirits.${option}`, { lng: interaction.locale, ns: "general" }),
		style: ButtonStyle.Secondary,
	}));

	const endGameButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: generateCustomId({
			prefix: GUESS_END_GAME,
			type,
			emoji,
			answer,
			streak,
			timeoutTimestamp,
		}),
		label: t("guess.end-game", { lng: interaction.locale, ns: "features" }),
		style: ButtonStyle.Danger,
	};

	// Retrieve the highest streak.
	const invoker = interactionInvoker(interaction);

	const highestStreak =
		(
			await pg<GuessPacket>(Table.Guess)
				.select("streak")
				.where({ user_id: invoker.id, type })
				.first()
		)?.streak ?? 0;

	// Respond.
	const components: [APIMessageTopLevelComponent] = [
		{
			type: ComponentType.Container,
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
					content: `-# ${t("guess.footer", { lng: interaction.locale, ns: "features", type, streak, highestStreak })}`,
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

export async function answer(interaction: APIMessageComponentButtonInteraction) {
	const { locale, message } = interaction;
	const invoker = interactionInvoker(interaction);

	if (message.interaction_metadata!.user.id !== invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("guess.game-interaction-not-self", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const { type, emoji, answer, option, streak, timeoutTimestamp } = parseCustomId(
		interaction.data.custom_id,
	);

	if (Date.now() > timeoutTimestamp!) {
		await endGame({
			interaction,
			type,
			emoji: emoji!,
			answer: answer!,
			option,
			streak: streak!,
			timeRanOut: true,
		});

		return;
	}

	if (option !== answer) {
		await endGame({
			interaction,
			type,
			emoji: emoji!,
			answer: answer!,
			option,
			streak: streak!,
		});

		return;
	}

	await guess(interaction, type, streak! + 1);
}

export async function parseEndGame(interaction: APIMessageComponentButtonInteraction) {
	const { locale, message } = interaction;
	const invoker = interactionInvoker(interaction);

	if (message.interaction_metadata!.user.id !== invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("guess.game-interaction-not-self", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const { type, emoji, answer, option, streak } = parseCustomId(interaction.data.custom_id);

	await (type === GuessType.Events
		? endEventGame({
				interaction,
				type,
				emoji: emoji!,
				answer: answer!,
				option,
				streak: streak!,
			})
		: endGame({ interaction, type, emoji: emoji!, answer: answer!, option, streak: streak! }));
}

interface GuessEndGameOptions {
	interaction: APIMessageComponentButtonInteraction;
	type: GuessTypes;
	emoji: Snowflake;
	answer: SpiritIds;
	option: SpiritIds | null;
	streak: number;
	timeRanOut?: boolean;
}

async function endGame({
	interaction,
	type,
	emoji,
	answer,
	option,
	streak,
	timeRanOut,
}: GuessEndGameOptions) {
	const { locale } = interaction;
	let description = `**${t("guess.answer", { lng: locale, ns: "features" })}** ${t(`spirits.${answer}`, { lng: locale, ns: "general" })}`;

	if (option !== null) {
		description += `\n**${t("guess.your-guess", { lng: locale, ns: "features" })}** ${t(
			`spirits.${option}`,
			{ lng: locale, ns: "general" },
		)}`;

		if (!timeRanOut) {
			description += ` ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}`;
		}
	}

	if (timeRanOut) {
		description += `\n${t("guess.too-late", { lng: locale, ns: "features" })}`;
	}

	const invoker = interactionInvoker(interaction);

	const highestStreak =
		(
			await pg<GuessPacket>(Table.Guess)
				.select("streak")
				.where({ user_id: invoker.id, type })
				.first()
		)?.streak ?? 0;

	await pg<GuessPacket>(Table.Guess)
		.insert({
			user_id: invoker.id,
			streak,
			type,
			date: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
		})
		.onConflict(["user_id", "type"])
		.merge()
		.where(`${Table.Guess}.streak`, "<", streak);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## ${t("guess.game-over", { lng: locale, ns: "features" })}`,
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: description,
					},
					{
						type: ComponentType.MediaGallery,
						items: [{ media: { url: formatEmojiURL(emoji as `${bigint}`) } }],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: generateCustomId({ prefix: GUESS_TRY_AGAIN, type }),
								label: t("guess.try-again", { lng: locale, ns: "features" }),
								style: ButtonStyle.Primary,
							},
						],
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: `-# ${t("guess.footer", { lng: locale, ns: "features", type, streak, highestStreak })}`,
					},
				],
			},
		],
	});
}

interface GuessEventOptions {
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction;
	streak: number;
}

export async function guessEvent({ interaction, streak = 0 }: GuessEventOptions) {
	const { locale } = interaction;
	const options = new Set<EventIds>();
	const answerEmojiId = EVENT_COSMETIC_EMOJIS.randomKey()!;
	const answerEventId = EVENT_COSMETIC_EMOJIS.get(answerEmojiId)!;
	options.add(answerEventId);

	generateOtherOptions: while (options.size < 3) {
		const option = EVENT_COSMETIC_EMOJIS.random()!;
		const eventName = t(`events.${option}`, { lng: locale, ns: "general" });

		// Ensure no duplicate labels.
		for (const existingOption of options) {
			const existingEventName = t(`events.${existingOption}`, { lng: locale, ns: "general" });

			if (eventName === existingEventName) {
				continue generateOtherOptions;
			}
		}

		options.add(option);
	}

	const [option1, option2, option3] = options;

	// Set the timeout timestamp.
	const timeoutTimestamp = DiscordSnowflake.timestampFrom(interaction.id) + GUESS_TIMEOUT;

	// Create buttons from the answers.
	const buttons: APIButtonComponentWithCustomId[] = [
		{
			type: ComponentType.Button,
			style: ButtonStyle.Secondary,
			custom_id: generateCustomId({
				prefix: GUESS_EVENT_OPTION_1_CUSTOM_ID,
				type: GuessType.Events,
				emoji: answerEmojiId,
				answer: answerEventId,
				option: option1!,
				streak,
				timeoutTimestamp,
			}),
			label: t(`events.${option1!}`, { lng: locale, ns: "general" }),
		},
		{
			type: ComponentType.Button,
			style: ButtonStyle.Secondary,
			custom_id: generateCustomId({
				prefix: GUESS_EVENT_OPTION_2_CUSTOM_ID,
				type: GuessType.Events,
				emoji: answerEmojiId,
				answer: answerEventId,
				option: option2!,
				streak,
				timeoutTimestamp,
			}),
			label: t(`events.${option2!}`, { lng: locale, ns: "general" }),
		},
		{
			type: ComponentType.Button,
			style: ButtonStyle.Secondary,
			custom_id: generateCustomId({
				prefix: GUESS_EVENT_OPTION_3_CUSTOM_ID,
				type: GuessType.Events,
				emoji: answerEmojiId,
				answer: answerEventId,
				option: option3!,
				streak,
				timeoutTimestamp,
			}),
			label: t(`events.${option3!}`, { lng: locale, ns: "general" }),
		},
	];

	// Retrieve the highest streak.
	const invoker = interactionInvoker(interaction);

	const highestStreak =
		(
			await pg<GuessPacket>(Table.Guess)
				.select("streak")
				.where({ user_id: invoker.id, type: GuessType.Events })
				.first()
		)?.streak ?? 0;

	const components: [APIMessageTopLevelComponent] = [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `## ${t("guess.title", { lng: locale, ns: "features" })}`,
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: t("guess.guess-in", {
						lng: locale,
						ns: "features",
						time: `<t:${Math.floor(timeoutTimestamp / 1_000)}:R>`,
					}),
				},
				{
					type: ComponentType.MediaGallery,
					items: [{ media: { url: formatEmojiURL(answerEmojiId as `${bigint}`) } }],
				},
				{
					type: ComponentType.ActionRow,
					components: buttons.sort(() => Math.random() - 0.5),
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							custom_id: generateCustomId({
								prefix: GUESS_END_GAME,
								type: GuessType.Events,
								emoji: answerEmojiId,
								answer: answerEventId,
								streak,
								timeoutTimestamp,
							}),
							label: t("guess.end-game", { lng: locale, ns: "features" }),
							style: ButtonStyle.Danger,
						},
					],
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: `-# ${t("guess.footer", { lng: locale, ns: "features", type: GuessType.Events, streak, highestStreak })}`,
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

export async function guessEventAnswer(interaction: APIMessageComponentButtonInteraction) {
	const { locale, message } = interaction;
	const invoker = interactionInvoker(interaction);

	if (message.interaction_metadata!.user.id !== invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("guess.game-interaction-not-self", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const { type, emoji, answer, option, streak, timeoutTimestamp } = parseEventCustomId(
		interaction.data.custom_id,
	);

	if (Date.now() > timeoutTimestamp!) {
		await endEventGame({
			interaction,
			type,
			emoji: emoji!,
			answer: answer!,
			option,
			streak: streak!,
			timeRanOut: true,
		});

		return;
	}

	if (option !== answer) {
		await endEventGame({
			interaction,
			type,
			emoji: emoji!,
			answer: answer!,
			option,
			streak: streak!,
		});

		return;
	}

	await guessEvent({ interaction, streak: streak! + 1 });
}

interface GuessEventEndGameOptions {
	interaction: APIMessageComponentButtonInteraction;
	type: GuessTypes;
	emoji: Snowflake;
	answer: SpiritIds;
	option: SpiritIds | null;
	streak: number;
	timeRanOut?: boolean;
}

async function endEventGame({
	interaction,
	type,
	emoji,
	answer,
	option,
	streak,
	timeRanOut,
}: GuessEventEndGameOptions) {
	const { locale } = interaction;
	let description = `**${t("guess.answer", { lng: locale, ns: "features" })}** ${t(`events.${answer}`, { lng: locale, ns: "general" })}`;

	if (option !== null) {
		description += `\n**${t("guess.your-guess", { lng: locale, ns: "features" })}** ${t(
			`events.${option}`,
			{ lng: locale, ns: "general" },
		)}`;

		if (!timeRanOut) {
			description += ` ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}`;
		}
	}

	if (timeRanOut) {
		description += `\n${t("guess.too-late", { lng: locale, ns: "features" })}`;
	}

	const invoker = interactionInvoker(interaction);

	const highestStreak =
		(
			await pg<GuessPacket>(Table.Guess)
				.select("streak")
				.where({ user_id: invoker.id, type })
				.first()
		)?.streak ?? 0;

	await pg<GuessPacket>(Table.Guess)
		.insert({
			user_id: invoker.id,
			streak,
			type,
			date: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
		})
		.onConflict(["user_id", "type"])
		.merge()
		.where(`${Table.Guess}.streak`, "<", streak);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## ${t("guess.game-over", { lng: locale, ns: "features" })}`,
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: description,
					},
					{
						type: ComponentType.MediaGallery,
						items: [{ media: { url: formatEmojiURL(emoji as `${bigint}`) } }],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: generateCustomId({ prefix: GUESS_TRY_AGAIN, type }),
								label: t("guess.try-again", { lng: locale, ns: "features" }),
								style: ButtonStyle.Primary,
							},
						],
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: `-# ${t("guess.footer", { lng: locale, ns: "features", type, streak, highestStreak })}`,
					},
				],
			},
		],
	});
}

export async function tryAgain(interaction: APIMessageComponentButtonInteraction) {
	const { locale, message } = interaction;
	const invoker = interactionInvoker(interaction);

	if (message.interaction_metadata!.user.id !== invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("guess.game-interaction-not-self", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const { type } = parseCustomId(interaction.data.custom_id);

	await (type === GuessType.Events
		? guessEvent({
				interaction,
				streak: 0,
			})
		: guess(interaction, type, 0));
}

export async function findUser(userId: Snowflake, type: GuessTypes) {
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
	type: GuessTypes,
) {
	const { locale } = interaction;
	const isChatInput = isChatInputCommand(interaction);

	const page = isChatInput
		? 1
		: Number(interaction.data.custom_id.slice(interaction.data.custom_id.lastIndexOf("§") + 1));

	const offset = (page - 1) * GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER;

	const guessPacketsLeaderboard = await pg(Table.Guess)
		.select<(GuessPacket & { rank: number })[]>(
			"user_id",
			"type",
			"streak",
			pg.raw("row_number() over (partition by type order by streak desc)::int as rank"),
		)
		.where({ type })
		.where("streak", ">", 0)
		.orderBy("rank")
		.limit(GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER + 1)
		.offset(offset);

	if (guessPacketsLeaderboard.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("guess.leaderboard-nothing", { lng: locale, ns: "features" }),
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
			content: `## ${t("guess.leaderboard-title", { lng: locale, ns: "features", type })}`,
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

	const guessPacketInvoker = await findUser(interactionInvoker(interaction).id, type);

	if (guessPacketInvoker) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `-# ${t("guess.leaderboard-you", { lng: locale, ns: "features", rank: guessPacketInvoker.rank, streak: guessPacketInvoker.streak })}`,
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
					custom_id: `${GUESS_LEADERBOARD_BACK_CUSTOM_ID}§${type}§${page - 1}`,
					disabled: !hasPreviousPage,
					emoji: { name: "⬅️" },
					label: t("navigation-back", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${GUESS_LEADERBOARD_NEXT_CUSTOM_ID}§${type}§${page + 1}`,
					disabled: !hasNextPage,
					emoji: { name: "➡️" },
					label: t("navigation-next", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	const components: [APIMessageTopLevelComponent] = [
		{ type: ComponentType.Container, components: containerComponents },
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
