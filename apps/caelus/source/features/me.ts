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
import { COMMAND_CACHE } from "../caches/commands.js";
import { client } from "../discord.js";
import { APPLICATION_ID, SERVER_UPGRADE_SKU_ID } from "../utility/configuration.js";
import { CustomId } from "../utility/custom-id.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { chatInputApplicationCommandMention } from "../utility/functions.js";
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
	const configureCommandId = COMMAND_CACHE.get(t("configure.command-name", { ns: "commands" }));
	const messageLocaleOptions: Parameters<typeof t>[1] = { lng: locale, ns: "features" };
	let suffix: "mention" | "text";

	if (configureCommandId) {
		suffix = "mention";

		messageLocaleOptions.mention = chatInputApplicationCommandMention(
			configureCommandId,
			t("configure.command-name", { ns: "commands" }),
			t("configure.me.command-name", { ns: "commands" }),
		);
	} else {
		suffix = "text";
	}

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
					content: t(`me.message-${suffix}`, messageLocaleOptions),
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: CustomId.MeSetBio,
							label: t("me.set-bio-button-label", { lng: locale, ns: "features" }),
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

export async function meHandleSetBioButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const { locale } = interaction;

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomId.MeSetBioModalBio,
					max_length: ME_BIO_MAX_LENGTH,
					style: TextInputStyle.Paragraph,
					required: true,
				},
				label: t("me.set-bio-modal-label-bio-label", { lng: locale, ns: "features" }),
				description: t("me.set-bio-modal-label-bio-description", { lng: locale, ns: "features" }),
			},
		],
		custom_id: CustomId.MeSetBioModal,
		title: t("me.set-bio-modal-title", { lng: locale, ns: "features" }),
	});
}

export async function meHandleSetBioModal(interaction: APIModalSubmitGuildInteraction) {
	const components = new ModalResolver(interaction.data);
	const bio = components.getTextInputValue(CustomId.MeSetBioModalBio);
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

export async function meDelete(guildId: Snowflake) {
	await client.api.users.editCurrentGuildMember(guildId, { bio: null, avatar: null, banner: null });
}
