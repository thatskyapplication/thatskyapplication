import process from "node:process";
import type { Message, MessageContextMenuCommandInteraction } from "discord.js";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

const { OPENAI_API_KEY } = process.env;
if (!OPENAI_API_KEY) throw new Error("No OpenAI API key.");
const openAI = new OpenAI({ apiKey: OPENAI_API_KEY });

const AI_DEFAULT_RESPONSE = "Oh my gosh! Could you be the... the legendary Sky kid?" as const;

const AI_DESCRIPTION =
	"You are called Caelus. Responses should be short and whimsical. Responses should be relevant to Sky: Children of the Light. Do not refer to yourself as an AI." as const;

const AI_LAST_MESSAGE_CONTEXT = `${AI_DESCRIPTION} Use the previous messages as context.` as const;

function parseAIName(input: string) {
	const cleaned = input.replaceAll(/[^\w-]/g, "");
	return cleaned.length >= 1 ? cleaned : null;
}

export async function messageCreateResponse(message: Message<true>) {
	const messages = message.channel.messages.cache.first(5).reverse();
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
					...messages.map((message) => {
						const chatCompletionRequestMessage: ChatCompletionMessageParam = {
							content: `${message.id === lastMessageId ? `${AI_LAST_MESSAGE_CONTEXT}\n\n---\n\n` : ""}${
								message.content
							}`,
							role: message.author.id === message.client.user.id ? "assistant" : "user",
						};

						const name = parseAIName(message.member?.displayName ?? message.author.username);
						if (name) chatCompletionRequestMessage.name = name;
						return chatCompletionRequestMessage;
					}),
				],
				model: "gpt-3.5-turbo",
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

export async function skyStory(interaction: MessageContextMenuCommandInteraction) {
	await interaction.deferReply({ ephemeral: true });

	const chatCompletionRequestMessage: ChatCompletionMessageParam = {
		role: "user",
		content: interaction.targetMessage.content,
	};

	const name = parseAIName(interaction.user.username);
	if (name) chatCompletionRequestMessage.name = name;

	let completion;

	try {
		completion = await openAI.chat.completions.create({
			max_tokens: 1_000,
			messages: [
				{
					role: "system",
					content: "Generate a story about this message based on the game Sky: Children of the Light.",
				},
				chatCompletionRequestMessage,
			],
			model: "gpt-3.5-turbo",
			user: interaction.user.id,
		});
	} catch {
		await interaction.editReply(
			"The story I was thinking of was so beautiful and emotional that I forgot what I wrote. Sorry about that.",
		);

		return;
	}

	const response = completion.choices[0]!.message.content ?? AI_DEFAULT_RESPONSE;
	const responses = response.match(/.{1,2000}/gs);

	if (!responses) {
		await interaction.reply({
			content: "Quick! This is an ultra rare message. Screenshot it and show us!",
			ephemeral: true,
		});

		return;
	}

	for (const response of responses) await interaction.followUp({ content: response, ephemeral: true });
}
