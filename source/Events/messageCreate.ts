import process from "node:process";
import { MessageType, type Message, Events } from "discord.js";
import {
	ChatCompletionRequestMessageRoleEnum,
	Configuration,
	OpenAIApi,
	type ChatCompletionRequestMessage,
} from "openai";
import DailyGuides from "../Structures/DailyGuides.js";
import type { Event } from "./index.js";

const name = Events.MessageCreate;
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY! });
const openAI = new OpenAIApi(configuration);

function parseAIName(input: string) {
	const cleaned = input.replaceAll(/[^\w-]/g, "");
	return cleaned.length >= 1 && cleaned.length <= 64 ? cleaned : null;
}

async function AIResponse(message: Message<true>) {
	try {
		const [, completion] = await Promise.all([
			message.channel.sendTyping(),
			openAI.createChatCompletion({
				max_tokens: 100,
				messages: [
					{
						role: ChatCompletionRequestMessageRoleEnum.System,
						content: `You are ${message.client.user.username}. You are a kind, girly character that is upbeat based on the game Sky: Children of the Light. You are in a Discord server. Use emojis if you want. You are created by Jiralite.`,
					},
					...message.channel.messages.cache
						.map((message) => {
							const chatCompletionRequestMessage: ChatCompletionRequestMessage = {
								content: message.content,
								role:
									message.author.id === message.client.user.id
										? ChatCompletionRequestMessageRoleEnum.Assistant
										: ChatCompletionRequestMessageRoleEnum.User,
							};

							const name = parseAIName(message.member?.displayName ?? message.author.username);
							if (name) chatCompletionRequestMessage.name = name;
							return chatCompletionRequestMessage;
						})
						.slice(0, 20),
				],
				model: "gpt-3.5-turbo",
				user: message.author.id,
			}),
		]);

		await message.reply({
			allowedMentions: { parse: ["users"], repliedUser: false },
			content: completion.data.choices[0]!.message!.content,
			failIfNotExists: false,
		});
	} catch (error) {
		void message.client.log("AI error.", error);
	}
}

export const event: Event<typeof name> = {
	name,
	async fire(message) {
		if (!message.inGuild()) return;
		void DailyGuides.parse(message);
		if (message.author.bot) return;

		if ((Math.random() < 0.01 && message.content.length > 0) || message.mentions.has(message.client.user.id)) {
			void AIResponse(message);
		} else if (message.type === MessageType.Reply) {
			const referencedMessage = message.channel.messages.cache.get(message.reference!.messageId!);
			if (referencedMessage?.author.id === message.client.user.id) void AIResponse(message);
		}
	},
};
