import type { Kysely } from "kysely";
import type { Packet } from "./database/index.js";
import type { DB } from "./database/schema.js";
import type { Nullable } from "./types/index.js";

export type SkyProfileData = Packet<"sky_profiles"> &
	Pick<Nullable<Packet<"users">>, "supporter" | "artist" | "translator">;

export function fetchSkyProfileWithFlags(database: Kysely<DB>, userId: string) {
	return database
		.selectFrom("sky_profiles as p")
		.leftJoin("users as u", "u.discord_user_id", "p.user_id")
		.selectAll("p")
		.select(["u.translator", "u.supporter", "u.artist"])
		.where("p.user_id", "=", userId)
		.executeTakeFirst();
}

export const SKY_PROFILE_MAXIMUM_NAME_LENGTH = 16 as const;
export const SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH = 3_000 as const;
export const SKY_PROFILE_MINIMUM_HANGOUT_LENGTH = 2 as const;
export const SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH = 50 as const;

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
	Country: 11,
	Spirit: 12,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileEditTypes = (typeof SkyProfileEditType)[keyof typeof SkyProfileEditType];
export const SKY_PROFILE_EDIT_TYPE_VALUES = Object.values(SkyProfileEditType);
