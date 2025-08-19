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
	interpolation: { escapeValue: false },
} as const;

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

// Bonk.
export const BONKS = {
	successful: [
		{
			message: "{{bonker}} bonked {{bonkee}}. Bonk bonk bonk.",
		},
		{
			message:
				"An ethereal force bonked {{bonkee}} on the head. A shrill giggle can be heard from {{bonker}}.",
		},
		{
			message: "BONK! {{bonkee}} was destroyed by {{bonker}}.",
		},
		{
			message: "A terrifying, mystical force bonked {{bonkee}}. {{bonker}} is pleased.",
		},
		{
			message: "{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was successful.",
		},
		{
			message:
				"There was a 1% chance that {{bonkee}} would be bonked. {{bonker}} is that 1%. BONK.",
		},
		{
			message:
				"How extraordinary! A MASSIVE, HUGE BONK was applied to the forehead of {{bonkee}} by {{bonker}}.",
		},
		{
			message:
				"{{bonker}} took a flight, hiked mountains, conquered deserts, all to bonk {{bonkee}}. It was probably worth it.",
		},
		{
			message: "{{bonker}} has bonked {{bonkee}}. Finally! You deserve it, my friend.",
		},
		{
			message: "{{bonker}} bonked {{bonkee}}. This is the only physical touch you'll ever receive.",
		},
		{
			message: "We love {{bonkee}}, but {{bonker}} has other thoughts. BONK!",
		},
		{
			message:
				"{{bonkee}} got BONKED by the BONKER called {{bonker}} with the BONKINATOR BONKTHOUSAND. B O N K.",
		},
		{
			message:
				"It's a beautiful night, {{bonker}}'s looking for something dumb to do. Hey {{bonkee}}, {{bonker}}'s gonna BONK you! *BONK*",
		},
		{
			message:
				"{{bonker}} entered the nearby building, scaled to its peak, and dove off the top to bonk {{bonkee}}'s forehead at terminal velocity.",
		},
		{
			message:
				"A wild {{bonker}} appeared! {{bonker}} BONKED {{bonkee}} then mysteriously disappeared...",
		},
		{
			message:
				"{{bonker}} picked {{bonkee}} up, threw them into the air, and bonked them into outer space.",
		},
		{
			message:
				"Somebody was lurking in the shadows. It was {{bonker}} and they just bonked {{bonkee}}.",
		},
		{
			message:
				"{{bonker}} runs to {{bonkee}} but they accidentally hug each other! {{bonker}} sneaked in a lil' bonk, though.",
		},
		{
			message: "It's time to bonk {{bonkee}}. {{bonker}} did the deed.",
		},
		{
			message: "PEW PEW! {{bonker}} bonked {{bonkee}}.",
		},
		{
			message: "COLLATERAL DAMAGE! {{bonker}} bonked {{bonkee}}.",
		},
		{
			message: "{{bonker}} used bonk! It's super effective! {{bonkee}} took a lot of damage!",
		},
		{
			message:
				"{{bonker}} used bonk! It's not very effective... {{bonkee}} didn't take that much damage.",
		},
		{
			message: "{{bonker}} bonked {{bonkee}}, but at what cost?",
		},
		{
			message:
				"Roses are red,\nViolets are blue,\n{{bonker}} bonked {{bonkee}},\nAnd smacked them up too.",
		},
		{
			message:
				"A bee lands on {{bonkee}}'s head, but flies off after a few seconds. Taking advantage of the situation, {{bonker}} bonks {{bonkee}} anyway.",
		},
		{
			message: "{{bonkee}} can deal with the bad nights, but not when {{bonker}} bonks them. BONK.",
		},
		{
			message:
				"{{bonker}} jumped on a trampoline, somersaulted 14 times, entered a dive position, and bonked {{bonkee}}. It was a perfect landing.",
		},
		{
			message: "{{bonker}} bonked {{bonkee}}. It was a total headshot.",
		},
		{
			message:
				"Whilst flying over the Treasure Reef, {{bonker}} bonked {{bonkee}} into the water below them.",
		},
	],
	unsuccessful: [
		{
			message:
				"{{bonker}} proceeded to bonk {{bonkee}}, but slipped and fell on some bananas. The only thing they bonked was their own head.",
		},
		{
			message: "{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was not successful.",
		},
		{
			message:
				"Due to unfortunate weather conditions, {{bonker}} fell into a hole. They did not manage to bonk {{bonkee}}. {{bonkee}} fell into a separate hole, though.",
		},
		{
			message:
				"{{bonker}} hooked up with {{entry1}}, {{entry2}}, and {{entry3}} to figure out how to bonk {{bonkee}}. They're still working on it.",
			entries: [
				["El Guapo", "a pirate", "some sort of squirrel"],
				["Dracula", "Pope Francis", "a pet lizard"],
				["a moth", "the captain of the underworld", "Perry the Platypus"],
				[
					"Ed Sheeran",
					"a local microwave from a local fishing shop",
					"a piece of sentient bubble wrap",
				],
				["a duck", "the Yakuza", "a bubble that cannot be popped"],
				["Aurora", "a mirror", "a nearby particle"],
				["the NHS", "the inevitable darkness", "John Appleseed"],
				["a camera", "a tree", "the octopus overlord"],
			] satisfies [string, string, string][],
		},
		{
			message:
				"{{bonkee}} escaped the almighty bonk of {{bonker}}. Is this the final bonk by {{bonker}}?",
		},
		{
			message:
				"{{bonker}} was about to bonk {{bonkee}}, but {{bonkee}} turned around and bonked {{bonker}} instead. Oh, how the tables have turned!",
		},
		{
			message:
				"{{bonker}} is on their way to bonk {{bonkee}}, but finds a box of doughnuts! After weighing the odds, {{bonker}} feasts on the doughnuts instead.",
		},
		{
			message: "{{bonker}} used bonk! It didn't affect {{bonkee}}...",
		},
	],
} as const;

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
export const HEARTS = [
	"{{gifter}} sent a heart to {{giftee}}. How lucky!",
	"A heart from {{gifter}} to {{giftee}}. That was nice of them!",
	"Incoming heart from {{gifter}} to {{giftee}}!",
	"{{gifter}} sent {{giftee}} a heart! What a good friend!",
	"{{gifter}} sent {{giftee}} a heart. How nice of {{gifter}}!",
	"{{gifter}} sent a heart to {{giftee}}. They're pretty lucky!",
	"{{gifter}} sent {{giftee}} a heart. {{giftee}} is lucky to have a friend like you!",
	"{{gifter}}, sending a heart each day keeps the dark dragon away from {{giftee}}!",
	"A wholesome heart delivered to {{giftee}} from {{gifter}}!",
] as const satisfies Readonly<string[]>;

export const DELETED_USER_TEXT = "<deleted>" as const;
export const MAXIMUM_HEARTS_PER_DAY = 3 as const;
export const HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER = 24 as const;
export const HEART_HISTORY_BACK = "HEART_HISTORY_BACK" as const;
export const HEART_HISTORY_NEXT = "HEART_HISTORY_NEXT" as const;

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

// Schedule.
export const PASSAGE_TRUNCATION_LIMIT = 9 as const;

// Sky profiles.
export const SKY_PROFILE_MAXIMUM_NAME_LENGTH = 16 as const;
export const SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH = 3_000 as const;
export const SKY_PROFILE_MINIMUM_HANGOUT_LENGTH = 2 as const;
export const SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH = 50 as const;
export const SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH = 100 as const;
export const SKY_PROFILE_REPORT_MAXIMUM_LENGTH = 1000 as const;
export const SKY_PROFILE_REPORT_MINIMUM_LENGTH = 10 as const;
export const SKY_PROFILE_UNKNOWN_NAME = "Anonymous" as const;
