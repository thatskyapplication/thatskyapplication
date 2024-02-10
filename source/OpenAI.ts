import process from "node:process";
import { clearTimeout, setTimeout } from "node:timers";
import type { Message } from "discord.js";
import OpenAI from "openai";
import { APIUserAbortError } from "openai/error.mjs";
import pino from "./pino.js";

const { OPENAI_API_KEY } = process.env;
if (!OPENAI_API_KEY) throw new Error("No OpenAI API key.");
const openAI = new OpenAI({ apiKey: OPENAI_API_KEY });
const AI_DEFAULT_RESPONSE = "Oh my gosh! Could you be the... the legendary Sky kid?" as const;

const AI_DESCRIPTION =
	"You are named Caelus and you are currently chatting in a Discord server. Responses should be no longer than a sentence. Be engaging, positive, and happy. If you are going to refer to Sky: Children of the Light, simply say Sky. Do not refer to yourself as an AI." as const;

const AI_DESCRIPTION_EMOJIS = "Respond with up to 3 emojis that represent this message." as const;
const AI_DESCRIPTION_REACTION = `${AI_DESCRIPTION_EMOJIS} Put each emoji on a new line.` as const;

function parseAIName(input: string) {
	// It's not possible for a Discord username to be longer than 32 characters or return an empty output.
	const name = input.replaceAll(/[^\w-]/g, "");

	// This should never happen, but it did once... somehow.
	if (name.length === 0) {
		pino.warn(input, "AI name parsing failed.");
	}

	return name;
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
						{ content: message.content, name: parseAIName(message.author.username), role: "user" },
					],
					model: "gpt-3.5-turbo-1106",
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
		if (!(error instanceof APIUserAbortError)) pino.error(error, "AI error.");
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
					{ content: message.content, name: parseAIName(message.author.username), role: "user" },
				],
				model: "gpt-3.5-turbo-1106",
				user: message.author.id,
			},
			{ signal: abortController.signal },
		);

		const emojis = completion.choices[0]!.message.content;
		if (!emojis) return;
		await Promise.all(emojis.split("\n").map(async (emoji) => message.react(emoji)));
	} catch (error) {
		if (!(error instanceof APIUserAbortError)) pino.error(error, "AI error.");
	} finally {
		clearTimeout(timeout);
	}
}

export async function messageCreateResponse(message: Message<true>) {
	const abortController = new AbortController();
	const timeout = setTimeout(() => abortController.abort(), 20_000);
	const messages = message.channel.messages.cache.last(5);
	const lastMessageId = messages.at(-1)?.id;
	if (!lastMessageId) return;

	try {
		const [, completion] = await Promise.all([
			message.channel.sendTyping(),
			openAI.chat.completions.create(
				{
					frequency_penalty: 1,
					max_tokens: 100,
					messages: [
						{ role: "system", content: AI_DESCRIPTION },
						...messages.map(
							(message) =>
								({
									content: message.content,
									name: parseAIName(message.author.username),
									role: message.author.id === message.client.user.id ? "assistant" : "user",
								}) as const,
						),
					],
					model: "gpt-4-1106-preview",
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
		if (!(error instanceof APIUserAbortError)) pino.error(error, "AI error.");
	} finally {
		clearTimeout(timeout);
	}
}
