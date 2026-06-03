import type { SkyProfilePacket } from "./sky-profile.js";

export interface HeartPacket {
	user_id: string | null;
	giftee_id: string | null;
	timestamp: Date;
	count: number;
}

export interface HeartHistoryPacket extends HeartPacket {
	giftee_name: SkyProfilePacket["name"];
	user_name: SkyProfilePacket["name"];
}

export const DELETED_USER_TEXT = "<deleted>" as const;

export const SkyProfileMissingNameSource = {
	Heart: 0,
	Guess: 1,
} as const satisfies Readonly<Record<string, number>>;

export const SKY_PROFILE_MISSING_NAME_SOURCE_VALUES = Object.values(SkyProfileMissingNameSource);
export type SkyProfileMissingNameSources = (typeof SKY_PROFILE_MISSING_NAME_SOURCE_VALUES)[number];
