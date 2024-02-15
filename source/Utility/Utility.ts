import { type Snowflake, type User } from "discord.js";
import type { DateTime } from "luxon";
import {
	type MeditationMaps,
	type RainbowAdmireMaps,
	type Realm,
	type SocialLightAreaMaps,
	INCONSISTENT_MAP,
	inconsistentMapKeys,
	Map,
	MEDITATION_MAPS,
	RAINBOW_ADMIRE_MAPS,
	REALM_VALUES,
	SOCIAL_LIGHT_AREA_MAPS,
	VALID_REALM,
} from "./Constants.js";
import { INITIAL_TREASURE_CANDLE_REALM_SEEK } from "./dates.js";

export function treasureCandleRealm(date: DateTime) {
	return VALID_REALM[date.diff(INITIAL_TREASURE_CANDLE_REALM_SEEK, "day").days % 5]!;
}

export function isRealm(realm: string): realm is Realm {
	return REALM_VALUES.includes(realm as Realm);
}

export function resolveValidRealm(realm: string) {
	const upperRealm = realm.toUpperCase();
	return Object.values(VALID_REALM).find((validRealm) => validRealm.toUpperCase() === upperRealm) ?? null;
}

export function resolveMap(rawMap: string) {
	const upperRawMap = rawMap.toUpperCase();

	const inconsistentResult = inconsistentMapKeys.find(
		(inconsistentMapKey): inconsistentMapKey is keyof typeof INCONSISTENT_MAP =>
			inconsistentMapKey.toUpperCase() === upperRawMap,
	);

	return inconsistentResult
		? INCONSISTENT_MAP[inconsistentResult]
		: Object.values(Map).find((map) => map.toUpperCase() === upperRawMap) ?? null;
}

export function resolveMeditationMap(map: MeditationMaps) {
	switch (map) {
		case Map.ForestBrook:
		case Map.Citadel:
			return `above the ${map}`;
		case Map.SanctuaryIslands:
		case Map.Boneyard:
		case Map.ForestClearing:
		case Map.Coliseum:
		case Map.VaultEntrance:
		case Map.VaultSummit:
			return `at the ${map}`;
		case Map.KoiPond:
		case Map.IceRink:
			return `by the ${map}`;
		case Map.ButterflyFields:
		case Map.Cave:
		case Map.ElevatedClearing:
		case Map.BrokenTemple:
		case Map.ForgottenArk:
		case Map.Graveyard:
		case Map.VaultSecondFloor:
			return `in the ${map}`;
		case Map.Battlefield:
		case Map.Boat:
			return `on the ${map}`;
	}
}

export function isMeditationMap(map: Map): map is MeditationMaps {
	return MEDITATION_MAPS.includes(map as MeditationMaps);
}

export function resolveSocialLightAreaMap(map: SocialLightAreaMaps) {
	switch (map) {
		case Map.Cave:
			return `cosy hideout in the ${map}`;
		case Map.ElevatedClearing:
			return `ancestor's table of belonging in the ${map}`;
		case Map.VillageOfDreams:
			return `hot spring in the ${map}`;
		case Map.Graveyard:
			return `bonfire at the ${map}`;
	}
}

export function isSocialLightAreaMap(map: Map): map is SocialLightAreaMaps {
	return SOCIAL_LIGHT_AREA_MAPS.includes(map as SocialLightAreaMaps);
}

export function isRainbowAdmireMap(map: Map): map is RainbowAdmireMaps {
	return RAINBOW_ADMIRE_MAPS.includes(map as RainbowAdmireMaps);
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
