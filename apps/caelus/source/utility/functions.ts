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
	ComponentType,
	InteractionType,
	type Locale,
	MessageFlags,
	type Snowflake,
} from "@discordjs/core";
import { ALLOWED_EXTENSIONS, calculateUserDefaultAvatarIndex } from "@discordjs/rest";
import { t } from "i18next";
import { client } from "../discord.js";
import {
	APPLICATION_ID,
	APPLICATION_INVITE_URL,
	SUPPORT_SERVER_INVITE_URL,
} from "./configuration.js";
import { ANIMATED_HASH_PREFIX, MAXIMUM_ASSET_SIZE } from "./constants.js";

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

export async function validateAttachment(
	interaction: APIChatInputApplicationCommandInteraction,
	{ size, filename }: APIAttachment,
) {
	if (
		size > MAXIMUM_ASSET_SIZE ||
		!ALLOWED_EXTENSIONS.some((extension) => filename.endsWith(`.${extension}`))
	) {
		await client.api.interactions.editReply(APPLICATION_ID, interaction.token, {
			content: `Please upload a valid attachment! It must be less than 5 megabytes and in any of the following formats:\n${ALLOWED_EXTENSIONS.map(
				(extension) => `- .${extension}`,
			).join("\n")}`,
		});

		return false;
	}

	return true;
}

export function isAnimatedHash(hash: string): hash is `${typeof ANIMATED_HASH_PREFIX}${string}` {
	return hash.startsWith(ANIMATED_HASH_PREFIX);
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
