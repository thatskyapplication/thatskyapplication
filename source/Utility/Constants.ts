export const LOG_CHANNEL_ID = "994581628804403250" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki/" as const;
export const MAXIMUM_WINGED_LIGHT = 206 as const;
// 4 from quests and 1 from candle running.
export const SEASONAL_CANDLES_PER_DAY = 5;
// As well as the above but with an extra seaonal candle a day from the meditation shrine.
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;

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
