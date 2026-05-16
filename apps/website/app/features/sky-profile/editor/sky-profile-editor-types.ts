import type {
	Country,
	PlatformIds,
	SeasonIds,
	SkyProfilePersonalityTypes,
	SkyProfileWingedLightTypes,
} from "@thatskyapplication/utility";

export interface SkyProfileActionErrors {
	banner?: string;
	catalogueProgression?: string;
	country?: string;
	description?: string;
	guessRank?: string;
	hangout?: string;
	icon?: string;
	name?: string;
	personality?: string;
	platforms?: string;
	seasons?: string;
	spirit?: string;
	wingedLight?: string;
}

export interface SkyProfileEditorValue {
	banner: string | null;
	catalogueProgression: boolean | null;
	country: Country | "";
	description: string;
	guessRank: boolean | null;
	hangout: string;
	icon: string | null;
	name: string;
	personality: SkyProfilePersonalityTypes | null;
	platforms: readonly PlatformIds[];
	seasons: readonly SeasonIds[];
	spirit: string;
	wingedLight: SkyProfileWingedLightTypes | null;
}

export interface SkyProfileFormProfile {
	catalogueProgression: boolean | null;
	country: Country | "";
	description: string;
	guessRank: boolean | null;
	hangout: string;
	name: string;
	personality: SkyProfilePersonalityTypes | null;
	platforms: readonly PlatformIds[];
	seasons: readonly SeasonIds[];
	spirit: string;
	wingedLight: SkyProfileWingedLightTypes | null;
}

export interface SkyProfileStorageValue {
	catalogue_progression: boolean | null;
	country: Country | null;
	description: string | null;
	guess_rank: boolean | null;
	hangout: string | null;
	name: string;
	personality: SkyProfilePersonalityTypes | null;
	platform: PlatformIds[] | null;
	seasons: SeasonIds[] | null;
	spirit: number | null;
	winged_light: SkyProfileWingedLightTypes | null;
}
