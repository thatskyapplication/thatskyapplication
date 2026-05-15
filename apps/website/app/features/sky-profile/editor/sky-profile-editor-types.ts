import type {
	Country,
	PlatformIds,
	SeasonIds,
	SkyProfilePersonalityTypes,
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
}
