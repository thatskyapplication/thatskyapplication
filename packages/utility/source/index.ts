// biome-ignore-all lint/performance/noBarrelFile: This is fine.

// Temporal polyfill is required for Safari.
import "temporal-polyfill/global";
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
export const CROWDIN_URL = "https://thatskyapplication.crowdin.com" as const;
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
export { type APIGuildsMeResponse, guildsMeRoute } from "./api.js";
export {
	ALLOWED_IMAGE_MEDIA_TYPES,
	ANIMATED_HASH_PREFIX,
	isAnimatedHash,
	isValidImageAsset,
	MAXIMUM_ASSET_BANNER_DIMENSION,
	MAXIMUM_ASSET_ICON_DIMENSION,
	MAXIMUM_ASSET_INPUT_PIXELS,
	MAXIMUM_ASSET_PROCESSING_SECONDS,
	MAXIMUM_ASSET_SIZE,
} from "./assets.js";
export {
	type CataloguePacket,
	type CatalogueProgress,
	CLOTHING_SHOP,
	catalogueComplete,
	catalogueEventItems,
	catalogueItems,
	cataloguePercentage,
	catalogueProgress,
	catalogueSeasonItems,
	catalogueSpiritItems,
	collectSpiritCosmetics,
	NESTING_WORKSHOP,
	partitionItemCosts,
	SECRET_AREA,
	STARTER_PACKS,
} from "./catalogue.js";
export type { ChecklistPacket, ChecklistSetData } from "./checklist.js";
export { checklistResetPayload } from "./checklist.js";
export { Cosmetic, CosmeticCommon, CosmeticPackName, WING_BUFFS } from "./cosmetics.js";
export { COUNTRY_VALUES, Country, CountryToEmoji, isCountry } from "./country.js";
export {
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DAILY_GUIDES_DISTRIBUTION_TYPE_VALUES,
	DAILY_QUEST_VALUES,
	type DailyGuidesDaysCountItem,
	type DailyGuidesDistributionPacket,
	DailyGuidesDistributionType,
	type DailyGuidesDistributionTypes,
	type DailyGuidesPacket,
	type DailyQuests,
	DailyQuestToAcknowledgement,
	DailyQuestToInfographicURL,
	isDailyQuest,
	sortDaysCountItems,
} from "./daily-guides.js";
export { type BlueskyWebhooksPacket, Table } from "./database.js";
export { epochSeconds, isActive, isDuring, skyDate, skyNow, skyToday, TIME_ZONE } from "./dates.js";
export {
	type Emoji,
	emojiConstants,
	formatEmoji,
	formatEmojiURL,
	resolveCurrencyEmoji,
} from "./emojis.js";
export {
	communityUpcomingEvents,
	skyCurrentEvents,
	skyEvents,
	skyNotEndedEvents,
	skyUpcomingEvents,
} from "./events/index.js";
export { DOUBLE_HEART_EVENTS, RADIANCE_EVENTS } from "./events/miscellaneous.js";
export {
	type FriendshipActionsPacket,
	FriendshipActionType,
	type FriendshipActionTypes,
	isFriendshipActionType,
} from "./friendship-actions.js";
export {
	ASSET_SIZE,
	ASSET_TEXT_DOUBLE_OFFSET,
	ASSET_TEXT_SINGLE_OFFSET,
	ASSET_TEXT_TRIPLE_OFFSET,
	BACKGROUND_PADDING,
	FONT_SIZE,
	FRIENDSHIP_TREE_WIDTH,
	type FriendshipTreeLayout,
	type FriendshipTreeLine,
	type FriendshipTreeNodeCost,
	HEIGHT_START_OFFSET,
	IMAGE_SIZE,
	LINE_COLOUR,
	LINE_WIDTH,
	legacyFriendshipTreeLayout,
	modernFriendshipTreeLayout,
	type PlacedFriendshipTreeNode,
	TEXT_COLOUR,
} from "./friendship-tree.js";
export {
	GUESS_TYPE_VALUES,
	type GuessPacket,
	GuessType,
	type GuessTypes,
	type GuessUserRanking,
} from "./guess.js";
export {
	DELETED_USER_TEXT,
	type HeartHistoryPacket,
	type HeartPacket,
	MAXIMUM_HEARTS_PER_DAY,
	SKY_PROFILE_MISSING_NAME_SOURCE_VALUES,
	SkyProfileMissingNameSource,
	type SkyProfileMissingNameSources,
} from "./heart.js";
export {
	AreaName,
	isRealm,
	RealmName,
} from "./kingdom/geography.js";
export { spirits } from "./kingdom/spirits.js";
export {
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	treasureCandles,
} from "./kingdom/treasure-candles.js";
export {
	computeMaximumWingedLight,
	MAXIMUM_WINGED_LIGHT,
	TOP_LEVEL_WINGED_LIGHT_IN_AREAS,
	TopLevelAreaToWingedLight,
	WINGED_LIGHT_AREAS,
	WINGED_LIGHT_THRESHOLDS,
} from "./kingdom/winged-light.js";
export { MAINTENANCE_PERIODS } from "./maintenance.js";
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
export { CDN } from "./cdn.js";
export { KINGDOM } from "./kingdom/index.js";
export {
	resolveReturningSpirits,
	resolveTravellingSpirit,
	skyCurrentSeason,
	skySeasons,
	skyUpcomingSeason,
	TRAVELLING_DATES,
	VISITS_ABSENT,
} from "./kingdom/seasons/index.js";
export { Event } from "./models/event.js";
export { Realm } from "./models/realm.js";
export { type DoubleSeasonalLightDate, Season } from "./models/season.js";
export {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	type SeasonalSpiritVisitReturningData,
	type SeasonalSpiritVisitTravellingErrorData,
	type Spirit,
	StandardSpirit,
} from "./models/spirits.js";
export {
	NOTIFICATION_TYPE_VALUES,
	NotificationOffsetToMaximumValues,
	type NotificationPacket,
	NotificationType,
	type NotificationTypes,
} from "./notifications.js";
export { isPlatformId, PLATFORM_ID_VALUES, PlatformId, type PlatformIds } from "./platforms.js";
export {
	auroraSchedule,
	aviarysFireworkFestivalSchedule,
	dreamsSkaterSchedule,
	grandmaSchedule,
	INTERNATIONAL_SPACE_STATION_DATES,
	internationalSpaceStationSchedule,
	meteorShowerSchedule,
	nextDailyReset,
	nextEyeOfEden,
	nextNestingWorkshop,
	nextPassage,
	nineColouredDeerSchedule,
	pollutedGeyserSchedule,
	projectorOfMemoriesSchedule,
	SCHEDULE_TYPE_VALUES,
	ScheduleType,
	type ScheduleTypes,
	shardEruptionSchedule,
	travellingSpiritSchedule,
	turtleSchedule,
	vaultEldersBlessingSchedule,
} from "./schedule.js";
export {
	isSeasonId,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	SeasonId,
	type SeasonIds,
} from "./season.js";
export { type ShardEruptionData, shardEruption } from "./shard-eruption.js";
export {
	isSkyProfilePersonalityType,
	SKY_PROFILE_EDIT_TYPE_VALUES,
	SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
	SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MINIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_PERSONALITY_TYPE_VALUES,
	SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES,
	type SkyProfileData,
	SkyProfileEditType,
	type SkyProfileEditTypes,
	type SkyProfilePacket,
	SkyProfilePersonalityToMBTI,
	type SkyProfilePersonalityTypes,
	SkyProfileWingedLightType,
	type SkyProfileWingedLightTypes,
} from "./sky-profile.js";
export type { Snowflake } from "./types/index.js";
export type { UsersPacket } from "./users.js";
export { EventId, type EventIds, isEventId } from "./utility/event.js";
export {
	type CostEntry,
	getRandomElement,
	resolveAllCosmeticsFromItems,
	resolveOfferFromItems,
	sumCosts,
} from "./utility/functions.js";
export {
	type FriendshipTree,
	friendshipTreeToItems,
	type Item,
	type ItemCost,
	isSpiritId,
	isSpiritsHistoryOrderType,
	type LegacyFriendshipTree,
	SPIRITS_HISTORY_ORDER_TYPE_VALUES,
	SpiritId,
	type SpiritIds,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
} from "./utility/spirits.js";
