import process from "node:process";
import type { Message, MessageContextMenuCommandInteraction } from "discord.js";
import {
	type ChatCompletionRequestMessage,
	ChatCompletionRequestMessageRoleEnum,
	Configuration,
	OpenAIApi,
} from "openai";

const { OPENAI_API_KEY } = process.env;
if (!OPENAI_API_KEY) throw new Error("No OpenAI API key.");
const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openAIApi = new OpenAIApi(configuration);

function parseAIName(input: string) {
	const cleaned = input.replaceAll(/[^\w-]/g, "");
	return cleaned.length >= 1 ? cleaned : null;
}

export async function messageCreateResponse(message: Message<true>, random = false) {
	try {
		let messages;

		if (random) {
			messages = [
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
					.slice(-5),
				{
					role: ChatCompletionRequestMessageRoleEnum.System,
					content: `You are ${message.client.user.username}. Give a whimsical and short response.`,
				},
			];
		} else {
			messages = [
				{
					role: ChatCompletionRequestMessageRoleEnum.System,
					content: `You are ${message.client.user.username}. ${message.client.user.username} is based on the game Sky: Children of the Light and ${message.client.user.username} is kind! You are in a Discord server. Use emojis if you want. You are created by Jiralite.`,
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
					.slice(-20),
			];
		}

		const [, completion] = await Promise.all([
			message.channel.sendTyping(),
			openAIApi.createChatCompletion({
				frequency_penalty: 1,
				max_tokens: 100,
				messages,
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
		void message.client.log({ content: "AI error.", error });
	}
}

export async function skyStory(interaction: MessageContextMenuCommandInteraction) {
	await interaction.deferReply({ ephemeral: true });

	const chatCompletionRequestMessage: ChatCompletionRequestMessage = {
		role: ChatCompletionRequestMessageRoleEnum.User,
		content: interaction.targetMessage.content,
	};

	const name = parseAIName(interaction.user.username);
	if (name) chatCompletionRequestMessage.name = name;

	const completion = await openAIApi.createChatCompletion({
		max_tokens: 1_000,
		messages: [
			{
				role: ChatCompletionRequestMessageRoleEnum.System,
				content: `Generate a story about this message based on the game Sky: Children of the Light.`,
			},
			chatCompletionRequestMessage,
		],
		model: "gpt-3.5-turbo",
		user: interaction.user.id,
	});

	const { content } = completion.data.choices[0]!.message!;
	const responses = content.match(/.{1,2000}/gs);

	if (!responses) {
		await interaction.reply({
			content: "Quick! This is an ultra rare message. Screenshot it and show us!",
			ephemeral: true,
		});

		return;
	}

	for (const response of responses) await interaction.followUp({ content: response, ephemeral: true });
}
