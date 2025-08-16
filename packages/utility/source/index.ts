// biome-ignore-all lint/performance/noBarrelFile: This is fine.

import deLocale from "./locales/de.json" with { type: "json" };
import es419Locale from "./locales/es-419.json" with { type: "json" };
import esESLocale from "./locales/es-es.json" with { type: "json" };
import frLocale from "./locales/fr.json" with { type: "json" };
import itLocale from "./locales/it.json" with { type: "json" };
import jaLocale from "./locales/ja.json" with { type: "json" };
import koLocale from "./locales/ko.json" with { type: "json" };
import ptBRLocale from "./locales/pt-br.json" with { type: "json" };
import ruLocale from "./locales/ru.json" with { type: "json" };
import thLocale from "./locales/th.json" with { type: "json" };
import viLocale from "./locales/vi.json" with { type: "json" };
import zhCNLocale from "./locales/zh-cn.json" with { type: "json" };
import zhTWLocale from "./locales/zh-tw.json" with { type: "json" };

export const WEBSITE_URL = "https://thatskyapplication.com" as const;
export const INTERNATIONAL_SPACE_STATION_DATES = [6, 14, 22, 30] as const;
export const INTERNATIONAL_SPACE_STATION_PRIOR_DATES = [5, 13, 21, 29] as const;
export type { CataloguePacket } from "./catalogue.js";
export { CDN_URL } from "./cdn.js";
export { Cosmetic, WING_BUFFS } from "./cosmetics.js";
export { COUNTRY_VALUES, Country, CountryToEmoji, isCountry } from "./country.js";
export {
	DAILY_QUEST_VALUES,
	type DailyGuidesPacket,
	DailyQuest,
	type DailyQuests,
	DailyQuestToInfographicURL,
	isDailyQuest,
} from "./daily-guides.js";
export { type BlueskyWebhooksPacket, type RedditWebhooksPacket, Table } from "./database.js";
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
	FRIENDSHIP_ACTIONS_CONTRIBUTORS,
	FRIENDSHIP_ACTIONS_CONTRIBUTORS_ARRAY,
	HAIR_TOUSLES,
	HIGH_FIVES,
	HUGS,
	HUGS_SQUARE,
	KRILLS,
	PLAY_FIGHTS,
} from "./friendship-actions.js";
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
export const es419 = es419Locale;
export const esES = esESLocale;
export const fr = frLocale;
export const it = itLocale;
export const ja = jaLocale;
export const ko = koLocale;
export const ptBR = ptBRLocale;
export const ru = ruLocale;
export const th = thLocale;
export const vi = viLocale;
export const zhCN = zhCNLocale;
export const zhTW = zhTWLocale;
export { Event } from "./models/event.js";
export { Realm } from "./models/realm.js";
export { Season } from "./models/season.js";
export {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	type SeasonalSpiritVisitReturningData,
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
export {
	SKY_PROFILE_EDIT_TYPE_VALUES,
	SKY_PROFILE_RESET_TYPE_VALUES,
	SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES,
	SkyProfileEditType,
	type SkyProfileEditTypes,
	type SkyProfilePacket,
	SkyProfileResetType,
	type SkyProfileResetTypes,
	SkyProfileWingedLightType,
	type SkyProfileWingedLightTypes,
} from "./sky-profile.js";
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
	TRAVELLING_DATES,
	VISITS_ABSENT,
} from "./spirits/seasons/index.js";
export type { Snowflake } from "./types/index.js";
export type { UsersPacket } from "./users.js";
export { LINK_REDIRECTOR_URL } from "./utility/constants.js";
export { EventId, type EventIds } from "./utility/event.js";
export {
	addCosts,
	getRandomElement,
	resolveAllCosmeticsFromItems,
	resolveOfferFromItems,
} from "./utility/functions.js";
export {
	FriendAction,
	type FriendshipTree,
	friendshipTreeToItems,
	type Item,
	type ItemCost,
	isSpiritId,
	SPIRITS_HISTORY_ORDER_TYPE_VALUES,
	SpiritEmote,
	SpiritId,
	type SpiritIds,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
} from "./utility/spirits.js";
