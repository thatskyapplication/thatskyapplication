import { clearTimeout, setTimeout } from "node:timers";
import {
	AllowedMentionsTypes,
	type APIUser,
	type GatewayMessageCreateDispatchData,
	MessageFlags,
	MessageReferenceType,
	type Snowflake,
} from "@discordjs/core";
import {
	AreaToWingedLight,
	formatEmoji,
	MAXIMUM_WINGED_LIGHT,
	shardEruption,
	skyCurrentEvents,
	skyNow,
	skySeasons,
	skyUpcomingEvents,
	skyUpcomingSeason,
	WING_BUFFS,
	WINGED_LIGHT_IN_AREAS,
	WINGED_LIGHT_THRESHOLDS,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import OpenAI from "openai";
import { APIUserAbortError } from "openai/error.mjs";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { GUILD_CACHE } from "./caches/guilds.js";
import { MESSAGE_CACHE } from "./caches/messages.js";
import { client } from "./discord.js";
import { todayData } from "./features/shard-eruption.js";
import type { Guild } from "./models/discord/guild.js";
import pino from "./pino.js";
import {
	AI_GATEWAY_TOKEN,
	APPLICATION_ID,
	OPENAI_API_KEY,
	OPENAI_BASE_URL,
} from "./utility/configuration.js";
import { MISCELLANEOUS_EMOJIS } from "./utility/emojis.js";

const enum ShardEruptionIntent {
	Current = 0,
	Tomorrow = 1,
	NextRegular = 2,
	NextDangerous = 3,
	SpecificDay = 4,
}

const openAI = new OpenAI({
	apiKey: OPENAI_API_KEY,
	baseURL: OPENAI_BASE_URL,
	defaultHeaders: { "cf-aig-authorization": `Bearer ${AI_GATEWAY_TOKEN}` },
});

const AI_DEFAULT_RESPONSE = "Oh my gosh! Could you be the... the legendary Sky kid?" as const;
const AI_DESCRIPTION_EMOJIS =
	"Respond with up to 3 Unicode emojis that represent this message." as const;

const AI_DESCRIPTION_STICKERS =
	"Respond with an id of a sticker that represents this message." as const;

const OPEN_AI_ALLOWED_MEDIA_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"] as const;

function parseAIName(user: APIUser) {
	const { username } = user;

	// It's not possible for a Discord username to be longer than 64 characters.
	const name = username.replaceAll(/[^\w-]/g, "");

	// Bots may return an empty output.
	if (name.length === 0) {
		pino.warn(user, "AI name parsing failed.");
		return "Stranger";
	}

	return name;
}

function systemPromptContext(
	guild: Guild,
	message: GatewayMessageCreateDispatchData,
	mentioned: boolean,
) {
	const channel = guild.channels.get(message.channel_id) ?? guild.threads.get(message.channel_id);

	if (!channel) {
		throw new Error("Channel not found.");
	}

	const now = skyNow();
	const seasonsText = [];
	const seasons = skySeasons(now);
	const upcomingSeason = skyUpcomingSeason(now);

	if (seasons.size > 0) {
		seasonsText.push(
			`- The seasons in Sky are: ${seasons.map((season) => ({ name: t(`seasons.${season.id}`, { ns: "general" }), start: season.start.toISO(), end: season.end.toISO() })).join(", ")}.`,
		);
	}

	if (upcomingSeason) {
		seasonsText.push(
			`- The upcoming season in Sky is: ${{ name: t(`seasons.${upcomingSeason.id}`, { ns: "general" }), start: upcomingSeason.start.toISO(), end: upcomingSeason.end.toISO() }}.`,
		);
	}

	const eventText = [];
	const events = skyCurrentEvents(now);
	const upcoming = skyUpcomingEvents(now);

	if (events.size > 0) {
		eventText.push(
			`- The current events in Sky are: ${events.map((event) => ({ name: t(`events.${event.id}`, { ns: "general" }), start: event.start.toISO(), end: event.end.toISO() })).join(", ")}.`,
		);
	}

	if (upcoming.size > 0) {
		eventText.push(
			`- The upcoming events in Sky are: ${upcoming.map((event) => ({ name: t(`events.${event.id}`, { ns: "general" }), start: event.start.toISO(), end: event.end.toISO() })).join(", ")}.`,
		);
	}

	const systemPrompt = [
		"- You are named Caelus",
		"- Responses should be no longer than a sentence.",
		`- It is currently ${now.toISO()}.`,
		"- Be engaging, positive, and happy.",
		'- Refer to "Sky: Children of the Light" as Sky.',
		`- The maximum amount of winged light is ${MAXIMUM_WINGED_LIGHT}.`,
		`- The maximum amount of winged light that can be found in the realms is ${WINGED_LIGHT_IN_AREAS}.`,
		`- A breakdown of winged light per realm (or area): ${JSON.stringify(AreaToWingedLight)}.`,
		`- The maximum amount of wing buffs is ${WING_BUFFS.length}.`,
		`- Upon achieving an amount of winged light, you achieve a wedge. Refer to: ${JSON.stringify(Object.entries(WINGED_LIGHT_THRESHOLDS).map(([index, wingedLight]) => ({ wedge: Number(index) + 1, wingedLight })))}.`,
		`- If you mention winged light, use ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)}.`,
		`- If you mention wing buffs, use ${formatEmoji(MISCELLANEOUS_EMOJIS.WingBuff)}.`,
		`- If you mention ascended candles, use ${formatEmoji(MISCELLANEOUS_EMOJIS.AscendedCandle)}.`,
		`- If you mention pieces of light (may be referred to as "wax"), use ${formatEmoji(MISCELLANEOUS_EMOJIS.Light)}.`,
		"- Only use the shardEruption tool when users specifically ask about shard eruptions, black shards, or red shards. Do NOT use it for questions about seasons or general events.",
	];

	if (seasonsText.length > 0) {
		systemPrompt.push(...seasonsText);
	}

	if (eventText.length > 0) {
		systemPrompt.push(...eventText);
	}

	systemPrompt.push(
		`- The author of this message is: ${JSON.stringify(message.author)}`,
		`- The channel you are in is: ${JSON.stringify({ name: channel.name, id: channel.id })}`,
		`- The guild you are in is: ${JSON.stringify({ name: guild.name, id: guild.id })}`,
	);

	if (mentioned) {
		systemPrompt.push(
			`- The last message by ${parseAIName(message.author)} mentioned you directly. Respond to this message.`,
		);
	}

	return systemPrompt.join("\n");
}

export async function messageCreateEmojiResponse(message: GatewayMessageCreateDispatchData) {
	const abortController = new AbortController();
	const timeout = setTimeout(() => abortController.abort(), 10_000);

	try {
		const [, completion] = await Promise.all([
			client.api.channels.showTyping(message.channel_id),
			openAI.chat.completions.create(
				{
					frequency_penalty: 1,
					max_completion_tokens: 35,
					messages: [
						{ role: "system", content: AI_DESCRIPTION_EMOJIS },
						{ content: message.content, name: parseAIName(message.author), role: "user" },
					],
					model: "gpt-4o-mini-2024-07-18",
					user: message.author.id,
					response_format: {
						type: "json_schema",
						json_schema: {
							strict: true,
							name: "emojis",
							description: "Returns up to 3 Unicode emojis based on the message.",
							schema: {
								type: "object",
								properties: {
									emojis: {
										type: "array",
										description: "List of Unicode emojis that represent the message.",
										items: {
											type: "string",
											description: "A single Unicode emoji.",
										},
										minItems: 1,
										maxItems: 3,
									},
								},
								required: ["emojis"],
								additionalProperties: false,
							},
						},
					},
				},
				{
					signal: abortController.signal,
					headers: { "cf-aig-metadata": JSON.stringify({ user: message.author.id }) },
				},
			),
		]);

		const { emojis } = JSON.parse(completion.choices[0]!.message.content!) as { emojis: string[] };

		await client.api.channels.createMessage(message.channel_id, {
			allowed_mentions: { parse: [AllowedMentionsTypes.User], replied_user: false },
			content: emojis.join(""),
			message_reference: {
				type: MessageReferenceType.Default,
				message_id: message.id,
				fail_if_not_exists: false,
			},
		});
	} catch (error) {
		if (!(error instanceof APIUserAbortError)) {
			pino.error(error, "AI error.");
		}
	} finally {
		clearTimeout(timeout);
	}
}

export async function messageCreateStickerResponse(
	message: GatewayMessageCreateDispatchData,
	guild: Guild,
) {
	const abortController = new AbortController();
	const timeout = setTimeout(() => abortController.abort(), 10_000);

	const stickersJSONString = JSON.stringify([
		...guild.stickers.filter((sticker) => sticker.available).values(),
	]);

	try {
		const [, completion] = await Promise.all([
			client.api.channels.showTyping(message.channel_id),
			openAI.chat.completions.create(
				{
					frequency_penalty: 1,
					max_completion_tokens: 35,
					messages: [
						{ role: "system", content: `${AI_DESCRIPTION_STICKERS}\n${stickersJSONString}` },
						{ content: message.content, name: parseAIName(message.author), role: "user" },
					],
					model: "gpt-4o-mini-2024-07-18",
					user: message.author.id,
					response_format: {
						type: "json_schema",
						json_schema: {
							strict: true,
							name: "stickers",
							description: "Returns a sticker id based on the message.",
							schema: {
								type: "object",
								properties: {
									id: {
										type: "string",
										description: "The id of the sticker.",
									},
								},
								required: ["id"],
								additionalProperties: false,
							},
						},
					},
				},
				{
					signal: abortController.signal,
					headers: { "cf-aig-metadata": JSON.stringify({ user: message.author.id }) },
				},
			),
		]);

		const stickerObject = JSON.parse(completion.choices[0]!.message.content!) as { id: Snowflake };

		await client.api.channels.createMessage(message.channel_id, {
			allowed_mentions: { parse: [AllowedMentionsTypes.User], replied_user: false },
			sticker_ids: [stickerObject.id],
			message_reference: {
				type: MessageReferenceType.Default,
				message_id: message.id,
				fail_if_not_exists: false,
			},
		});
	} catch (error) {
		if (!(error instanceof APIUserAbortError)) {
			pino.error(error, "AI error.");
		}
	} finally {
		clearTimeout(timeout);
	}
}

export async function messageCreateReactionResponse(message: GatewayMessageCreateDispatchData) {
	const abortController = new AbortController();
	const timeout = setTimeout(() => abortController.abort(), 10_000);

	try {
		const completion = await openAI.chat.completions.create(
			{
				frequency_penalty: 1,
				max_completion_tokens: 35,
				messages: [
					{ role: "system", content: AI_DESCRIPTION_EMOJIS },
					{ content: message.content, name: parseAIName(message.author), role: "user" },
				],
				model: "gpt-4o-mini-2024-07-18",
				user: message.author.id,
				response_format: {
					type: "json_schema",
					json_schema: {
						strict: true,
						name: "emojis",
						description: "Returns up to 3 Unicode emojis based on the message.",
						schema: {
							type: "object",
							properties: {
								emojis: {
									type: "array",
									description: "List of Unicode emojis that represent the message.",
									items: {
										type: "string",
										description: "A single Unicode emoji.",
									},
									minItems: 1,
									maxItems: 3,
								},
							},
							required: ["emojis"],
							additionalProperties: false,
						},
					},
				},
			},
			{
				signal: abortController.signal,
				headers: { "cf-aig-metadata": JSON.stringify({ user: message.author.id }) },
			},
		);

		const { emojis } = JSON.parse(completion.choices[0]!.message.content!) as { emojis: string[] };

		await Promise.all(
			emojis.map(async (emoji) =>
				client.api.channels.addMessageReaction(message.channel_id, message.id, emoji),
			),
		);
	} catch (error) {
		if (!(error instanceof APIUserAbortError)) {
			pino.error(error, "AI error.");
		}
	} finally {
		clearTimeout(timeout);
	}
}

export async function messageCreateResponse(
	message: GatewayMessageCreateDispatchData,
	mentioned: boolean,
) {
	const guild = message.guild_id && GUILD_CACHE.get(message.guild_id);

	if (!guild) {
		pino.error(message, "Failed to find a guild to start an AI message create response in.");
		return;
	}

	const abortController = new AbortController();
	const timeout = setTimeout(() => abortController.abort(), 20_000);
	const messages = MESSAGE_CACHE.get(message.channel_id);
	const lastMessageId = messages?.at(-1)?.id;

	if (!lastMessageId) {
		return;
	}

	const priorMessages: ChatCompletionMessageParam[] = [
		{ role: "system", content: systemPromptContext(guild, message, mentioned) },
		...messages.map((message) => {
			const attachments = message.attachments.filter((attachment) =>
				OPEN_AI_ALLOWED_MEDIA_TYPES.includes(
					attachment.content_type as (typeof OPEN_AI_ALLOWED_MEDIA_TYPES)[number],
				),
			);

			return message.author.id === APPLICATION_ID
				? ({
						content: message.content,
						name: message.author.username,
						role: "assistant",
					} as const)
				: ({
						content:
							attachments.length > 0
								? [
										...attachments.map(
											(attachment) =>
												({
													type: "image_url",
													image_url: { url: attachment.url },
												}) as const,
										),
										{
											type: "text",
											text: message.content,
										} as const,
									]
								: message.content,
						name: parseAIName(message.author),
						role: "user",
					} as const);
		}),
	];

	try {
		const [, completion] = await Promise.all([
			client.api.channels.showTyping(message.channel_id),
			openAI.chat.completions.create(
				{
					frequency_penalty: 1,
					max_completion_tokens: 200,
					messages: priorMessages,
					modalities: ["text"],
					model: "gpt-4o-mini-2024-07-18",
					n: 1,
					user: message.author.id,
					temperature: 0.7,
					tools: [
						{
							type: "function",
							function: {
								name: "shardEruption",
								description:
									"Returns shard eruption data. ONLY call this when users explicitly mention the words 'shard eruption', 'black shard', 'red shard', or 'dangerous shard'. Do NOT call for questions about seasons, general events, or gameplay.",
								parameters: {
									type: "object",
									properties: {
										intent: {
											type: "integer",
											enum: [
												ShardEruptionIntent.Current,
												ShardEruptionIntent.Tomorrow,
												ShardEruptionIntent.NextRegular,
												ShardEruptionIntent.NextDangerous,
												ShardEruptionIntent.SpecificDay,
											],
											description: `Intent: ${ShardEruptionIntent.Current}=current, ${ShardEruptionIntent.Tomorrow}=tomorrow, ${ShardEruptionIntent.NextRegular}=next_regular, ${ShardEruptionIntent.NextDangerous}=next_dangerous, ${ShardEruptionIntent.SpecificDay}=specific_day`,
										},
										daysOffset: {
											type: "integer",
											description:
												"Number of days offset from the current day (0 = today, 1 = tomorrow, etc.)",
											default: 0,
										},
									},
									required: ["intent"],
									additionalProperties: false,
								},
							},
						},
					],
				},
				{
					signal: abortController.signal,
					headers: { "cf-aig-metadata": JSON.stringify({ user: message.author.id }) },
				},
			),
		]);

		const response = completion.choices[0];

		if (response?.finish_reason === "tool_calls") {
			const toolCall = response.message.tool_calls![0]!;
			const functionArguments = toolCall.function.arguments;

			const data = JSON.parse(functionArguments) as {
				intent: ShardEruptionIntent;
				daysOffset?: number;
			};

			let offset = data.daysOffset ?? 0;

			switch (data.intent) {
				case ShardEruptionIntent.Current:
					offset = 0;
					break;
				case ShardEruptionIntent.Tomorrow:
					offset = 1;
					break;
				case ShardEruptionIntent.NextRegular: {
					let searchOffset = Math.max(offset, 1);

					while (shardEruption(searchOffset)?.strong === true) {
						searchOffset++;
					}

					offset = searchOffset;
					break;
				}
				case ShardEruptionIntent.NextDangerous: {
					let searchOffset = Math.max(offset, 1);

					while (shardEruption(searchOffset)?.strong === false) {
						searchOffset++;
					}

					offset = searchOffset;
					break;
				}
				case ShardEruptionIntent.SpecificDay:
					offset = data.daysOffset ?? 0;
					break;
			}

			const components = todayData(guild.preferredLocale, offset);

			await client.api.channels.createMessage(message.channel_id, {
				components,
				flags: MessageFlags.IsComponentsV2,
				message_reference: {
					type: MessageReferenceType.Default,
					message_id: message.id,
					fail_if_not_exists: false,
				},
			});
		} else {
			await client.api.channels.createMessage(message.channel_id, {
				allowed_mentions: { parse: [AllowedMentionsTypes.User], replied_user: false },
				content: completion.choices[0]!.message.content ?? AI_DEFAULT_RESPONSE,
				message_reference: {
					type: MessageReferenceType.Default,
					message_id: message.id,
					fail_if_not_exists: false,
				},
			});
		}
	} catch (error) {
		if (!(error instanceof APIUserAbortError)) {
			pino.error(error, "AI error.");
		}
	} finally {
		clearTimeout(timeout);
	}
}
