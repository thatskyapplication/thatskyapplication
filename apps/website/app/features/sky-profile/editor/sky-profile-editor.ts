import {
	type Country,
	isCountry,
	isPlatformId,
	isSkyProfilePersonalityType,
	isSpiritId,
	type Packet,
	PLATFORM_ID_VALUES,
	type PlatformIds,
	type SeasonIds,
	SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES,
	type SkyProfilePersonalityTypes,
	type SkyProfileWingedLightTypes,
	skySeasons,
} from "@thatskyapplication/utility";
import type {
	SkyProfileEditorValue,
	SkyProfileFormProfile,
	SkyProfileStorageValue,
} from "./sky-profile-editor-types.js";

function orderedIdsForStorage<T extends number>(
	ids: readonly number[] | null,
	orderedValues: readonly T[],
): T[] | null {
	if (ids === null) {
		return null;
	}

	const orderedIds = orderedValues.filter((value) => ids.includes(value));
	return orderedIds.length > 0 ? orderedIds : null;
}

function seasonIdsForStorage(seasons: readonly number[] | null): SeasonIds[] | null {
	return orderedIdsForStorage(seasons, [...skySeasons().keys()]);
}

function platformIdsForStorage(platforms: readonly number[] | null): PlatformIds[] | null {
	return orderedIdsForStorage(platforms, PLATFORM_ID_VALUES);
}

function idSignature(ids: readonly number[] | null) {
	return ids?.join(",") ?? "";
}

export function toSkyProfileEditorValue(
	skyProfilePacket:
		| Pick<
				Packet<"sky_profiles">,
				| "banner"
				| "catalogue_progression"
				| "country"
				| "description"
				| "guess_rank"
				| "hangout"
				| "icon"
				| "name"
				| "personality"
				| "platform"
				| "seasons"
				| "spirit"
				| "winged_light"
		  >
		| null
		| undefined,
): SkyProfileEditorValue {
	const country = skyProfilePacket?.country;
	const personality = skyProfilePacket?.personality;
	const spirit = skyProfilePacket?.spirit;
	const wingedLight = skyProfilePacket?.winged_light;

	return {
		banner: skyProfilePacket?.banner ?? null,
		catalogueProgression: skyProfilePacket?.catalogue_progression ?? null,
		country: country && isCountry(country) ? country : "",
		description: skyProfilePacket?.description?.trim() ?? "",
		guessRank: skyProfilePacket?.guess_rank ?? null,
		hangout: skyProfilePacket?.hangout?.trim() ?? "",
		icon: skyProfilePacket?.icon ?? null,
		name: skyProfilePacket?.name?.trim() ?? "",
		personality:
			personality != null && isSkyProfilePersonalityType(personality) ? personality : null,
		platforms: platformIdsForStorage(skyProfilePacket?.platform ?? null) ?? [],
		seasons: seasonIdsForStorage(skyProfilePacket?.seasons ?? null) ?? [],
		spirit: spirit != null && isSpiritId(spirit) ? spirit.toString() : "",
		wingedLight:
			wingedLight != null && isSkyProfileWingedLightType(wingedLight) ? wingedLight : null,
	};
}

export function toSkyProfileFormProfile(editorValue: SkyProfileEditorValue): SkyProfileFormProfile {
	const { banner: _banner, icon: _icon, ...profile } = editorValue;
	return profile;
}

export function toSkyProfileStorageValue(
	formProfile: SkyProfileFormProfile,
): SkyProfileStorageValue {
	const description = formProfile.description.trim();
	const hangout = formProfile.hangout.trim();
	const spirit = formProfile.spirit.length > 0 ? Number.parseInt(formProfile.spirit, 10) : null;

	return {
		catalogue_progression: formProfile.catalogueProgression,
		country: formProfile.country || null,
		description: description.length > 0 ? description : null,
		guess_rank: formProfile.guessRank,
		hangout: hangout.length > 0 ? hangout : null,
		name: formProfile.name.trim(),
		personality: formProfile.personality,
		platform: platformIdsForStorage(formProfile.platforms),
		seasons: seasonIdsForStorage(formProfile.seasons),
		spirit,
		winged_light: formProfile.wingedLight,
	};
}

export function toSkyProfileStorageValueFromPacket(
	skyProfilePacket: Parameters<typeof toSkyProfileEditorValue>[0],
): SkyProfileStorageValue {
	const country = skyProfilePacket?.country;
	const description = skyProfilePacket?.description?.trim() ?? "";
	const hangout = skyProfilePacket?.hangout?.trim() ?? "";
	const personality = skyProfilePacket?.personality;
	const spirit = skyProfilePacket?.spirit;
	const wingedLight = skyProfilePacket?.winged_light;

	return {
		catalogue_progression: skyProfilePacket?.catalogue_progression ?? null,
		country: country && isCountry(country) ? country : null,
		description: description.length > 0 ? description : null,
		guess_rank: skyProfilePacket?.guess_rank ?? null,
		hangout: hangout.length > 0 ? hangout : null,
		name: skyProfilePacket?.name?.trim() ?? "",
		personality:
			personality != null && isSkyProfilePersonalityType(personality) ? personality : null,
		platform: platformIdsForStorage(skyProfilePacket?.platform ?? null),
		seasons: seasonIdsForStorage(skyProfilePacket?.seasons ?? null),
		spirit: spirit != null && isSpiritId(spirit) ? spirit : null,
		winged_light:
			wingedLight != null && isSkyProfileWingedLightType(wingedLight) ? wingedLight : null,
	};
}

export function hasSkyProfileStorageChanges(
	initialStorageValue: SkyProfileStorageValue,
	nextStorageValue: SkyProfileStorageValue,
) {
	return (
		initialStorageValue.name !== nextStorageValue.name ||
		initialStorageValue.description !== nextStorageValue.description ||
		idSignature(initialStorageValue.seasons) !== idSignature(nextStorageValue.seasons) ||
		initialStorageValue.spirit !== nextStorageValue.spirit ||
		initialStorageValue.hangout !== nextStorageValue.hangout ||
		initialStorageValue.personality !== nextStorageValue.personality ||
		initialStorageValue.country !== nextStorageValue.country ||
		idSignature(initialStorageValue.platform) !== idSignature(nextStorageValue.platform) ||
		initialStorageValue.winged_light !== nextStorageValue.winged_light ||
		initialStorageValue.catalogue_progression !== nextStorageValue.catalogue_progression ||
		initialStorageValue.guess_rank !== nextStorageValue.guess_rank
	);
}

export function hasSkyProfileEditorChanges(
	initialEditorValue: SkyProfileEditorValue,
	nextEditorValue: SkyProfileEditorValue,
) {
	return hasSkyProfileStorageChanges(
		toSkyProfileStorageValue(toSkyProfileFormProfile(initialEditorValue)),
		toSkyProfileStorageValue(toSkyProfileFormProfile(nextEditorValue)),
	);
}

export function isPlatformIds(value: readonly number[]): value is readonly PlatformIds[] {
	return value.every((platformId) => isPlatformId(platformId));
}

export function isSeasonIds(value: readonly number[]): value is readonly SeasonIds[] {
	const seasonIds = new Set(skySeasons().keys());
	return value.every((seasonId) => seasonIds.has(seasonId as SeasonIds));
}

export function isSkyProfilePersonality(
	value: number | null,
): value is SkyProfilePersonalityTypes | null {
	return value === null || isSkyProfilePersonalityType(value);
}

export function isSkyProfileWingedLight(
	value: number | null,
): value is SkyProfileWingedLightTypes | null {
	return (
		value === null ||
		SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES.includes(value as SkyProfileWingedLightTypes)
	);
}

export function isSkyProfileCountry(value: string): value is Country | "" {
	return value === "" || isCountry(value);
}

function isSkyProfileWingedLightType(value: number): value is SkyProfileWingedLightTypes {
	return SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES.includes(value as SkyProfileWingedLightTypes);
}
