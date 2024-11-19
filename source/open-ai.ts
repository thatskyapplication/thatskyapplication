import process from "node:process";
import { clearTimeout, setTimeout } from "node:timers";
import {
	type APIGuild,
	type APIUser,
	AllowedMentionsTypes,
	type GatewayMessageCreateDispatchData,
	Locale,
	MessageReferenceType,
} from "@discordjs/core";
import { t } from "i18next";
import OpenAI from "openai";
import { APIUserAbortError } from "openai/error.mjs";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { CHANNEL_CACHE } from "./caches/channels.js";
import { GUILD_CACHE } from "./caches/guilds.js";
import { MESSAGE_CACHE } from "./caches/messages.js";
import { skyCurrentEvents, skyUpcomingEvents } from "./data/events/index.js";
import { skySeasons, skyUpcomingSeason } from "./data/spirits/seasons/index.js";
import { client } from "./discord.js";
import pino from "./pino.js";
import { todayEmbed } from "./services/shard-eruption.js";
import {
	APPLICATION_ID,
	AreaToWingedLightCount,
	MAXIMUM_WINGED_LIGHT,
	MAXIMUM_WING_BUFFS,
	SKY_CREATOR_TROUPE,
	WINGED_LIGHT_IN_AREAS,
	WINGED_LIGHT_THRESHOLDS,
} from "./utility/constants.js";
import { skyNow } from "./utility/dates.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji } from "./utility/emojis.js";
import { shardEruption } from "./utility/shard-eruption.js";

const { OPENAI_API_KEY } = process.env;

if (!OPENAI_API_KEY) {
	throw new Error("No OpenAI API key.");
}

const openAI = new OpenAI({ apiKey: OPENAI_API_KEY });
const AI_DEFAULT_RESPONSE = "Oh my gosh! Could you be the... the legendary Sky kid?" as const;
const AI_DESCRIPTION_EMOJIS = "Respond with up to 3 emojis that represent this message." as const;
const AI_DESCRIPTION_REACTION = `${AI_DESCRIPTION_EMOJIS} Put each emoji on a new line.` as const;

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

function systemPromptContext(guild: APIGuild, message: GatewayMessageCreateDispatchData) {
	const channel = CHANNEL_CACHE.get(message.channel_id);

	if (!channel) {
		throw new Error("Channel not found.");
	}

	const now = skyNow();
	const seasonsText = [];
	const seasons = skySeasons(now);
	const upcomingSeason = skyUpcomingSeason(now);

	if (seasons.length > 0) {
		seasonsText.push(
			`- The seasons in Sky are: ${JSON.stringify(seasons.map((season) => ({ name: t(`seasons.${season.id}`, { lng: Locale.EnglishGB, ns: "general" }), start: season.start.toISO(), end: season.end.toISO() })))}.`,
		);
	}

	if (upcomingSeason) {
		seasonsText.push(
			`- The upcoming season in Sky is: ${JSON.stringify({ name: t(`seasons.${upcomingSeason.id}`, { lng: Locale.EnglishGB, ns: "general" }), start: upcomingSeason.start.toISO(), end: upcomingSeason.end.toISO() })}.`,
		);
	}

	const eventText = [];
	const events = skyCurrentEvents(now);
	const upcoming = skyUpcomingEvents(now);

	if (events.length > 0) {
		eventText.push(
			`- The current events in Sky are: ${JSON.stringify(events.map((event) => ({ name: t(`events.${event.id}`, { lng: Locale.EnglishGB, ns: "general" }), start: event.start.toISO(), end: event.end.toISO() })))}.`,
		);
	}

	if (upcoming.length > 0) {
		eventText.push(
			`- The upcoming events in Sky are: ${JSON.stringify(upcoming.map((event) => ({ name: t(`events.${event.id}`, { lng: Locale.EnglishGB, ns: "general" }), start: event.start.toISO(), end: event.end.toISO() })))}.`,
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
		`- A breakdown of winged light per realm (or area): ${JSON.stringify(AreaToWingedLightCount)}.`,
		`- The maximum amount of wing buffs is ${MAXIMUM_WING_BUFFS}.`,
		`- Upon achieving an amount of winged light, you acheve a wedge. Refer to: ${JSON.stringify(Object.entries(WINGED_LIGHT_THRESHOLDS).map(([index, wingedLight]) => ({ wedge: Number(index) + 1, wingedLight })))}.`,
		`- If you mention winged light, use ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)}.`,
		`- If you mention wing buffs, use ${formatEmoji(MISCELLANEOUS_EMOJIS.WingBuff)}.`,
		`- If you mention ascended candles, use ${formatEmoji(MISCELLANEOUS_EMOJIS.AscendedCandle)}.`,
		`- If you mention pieces of light (may be referred to as "wax"), use ${formatEmoji(MISCELLANEOUS_EMOJIS.Light)}.`,
		`- These are content creators on Sky: ${JSON.stringify(SKY_CREATOR_TROUPE)}.`,
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
					model: "gpt-3.5-turbo",
					user: message.author.id,
				},
				{ signal: abortController.signal },
			),
		]);

		await client.api.channels.createMessage(message.channel_id, {
			allowed_mentions: { parse: [AllowedMentionsTypes.User], replied_user: false },
			content: completion.choices[0]!.message.content ?? AI_DEFAULT_RESPONSE,
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
					{ role: "system", content: AI_DESCRIPTION_REACTION },
					{ content: message.content, name: parseAIName(message.author), role: "user" },
				],
				model: "gpt-3.5-turbo",
				user: message.author.id,
			},
			{ signal: abortController.signal },
		);

		const emojis = completion.choices[0]!.message.content;

		if (!emojis) {
			return;
		}

		await Promise.all(
			emojis.split("\n").map(async (emoji) =>
				client.api.channels.addMessageReaction(
					message.channel_id,
					message.id,
					// Responses uncommonly have a trailing space.
					emoji.trim(),
				),
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

export async function messageCreateResponse(message: GatewayMessageCreateDispatchData) {
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
		{ role: "system", content: systemPromptContext(guild, message) },
		...messages.map(
			(message) =>
				({
					content: message.content,
					name: parseAIName(message.author),
					role: message.author.id === APPLICATION_ID ? "assistant" : "user",
				}) as const,
		),
	];

	try {
		const [, completion] = await Promise.all([
			client.api.channels.showTyping(message.channel_id),
			openAI.chat.completions.create(
				{
					frequency_penalty: 1,
					max_completion_tokens: 200,
					messages: priorMessages,
					model: "gpt-4o-2024-08-06",
					user: message.author.id,
					tools: [
						{
							type: "function",
							function: {
								name: "shardEruption",
								description: `Returns shard eruption data. Call this whenever the shard eruption is asked for. For example, "What's the shard eruption today?".`,
								parameters: {
									type: "object",
									properties: {
										daysOffset: {
											type: "integer",
											description: `Number of days offset from the current day. Defaults to 0. For example, "What's the shard eruption tomorrow?"`,
											default: 0,
										},
										whenNextRegular: {
											type: "boolean",
											description: `Specified whenever asked about when the next regular (or black) shard eruption is. For example, "When is the next black shard?"`,
										},
										whenNextDangerous: {
											type: "boolean",
											description: `Specified whenever asked about when the next dangerous (or red) shard eruption is. For example, "When is the next black shard?"`,
										},
									},
									required: [],
									additionalProperties: false,
								},
							},
						},
					],
				},
				{ signal: abortController.signal },
			),
		]);

		const response = completion.choices[0];

		if (response?.finish_reason === "tool_calls") {
			const toolCall = response.message.tool_calls![0]!;
			const functionArguments = toolCall.function.arguments;
			const data = JSON.parse(functionArguments);
			let offset = data.daysOffset;

			if (data.whenNextRegular) {
				let index = offset ?? 1;

				while (shardEruption(index)?.strong) {
					index++;
				}

				offset = index;
			} else if (data.whenNextDangerous) {
				let index = offset ?? 1;

				while (shardEruption(index)?.strong === false) {
					index++;
				}

				offset = index;
			}

			await client.api.channels.createMessage(message.channel_id, {
				...todayEmbed(guild.preferred_locale, offset),
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
