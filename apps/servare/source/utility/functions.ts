import {
	type APIChatInputApplicationCommandGuildInteraction,
	type APIGuildInteractionWrapper,
	type APIInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIUser,
	ApplicationCommandType,
	ChannelType,
	ComponentType,
	InteractionType,
	type Snowflake,
} from "@discordjs/core";
import { calculateUserDefaultAvatarIndex } from "@discordjs/rest";
import { client } from "../discord.js";
import type { GuildChannel } from "../models/discord/guild.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";

export function isGuildChatInputCommand(
	interaction: APIInteraction,
): interaction is APIChatInputApplicationCommandGuildInteraction {
	return (
		interaction.type === InteractionType.ApplicationCommand &&
		interaction.data.type === ApplicationCommandType.ChatInput &&
		"guild_id" in interaction
	);
}

export function isGuildChannelSelectMenu(
	interaction: APIInteraction,
): interaction is APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction> {
	return (
		interaction.type === InteractionType.MessageComponent &&
		interaction.data.component_type === ComponentType.ChannelSelect &&
		"guild_id" in interaction
	);
}

export function skyProfileWebsiteURL(userId: Snowflake) {
	return `https://thatskyapplication.com/sky-profiles/${userId}`;
}

export function isThreadChannel(
	channel: GuildChannel | AnnouncementThread | PublicThread | PrivateThread,
): channel is AnnouncementThread | PublicThread | PrivateThread {
	return (
		channel.type === ChannelType.AnnouncementThread ||
		channel.type === ChannelType.PublicThread ||
		channel.type === ChannelType.PrivateThread
	);
}

export function userTag(user: APIUser) {
	return user.discriminator === "0" ? user.username : `${user.username}#${user.discriminator}`;
}

export function avatarURL(user: APIUser) {
	const index =
		user.discriminator === "0"
			? calculateUserDefaultAvatarIndex(user.id)
			: Number(user.discriminator) % 5;

	return user.avatar
		? client.rest.cdn.avatar(user.id, user.avatar)
		: client.rest.cdn.defaultAvatar(index);
}

export function messageLink(guildId: Snowflake, channelId: Snowflake, messageId: Snowflake) {
	return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
}
