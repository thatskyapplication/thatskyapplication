import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIComponentInContainer,
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
import type { RawFile } from "@discordjs/rest";
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
import S3Client from "../s3-client.js";
import {
	APPLICATION_ID,
	APPLICATION_INVITE_URL,
	CDN_BUCKET,
	CDN_URL,
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
import { CustomId } from "../utility/custom-id.js";
import { EMOTE_EMOJIS } from "../utility/emojis.js";
import { avatarURL, interactionInvoker, userTag } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { can } from "../utility/permissions.js";
import { skyProfileIconURL } from "./sky-profile.js";

const ALLOWED_MEDIA_TYPES = [
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/webp",
	"video/mp4",
	"video/quicktime",
] as const;

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
							custom_id: CustomId.AboutFeedback,
							label: t("about.feedback-button", { lng: locale, ns: "features" }),
							emoji: EMOTE_EMOJIS.Thinking,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: CustomId.AboutIssue,
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
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					style: TextInputStyle.Short,
					custom_id: CustomId.AboutFeedbackModalTitle,
					min_length: MINIMUM_FEEDBACK_TITLE_LENGTH,
					max_length: MAXIMUM_FEEDBACK_TITLE_LENGTH,
					required: true,
				},
				label: t("about.feedback-modal-label-title-label", {
					lng: interaction.locale,
					ns: "features",
				}),
				description: t("about.feedback-modal-label-title-description", {
					lng: interaction.locale,
					ns: "features",
				}),
			},
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					style: TextInputStyle.Paragraph,
					custom_id: CustomId.AboutFeedbackModalDescription,
					placeholder: t("about.feedback-modal-label-description-text-input-placeholder", {
						lng: interaction.locale,
						ns: "features",
					}),
					min_length: 1,
					max_length: MAXIMUM_FEEDBACK_DESCRIPTION_LENGTH,
					required: true,
				},
				label: "Feedback",
				description: t("about.feedback-modal-label-description-description", {
					lng: interaction.locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.AboutFeedbackModal,
		title: t("about.feedback-modal-title", { lng: interaction.locale, ns: "features" }),
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

	const components = new ModalResolver(interaction.data);
	const title = components.getTextInputValue(CustomId.AboutFeedbackModalTitle);
	const description = components.getTextInputValue(CustomId.AboutFeedbackModalDescription);
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
	const { locale } = interaction;

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					style: TextInputStyle.Short,
					custom_id: CustomId.AboutIssueModalTitle,
					min_length: MINIMUM_FEEDBACK_TITLE_LENGTH,
					max_length: MAXIMUM_FEEDBACK_TITLE_LENGTH,
					required: true,
				},
				label: t("about.issue-modal-label-title-label", {
					lng: locale,
					ns: "features",
				}),
				description: t("about.issue-modal-label-title-description", {
					lng: locale,
					ns: "features",
				}),
			},
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					style: TextInputStyle.Paragraph,
					custom_id: CustomId.AboutIssueModalDescription,
					placeholder: t("about.issue-modal-label-description-text-input-placeholder", {
						lng: locale,
						ns: "features",
					}),
					min_length: 1,
					max_length: MAXIMUM_FEEDBACK_DESCRIPTION_LENGTH,
					required: true,
				},
				label: t("about.issue-modal-label-description-label", {
					lng: locale,
					ns: "features",
				}),
				description: t("about.issue-modal-label-description-description", {
					lng: locale,
					ns: "features",
				}),
			},
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.FileUpload,
					min_values: 0,
					max_values: 10,
					custom_id: CustomId.AboutIssueModalAttachments,
					required: false,
				},
				label: t("about.issue-modal-label-attachments-label", {
					lng: locale,
					ns: "features",
				}),
				description: t("about.issue-modal-label-attachments-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.AboutIssueModal,
		title: t("about.issue-modal-title", { lng: locale, ns: "features" }),
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

	await client.api.interactions.defer(interaction.id, interaction.token, {
		flags: MessageFlags.Ephemeral,
	});

	const components = new ModalResolver(interaction.data);
	const title = components.getTextInputValue(CustomId.AboutIssueModalTitle);
	const description = components.getTextInputValue(CustomId.AboutIssueModalDescription);

	const attachments = components
		.getFileUploadValues(CustomId.AboutIssueModalAttachments)
		.filter((attachment) =>
			ALLOWED_MEDIA_TYPES.includes(attachment.content_type as (typeof ALLOWED_MEDIA_TYPES)[number]),
		);

	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("name", "icon")
		.where({ user_id: invoker.id })
		.first();

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Thumbnail,
				media: {
					url: skyProfilePacket?.icon
						? skyProfileIconURL(invoker.id, skyProfilePacket.icon)
						: avatarURL(invoker),
				},
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `## [${skyProfilePacket?.name ?? userTag(invoker)}](${SKY_PROFILES_URL}/${invoker.id})`,
				},
			],
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: description,
		},
	];

	const files: RawFile[] = [];

	if (attachments.length > 0) {
		const totalAttachmentsSize = attachments.reduce(
			(size, attachment) => size + attachment.size,
			0,
		);

		if (totalAttachmentsSize > guild.maximumUploadLimit) {
			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: await Promise.all(
					attachments.map(async (attachment) => {
						const response = await fetch(attachment.url);
						const buffer = Buffer.from(await response.arrayBuffer());
						const hash = createHash("md5").update(buffer).digest("hex");
						const extension = attachment.filename.slice(attachment.filename.lastIndexOf(".") + 1);

						await S3Client.send(
							new PutObjectCommand({
								Bucket: CDN_BUCKET,
								Key: supportServerIssueKey(hash, extension),
								Body: buffer,
							}),
						);

						return {
							media: { ...attachment, url: supportServerIssueRoute(hash, extension) },
						};
					}),
				),
			});
		} else {
			files.push(
				...(await Promise.all(
					attachments.map(async (attachment) => ({
						name: attachment.filename,
						data: Buffer.from(await (await fetch(attachment.url)).arrayBuffer()),
					})),
				)),
			);

			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: attachments.map((attachment) => ({
					description: attachment.description ?? null,
					media: { url: `attachment://${attachment.filename}` },
				})),
			});
		}
	}

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: `-# ${invoker.id}`,
		},
	);

	await client.api.channels.createForumThread(channel.id, {
		applied_tags: [ISSUE_TAG_ID],
		message: {
			components: [{ type: ComponentType.Container, components: containerComponents }],
			flags: MessageFlags.IsComponentsV2,
			files,
		},
		name: title,
	});

	await client.api.interactions.editReply(APPLICATION_ID, interaction.token, {
		content: t("about.issue-submission", {
			lng: interaction.locale,
			ns: "features",
			emoji: formatEmoji(EMOTE_EMOJIS.BlowKiss),
		}),
		flags: MessageFlags.Ephemeral,
	});
}

function supportServerIssueKey(hash: string, extension: string) {
	return `support_server/issues/${hash}.${extension}`;
}

function supportServerIssueRoute(hash: string, extension: string) {
	return new URL(supportServerIssueKey(hash, extension), CDN_URL).href;
}
