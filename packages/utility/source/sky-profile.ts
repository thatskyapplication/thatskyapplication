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
	personality: number | null;
}

export type SkyProfileData = SkyProfilePacket &
	Pick<Nullable<UsersPacket>, "supporter" | "artist" | "translator">;

export const SkyProfileWingedLightType = {
	InferFromCatalogue: 0,
	Capeless: 1,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileWingedLightTypes =
	(typeof SkyProfileWingedLightType)[keyof typeof SkyProfileWingedLightType];

export const SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES = Object.values(SkyProfileWingedLightType);

export const SkyProfilePersonalityType = {
	Counsellor: 0,
	Champion: 1,
	Teacher: 2,
	Healer: 3,
	Architect: 4,
	Marshall: 5,
	Mastermind: 6,
	Inventor: 7,
	Promoter: 8,
	Composer: 9,
	Performer: 10,
	Operator: 11,
	Inspector: 12,
	Supervisor: 13,
	Protector: 14,
	Provider: 15,
} as const satisfies Readonly<Record<string, number>>;

export const SKY_PROFILE_PERSONALITY_TYPE_VALUES = Object.values(SkyProfilePersonalityType);
export type SkyProfilePersonalityTypes = (typeof SKY_PROFILE_PERSONALITY_TYPE_VALUES)[number];

export function isSkyProfilePersonalityType(
	personality: number,
): personality is SkyProfilePersonalityTypes {
	return SKY_PROFILE_PERSONALITY_TYPE_VALUES.includes(personality as SkyProfilePersonalityTypes);
}

export const SkyProfilePersonalityToMBTI = {
	[SkyProfilePersonalityType.Counsellor]: "INFJ",
	[SkyProfilePersonalityType.Champion]: "ENFP",
	[SkyProfilePersonalityType.Teacher]: "ENFJ",
	[SkyProfilePersonalityType.Healer]: "INFP",
	[SkyProfilePersonalityType.Architect]: "INTP",
	[SkyProfilePersonalityType.Marshall]: "ENTJ",
	[SkyProfilePersonalityType.Mastermind]: "INTJ",
	[SkyProfilePersonalityType.Inventor]: "ENTP",
	[SkyProfilePersonalityType.Promoter]: "ESTP",
	[SkyProfilePersonalityType.Composer]: "ISFP",
	[SkyProfilePersonalityType.Performer]: "ESFP",
	[SkyProfilePersonalityType.Operator]: "ISTP",
	[SkyProfilePersonalityType.Inspector]: "ISTJ",
	[SkyProfilePersonalityType.Supervisor]: "ESTJ",
	[SkyProfilePersonalityType.Protector]: "ISFJ",
	[SkyProfilePersonalityType.Provider]: "ESFJ",
} as const satisfies Readonly<Record<SkyProfilePersonalityTypes, string>>;

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
	Personality: 10,
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
	Personality: 11,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileResetTypes = (typeof SkyProfileResetType)[keyof typeof SkyProfileResetType];
export const SKY_PROFILE_RESET_TYPE_VALUES = Object.values(SkyProfileResetType);
