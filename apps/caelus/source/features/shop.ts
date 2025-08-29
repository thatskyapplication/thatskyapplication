import {
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	type APIModalSubmitInteraction,
	ButtonStyle,
	ChannelType,
	ComponentType,
	MessageFlags,
	PermissionFlagsBits,
	SeparatorSpacingSize,
	TextInputStyle,
} from "@discordjs/core";
import { formatEmoji } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pino from "../pino.js";
import { SHOP_SUGGESTIONS_CHANNEL_ID, SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import { DEFAULT_EMBED_COLOUR, SKY_PROFILES_URL } from "../utility/constants.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { avatarURL, interactionInvoker, userTag } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { can } from "../utility/permissions.js";

export const SHOP_SUGGEST_CUSTOM_ID = "SHOP_SUGGEST_CUSTOM_ID" as const;
export const SHOP_SUGGESTION_MODAL_CUSTOM_ID = "SHOP_SUGGESTION_MODAL_CUSTOM_ID" as const;
const SHOP_SUGGESTION_TEXT_INPUT_CUSTOM_ID = "SHOP_SUGGESTION_TEXT_INPUT_CUSTOM_ID" as const;

export function shop(): [APIMessageTopLevelComponent] {
	return [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: "## Shop",
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: `Welcome to the shop! You may make purchases using ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)}.\n\n...Except right now, there's nothing in stock. Have any ideas what could be in stock? Definitely tell us!`,
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Primary,
							label: "Suggest",
							custom_id: SHOP_SUGGEST_CUSTOM_ID,
							emoji: { name: "💬" },
						},
					],
				},
			],
		},
	];
}

export async function shopSuggestionModal(interaction: APIMessageComponentButtonInteraction) {
	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					custom_id: SHOP_SUGGESTION_TEXT_INPUT_CUSTOM_ID,
					style: TextInputStyle.Paragraph,
					placeholder: "A cool thing to have would be...",
					max_length: 1000,
					min_length: 1,
					required: true,
				},
				label: "What's your suggestion?",
				description: "Really, anything that comes to mind! Don't be shy!",
			},
		],
		custom_id: SHOP_SUGGESTION_MODAL_CUSTOM_ID,
		title: "Shop Suggestion",
	});
}

export async function shopSuggestionSubmission(interaction: APIModalSubmitInteraction) {
	const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

	if (!guild) {
		pino.error(interaction, "Could not find the guild of the shop suggestions channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Thank you for your suggestion!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const channel = guild.channels.get(SHOP_SUGGESTIONS_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildText) {
		pino.error(interaction, "Could not find the shop suggestions channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Thank you for your suggestion!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission:
				PermissionFlagsBits.EmbedLinks |
				PermissionFlagsBits.SendMessages |
				PermissionFlagsBits.ViewChannel,
			guild,
			member: me,
			channel,
		})
	) {
		pino.error(interaction, "Missing permissions to post in the shop suggestions channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Thank you for your suggestion!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const components = new ModalResolver(interaction.data.components);
	const text = components.getTextInputValue(SHOP_SUGGESTION_TEXT_INPUT_CUSTOM_ID);
	const invoker = interactionInvoker(interaction);

	await client.api.channels.createMessage(channel.id, {
		embeds: [
			{
				author: {
					name: `${userTag(invoker)} (${invoker.id})`,
					icon_url: avatarURL(invoker),
					url: `${SKY_PROFILES_URL}/${invoker.id}`,
				},
				color: DEFAULT_EMBED_COLOUR,
				description: text,
				timestamp: new Date().toISOString(),
			},
		],
	});

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: "Thank you for your suggestion!",
		flags: MessageFlags.Ephemeral,
	});
}
