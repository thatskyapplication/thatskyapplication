import {
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitInteraction,
	ComponentType,
	type InteractionsAPI,
	MessageFlags,
	TextInputStyle,
} from "@discordjs/core";
import { client } from "../discord.js";
import type { ContentCreatorsPacket } from "../models/ContentCreators.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	CONTENT_CREATORS_DISPLAY_EDIT_CUSTOM_ID,
	CONTENT_CREATORS_EDIT_MODAL_CUSTOM_ID,
	CONTENT_CREATORS_EDIT_TEXT_INPUT_CUSTOM_ID,
	CONTENT_CREATORS_URL,
} from "../utility/constants.js";
import { MISCELLANEOUS_EMOJIS, type MiscellaneousEmojis } from "../utility/emojis.js";
import { interactionInvoker } from "../utility/functions.js";
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
} as const satisfies Readonly<
	Record<ContentCreatorsEditTypes, MiscellaneousEmojis | { name: string }>
>;

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

const CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH = {
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

export const CONTENT_CREATORS_DISPLAY_EDIT_OPTIONS = CONTENT_CREATORS_EDIT_TYPES.map(
	(editType) => ({
		label: CONTENT_CREATORS_EDIT_TYPE_TO_TEXT[editType],
		emoji: CONTENT_CREATORS_EDIT_TYPE_TO_EMOJI[editType],
		value: String(editType),
	}),
);

function isContentCreatorsEditType(editType: number): editType is ContentCreatorsEditTypes {
	return CONTENT_CREATORS_EDIT_TYPES.includes(editType as ContentCreatorsEditTypes);
}

function editResponse(): Parameters<InteractionsAPI["updateMessage"]>[2] {
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
		embeds: [],
		content: `Content creator profiles are displayed over at <${CONTENT_CREATORS_URL}>.`,
	};
}

export async function contentCreatorsDisplayEditOptions(
	interaction: APIMessageComponentButtonInteraction,
) {
	await client.api.interactions.updateMessage(interaction.id, interaction.token, editResponse());
}

export async function contentCreatorsDisplayEdit(
	interaction: APIMessageComponentSelectMenuInteraction,
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

	const invoker = interactionInvoker(interaction);

	const [contentCreatorsPacket] = await pg<ContentCreatorsPacket>(Table.ContentCreators).where({
		user_id: invoker.id,
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

export async function contentCreatorsEdit(interaction: APIModalSubmitInteraction) {
	const invoker = interactionInvoker(interaction);
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

	if (
		(editType === ContentCreatorsEditType.YouTube ||
			editType === ContentCreatorsEditType.TikTok ||
			editType === ContentCreatorsEditType.X) &&
		!social.startsWith("@")
	) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "The handle must start with `@`.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await pg<ContentCreatorsPacket>(Table.ContentCreators)
		.insert(
			{
				user_id: invoker.id,
				[CONTENT_CREATORS_EDIT_TYPE_TO_COLUMN_NAME[editType]]: social,
			},
			"*",
		)
		.onConflict("user_id")
		.merge();

	await client.api.interactions.updateMessage(interaction.id, interaction.token, editResponse());
}
