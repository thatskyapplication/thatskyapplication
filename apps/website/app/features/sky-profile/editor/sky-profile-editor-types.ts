import type {
	Country,
	PlatformIds,
	SeasonIds,
	SkyProfilePersonalityTypes,
	SkyProfileWingedLightTypes,
} from "@thatskyapplication/utility";

export interface SkyProfileActionErrors {
	banner?: string;
	country?: string;
	description?: string;
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
	country: Country | "";
	description: string;
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
	country: Country | "";
	description: string;
	hangout: string;
	name: string;
	personality: SkyProfilePersonalityTypes | null;
	platforms: readonly PlatformIds[];
	seasons: readonly SeasonIds[];
	spirit: string;
	wingedLight: SkyProfileWingedLightTypes | null;
}

export interface SkyProfileStorageValue {
	country: Country | null;
	description: string | null;
	hangout: string | null;
	name: string;
	personality: SkyProfilePersonalityTypes | null;
	platform: PlatformIds[] | null;
	seasons: SeasonIds[] | null;
	spirit: number | null;
	winged_light: SkyProfileWingedLightTypes | null;
}
