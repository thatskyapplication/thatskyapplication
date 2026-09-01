import type { Kysely } from "kysely";
import { isAnimatedHash } from "./assets.js";
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

const SKY_PROFILE_REPORT_ASSETS = ["icon", "banner"] as const;

export type SkyProfileReportAsset = (typeof SKY_PROFILE_REPORT_ASSETS)[number];

export function isSkyProfileReportAsset(asset: string): asset is SkyProfileReportAsset {
	return SKY_PROFILE_REPORT_ASSETS.includes(asset as SkyProfileReportAsset);
}

export function skyProfileReportRoute(
	reportId: number,
	asset: SkyProfileReportAsset,
	hash: string,
) {
	return `reports/${reportId}/${asset}.${isAnimatedHash(hash) ? "gif" : "webp"}` as const;
}

export const SKY_PROFILE_REPORT_MAXIMUM_LENGTH = 1000 as const;
export const SKY_PROFILE_REPORT_MINIMUM_LENGTH = 10 as const;
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

export const SkyProfileEditTypeToLocaleKey = {
	[SkyProfileEditType.Name]: `features:sky-profile.edit-type-label.${SkyProfileEditType.Name}`,
	[SkyProfileEditType.Icon]: `features:sky-profile.edit-type-label.${SkyProfileEditType.Icon}`,
	[SkyProfileEditType.Banner]: `features:sky-profile.edit-type-label.${SkyProfileEditType.Banner}`,
	[SkyProfileEditType.Description]: `features:sky-profile.edit-type-label.${SkyProfileEditType.Description}`,
	[SkyProfileEditType.WingedLight]: `features:sky-profile.edit-type-label.${SkyProfileEditType.WingedLight}`,
	[SkyProfileEditType.Hangout]: `features:sky-profile.edit-type-label.${SkyProfileEditType.Hangout}`,
	[SkyProfileEditType.Seasons]: "general:season-plural",
	[SkyProfileEditType.Platforms]: `features:sky-profile.edit-type-label.${SkyProfileEditType.Platforms}`,
	[SkyProfileEditType.CatalogueProgression]: `features:sky-profile.edit-type-label.${SkyProfileEditType.CatalogueProgression}`,
	[SkyProfileEditType.GuessRank]: `features:sky-profile.edit-type-label.${SkyProfileEditType.GuessRank}`,
	[SkyProfileEditType.Personality]: `features:sky-profile.edit-type-label.${SkyProfileEditType.Personality}`,
	[SkyProfileEditType.Country]: `features:sky-profile.edit-type-label.${SkyProfileEditType.Country}`,
	[SkyProfileEditType.Spirit]: `features:sky-profile.edit-type-label.${SkyProfileEditType.Spirit}`,
} as const satisfies Readonly<Record<SkyProfileEditTypes, string>>;
