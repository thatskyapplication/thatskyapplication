import type { Nullable } from "./types/index.js";
import type { UsersPacket } from "./users.js";

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
	hangout: string | null;
	catalogue_progression: boolean | null;
	guess_rank: boolean | null;
}

export type SkyProfileData = SkyProfilePacket &
	Pick<Nullable<UsersPacket>, "crowdin_user_id" | "supporter" | "artist">;

export const SkyProfileWingedLightType = {
	InferFromCatalogue: 0,
	Capeless: 1,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileWingedLightTypes =
	(typeof SkyProfileWingedLightType)[keyof typeof SkyProfileWingedLightType];

export const SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES = Object.values(SkyProfileWingedLightType);

export const SkyProfileEditType = {
	Name: 0,
	Icon: 1,
	Banner: 2,
	Description: 3,
	WingedLight: 4,
	Hangout: 5,
	Seasons: 6,
	Platforms: 7,
	CatalogueProgression: 8,
	GuessRank: 9,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileEditTypes = (typeof SkyProfileEditType)[keyof typeof SkyProfileEditType];
export const SKY_PROFILE_EDIT_TYPE_VALUES = Object.values(SkyProfileEditType);

export const SkyProfileResetType = {
	Description: 0,
	Icon: 1,
	Banner: 2,
	WingedLight: 3,
	Country: 4,
	Hangout: 5,
	Seasons: 6,
	Platforms: 7,
	Spirit: 8,
	CatalogueProgression: 9,
	GuessRank: 10,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileResetTypes = (typeof SkyProfileResetType)[keyof typeof SkyProfileResetType];
export const SKY_PROFILE_RESET_TYPE_VALUES = Object.values(SkyProfileResetType);
