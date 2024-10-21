import type { EntitlementManager, Snowflake, User } from "discord.js";
import { SERVER_UPGRADE_SKU_ID } from "./constants-2.js";
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
	VALID_REALM_NAME,
	inconsistentMapKeys,
} from "./constants-2.js";

export async function resolveEntitlement(
	entitlementManager: EntitlementManager,
	guildId: Snowflake,
) {
	return (
		entitlementManager.cache.find(
			(entitlement) =>
				entitlement.guildId === guildId && entitlement.skuId === SERVER_UPGRADE_SKU_ID,
		) ?? (await entitlementManager.fetch({ guild: guildId, skus: [SERVER_UPGRADE_SKU_ID] })).first()
	);
}

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

export function userLogFormat(user: User) {
	return `${user} (${user.tag})`;
}

export function isRealm(realm: string): realm is RealmName {
	return REALM_NAME_VALUES.includes(realm as RealmName);
}

export function resolveValidRealm(realm: string) {
	const upperRealm = realm.toUpperCase();
	return (
		Object.values(VALID_REALM_NAME).find((validRealm) => validRealm.toUpperCase() === upperRealm) ??
		null
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
