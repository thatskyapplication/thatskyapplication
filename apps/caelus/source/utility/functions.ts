import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIAttachment,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIGuildInteractionWrapper,
	type APIInteraction,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APIModalSubmitGuildInteraction,
	type APIModalSubmitInteraction,
	type APIUser,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	ChannelType,
	ComponentType,
	InteractionType,
	type Locale,
	MessageFlags,
	type Snowflake,
} from "@discordjs/core";
import { calculateUserDefaultAvatarIndex } from "@discordjs/rest";
import { diffJson } from "diff";
import { t } from "i18next";
import { client } from "../discord.js";
import type { GuildChannel } from "../models/discord/guild.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import { APPLICATION_INVITE_URL, SUPPORT_SERVER_INVITE_URL } from "./configuration.js";
import {
	ALLOWED_IMAGE_MEDIA_TYPES,
	ALLOWED_MEDIA_TYPES,
	ANIMATED_HASH_PREFIX,
	MAXIMUM_ASSET_SIZE,
	SKY_PROFILES_URL,
} from "./constants.js";

export function chatInputApplicationCommandMention(
	id: Snowflake,
	commandName: string,
	subcommandName?: string | null | undefined,
	subcommandGroupName?: string | null | undefined,
) {
	return `</${commandName}${subcommandGroupName ? ` ${subcommandGroupName}` : ""}${
		subcommandName ? ` ${subcommandName}` : ""
	}:${id}>`;
}

export function interactionInvoker(interaction: APIInteraction) {
	return interaction.member?.user ?? interaction.user!;
}

export function resolveStringSelectMenu(
	components: APIMessageTopLevelComponent[],
	customId: string,
) {
	for (const component of components) {
		if (component.type === ComponentType.Container) {
			return resolveStringSelectMenu(component.components, customId);
		}

		if (component.type !== ComponentType.ActionRow) {
			continue;
		}

		for (const actionRowComponent of component.components) {
			if (
				actionRowComponent.type === ComponentType.StringSelect &&
				actionRowComponent.custom_id === customId
			) {
				return actionRowComponent;
			}
		}
	}

	return null;
}

export function userLogFormat(user: APIUser) {
	return `<@${user.id}> (${userTag(user)})`;
}

export function isChatInputCommand(
	interaction: APIInteraction,
): interaction is APIChatInputApplicationCommandInteraction {
	return (
		interaction.type === InteractionType.ApplicationCommand &&
		interaction.data.type === ApplicationCommandType.ChatInput
	);
}

export function isGuildChatInputCommand(
	interaction: APIInteraction,
): interaction is APIChatInputApplicationCommandGuildInteraction {
	return isChatInputCommand(interaction) && "guild_id" in interaction;
}

export function isUserContextMenuCommand(
	interaction: APIInteraction,
): interaction is APIUserApplicationCommandInteraction {
	return (
		interaction.type === InteractionType.ApplicationCommand &&
		interaction.data.type === ApplicationCommandType.User
	);
}

export function isButton(
	interaction: APIInteraction,
): interaction is APIMessageComponentButtonInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		interaction.data.component_type === ComponentType.Button
	);
}

export function isGuildButton(
	interaction: APIInteraction,
): interaction is APIGuildInteractionWrapper<APIMessageComponentButtonInteraction> {
	return isButton(interaction) && "guild_id" in interaction;
}

export function isStringSelectMenu(
	interaction: APIInteraction,
): interaction is APIMessageComponentSelectMenuInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		interaction.data.component_type === ComponentType.StringSelect
	);
}

function isRoleSelectMenu(
	interaction: APIInteraction,
): interaction is APIMessageComponentSelectMenuInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		interaction.data.component_type === ComponentType.RoleSelect
	);
}

function isChannelSelectMenu(
	interaction: APIInteraction,
): interaction is APIMessageComponentSelectMenuInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		interaction.data.component_type === ComponentType.ChannelSelect
	);
}

export function isGuildStringSelectMenu(
	interaction: APIInteraction,
): interaction is APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction> {
	return isStringSelectMenu(interaction) && "guild_id" in interaction;
}

export function isGuildRoleSelectMenu(
	interaction: APIInteraction,
): interaction is APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction> {
	return isRoleSelectMenu(interaction) && "guild_id" in interaction;
}

export function isGuildChannelSelectMenu(
	interaction: APIInteraction,
): interaction is APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction> {
	return isChannelSelectMenu(interaction) && "guild_id" in interaction;
}

export function isAutocomplete(
	interaction: APIInteraction,
): interaction is APIApplicationCommandAutocompleteInteraction {
	return interaction.type === InteractionType.ApplicationCommandAutocomplete;
}

export function isModalSubmit(
	interaction: APIInteraction,
): interaction is APIModalSubmitInteraction {
	return interaction.type === InteractionType.ModalSubmit;
}

export function isGuildModalSubmit(
	interaction: APIInteraction,
): interaction is APIModalSubmitGuildInteraction {
	return isModalSubmit(interaction) && "guild_id" in interaction;
}

export function notInCachedGuildResponse(locale: Locale) {
	return {
		content: t("interaction-not-in-cached-guild", {
			lng: locale,
			ns: "general",
			url1: APPLICATION_INVITE_URL,
			url2: SUPPORT_SERVER_INVITE_URL,
		}),
		flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
	};
}

export function isValidAttachment(attachment: APIAttachment) {
	return (
		attachment.size <= MAXIMUM_ASSET_SIZE &&
		ALLOWED_MEDIA_TYPES.some((mediaType) => attachment.content_type === mediaType)
	);
}

export function isValidImageAttachment(attachment: APIAttachment, maximumSize: number) {
	return (
		attachment.size <= maximumSize &&
		ALLOWED_IMAGE_MEDIA_TYPES.some((mediaType) => attachment.content_type === mediaType)
	);
}

export async function validateImageAttachment(
	interaction: APIChatInputApplicationCommandInteraction | APIModalSubmitInteraction,
	attachment: APIAttachment,
	maximumSize: number = MAXIMUM_ASSET_SIZE,
) {
	if (isValidImageAttachment(attachment, maximumSize)) {
		return true;
	}

	await client.api.interactions.editReply(interaction.application_id, interaction.token, {
		content: t("asset-image-invalid", {
			lng: interaction.locale,
			ns: "general",
			size: maximumSize / 1_000_000,
		}),
	});

	return false;
}

export function isAnimatedHash(hash: string): hash is `${typeof ANIMATED_HASH_PREFIX}${string}` {
	return hash.startsWith(ANIMATED_HASH_PREFIX);
}

export function isThreadChannel(
	channel: GuildChannel | AnnouncementThread | PublicThread | PrivateThread,
) {
	return (
		channel.type === ChannelType.AnnouncementThread ||
		channel.type === ChannelType.PublicThread ||
		channel.type === ChannelType.PrivateThread
	);
}

export function userTag(user: Pick<APIUser, "username" | "discriminator">) {
	return user.discriminator === "0" ? user.username : `${user.username}#${user.discriminator}`;
}

export function avatarURL(user: APIUser) {
	const index =
		user.discriminator === "0"
			? calculateUserDefaultAvatarIndex(user.id)
			: Number(user.discriminator) % 5;

	return user.avatar
		? client.rest.cdn.avatar(user.id, user.avatar, { size: 4096 })
		: client.rest.cdn.defaultAvatar(index);
}

export function messageLink(guildId: Snowflake, channelId: Snowflake, messageId: Snowflake) {
	return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
}

export function equalSet<T>(set1: Set<T>, set2: Set<T>) {
	if (set1.size !== set2.size) {
		return false;
	}

	for (const item of set1) {
		if (!set2.has(item)) {
			return false;
		}
	}

	return true;
}

export function skyProfileWebsiteURL<UserId extends Snowflake>(
	userId: UserId,
): `${typeof SKY_PROFILES_URL}/${UserId}` {
	return `${SKY_PROFILES_URL}/${userId}`;
}

export function formatArrayErrors(errors: readonly string[]) {
	return errors.length === 1 ? errors[0]! : errors.map((error) => `- ${error}`).join("\n");
}

export function diffJSON(old: Record<string, unknown>, updated: Record<string, unknown>) {
	const diffedJSON = diffJson(old, updated, { oneChangePerToken: true });
	let diffResult = "";

	for (const part of diffedJSON) {
		const text = part.added ? "+" : part.removed ? "-" : "";
		diffResult += `${text}${part.value.slice(part.added || part.removed ? 1 : 0)}`;
	}

	return diffResult;
}
