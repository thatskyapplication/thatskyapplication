import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIAttachment,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIGuildInteractionWrapper,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitGuildInteraction,
	ComponentType,
	type InteractionsAPI,
	MessageFlags,
	type Snowflake,
	TextInputStyle,
} from "@discordjs/core";
import type { Emoji } from "@thatskyapplication/utility";
import { hash } from "hasha";
import sharp from "sharp";
import { client } from "../discord.js";
import type {
	ContentCreatorsEditOptions,
	ContentCreatorsPacket,
} from "../models/ContentCreators.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import S3Client from "../s3-client.js";
import {
	ANIMATED_HASH_PREFIX,
	APPLICATION_ID,
	CDN_BUCKET,
	CONTENT_CREATORS_DISPLAY_EDIT_CUSTOM_ID,
	CONTENT_CREATORS_EDIT_MODAL_CUSTOM_ID,
	CONTENT_CREATORS_EDIT_TEXT_INPUT_CUSTOM_ID,
	CONTENT_CREATORS_URL,
} from "../utility/constants.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { isAnimatedHash, isChatInputCommand } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";

export const ContentCreatorsEditType = {
	Name: 0,
	Description: 1,
	YouTube: 2,
	Twitch: 3,
	TikTok: 4,
	X: 5,
	Instagram: 6,
	Facebook: 7,
	Bluesky: 8,
} as const satisfies Readonly<Record<string, number>>;

const CONTENT_CREATORS_EDIT_TYPES = Object.values(ContentCreatorsEditType);
type ContentCreatorsEditTypes = (typeof CONTENT_CREATORS_EDIT_TYPES)[number];

const CONTENT_CREATORS_EDIT_TYPE_TO_COLUMN_NAME = {
	[ContentCreatorsEditType.Name]: "name",
	[ContentCreatorsEditType.Description]: "description",
	[ContentCreatorsEditType.YouTube]: "youtube",
	[ContentCreatorsEditType.Twitch]: "twitch",
	[ContentCreatorsEditType.TikTok]: "tiktok",
	[ContentCreatorsEditType.X]: "x",
	[ContentCreatorsEditType.Instagram]: "instagram",
	[ContentCreatorsEditType.Facebook]: "facebook",
	[ContentCreatorsEditType.Bluesky]: "bluesky",
} as const satisfies Readonly<Record<ContentCreatorsEditTypes, string>>;

const CONTENT_CREATORS_EDIT_TYPE_TO_TEXT = {
	[ContentCreatorsEditType.Name]: "Name",
	[ContentCreatorsEditType.Description]: "Description",
	[ContentCreatorsEditType.YouTube]: "YouTube",
	[ContentCreatorsEditType.Twitch]: "Twitch",
	[ContentCreatorsEditType.TikTok]: "TikTok",
	[ContentCreatorsEditType.X]: "X",
	[ContentCreatorsEditType.Instagram]: "Instagram",
	[ContentCreatorsEditType.Facebook]: "Facebook",
	[ContentCreatorsEditType.Bluesky]: "Bluesky",
} as const satisfies Readonly<Record<ContentCreatorsEditTypes, string>>;

const CONTENT_CREATORS_EDIT_TYPE_TO_EMOJI = {
	[ContentCreatorsEditType.Name]: { name: "📝" },
	[ContentCreatorsEditType.Description]: { name: "📝" },
	[ContentCreatorsEditType.YouTube]: MISCELLANEOUS_EMOJIS.YouTube,
	[ContentCreatorsEditType.Twitch]: MISCELLANEOUS_EMOJIS.Twitch,
	[ContentCreatorsEditType.TikTok]: MISCELLANEOUS_EMOJIS.TikTok,
	[ContentCreatorsEditType.X]: MISCELLANEOUS_EMOJIS.X,
	[ContentCreatorsEditType.Instagram]: MISCELLANEOUS_EMOJIS.Instagram,
	[ContentCreatorsEditType.Facebook]: MISCELLANEOUS_EMOJIS.Facebook,
	[ContentCreatorsEditType.Bluesky]: MISCELLANEOUS_EMOJIS.Bluesky,
} as const satisfies Readonly<Record<ContentCreatorsEditTypes, Emoji | { name: string }>>;

const CONTENT_CREATORS_EDIT_TYPE_TO_PLACEHOLDER = {
	[ContentCreatorsEditType.Name]: "thatskygame",
	[ContentCreatorsEditType.Description]:
		"I'm a content creator. I make content. Some of it is good. Promise.",
	[ContentCreatorsEditType.YouTube]: "@thatgamecompany",
	[ContentCreatorsEditType.Twitch]: "thatgamecompany",
	[ContentCreatorsEditType.TikTok]: "@thatskygame",
	[ContentCreatorsEditType.X]: "@thatskygame",
	[ContentCreatorsEditType.Instagram]: "thatskygame",
	[ContentCreatorsEditType.Facebook]: "thatskygame",
	[ContentCreatorsEditType.Bluesky]: "",
} as const satisfies Readonly<Record<ContentCreatorsEditTypes, string>>;

export const CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH = {
	[ContentCreatorsEditType.Name]: 20,
	[ContentCreatorsEditType.Description]: 200,
	[ContentCreatorsEditType.YouTube]: 100,
	[ContentCreatorsEditType.Twitch]: 50,
	[ContentCreatorsEditType.TikTok]: 30,
	[ContentCreatorsEditType.X]: 50,
	[ContentCreatorsEditType.Instagram]: 30,
	[ContentCreatorsEditType.Facebook]: 50,
	[ContentCreatorsEditType.Bluesky]: 50,
} as const satisfies Readonly<Record<ContentCreatorsEditTypes, number>>;

const CONTENT_CREATORS_DISPLAY_EDIT_OPTIONS = CONTENT_CREATORS_EDIT_TYPES.map((editType) => ({
	label: CONTENT_CREATORS_EDIT_TYPE_TO_TEXT[editType],
	emoji: CONTENT_CREATORS_EDIT_TYPE_TO_EMOJI[editType],
	value: String(editType),
}));

function isContentCreatorsEditType(editType: number): editType is ContentCreatorsEditTypes {
	return CONTENT_CREATORS_EDIT_TYPES.includes(editType as ContentCreatorsEditTypes);
}

function editResponse():
	| Parameters<InteractionsAPI["reply"]>[2]
	| Parameters<InteractionsAPI["updateMessage"]>[2] {
	return {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: CONTENT_CREATORS_DISPLAY_EDIT_CUSTOM_ID,
						options: CONTENT_CREATORS_DISPLAY_EDIT_OPTIONS,
						max_values: 1,
						min_values: 1,
						placeholder: "Select a social to edit.",
					},
				],
			},
		],
		content: `Content creator profiles are displayed over at <${CONTENT_CREATORS_URL}>.`,
		embeds: [],
		flags: MessageFlags.Ephemeral,
	};
}

export async function contentCreatorsDisplayEdit(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const editType = Number(interaction.data.values[0]);

	if (!isContentCreatorsEditType(editType)) {
		pino.warn(interaction, "Received an unknown content creators edit type.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [],
			content: "Unknown content creators edit type. Please try again!",
			embeds: [],
		});

		return;
	}

	const [contentCreatorsPacket] = await pg<ContentCreatorsPacket>(Table.ContentCreators).where({
		user_id: interaction.member.user.id,
	});

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						custom_id: CONTENT_CREATORS_EDIT_TEXT_INPUT_CUSTOM_ID,
						label:
							editType === ContentCreatorsEditType.Description
								? "Write a concise description about yourself."
								: `What is your ${CONTENT_CREATORS_EDIT_TYPE_TO_TEXT[editType]} handle?`,
						style:
							editType === ContentCreatorsEditType.Description
								? TextInputStyle.Paragraph
								: TextInputStyle.Short,
						max_length: CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[editType],
						min_length: 0,
						placeholder: CONTENT_CREATORS_EDIT_TYPE_TO_PLACEHOLDER[editType],
						value:
							contentCreatorsPacket?.[CONTENT_CREATORS_EDIT_TYPE_TO_COLUMN_NAME[editType]] ?? "",
						required: true,
					},
				],
			},
		],
		title: "Edit Content Creator Profile",
		custom_id: `${CONTENT_CREATORS_EDIT_MODAL_CUSTOM_ID}§${editType}`,
	});
}

function avatarRoute(userId: Snowflake, hash: string) {
	return `content_creators/avatars/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}`;
}

export async function contentCreatorsSetAvatar(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	attachment: APIAttachment,
) {
	const invokerId = interaction.member.user.id;

	const [contentCreatorsPacket] = await pg<ContentCreatorsPacket>(Table.ContentCreators).where({
		user_id: invokerId,
	});

	// Delete the old asset if it exists.
	if (contentCreatorsPacket?.avatar) {
		const hash = contentCreatorsPacket.avatar;

		await S3Client.send(
			new DeleteObjectCommand({
				Bucket: CDN_BUCKET,
				Key: avatarRoute(invokerId, hash),
			}),
		);
	}

	const gif = attachment.content_type === "image/gif";

	const assetBuffer = sharp(await (await fetch(attachment.url)).arrayBuffer(), {
		animated: true,
	});

	let buffer: Buffer;

	if (gif) {
		buffer = await assetBuffer.gif().toBuffer();
	} else {
		buffer = await assetBuffer.webp().toBuffer();
	}

	let hashedBuffer = await hash(buffer, { algorithm: "md5" });

	if (gif) {
		hashedBuffer = `${ANIMATED_HASH_PREFIX}${hashedBuffer}`;
	}

	await S3Client.send(
		new PutObjectCommand({
			Bucket: CDN_BUCKET,
			Key: avatarRoute(invokerId, hashedBuffer),
			Body: buffer,
		}),
	);

	return hashedBuffer;
}

export async function contentCreatorsEdit(
	interaction: APIChatInputApplicationCommandGuildInteraction | APIModalSubmitGuildInteraction,
	data: ContentCreatorsEditOptions = {},
	deferred = false,
) {
	if (data.tiktok && !data.tiktok.startsWith("@")) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "TikTok handles must start with `@`.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await pg<ContentCreatorsPacket>(Table.ContentCreators)
		.insert(
			{
				user_id: interaction.member.user.id,
				...data,
			},
			"*",
		)
		.onConflict("user_id")
		.merge();

	await (isChatInputCommand(interaction)
		? deferred
			? client.api.interactions.editReply(APPLICATION_ID, interaction.token, editResponse())
			: client.api.interactions.reply(interaction.id, interaction.token, editResponse())
		: client.api.interactions.updateMessage(interaction.id, interaction.token, editResponse()));
}

export async function contentCreatorsModalResponse(interaction: APIModalSubmitGuildInteraction) {
	const customId = interaction.data.custom_id;
	const editType = Number(customId.slice(customId.indexOf("§") + 1));

	if (!isContentCreatorsEditType(editType)) {
		pino.warn(interaction, "Received an unknown content creators edit type.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [],
			content: "Unknown content creators edit type. Please try again!",
			embeds: [],
		});

		return;
	}

	const components = new ModalResolver(interaction.data.components);
	const social = components.getTextInputValue(CONTENT_CREATORS_EDIT_TEXT_INPUT_CUSTOM_ID);
	await contentCreatorsEdit(interaction, {
		[CONTENT_CREATORS_EDIT_TYPE_TO_COLUMN_NAME[editType]]: social,
	});
}
