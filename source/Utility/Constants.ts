export const REPOSITORY = "Jiralite/Caelus" as const;
export const STARTUP_MESSAGE = "Twirling in the air~" as const;
export const LOG_CHANNEL_ID = "994581628804403250" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki/" as const;
export const MAXIMUM_WINGED_LIGHT = 206 as const;

export enum Realm {
	IslesOfDawn = "Isles of Dawn",
	DaylightPrairie = "Daylight Prairie",
	HiddenForest = "Hidden Forest",
	ValleyOfTriumph = "Valley of Triumph",
	GoldenWasteland = "Golden Wasteland",
	VaultOfKnowledge = "Vault of Knowledge",
	EyeOfEden = "Eye of Eden",
	AncientMemory = "Ancient Memory",
}

export const WingedLightCount = {
	IslesOfDawn: 9,
	DaylightPrairie: 21,
	HiddenForest: 19,
	ValleyOfTriumph: 17,
	GoldenWasteland: 18,
	VaultOfKnowledge: 11,
	EyeOfEden: 10,
	AncientMemory: 6,
	Orbit: 1,
} as const;
