import deLocale from "./locales/de.json" with { type: "json" };

export const WEBSITE_URL = "https://thatskyapplication.com" as const;
export const MAXIMUM_HAIR_TOUSLE_GIF = 3 as const;
export const MAXIMUM_HIGH_FIVE_GIF = 9 as const;
export const MAXIMUM_HUG_GIF = 41 as const;
export const MAXIMUM_PLAY_FIGHT_GIF = 8 as const;
export const MAXIMUM_KRILL_GIF = 11 as const;
export const INTERNATIONAL_SPACE_STATION_DATES = [6, 14, 22, 30] as const;
export const INTERNATIONAL_SPACE_STATION_PRIOR_DATES = [5, 13, 21, 29] as const;

export { CDN_URL } from "./cdn.js";
export { Cosmetic, WING_BUFFS } from "./cosmetics.js";
export { COUNTRY_VALUES, Country, CountryToEmoji, isCountry } from "./country.js";
export { isDuring, skyDate, skyNow, skyToday, TIME_ZONE } from "./dates.js";
export {
	type Emoji,
	emojiConstants,
	formatEmoji,
	formatEmojiURL,
	resolveCurrencyEmoji,
} from "./emojis.js";
export {
	skyCurrentEvents,
	skyEvents,
	skyEventYears,
	skyNotEndedEvents,
	skyUpcomingEvents,
} from "./events/index.js";
export {
	GUESS_DIFFICULTY_LEVEL_VALUES,
	GuessDifficultyLevel,
	GuessDifficultyLevelToName,
} from "./guess.js";
export {
	AreaToWingedLight,
	MAXIMUM_WINGED_LIGHT,
	MINIMUM_WINGED_LIGHT,
	REALM_NAME_VALUES,
	RealmName,
	SKY_MAP_VALUES,
	SkyMap,
	treasureCandles,
	VALID_REALM_NAME,
	VALID_REALM_NAME_VALUES,
	type ValidRealmName,
	WINGED_LIGHT_AREAS,
	WINGED_LIGHT_IN_AREAS,
	WINGED_LIGHT_THRESHOLDS,
} from "./kingdom.js";
export const de = deLocale;
export { default as enGB } from "./locales/en-gb.js";
export { default as es419 } from "./locales/es-419.js";
export { default as esES } from "./locales/es-es.js";
export { default as fr } from "./locales/fr.js";
export { default as it } from "./locales/it.js";
export { default as ja } from "./locales/ja.js";
export { default as ko } from "./locales/ko.js";
export { default as ptBR } from "./locales/pt-br.js";
export { default as ru } from "./locales/ru.js";
export { default as th } from "./locales/th.js";
export { default as vi } from "./locales/vi.js";
export { default as zhCN } from "./locales/zh-cn.js";
export { default as zhTW } from "./locales/zh-tw.js";
export { Event } from "./models/event.js";
export { Realm } from "./models/realm.js";
export { Season } from "./models/season.js";
export {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	type SeasonalSpiritVisitReturningData,
	type SeasonalSpiritVisitTravellingData,
	type SeasonalSpiritVisitTravellingErrorData,
	StandardSpirit,
	type StandardSpiritRealm,
} from "./models/spirits.js";
export {
	NOTIFICATION_TYPE_VALUES,
	type NotificationPacket,
	NotificationType,
	type NotificationTypes,
} from "./notifications.js";
export { isPlatformId, PLATFORM_ID_VALUES, PlatformId, type PlatformIds } from "./platforms.js";
export { DAILY_QUEST_VALUES, DailyQuest, type DailyQuests, isDailyQuest } from "./quests.js";
export {
	isSeasonId,
	RotationIdentifier,
	SEASON_PASS_SEASONAL_CANDLES_BONUS,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	SeasonId,
	type SeasonIds,
} from "./season.js";
export { type ShardEruptionData, shardEruption } from "./shard-eruption.js";
export { spirits } from "./spirits/index.js";
export {
	ELDER_SPIRITS,
	REALM_SPIRITS,
	REALMS,
	STANDARD_SPIRITS,
} from "./spirits/realms/index.js";
export {
	currentSeasonalSpirits,
	resolveReturningSpirits,
	resolveTravellingSpirit,
	skyCurrentSeason,
	skySeasons,
	skyUpcomingSeason,
} from "./spirits/seasons/index.js";
export type { Snowflake } from "./types/index.js";
export type { ProfilePacket } from "./types/profile.js";
export { LINK_REDIRECTOR_URL } from "./utility/constants.js";
export { EventId, type EventIds } from "./utility/event.js";
export {
	addCosts,
	getRandomElement,
	resolveAllCosmetics,
	resolveOffer,
	snakeCaseName,
} from "./utility/functions.js";
export {
	FriendAction,
	type Item,
	type ItemCost,
	type ItemRaw,
	isSpiritId,
	SpiritCall,
	SpiritEmote,
	SpiritId,
	type SpiritIds,
	SpiritStance,
	TRAVELLING_DATES,
} from "./utility/spirits.js";
