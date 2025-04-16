import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIAttachment,
	type APIButtonComponent,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIGuildInteractionWrapper,
	type APIInteraction,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitInteraction,
	type APISelectMenuComponent,
	type APIUser,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	ComponentType,
	InteractionType,
	type Snowflake,
} from "@discordjs/core";
import { ALLOWED_EXTENSIONS } from "@discordjs/rest";
import {
	REALM_NAME_VALUES,
	type RealmName,
	SkyMap,
	VALID_REALM_NAME_VALUES,
} from "@thatskyapplication/utility";
import { client } from "../discord.js";
import { ANIMATED_HASH_PREFIX, APPLICATION_ID, MAXIMUM_ASSET_SIZE } from "./constants.js";
import {
	INCONSISTENT_MAP,
	MEDITATION_MAPS,
	type MeditationMaps,
	RAINBOW_ADMIRE_MAPS,
	type RainbowAdmireMaps,
	SOCIAL_LIGHT_AREA_MAPS,
	type SocialLightAreaMaps,
	inconsistentMapKeys,
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

export function interactedComponent(
	interaction: APIMessageComponentButtonInteraction,
): APIButtonComponent & { custom_id: string };

export function interactedComponent(
	interaction: APIMessageComponentSelectMenuInteraction,
): APISelectMenuComponent;

export function interactedComponent(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	return interaction.message
		.components!.flatMap((actionRow) => actionRow.components)
		.find(
			(component) => "custom_id" in component && component.custom_id === interaction.data.custom_id,
		)!;
}

export function userLogFormat(user: APIUser) {
	return `<@${user.id}> (${user.username}${user.discriminator === "0" ? "" : `#${user.discriminator}`})`;
}

export function isRealm(realm: string): realm is RealmName {
	return REALM_NAME_VALUES.includes(realm as RealmName);
}

export function resolveValidRealm(realm: string) {
	const upperRealm = realm.toUpperCase();

	return (
		VALID_REALM_NAME_VALUES.find((validRealm) => validRealm.toUpperCase() === upperRealm) ?? null
	);
}

export function resolveMap(rawMap: string) {
	const upperRawMap = rawMap.toUpperCase();

	const inconsistentResult = inconsistentMapKeys.find(
		(inconsistentMapKey): inconsistentMapKey is keyof typeof INCONSISTENT_MAP =>
			inconsistentMapKey.toUpperCase() === upperRawMap,
	);

	return inconsistentResult
		? INCONSISTENT_MAP[inconsistentResult]
		: (Object.values(SkyMap).find((skyMap) => skyMap.toUpperCase() === upperRawMap) ?? null);
}

export function isMeditationMap(skyMap: SkyMap): skyMap is MeditationMaps {
	return MEDITATION_MAPS.includes(skyMap as MeditationMaps);
}

export function isSocialLightAreaMap(skyMap: SkyMap): skyMap is SocialLightAreaMaps {
	return SOCIAL_LIGHT_AREA_MAPS.includes(skyMap as SocialLightAreaMaps);
}

export function isRainbowAdmireMap(skyMap: SkyMap): skyMap is RainbowAdmireMaps {
	return RAINBOW_ADMIRE_MAPS.includes(skyMap as RainbowAdmireMaps);
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

export function isSelectMenu(
	interaction: APIInteraction,
): interaction is APIMessageComponentSelectMenuInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		interaction.data.component_type === ComponentType.StringSelect
	);
}

export function isGuildSelectMenu(
	interaction: APIInteraction,
): interaction is APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction> {
	return isSelectMenu(interaction) && "guild_id" in interaction;
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
