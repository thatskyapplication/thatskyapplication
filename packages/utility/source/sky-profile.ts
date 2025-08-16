export interface SkyProfilePacket {
	user_id: string;
	name: string | null;
	icon: string | null;
	banner: string | null;
	description: string | null;
	country: string | null;
	winged_light: SkyProfileWingedLightTypes | null;
	seasons: number[] | null;
	platform: number[] | null;
	spirit: number | null;
	spot: string | null;
	catalogue_progression: boolean | null;
	guess_rank: boolean | null;
}

export const SkyProfileWingedLightType = {
	InferFromCatalogue: 0,
	Capeless: 1,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileWingedLightTypes =
	(typeof SkyProfileWingedLightType)[keyof typeof SkyProfileWingedLightType];

export const SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES = Object.values(SkyProfileWingedLightType);

export const SkyProfileEditType = {
	Name: 0,
	Description: 1,
	WingedLight: 2,
	Spot: 3,
	Seasons: 4,
	Platforms: 5,
	CatalogueProgression: 6,
	GuessRank: 7,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileEditTypes = (typeof SkyProfileEditType)[keyof typeof SkyProfileEditType];
export const SKY_PROFILE_EDIT_TYPE_VALUES = Object.values(SkyProfileEditType);

export const SkyProfileResetType = {
	Description: 0,
	Icon: 1,
	Banner: 2,
	WingedLight: 3,
	Country: 4,
	Spot: 5,
	Seasons: 6,
	Platforms: 7,
	Spirit: 8,
	CatalogueProgression: 9,
	GuessRank: 10,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileResetTypes = (typeof SkyProfileResetType)[keyof typeof SkyProfileResetType];
export const SKY_PROFILE_RESET_TYPE_VALUES = Object.values(SkyProfileResetType);
