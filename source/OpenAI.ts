import process from "node:process";
import type { Message } from "discord.js";
import OpenAI from "openai";

const { OPENAI_API_KEY } = process.env;
if (!OPENAI_API_KEY) throw new Error("No OpenAI API key.");
const openAI = new OpenAI({ apiKey: OPENAI_API_KEY });
const AI_DEFAULT_RESPONSE = "Oh my gosh! Could you be the... the legendary Sky kid?" as const;

const AI_DESCRIPTION =
	"You are named Caelus and you are currently chatting in a Discord server. Responses should be no longer than a sentence. Be engaging, positive, and happy. If you are going to refer to Sky: Children of the Light, simply say Sky. Do not refer to yourself as an AI." as const;

const AI_DESCRIPTION_EMOJIS = "Respond with up to 3 emojis that represent this message." as const;

export async function messageCreateEmojiResponse(message: Message<true>) {
	try {
		const [, completion] = await Promise.all([
			message.channel.sendTyping(),
			openAI.chat.completions.create({
				frequency_penalty: 1,
				max_tokens: 100,
				messages: [
					{ role: "system", content: AI_DESCRIPTION_EMOJIS },
					{ content: message.content, name: message.author.username, role: "user" },
				],
				model: "gpt-4-1106-preview",
				user: message.author.id,
			}),
		]);

		await message.reply({
			allowedMentions: { parse: ["users"], repliedUser: false },
			content: completion.choices[0]!.message.content ?? AI_DEFAULT_RESPONSE,
			failIfNotExists: false,
		});
	} catch (error) {
		void message.client.log({ content: "AI error.", error });
	}
}

export async function messageCreateResponse(message: Message<true>) {
	const messages = message.channel.messages.cache.last(5);
	const lastMessageId = messages.at(-1)?.id;
	if (!lastMessageId) return;

	try {
		const [, completion] = await Promise.all([
			message.channel.sendTyping(),
			openAI.chat.completions.create({
				frequency_penalty: 1,
				max_tokens: 100,
				messages: [
					{ role: "system", content: AI_DESCRIPTION },
					...messages.map(
						(message) =>
							({
								content: message.content,
								name: message.author.username,
								role: message.author.id === message.client.user.id ? "assistant" : "user",
							}) as const,
					),
				],
				model: "gpt-4-1106-preview",
				user: message.author.id,
			}),
		]);

		await message.reply({
			allowedMentions: { parse: ["users"], repliedUser: false },
			content: completion.choices[0]!.message.content ?? AI_DEFAULT_RESPONSE,
			failIfNotExists: false,
		});
	} catch (error) {
		void message.client.log({ content: "AI error.", error });
	}
}
