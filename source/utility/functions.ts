import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIButtonComponent,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIGuildInteractionWrapper,
	type APIInteraction,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitGuildInteraction,
	type APIModalSubmitInteraction,
	type APISelectMenuComponent,
	type APIUser,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	ComponentType,
	InteractionType,
	type Snowflake,
} from "@discordjs/core";
import { VALID_REALM_NAME_VALUES } from "./constants.js";
import {
	INCONSISTENT_MAP,
	MEDITATION_MAPS,
	type MeditationMaps,
	RAINBOW_ADMIRE_MAPS,
	REALM_NAME_VALUES,
	type RainbowAdmireMaps,
	type RealmName,
	SOCIAL_LIGHT_AREA_MAPS,
	SkyMap,
	type SocialLightAreaMaps,
	inconsistentMapKeys,
} from "./constants.js";

export function getRandomElement<const T>(array: readonly T[]) {
	return array[Math.floor(Math.random() * array.length)];
}

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
		: Object.values(SkyMap).find((skyMap) => skyMap.toUpperCase() === upperRawMap) ?? null;
}

export function resolveMeditationMap(map: MeditationMaps) {
	switch (map) {
		case SkyMap.ForestBrook:
		case SkyMap.Citadel:
			return `above the ${map}`;
		case SkyMap.BirdNest:
		case SkyMap.SanctuaryIslands:
		case SkyMap.Boneyard:
		case SkyMap.ForestClearing:
		case SkyMap.ForestEnd:
		case SkyMap.Coliseum:
		case SkyMap.VaultEntrance:
		case SkyMap.VaultSummit:
			return `at the ${map}`;
		case SkyMap.KoiPond:
		case SkyMap.IceRink:
			return `by the ${map}`;
		case SkyMap.ButterflyFields:
		case SkyMap.Cave:
		case SkyMap.ElevatedClearing:
		case SkyMap.BrokenTemple:
		case SkyMap.ForgottenArk:
		case SkyMap.Graveyard:
		case SkyMap.VaultSecondFloor:
			return `in the ${map}`;
		case SkyMap.Battlefield:
		case SkyMap.Boat:
			return `on the ${map}`;
	}
}

export function isMeditationMap(skyMap: SkyMap): skyMap is MeditationMaps {
	return MEDITATION_MAPS.includes(skyMap as MeditationMaps);
}

export function resolveSocialLightAreaMap(skyMap: SocialLightAreaMaps) {
	switch (skyMap) {
		case SkyMap.Cave:
			return `cosy hideout in the ${skyMap}`;
		case SkyMap.ElevatedClearing:
			return `ancestor's table of belonging in the ${skyMap}`;
		case SkyMap.VillageOfDreams:
			return `hot spring in the ${skyMap}`;
		case SkyMap.Graveyard:
			return `bonfire at the ${skyMap}`;
	}
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

export function isGuildModalSubmit(
	interaction: APIInteraction,
): interaction is APIModalSubmitGuildInteraction {
	return isModalSubmit(interaction) && "guild_id" in interaction;
}
