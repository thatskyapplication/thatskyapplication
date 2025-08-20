import {
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	type APIModalSubmitInteraction,
	ButtonStyle,
	ChannelType,
	ComponentType,
	type Locale,
	MessageFlags,
	PermissionFlagsBits,
	SeparatorSpacingSize,
	TextInputStyle,
} from "@discordjs/core";
import {
	formatEmoji,
	type SkyProfilePacket,
	Table,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg from "../pg.js";
import pino from "../pino.js";
import {
	APPLICATION_INVITE_URL,
	FEEDBACK_CHANNEL_ID,
	IDEA_TAG_ID,
	ISSUE_TAG_ID,
	SUPPORT_SERVER_GUILD_ID,
	SUPPORT_SERVER_INVITE_URL,
} from "../utility/configuration.js";
import {
	DEFAULT_EMBED_COLOUR,
	GITHUB_SPONSORS_URL,
	KO_FI_URL,
	MAXIMUM_FEEDBACK_DESCRIPTION_LENGTH,
	MAXIMUM_FEEDBACK_TITLE_LENGTH,
	MINIMUM_FEEDBACK_TITLE_LENGTH,
	PATREON_URL,
	SKY_PROFILES_URL,
	THATSKYGAME_URL,
} from "../utility/constants.js";
import { EMOTE_EMOJIS } from "../utility/emojis.js";
import { avatarURL, interactionInvoker, userTag } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { can } from "../utility/permissions.js";
import { skyProfileIconURL } from "./sky-profile.js";

export const ABOUT_FEEDBACK_CUSTOM_ID = "ABOUT_FEEDBACK_CUSTOM_ID" as const;
export const ABOUT_ISSUE_CUSTOM_ID = "ABOUT_ISSUE_CUSTOM_ID" as const;
export const FEEDBACK_MODAL_CUSTOM_ID = "FEEDBACK_MODAL_CUSTOM_ID" as const;
const FEEDBACK_TITLE_TEXT_INPUT_CUSTOM_ID = "FEEDBACK_TITLE_TEXT_INPUT_CUSTOM_ID" as const;

const FEEDBACK_DESCRIPTION_TEXT_INPUT_CUSTOM_ID =
	"FEEDBACK_DESCRIPTION_TEXT_INPUT_CUSTOM_ID" as const;

export const ISSUE_MODAL_CUSTOM_ID = "ISSUE_MODAL_CUSTOM_ID" as const;
const ISSUE_TITLE_TEXT_INPUT_CUSTOM_ID = "ISSUE_TITLE_TEXT_INPUT_CUSTOM_ID" as const;
const ISSUE_DESCRIPTION_TEXT_INPUT_CUSTOM_ID = "ISSUE_DESCRIPTION_TEXT_INPUT_CUSTOM_ID" as const;

export async function about(locale: Locale): Promise<[APIMessageTopLevelComponent]> {
	const currentUser = await client.api.users.getCurrent();

	return [
		{
			type: ComponentType.Container,
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
							content: t("about.description", {
								lng: locale,
								ns: "features",
								url: THATSKYGAME_URL,
							}),
						},
						{
							type: ComponentType.TextDisplay,
							content: t("about.links", {
								lng: locale,
								ns: "features",
								applicationInviteURL: APPLICATION_INVITE_URL,
								supportServerInviteURL: SUPPORT_SERVER_INVITE_URL,
								websiteURL: WEBSITE_URL,
							}),
						},
					],
				},
				{
					type: ComponentType.TextDisplay,
					content: t("about.sponsor", {
						lng: locale,
						ns: "features",
						patreonURL: PATREON_URL,
						koFiURL: KO_FI_URL,
						githubSponsorsURL: GITHUB_SPONSORS_URL,
					}),
				},
				{
					type: ComponentType.TextDisplay,
					content: t("about.issues-feedback", {
						lng: locale,
						ns: "features",
						supportServerInviteURL: SUPPORT_SERVER_INVITE_URL,
					}),
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: ABOUT_FEEDBACK_CUSTOM_ID,
							label: t("about.feedback-button", { lng: locale, ns: "features" }),
							emoji: EMOTE_EMOJIS.Thinking,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: ABOUT_ISSUE_CUSTOM_ID,
							label: t("about.issue-button", { lng: locale, ns: "features" }),
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
						label: t("about.feedback-modal-title", { lng: interaction.locale, ns: "features" }),
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
						label: t("about.feedback-modal-description", {
							lng: interaction.locale,
							ns: "features",
						}),
						custom_id: FEEDBACK_DESCRIPTION_TEXT_INPUT_CUSTOM_ID,
						placeholder: t("about.feedback-modal-description-placeholder", {
							lng: interaction.locale,
							ns: "features",
						}),
						min_length: 1,
						max_length: MAXIMUM_FEEDBACK_DESCRIPTION_LENGTH,
						required: true,
					},
				],
			},
		],
		custom_id: FEEDBACK_MODAL_CUSTOM_ID,
		title: t("about.feedback-modal-heading", { lng: interaction.locale, ns: "features" }),
	});
}

export async function feedbackSubmission(interaction: APIModalSubmitInteraction) {
	const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

	if (!guild) {
		pino.error(interaction, "Could not find the developer guild.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("about.feedback-submission", {
				lng: interaction.locale,
				ns: "features",
				emoji: formatEmoji(EMOTE_EMOJIS.BlowKiss),
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const channel = guild.channels.get(FEEDBACK_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildForum) {
		pino.error(interaction, "Could not find the feedback channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("about.feedback-submission", {
				lng: interaction.locale,
				ns: "features",
				emoji: formatEmoji(EMOTE_EMOJIS.BlowKiss),
			}),
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
			content: t("about.feedback-submission", {
				lng: interaction.locale,
				ns: "features",
				emoji: formatEmoji(EMOTE_EMOJIS.BlowKiss),
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const components = new ModalResolver(interaction.data.components);
	const title = components.getTextInputValue(FEEDBACK_TITLE_TEXT_INPUT_CUSTOM_ID);
	const description = components.getTextInputValue(FEEDBACK_DESCRIPTION_TEXT_INPUT_CUSTOM_ID);
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("name", "icon")
		.where({ user_id: invoker.id })
		.first();

	await client.api.channels.createForumThread(channel.id, {
		applied_tags: [IDEA_TAG_ID],
		message: {
			embeds: [
				{
					author: {
						name: `${skyProfilePacket?.name ?? userTag(invoker)} (${invoker.id})`,
						icon_url:
							invoker.id && skyProfilePacket?.icon
								? skyProfileIconURL(invoker.id, skyProfilePacket.icon)
								: avatarURL(invoker),
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
		content: t("about.feedback-submission", {
			lng: interaction.locale,
			ns: "features",
			emoji: formatEmoji(EMOTE_EMOJIS.BlowKiss),
		}),
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
						label: t("about.issue-modal-title", { lng: interaction.locale, ns: "features" }),
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
						label: t("about.issue-modal-description", { lng: interaction.locale, ns: "features" }),
						custom_id: ISSUE_DESCRIPTION_TEXT_INPUT_CUSTOM_ID,
						placeholder: t("about.issue-modal-description-placeholder", {
							lng: interaction.locale,
							ns: "features",
						}),
						min_length: 1,
						max_length: MAXIMUM_FEEDBACK_DESCRIPTION_LENGTH,
						required: true,
					},
				],
			},
		],
		custom_id: ISSUE_MODAL_CUSTOM_ID,
		title: t("about.issue-modal-heading", { lng: interaction.locale, ns: "features" }),
	});
}

export async function issueSubmission(interaction: APIModalSubmitInteraction) {
	const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

	if (!guild) {
		pino.error(interaction, "Could not find the developer guild.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("about.issue-submission", {
				lng: interaction.locale,
				ns: "features",
				emoji: formatEmoji(EMOTE_EMOJIS.BlowKiss),
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const channel = guild.channels.get(FEEDBACK_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildForum) {
		pino.error(interaction, "Could not find the feedback channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("about.issue-submission", {
				lng: interaction.locale,
				ns: "features",
				emoji: formatEmoji(EMOTE_EMOJIS.BlowKiss),
			}),
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
			content: t("about.issue-submission", {
				lng: interaction.locale,
				ns: "features",
				emoji: formatEmoji(EMOTE_EMOJIS.BlowKiss),
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const components = new ModalResolver(interaction.data.components);
	const title = components.getTextInputValue(ISSUE_TITLE_TEXT_INPUT_CUSTOM_ID);
	const description = components.getTextInputValue(ISSUE_DESCRIPTION_TEXT_INPUT_CUSTOM_ID);
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("name", "icon")
		.where({ user_id: invoker.id })
		.first();

	await client.api.channels.createForumThread(channel.id, {
		applied_tags: [ISSUE_TAG_ID],
		message: {
			embeds: [
				{
					author: {
						name: `${skyProfilePacket?.name ?? userTag(invoker)} (${invoker.id})`,
						icon_url:
							invoker.id && skyProfilePacket?.icon
								? skyProfileIconURL(invoker.id, skyProfilePacket.icon)
								: avatarURL(invoker),
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
		content: t("about.issue-submission", {
			lng: interaction.locale,
			ns: "features",
			emoji: formatEmoji(EMOTE_EMOJIS.BlowKiss),
		}),
		flags: MessageFlags.Ephemeral,
	});
}
