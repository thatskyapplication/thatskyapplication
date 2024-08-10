import process from "node:process";
import { clearTimeout, setTimeout } from "node:timers";
import type { Message, User } from "discord.js";
import OpenAI from "openai";
import { APIUserAbortError } from "openai/error.mjs";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { todayEmbed } from "./Structures/ShardEruption.js";
import { skyNow } from "./Utility/dates.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji } from "./Utility/emojis.js";
import { shardEruption } from "./Utility/shardEruption.js";
import { skyCurrentEvents, skyUpcomingEvents } from "./catalogue/events/index.js";
import { skySeasons, skyUpcomingSeason } from "./catalogue/spirits/seasons/index.js";
import pino from "./pino.js";

const { OPENAI_API_KEY } = process.env;

if (!OPENAI_API_KEY) {
	throw new Error("No OpenAI API key.");
}

const openAI = new OpenAI({ apiKey: OPENAI_API_KEY });
const AI_DEFAULT_RESPONSE = "Oh my gosh! Could you be the... the legendary Sky kid?" as const;
const AI_DESCRIPTION_EMOJIS = "Respond with up to 3 emojis that represent this message." as const;
const AI_DESCRIPTION_REACTION = `${AI_DESCRIPTION_EMOJIS} Put each emoji on a new line.` as const;

function parseAIName(user: User) {
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

function systemPromptContext(message: Message<true>) {
	const now = skyNow();
	const seasonsText = [];
	const seasons = skySeasons(now);
	const upcomingSeason = skyUpcomingSeason(now);

	if (seasons.length > 0) {
		seasonsText.push(
			`- The seasons in Sky are: ${JSON.stringify(seasons.map((season) => ({ name: season.name, start: season.start.toISO(), end: season.end.toISO() })))}.`,
		);
	}

	if (upcomingSeason) {
		seasonsText.push(
			`- The upcoming season in Sky is: ${JSON.stringify({ name: upcomingSeason.name, start: upcomingSeason.start.toISO(), end: upcomingSeason.end.toISO() })}.`,
		);
	}

	const eventText = [];
	const events = skyCurrentEvents(now);
	const upcoming = skyUpcomingEvents(now);

	if (events.length > 0) {
		eventText.push(
			`- The current events in Sky are: ${JSON.stringify(events.map((event) => ({ name: event.name, start: event.start.toISO(), end: event.end.toISO() })))}.`,
		);
	}

	if (upcoming.length > 0) {
		eventText.push(
			`- The upcoming events in Sky are: ${JSON.stringify(upcoming.map((event) => ({ name: event.name, start: event.start.toISO(), end: event.end.toISO() })))}.`,
		);
	}

	const systemPrompt = [
		`- You are named ${message.client.user.username}`,
		"- Responses should be no longer than a sentence.",
		`- It is currently ${now.toISO()}.`,
		"- Be engaging, positive, and happy.",
		'- Refer to "Sky: Children of the Light" as Sky.',
		`- If you mention ascended candles, use ${formatEmoji(MISCELLANEOUS_EMOJIS.AscendedCandle)}.`,
		`- If you mention pieces of light, use ${formatEmoji(MISCELLANEOUS_EMOJIS.Light)}.`,
	];

	if (seasonsText.length > 0) {
		systemPrompt.push(...seasonsText);
	}

	if (eventText.length > 0) {
		systemPrompt.push(...eventText);
	}

	systemPrompt.push(
		`- The author of this message is: ${JSON.stringify(message.author)}`,
		`- The channel you are in is: ${JSON.stringify({ name: message.channel.name, id: message.channel.id })}`,
		`- The guild you are in is: ${JSON.stringify({ name: message.guild.name, id: message.guild.id })}`,
	);

	return systemPrompt.join("\n");
}

export async function messageCreateEmojiResponse(message: Message<true>) {
	const abortController = new AbortController();
	const timeout = setTimeout(() => abortController.abort(), 10_000);

	try {
		const [, completion] = await Promise.all([
			message.channel.sendTyping(),
			openAI.chat.completions.create(
				{
					frequency_penalty: 1,
					max_tokens: 35,
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

		await message.reply({
			allowedMentions: { parse: ["users"], repliedUser: false },
			content: completion.choices[0]!.message.content ?? AI_DEFAULT_RESPONSE,
			failIfNotExists: false,
		});
	} catch (error) {
		if (!(error instanceof APIUserAbortError)) {
			pino.error(error, "AI error.");
		}
	} finally {
		clearTimeout(timeout);
	}
}

export async function messageCreateReactionResponse(message: Message<true>) {
	const abortController = new AbortController();
	const timeout = setTimeout(() => abortController.abort(), 10_000);

	try {
		const completion = await openAI.chat.completions.create(
			{
				frequency_penalty: 1,
				max_tokens: 35,
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
			emojis
				.split("\n")
				// Responses uncommonly have a trailing space.
				.map(async (emoji) => message.react(emoji.trim())),
		);
	} catch (error) {
		if (!(error instanceof APIUserAbortError)) {
			pino.error(error, "AI error.");
		}
	} finally {
		clearTimeout(timeout);
	}
}

export async function messageCreateResponse(message: Message<true>) {
	const abortController = new AbortController();
	const timeout = setTimeout(() => abortController.abort(), 20_000);
	const messages = message.channel.messages.cache.last(5);
	const lastMessageId = messages.at(-1)?.id;

	if (!lastMessageId) {
		return;
	}

	const priorMessages: ChatCompletionMessageParam[] = [
		{ role: "system", content: systemPromptContext(message) },
		...messages.map(
			(message) =>
				({
					content: message.content,
					name: parseAIName(message.author),
					role: message.author.id === message.client.user.id ? "assistant" : "user",
				}) as const,
		),
	];

	try {
		const [, completion] = await Promise.all([
			message.channel.sendTyping(),
			openAI.chat.completions.create(
				{
					frequency_penalty: 1,
					max_tokens: 100,
					messages: priorMessages,
					model: "gpt-4o",
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

			await message.reply({
				...todayEmbed(message.guild.preferredLocale, offset),
				failIfNotExists: false,
			});
		} else {
			await message.reply({
				allowedMentions: { parse: ["users"], repliedUser: false },
				content: completion.choices[0]!.message.content ?? AI_DEFAULT_RESPONSE,
				failIfNotExists: false,
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
