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
import { SkyMap, WEBSITE_URL, formatEmoji } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import Profile from "../models/Profile.js";
import pino from "../pino.js";
import { FEEDBACK_CHANNEL_ID, IDEA_TAG_ID, ISSUE_TAG_ID } from "../utility/configuration.js";
import {
	APPLICATION_INVITE_URL,
	DEFAULT_EMBED_COLOUR,
	DEVELOPER_GUILD_ID,
	GITHUB_SPONSORS_URL,
	KO_FI_URL,
	MAXIMUM_FEEDBACK_DESCRIPTION_LENGTH,
	MAXIMUM_FEEDBACK_TITLE_LENGTH,
	MINIMUM_FEEDBACK_TITLE_LENGTH,
	PATREON_URL,
	SKY_PROFILES_URL,
	SUPPORT_SERVER_INVITE_URL,
	THATSKYGAME_URL,
} from "../utility/constants.js";
import { EMOTE_EMOJIS } from "../utility/emojis.js";
import { avatarURL, interactionInvoker, userTag } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { can } from "../utility/permissions.js";

export const ABOUT_FEEDBACK_CUSTOM_ID = "ABOUT_FEEDBACK_CUSTOM_ID" as const;
export const ABOUT_ISSUE_CUSTOM_ID = "ABOUT_ISSUE_CUSTOM_ID" as const;
export const FEEDBACK_MODAL_CUSTOM_ID = "FEEDBACK_MODAL_CUSTOM_ID" as const;
const FEEDBACK_TITLE_TEXT_INPUT_CUSTOM_ID = "FEEDBACK_TITLE_TEXT_INPUT_CUSTOM_ID" as const;

const FEEDBACK_DESCRIPTION_TEXT_INPUT_CUSTOM_ID =
	"FEEDBACK_DESCRIPTION_TEXT_INPUT_CUSTOM_ID" as const;

export const ISSUE_MODAL_CUSTOM_ID = "ISSUE_MODAL_CUSTOM_ID" as const;
const ISSUE_TITLE_TEXT_INPUT_CUSTOM_ID = "ISSUE_TITLE_TEXT_INPUT_CUSTOM_ID" as const;
const ISSUE_DESCRIPTION_TEXT_INPUT_CUSTOM_ID = "ISSUE_DESCRIPTION_TEXT_INPUT_CUSTOM_ID" as const;

export async function about(): Promise<[APIMessageTopLevelComponent]> {
	const currentUser = await client.api.users.getCurrent();

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `## [${currentUser.username}](${WEBSITE_URL})`,
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Thumbnail,
						media: { url: avatarURL(currentUser) },
					},
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `### Description\n\nWelcome to the lovely Discord application for [Sky: Children of the Light](${THATSKYGAME_URL} "thatskygame")!\n\nSo you'd like to know about me, huh? Well, I like long walks across the ${SkyMap.SanctuaryIslands}. Oh, and don't forget about gliding all over the ${SkyMap.StarlightDesert}. Also... JELLYFISH!\n\nCheck out these useful links:`,
						},
						{
							type: ComponentType.TextDisplay,
							content: `- [Invite](${APPLICATION_INVITE_URL})\n- [Support](${SUPPORT_SERVER_INVITE_URL})\n- [Website](${WEBSITE_URL})`,
						},
					],
				},
				{
					type: ComponentType.TextDisplay,
					content: `### Sponsoring\n\nWant to give support? There are ways you can do that! Thank you in advance!\n- [Patreon](${PATREON_URL})\n- [Ko-fi](${KO_FI_URL})\n- [GitHub](${GITHUB_SPONSORS_URL})`,
				},
				{
					type: ComponentType.TextDisplay,
					content: `### Reporting issues & giving feedback\n\nYou may join the [support server](${SUPPORT_SERVER_INVITE_URL}) to do this.\n\nYou may also use the buttons below to do this without joining the server, if that's more your style.`,
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: ABOUT_FEEDBACK_CUSTOM_ID,
							label: "Submit feedback",
							emoji: EMOTE_EMOJIS.Thinking,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: ABOUT_ISSUE_CUSTOM_ID,
							label: "Report issue",
							emoji: EMOTE_EMOJIS.Duck,
						},
					],
				},
			],
		},
	];
}

export async function feedbackModalResponse(interaction: APIMessageComponentButtonInteraction) {
	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						style: TextInputStyle.Short,
						label: "Enter a suitable title for your feedback.",
						custom_id: FEEDBACK_TITLE_TEXT_INPUT_CUSTOM_ID,
						min_length: MINIMUM_FEEDBACK_TITLE_LENGTH,
						max_length: MAXIMUM_FEEDBACK_TITLE_LENGTH,
						required: true,
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						style: TextInputStyle.Paragraph,
						label: "Type your feedback here!",
						custom_id: FEEDBACK_DESCRIPTION_TEXT_INPUT_CUSTOM_ID,
						placeholder: "It would be cool to...\nI wish we could...",
						min_length: 1,
						max_length: MAXIMUM_FEEDBACK_DESCRIPTION_LENGTH,
						required: true,
					},
				],
			},
		],
		custom_id: FEEDBACK_MODAL_CUSTOM_ID,
		title: "Submit feedback",
	});
}

export async function feedbackSubmission(interaction: APIModalSubmitInteraction) {
	const guild = GUILD_CACHE.get(DEVELOPER_GUILD_ID);

	if (!guild) {
		pino.error(interaction, "Could not find the developer guild.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Thank you for your feedback! ${formatEmoji(EMOTE_EMOJIS.BlowKiss)}`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const channel = guild.channels.get(FEEDBACK_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildForum) {
		pino.error(interaction, "Could not find the feedback channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Thank you for your feedback! ${formatEmoji(EMOTE_EMOJIS.BlowKiss)}`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
			guild,
			member: me,
			channel,
		})
	) {
		pino.error(interaction, "Missing permissions to post in the feedback channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Thank you for your feedback! ${formatEmoji(EMOTE_EMOJIS.BlowKiss)}`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const components = new ModalResolver(interaction.data.components);
	const title = components.getTextInputValue(FEEDBACK_TITLE_TEXT_INPUT_CUSTOM_ID);
	const description = components.getTextInputValue(FEEDBACK_DESCRIPTION_TEXT_INPUT_CUSTOM_ID);
	const invoker = interactionInvoker(interaction);
	const profile = await Profile.fetch(invoker.id).catch(() => null);

	await client.api.channels.createForumThread(channel.id, {
		applied_tags: [IDEA_TAG_ID],
		message: {
			embeds: [
				{
					author: {
						name: `${profile?.name ?? userTag(invoker)} (${invoker.id})`,
						icon_url: profile?.iconURL ?? avatarURL(invoker),
						url: `${SKY_PROFILES_URL}/${invoker.id}`,
					},
					color: DEFAULT_EMBED_COLOUR,
					description,
					timestamp: new Date().toISOString(),
				},
			],
		},
		name: title,
	});

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: `Thank you for your feedback! ${formatEmoji(EMOTE_EMOJIS.BlowKiss)}`,
		flags: MessageFlags.Ephemeral,
	});
}

export async function issueModalResponse(interaction: APIMessageComponentButtonInteraction) {
	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						style: TextInputStyle.Short,
						label: "Enter a suitable title for your issue.",
						custom_id: ISSUE_TITLE_TEXT_INPUT_CUSTOM_ID,
						min_length: MINIMUM_FEEDBACK_TITLE_LENGTH,
						max_length: MAXIMUM_FEEDBACK_TITLE_LENGTH,
						required: true,
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						style: TextInputStyle.Paragraph,
						label: "Describe your issue here.",
						custom_id: ISSUE_DESCRIPTION_TEXT_INPUT_CUSTOM_ID,
						placeholder: "Every time I try to...\nNothing happens when...",
						min_length: 1,
						max_length: MAXIMUM_FEEDBACK_DESCRIPTION_LENGTH,
						required: true,
					},
				],
			},
		],
		custom_id: ISSUE_MODAL_CUSTOM_ID,
		title: "Report issue",
	});
}

export async function issueSubmission(interaction: APIModalSubmitInteraction) {
	const guild = GUILD_CACHE.get(DEVELOPER_GUILD_ID);

	if (!guild) {
		pino.error(interaction, "Could not find the developer guild.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Thank you for reporting your issue! ${formatEmoji(EMOTE_EMOJIS.BlowKiss)}`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const channel = guild.channels.get(FEEDBACK_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildForum) {
		pino.error(interaction, "Could not find the feedback channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Thank you for reporting your issue! ${formatEmoji(EMOTE_EMOJIS.BlowKiss)}`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
			guild,
			member: me,
			channel,
		})
	) {
		pino.error(interaction, "Missing permissions to post in the feedback channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Thank you for reporting your issue! ${formatEmoji(EMOTE_EMOJIS.BlowKiss)}`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const components = new ModalResolver(interaction.data.components);
	const title = components.getTextInputValue(ISSUE_TITLE_TEXT_INPUT_CUSTOM_ID);
	const description = components.getTextInputValue(ISSUE_DESCRIPTION_TEXT_INPUT_CUSTOM_ID);
	const invoker = interactionInvoker(interaction);
	const profile = await Profile.fetch(invoker.id).catch(() => null);

	await client.api.channels.createForumThread(channel.id, {
		applied_tags: [ISSUE_TAG_ID],
		message: {
			embeds: [
				{
					author: {
						name: `${profile?.name ?? userTag(invoker)} (${invoker.id})`,
						icon_url: profile?.iconURL ?? avatarURL(invoker),
						url: `${SKY_PROFILES_URL}/${invoker.id}`,
					},
					color: DEFAULT_EMBED_COLOUR,
					description,
					timestamp: new Date().toISOString(),
				},
			],
		},
		name: title,
	});

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: `Thank you for reporting your issue! ${formatEmoji(EMOTE_EMOJIS.BlowKiss)}`,
		flags: MessageFlags.Ephemeral,
	});
}
