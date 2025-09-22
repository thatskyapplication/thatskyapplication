import { URL } from "node:url";
import { ChannelType, Locale } from "@discordjs/core";
import {
	de,
	enGB,
	es419,
	esES,
	fr,
	it,
	ja,
	ko,
	NotificationType,
	type NotificationTypes,
	ptBR,
	ru,
	skyDate,
	th,
	vi,
	WEBSITE_URL,
	zhCN,
	zhTW,
} from "@thatskyapplication/utility";

// Shared options for i18next.
export const I18_NEXT_OPTIONS = {
	fallbackLng: Locale.EnglishGB,
	interpolation: { escapeValue: false },
	ns: ["general", "commands", "features"],
	resources: {
		[Locale.German]: de,
		[Locale.EnglishGB]: enGB,
		[Locale.SpanishLATAM]: es419,
		[Locale.SpanishES]: esES,
		[Locale.French]: fr,
		[Locale.Italian]: it,
		[Locale.Japanese]: ja,
		[Locale.Korean]: ko,
		[Locale.PortugueseBR]: ptBR,
		[Locale.Russian]: ru,
		[Locale.Thai]: th,
		[Locale.Vietnamese]: vi,
		[Locale.ChineseCN]: zhCN,
		[Locale.ChineseTW]: zhTW,
	},
	returnEmptyString: false,
	saveMissing: true,
} as const satisfies Readonly<Parameters<typeof import("i18next").init>[0]>;

// Website URLs.
export const DAILY_GUIDES_URL = String(new URL("daily-guides", WEBSITE_URL));
export const SHARD_ERUPTION_URL = String(new URL("shard-eruption", WEBSITE_URL));
export const SKY_PROFILES_URL = String(new URL("sky-profiles", WEBSITE_URL));

// Quest numbers.
export const QUEST_NUMBER = [1, 2, 3, 4] as const;

// Miscellaneous constants.
export const THATSKYGAME_URL = "https://thatskygame.com" as const;
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
export const PATREON_URL = "https://patreon.com/Jiralite" as const;
export const KO_FI_URL = "https://ko-fi.com/jiralite" as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const DEFAULT_EMBED_COLOUR = 0x6f68c9 as const;
export const INFORMATION_ACCENT_COLOUR = 0x3b82f6 as const;
export const ANIMATED_HASH_PREFIX = "a_" as const;
export const MAXIMUM_ASSET_SIZE = 5_000_000 as const;
export const MAXIMUM_TEXT_DISPLAY_LENGTH = 4000 as const;
export const MAXIMUM_FEEDBACK_DESCRIPTION_LENGTH = 1000 as const;
export const MAXIMUM_FEEDBACK_TITLE_LENGTH = 100 as const;
export const MINIMUM_FEEDBACK_TITLE_LENGTH = 4 as const;
export const MAXIMUM_AUTOCOMPLETE_NAME_LIMIT = 100 as const;
export const MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT = 25 as const;

export const LOCALES = [
	Locale.German,
	Locale.EnglishGB,
	Locale.EnglishUS,
	Locale.SpanishLATAM,
	Locale.SpanishES,
	Locale.French,
	Locale.Italian,
	Locale.Japanese,
	Locale.Korean,
	Locale.PortugueseBR,
	Locale.Russian,
	Locale.Vietnamese,
	Locale.ChineseCN,
	Locale.ChineseTW,
] as const satisfies Readonly<Locale[]>;

// Catalogue.
export const CATALOGUE_EVENTS_THRESHOLD = 10 as const;

// Daily guides.
export const DAILY_GUIDES_QUESTS_REORDER_SELECT_MENU_CUSTOM_ID =
	"DAILY_GUIDES_QUESTS_REORDER_SELECT_MENU_CUSTOM_ID" as const;

export const DAILY_GUIDES_LOCALE_CUSTOM_ID = "DAILY_GUIDES_LOCALE_CUSTOM_ID" as const;

export const DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID =
	"DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID" as const;

export const LOCALE_OPTIONS = LOCALES.map((locale) => ({
	label: locale,
	value: locale,
}));

export const DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
	ChannelType.PublicThread,
] as const;

// Data.
export const DATA_DELETION_CUSTOM_ID = "DATA_DELETION_CUSTOM_ID" as const;

// Giveaway.
export const GIVEAWAY_START_DATE = skyDate(2025, 5, 25);
const GIVEAWAY_START_TIMESTAMP_SECONDS = GIVEAWAY_START_DATE.toUnixInteger();
export const GIVEAWAY_END_DATE = skyDate(2025, 6, 2);
export const GIVEAWAY_END_TIMESTAMP_SECONDS = GIVEAWAY_END_DATE.toUnixInteger();
export const GIVEAWAY_INVITE_URL = "https://discord.gg/dVekyau2gN" as const;

export const GIVEAWAY_NOT_STARTED_TEXT =
	`There is an upcoming giveaway in the [support server](${GIVEAWAY_INVITE_URL}) starting on <t:${GIVEAWAY_START_TIMESTAMP_SECONDS}:F> (<t:${GIVEAWAY_START_TIMESTAMP_SECONDS}:R>).` as const;

export const GIVEAWAY_OVER_TEXT = "There is currently no giveaway." as const;

export const GIVEAWAY_NOT_IN_SERVER_TEXT =
	`There is a giveaway in the [support server](${GIVEAWAY_INVITE_URL})! The prize is an in-app purchase of your choice for Days of Colour 2025. Interested? Come on by!` as const;

// Guess.
export const GUESS_TIMEOUT = 30_000 as const;
export const GUESS_ANSWER_1 = "GUESS_ANSWER_1" as const;
export const GUESS_ANSWER_2 = "GUESS_ANSWER_2" as const;
export const GUESS_ANSWER_3 = "GUESS_ANSWER_3" as const;
export const GUESS_END_GAME = "GUESS_END_GAME_CUSTOM_ID" as const;
export const GUESS_TRY_AGAIN = "GUESS_TRY_AGAIN_CUSTOM_ID" as const;
export const GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER = 10 as const;
export const GUESS_LEADERBOARD_BACK_CUSTOM_ID = "GUESS_LEADERBOARD_BACK_CUSTOM_ID" as const;
export const GUESS_LEADERBOARD_NEXT_CUSTOM_ID = "GUESS_LEADERBOARD_NEXT_CUSTOM_ID" as const;

// Heart.
export const DELETED_USER_TEXT = "<deleted>" as const;
export const MAXIMUM_HEARTS_PER_DAY = 3 as const;
export const HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER = 25 as const;

// Notifications.
export const NOTIFICATION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
] as const satisfies Readonly<ChannelType[]>;

// Cannot exceed 24.
export const NotificationOffsetToMaximumValues = {
	[NotificationType.DailyReset]: 15,
	[NotificationType.EyeOfEden]: 24,
	[NotificationType.InternationalSpaceStation]: 10,
	[NotificationType.Dragon]: 10,
	[NotificationType.PollutedGeyser]: 10,
	[NotificationType.Grandma]: 10,
	[NotificationType.Turtle]: 10,
	[NotificationType.RegularShardEruption]: 10,
	[NotificationType.StrongShardEruption]: 10,
	[NotificationType.AURORA]: 15,
	[NotificationType.Passage]: 5,
	[NotificationType.AviarysFireworkFestival]: 15,
	[NotificationType.TravellingSpirit]: 15,
	[NotificationType.DreamsSkater]: 10,
	[NotificationType.NestingWorkshop]: 15,
} as const satisfies Readonly<Record<NotificationTypes, number>>;

// Sky profiles.
export const SKY_PROFILE_MAXIMUM_NAME_LENGTH = 16 as const;
export const SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH = 3_000 as const;
export const SKY_PROFILE_MINIMUM_HANGOUT_LENGTH = 2 as const;
export const SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH = 50 as const;
export const SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH = 100 as const;
export const SKY_PROFILE_REPORT_MAXIMUM_LENGTH = 1000 as const;
export const SKY_PROFILE_REPORT_MINIMUM_LENGTH = 10 as const;
export const SKY_PROFILE_UNKNOWN_NAME = "Anonymous" as const;
