import {
	type APIChatInputApplicationCommandGuildInteraction,
	type APIGuildInteractionWrapper,
	type APIInteraction,
	type APIMessageComponentSelectMenuInteraction,
	ApplicationCommandType,
	ComponentType,
	InteractionType,
	type Snowflake,
} from "@discordjs/core";

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
	return `https://thatskyapplication.com/sky-profile/${userId}`;
}
