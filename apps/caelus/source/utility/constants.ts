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
export const SKY_PROFILES_URL = `${WEBSITE_URL}/sky-profiles` as const;

// Quest numbers.
export const QUEST_NUMBER = [1, 2, 3, 4] as const;

// Miscellaneous constants.
export const THATSKYGAME_URL = "https://thatskygame.com" as const;
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const DEFAULT_EMBED_COLOUR = 0x6f68c9 as const;
export const INFORMATION_ACCENT_COLOUR = 0x3b82f6 as const;
export const ANIMATED_HASH_PREFIX = "a_" as const;
export const MAXIMUM_ASSET_SIZE = 5_000_000 as const;
export const MAXIMUM_TEXT_DISPLAY_LENGTH = 4000 as const;
export const MAXIMUM_AUTOCOMPLETE_NAME_LIMIT = 100 as const;
export const MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT = 25 as const;

export const ALLOWED_IMAGE_MEDIA_TYPES = [
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/webp",
] as const satisfies readonly `${string}/${string}`[];

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
	Locale.Thai,
	Locale.Vietnamese,
	Locale.ChineseCN,
	Locale.ChineseTW,
] as const satisfies Readonly<Locale[]>;

// Catalogue.
export const CATALOGUE_EVENTS_THRESHOLD = 10 as const;

// Daily guides.
export const LOCALE_OPTIONS = LOCALES.map((locale) => ({
	label: locale,
	value: locale,
}));

// Guess.
export const GUESS_TIMEOUT = 30_000 as const;
export const GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER = 10 as const;

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
