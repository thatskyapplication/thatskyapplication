export const WEBSITE_URL = "https://thatskyapplication.com" as const;
export const MAXIMUM_HAIR_TOUSLE_GIF = 3 as const;
export const MAXIMUM_HIGH_FIVE_GIF = 8 as const;
export const MAXIMUM_HUG_GIF = 36 as const;
export const MAXIMUM_PLAY_FIGHT_GIF = 6 as const;
export const MAXIMUM_KRILL_GIF = 11 as const;
export const INTERNATIONAL_SPACE_STATION_DATES = [6, 14, 22, 30] as const;
export const INTERNATIONAL_SPACE_STATION_PRIOR_DATES = [5, 13, 21, 29] as const;

// biome-ignore lint/performance/noBarrelFile: This is fine.
export { default as de } from "./locales/de.js";
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
export { MAXIMUM_WINGED_LIGHT, MINIMUM_WINGED_LIGHT } from "./utility/constants.js";
export { addCosts, resolveAllCosmetics, resolveOffer, snakeCaseName } from "./utility/functions.js";
export { CDN_URL } from "./cdn.js";
export { Cosmetic } from "./cosmetics.js";
export { COUNTRY_VALUES, Country, CountryToEmoji, isCountry } from "./country.js";
export { TIME_ZONE, isDuring, skyDate, skyNow, skyToday } from "./dates.js";
export { type Emoji, emojis, formatEmoji, formatEmojiURL, resolveCurrencyEmoji } from "./emojis.js";
export { EventId, type EventIds } from "./event.js";
export {
	GUESS_DIFFICULTY_LEVEL_VALUES,
	GuessDifficultyLevel,
	GuessDifficultyLevelToName,
} from "./guess.js";
export {
	REALM_NAME_VALUES,
	RealmName,
	SKY_MAP_VALUES,
	SkyMap,
	VALID_REALM_NAME,
	VALID_REALM_NAME_VALUES,
	type ValidRealmName,
} from "./kingdom.js";
export {
	NOTIFICATION_TYPE_VALUES,
	type NotificationPacket,
	NotificationType,
	type NotificationTypes,
} from "./notifications.js";
export { PlatformId, PLATFORM_ID_VALUES, type PlatformIds, isPlatformId } from "./platforms.js";
export { DAILY_QUEST_VALUES, DailyQuest, type DailyQuests } from "./quests.js";
export { SeasonId, type SeasonIds, isSeasonId } from "./season.js";
export { type ShardEruptionData, shardEruption } from "./shard-eruption.js";
export {
	FriendAction,
	type Item,
	type ItemCost,
	type ItemRaw,
	SPIRIT_TYPE,
	SpiritCall,
	SpiritEmote,
	SpiritId,
	type SpiritIds,
	SpiritStance,
	type SpiritType,
	TRAVELLING_DATES,
	isSpiritId,
} from "./spirits.js";
