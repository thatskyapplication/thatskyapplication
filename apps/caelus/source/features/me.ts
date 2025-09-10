import {
	type APIChatInputApplicationCommandGuildInteraction,
	type APIGuildInteractionWrapper,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	type APIModalSubmitGuildInteraction,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	type RESTPatchAPICurrentGuildMemberJSONBody,
	SeparatorSpacingSize,
	TextInputStyle,
} from "@discordjs/core";
import { client } from "../discord.js";
import { APPLICATION_ID, SERVER_UPGRADE_SKU_ID } from "../utility/configuration.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { ModalResolver } from "../utility/modal-resolver.js";

export const ME_SET_BIO_BUTTON_CUSTOM_ID = "ME_SET_BIO_BUTTON_CUSTOM_ID" as const;
export const ME_DELETE_BIO_CUSTOM_ID = "ME_DELETE_BIO_CUSTOM_ID" as const;
export const ME_DELETE_AVATAR_CUSTOM_ID = "ME_DELETE_AVATAR_CUSTOM_ID" as const;
export const ME_DELETE_BANNER_CUSTOM_ID = "ME_DELETE_BANNER_CUSTOM_ID" as const;
export const ME_SET_BIO_MODAL_CUSTOM_ID = "ME_SET_BIO_MODAL_CUSTOM_ID" as const;
const ME_SET_BIO_MODAL_BIO_CUSTOM_ID = "ME_SET_BIO_MODAL_BIO_CUSTOM_ID" as const;

interface MeOverviewOptions {
	editReply?: boolean;
	updateMessage?: boolean;
}

export async function meOverview(
	interaction:
		| APIChatInputApplicationCommandGuildInteraction
		| APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>
		| APIModalSubmitGuildInteraction,
	{ editReply, updateMessage }: MeOverviewOptions = {},
) {
	const components: APIMessageTopLevelComponent[] = [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: "## Me",
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content:
						"Want to customise me? ✨\n- Set my bio with the modal below!\n- Set my avatar and banner using the command! You can remove the override with the buttons below.",
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: ME_SET_BIO_BUTTON_CUSTOM_ID,
							label: "Set bio",
							emoji: MISCELLANEOUS_EMOJIS.Edit,
						},
					],
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: ME_DELETE_BIO_CUSTOM_ID,
							label: "Delete bio",
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: ME_DELETE_AVATAR_CUSTOM_ID,
							label: "Delete avatar",
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: ME_DELETE_BANNER_CUSTOM_ID,
							label: "Delete banner",
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						},
					],
				},
			],
		},
	];

	await (editReply
		? client.api.interactions.editReply(APPLICATION_ID, interaction.token, {
				components,
				flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
			})
		: updateMessage
			? client.api.interactions.updateMessage(interaction.id, interaction.token, { components })
			: client.api.interactions.reply(interaction.id, interaction.token, {
					components,
					flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
				}));
}

export async function meUpsell(interaction: APIChatInputApplicationCommandGuildInteraction) {
	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Me",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content:
							"This is a premium feature!\n\nYou may fully customise me by editing my bio, my banner, and my avatar in your server to whatever you like!\n\nTo get started, interact with the button below.",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								style: ButtonStyle.Premium,
								sku_id: SERVER_UPGRADE_SKU_ID,
							},
						],
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	});
}

export async function meHandleSetBioButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					custom_id: ME_SET_BIO_MODAL_BIO_CUSTOM_ID,
					// max_length: WELCOME_MESSAGE_MAXIMUM_LENGTH, Check this
					style: TextInputStyle.Paragraph,
					required: true,
				},
				label: "Set my bio!",
				description: "You can choose a bio for me to display in your server.",
			},
		],
		custom_id: ME_SET_BIO_MODAL_CUSTOM_ID,
		title: "My bio",
	});
}

export async function meHandleSetBioModal(interaction: APIModalSubmitGuildInteraction) {
	const components = new ModalResolver(interaction.data.components);
	const bio = components.getTextInputValue(ME_SET_BIO_MODAL_BIO_CUSTOM_ID);
	await client.api.users.editCurrentGuildMember(interaction.guild_id, { bio });
	await meOverview(interaction, { updateMessage: true });
}

export async function meHandleDeleteButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	options: RESTPatchAPICurrentGuildMemberJSONBody,
) {
	await client.api.users.editCurrentGuildMember(interaction.guild_id, options);
	await meOverview(interaction, { updateMessage: true });
}
