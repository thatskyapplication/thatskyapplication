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
	type Snowflake,
	TextInputStyle,
} from "@discordjs/core";
import { t } from "i18next";
import { client } from "../discord.js";
import { APPLICATION_ID, SERVER_UPGRADE_SKU_ID } from "../utility/configuration.js";
import { CustomId } from "../utility/custom-id.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { ModalResolver } from "../utility/modal-resolver.js";

const ME_BIO_MAX_LENGTH = 190 as const;

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
	const { locale } = interaction;

	const components: APIMessageTopLevelComponent[] = [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `## ${t("me.title", { lng: locale, ns: "features" })}`,
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: t("me.message", { lng: locale, ns: "features" }),
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: CustomId.MeCustomiseMe,
							label: t("me.customise-me-button-label", { lng: locale, ns: "features" }),
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
							custom_id: CustomId.MeDeleteBio,
							label: t("me.delete-bio-button-label", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: CustomId.MeDeleteAvatar,
							label: t("me.delete-avatar-button-label", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: CustomId.MeDeleteBanner,
							label: t("me.delete-banner-button-label", { lng: locale, ns: "features" }),
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
	const { locale } = interaction;

	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## ${t("me.title", { lng: locale, ns: "features" })}`,
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: t("me.upsell-message", { lng: locale, ns: "features" }),
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

export async function meHandleCustomiseMeButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const { locale } = interaction;

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomId.MeCustomiseMeModalBio,
					max_length: ME_BIO_MAX_LENGTH,
					min_length: 1,
					style: TextInputStyle.Paragraph,
				},
				label: t("me.customise-me-modal-label-bio-label", { lng: locale, ns: "features" }),
				description: t("me.customise-me-modal-label-bio-description", {
					lng: locale,
					ns: "features",
				}),
			},
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.FileUpload,
					custom_id: CustomId.MeCustomiseMeModalAvatar,
					max_values: 1,
					min_values: 1,
					required: false,
				},
				label: t("me.customise-me-modal-label-avatar-label", { lng: locale, ns: "features" }),
				description: t("me.customise-me-modal-label-avatar-description", {
					lng: locale,
					ns: "features",
				}),
			},
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.FileUpload,
					custom_id: CustomId.MeCustomiseMeModalBanner,
					max_values: 1,
					min_values: 1,
					required: false,
				},
				label: t("me.customise-me-modal-label-banner-label", { lng: locale, ns: "features" }),
				description: t("me.customise-me-modal-label-banner-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.MeCustomiseMeModal,
		title: t("me.customise-me-modal-title", { lng: locale, ns: "features" }),
	});
}

export async function meHandleCustomiseMeModal(interaction: APIModalSubmitGuildInteraction) {
	const components = new ModalResolver(interaction.data);
	const bio = components.getTextInputValue(CustomId.MeCustomiseMeModalBio);
	const avatar = components.getFileUploadValues(CustomId.MeCustomiseMeModalAvatar)[0];
	const banner = components.getFileUploadValues(CustomId.MeCustomiseMeModalBanner)[0];
	const payload: RESTPatchAPICurrentGuildMemberJSONBody = {};

	if (bio) {
		payload.bio = bio;
	}

	const [avatarURI, bannerURI] = await Promise.all([
		avatar
			? fetch(avatar.url)
					.then((response) => response.arrayBuffer())
					.then(
						(buffer) =>
							`data:${avatar.content_type};base64,${Buffer.from(buffer).toString("base64")}`,
					)
			: null,
		banner
			? fetch(banner.url)
					.then((response) => response.arrayBuffer())
					.then(
						(buffer) =>
							`data:${banner.content_type};base64,${Buffer.from(buffer).toString("base64")}`,
					)
			: null,
	]);

	if (avatarURI) {
		payload.avatar = avatarURI;
	}

	if (bannerURI) {
		payload.banner = bannerURI;
	}

	await client.api.users.editCurrentGuildMember(interaction.guild_id, payload);
	await meOverview(interaction, { updateMessage: true });
}

export async function meHandleDeleteButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	options: RESTPatchAPICurrentGuildMemberJSONBody,
) {
	await client.api.users.editCurrentGuildMember(interaction.guild_id, options);
	await meOverview(interaction, { updateMessage: true });
}

export async function meDelete(guildId: Snowflake) {
	await client.api.users.editCurrentGuildMember(guildId, { bio: null, avatar: null, banner: null });
}
