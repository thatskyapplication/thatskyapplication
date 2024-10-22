import process from "node:process";
import { URL } from "node:url";
import {
	ChannelType,
	Locale,
	MessageFlags,
	StringSelectMenuOptionBuilder,
	hyperlink,
} from "discord.js";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

// Application ids.
const APPLICATION_ID_DEVELOPMENT = "1071822091814441000" as const;
const APPLICATION_ID_PRODUCTION = "982740693070012506" as const;
export const APPLICATION_ID = PRODUCTION ? APPLICATION_ID_PRODUCTION : APPLICATION_ID_DEVELOPMENT;

const TOKEN_DEVELOPMENT = process.env.DEVELOPMENT_DISCORD_TOKEN;
const TOKEN_PRODUCTION = process.env.DISCORD_TOKEN;
export const TOKEN = PRODUCTION ? TOKEN_PRODUCTION : TOKEN_DEVELOPMENT;

// Content delivery network buckets.
const CDN_BUCKET_DEVELOPMENT = "thatskyapplication-dev" as const;
const CDN_BUCKET_PRODUCTION = "thatskyapplication" as const;
export const CDN_BUCKET = PRODUCTION ? CDN_BUCKET_PRODUCTION : CDN_BUCKET_DEVELOPMENT;

// Content delivery network links.
const CDN_URL_DEVELOPMENT = "https://cdn-development.thatskyapplication.com" as const;
const CDN_URL_PRODUCTION = "https://cdn.thatskyapplication.com" as const;
export const CDN_URL = PRODUCTION ? CDN_URL_PRODUCTION : CDN_URL_DEVELOPMENT;

// Channel ids.
export const MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID = "1131896865378549832" as const;

// Concurrency limit to not hit the global rate limit of 50 requests per second.
export const MAXIMUM_NOTIFICATION_CONCURRENCY_LIMIT = 45 as const;

// Maximum GIF numbers.
export const MAX_HIGH_FIVE_NO = 7 as const;
export const MAX_HUG_NO = 28 as const;
export const MAX_PLAY_FIGHT_NO = 5 as const;
export const MAX_KRILL_NO = 11 as const;

// Website URLs.
export const WEBSITE_URL = "https://thatskyapplication.com" as const;
export const APPLICATION_INVITE_URL = String(new URL("invite", WEBSITE_URL));
export const SUPPORT_SERVER_INVITE_URL = String(new URL("support", WEBSITE_URL));

// SKU ids.
export const SERVER_UPGRADE_SKU_ID = "1270871254316089515" as const;

// Error response.
export const ERROR_RESPONSE = {
	content: `Oh no, that wasn't supposed to happen!\n\nFeel free to join our ${hyperlink(
		"support server",
		SUPPORT_SERVER_INVITE_URL,
	)} and report this issue! 🩵`,
	components: [],
	embeds: [],
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
};

// Not in cached guild response.
export const NOT_IN_CACHED_GUILD_RESPONSE = {
	content: `This command requires me to be present in the server. ${hyperlink(
		"Invite me",
		APPLICATION_INVITE_URL,
	)} with the bot scope and try again!\nIf you need help, join the ${hyperlink(
		"support server",
		SUPPORT_SERVER_INVITE_URL,
	)}!`,
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
} as const;

// Quest numbers.
export const QUEST_NUMBER = [1, 2, 3, 4] as const;

// Miscellaneous constants.
export const DEVELOPER_GUILD_ID = "1017993798170726411" as const;
const THATSKYGAME_URL = "https://thatskygame.com" as const;
const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
const PATREON_URL = "https://patreon.com/Jiralite" as const;
const KO_FI_URL = "https://ko-fi.com/jiralite" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki" as const;
export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = 238 as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const INFOGRAPHICS_DATABASE_GUILD_ID = "736912435654688868" as const;
export const ISS_DATES_ACCESSIBLE = [6, 14, 22, 30] as const;
export const DEFAULT_EMBED_COLOUR = 0x6f68c9 as const;
export const MAXIMUM_EMBED_FIELD_NAME_LENGTH = 256 as const;
export const MAXIMUM_EMBED_FIELD_VALUE_LENGTH = 1_024 as const;

export const enum Channel {
	dailyGuides = "1041420071614042152",
}

export enum RealmName {
	IslesOfDawn = "Isles of Dawn",
	DaylightPrairie = "Daylight Prairie",
	HiddenForest = "Hidden Forest",
	ValleyOfTriumph = "Valley of Triumph",
	GoldenWasteland = "Golden Wasteland",
	VaultOfKnowledge = "Vault of Knowledge",
	EyeOfEden = "Eye of Eden",
}

export const REALM_NAME_VALUES = Object.values(RealmName);

export enum SkyMap {
	// Daylight Prairie.
	BirdNest = "Bird Nest",
	ButterflyFields = "Butterfly Fields",
	Cave = "Cave",
	KoiPond = "Koi Pond",
	VillageIslands = "Village Islands",
	SanctuaryIslands = "Sanctuary Islands",

	// Hidden Forest.
	Boneyard = "Boneyard",
	ElevatedClearing = "Elevated Clearing",
	ForestBrook = "Forest Brook",
	ForestClearing = "Forest Clearing",
	ForestEnd = "Forest End",
	Treehouse = "Treehouse",
	WindPaths = "Wind Paths",

	// Valley of Triumph.
	IceRink = "Ice Rink",
	Citadel = "Citadel",
	Coliseum = "Coliseum",
	HermitValley = "Hermit Valley",
	VillageOfDreams = "Village of Dreams",

	// Golden Wasteland.
	Battlefield = "Battlefield",
	Boat = "Boat",
	BrokenTemple = "Broken Temple",
	CrabFields = "Crab Fields",
	ForgottenArk = "Forgotten Ark",
	Graveyard = "Graveyard",
	TreasureReef = "Treasure Reef",

	// Vault of Knowledge.
	VaultEntrance = "Vault Entrance",
	JellyfishCove = "Jellyfish Cove",
	StarlightDesert = "Starlight Desert",
	VaultSecondFloor = "Vault Second Floor",
	VaultSummit = "Vault Summit",

	// Orbit.
	Orbit = "Orbit",

	// Season of Shattering.
	AncientMemory = "Ancient Memory",

	// Season of the Nine-Coloured Deer.
	CrescentOasis = "Crescent Oasis",
}

export const SKY_MAP_VALUES = Object.values(SkyMap);

export const MEDITATION_MAPS = [
	SkyMap.BirdNest,
	SkyMap.ButterflyFields,
	SkyMap.SanctuaryIslands,
	SkyMap.Cave,
	SkyMap.KoiPond,
	SkyMap.ForestClearing,
	SkyMap.ForestBrook,
	SkyMap.ElevatedClearing,
	SkyMap.ForestEnd,
	SkyMap.Boneyard,
	SkyMap.IceRink,
	SkyMap.Citadel,
	SkyMap.Coliseum,
	SkyMap.BrokenTemple,
	SkyMap.ForgottenArk,
	SkyMap.Graveyard,
	SkyMap.Boat,
	SkyMap.Battlefield,
	SkyMap.VaultEntrance,
	SkyMap.VaultSecondFloor,
	SkyMap.VaultSummit,
] as const;

export type MeditationMaps = (typeof MEDITATION_MAPS)[number];

export const SOCIAL_LIGHT_AREA_MAPS = [
	SkyMap.Cave,
	SkyMap.ElevatedClearing,
	SkyMap.VillageOfDreams,
	SkyMap.Graveyard,
] as const;

export type SocialLightAreaMaps = (typeof SOCIAL_LIGHT_AREA_MAPS)[number];

export const SocialLightAreaMapToCDNString = {
	[SkyMap.Cave]: "cosy_hideout",
	[SkyMap.ElevatedClearing]: "ancestors_table_of_belonging",
	[SkyMap.VillageOfDreams]: "hot_spring",
	[SkyMap.Graveyard]: "bonfire",
} as const satisfies Readonly<Record<SocialLightAreaMaps, string>>;

export const RAINBOW_ADMIRE_MAPS = [
	SkyMap.SanctuaryIslands,
	SkyMap.WindPaths,
	SkyMap.HermitValley,
	SkyMap.TreasureReef,
	SkyMap.StarlightDesert,
] as const;

export type RainbowAdmireMaps = (typeof RAINBOW_ADMIRE_MAPS)[number];

export const WINGED_LIGHT_AREAS = [...REALM_NAME_VALUES, SkyMap.AncientMemory] as const;
type WingedLightAreas = (typeof WINGED_LIGHT_AREAS)[number];

// This exists due to the Infographics server's inconsistencies and faults alongside no desire to fix them.
export const INCONSISTENT_MAP = {
	// Daylight Prairie.
	"Sanctuary Island": SkyMap.SanctuaryIslands,

	// Hidden Forest.
	"Forest's Brook": SkyMap.ForestBrook,

	// Valley of Triumph.
	"Race End": SkyMap.Coliseum,
} as const;

export const inconsistentMapKeys = Object.keys(INCONSISTENT_MAP);

export const VALID_REALM_NAME = [
	RealmName.DaylightPrairie,
	RealmName.HiddenForest,
	RealmName.ValleyOfTriumph,
	RealmName.GoldenWasteland,
	RealmName.VaultOfKnowledge,
] as const;

export type ValidRealmName = (typeof VALID_REALM_NAME)[number];

export const WINGED_LIGHT_THRESHOLDS = [
	1, 2, 5, 10, 20, 35, 55, 75, 100, 120, 150, 200, 250,
] as const satisfies Readonly<number[]>;

export const AreaToWingedLightCount = {
	[RealmName.IslesOfDawn]: 9,
	[RealmName.DaylightPrairie]: 24,
	[RealmName.HiddenForest]: 19,
	[RealmName.ValleyOfTriumph]: 17,
	[RealmName.GoldenWasteland]: 18,
	[RealmName.VaultOfKnowledge]: 15,
	[RealmName.EyeOfEden]: 10,
	[SkyMap.AncientMemory]: 6,
	[SkyMap.Orbit]: 1,
} as const satisfies Readonly<Record<WingedLightAreas | SkyMap.Orbit, number>>;

export const WINGED_LIGHT_IN_AREAS = Object.values(AreaToWingedLightCount).reduce(
	(wingedLightCount, wingedLight) => wingedLightCount + wingedLight,
	0,
);

export const MAXIMUM_WING_BUFFS = MAXIMUM_WINGED_LIGHT - WINGED_LIGHT_IN_AREAS;

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

export const SKY_CREATOR_TROUPE = {
	evinsky: {
		name: "Evinsky",
		userId: "713002852909449236",
		description: "Content creator on TikTok",
	},
} as const satisfies Readonly<Record<string, Record<string, string>>>;

// About.
export const ABOUT_DESCRIPTION = `Welcome to the lovely Discord bot for ${hyperlink(
	"Sky: Children of the Light",
	THATSKYGAME_URL,
	"thatskygame",
)}!

So you'd like to know about me, huh? Well, I like long walks across the ${
	SkyMap.SanctuaryIslands
}. Oh, and don't forget about gliding all over the ${SkyMap.StarlightDesert}. Also... JELLYFISH!

In any case, you can invite me by opening up my profile or using the invite link below! If you need help, head on to the support server linked also below and we'll figure it out together!` as const;

export const ABOUT_SPONSOR = `Want to give support? There are ways you can do that! Thank you in advance!
${hyperlink("Patreon", PATREON_URL)} | ${hyperlink("Ko-fi", KO_FI_URL)} | ${hyperlink(
	"GitHub",
	GITHUB_SPONSORS_URL,
)}` as const;

// Admin.
export const DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID =
	"DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID" as const;

export const DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID =
	"DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID" as const;

export const DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID =
	"DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID" as const;

export const DAILY_GUIDES_LOCALE_CUSTOM_ID = "DAILY_GUIDES_LOCALE_CUSTOM_ID" as const;

export const DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID =
	"DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID" as const;

export const DAILY_GUIDES_DAILY_MESSAGE_MODAL = "DAILY_GUIDES_DAILY_MESSAGE_MODAL" as const;

export const DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE =
	"DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT" as const;

export const DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION =
	"DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION" as const;

export const DAILY_GUIDES_TREASURE_CANDLES_MODAL = "DAILY_GUIDES_TREASURE_CANDLES_MODAL" as const;

export const DAILY_GUIDES_TREASURE_CANDLES_SELECT_MENU_CUSTOM_ID =
	"DAILY_GUIDES_TREASURE_CANDLES_SELECT_MENU_CUSTOM_ID" as const;

export const DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1 =
	"DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1" as const;

export const DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_2 =
	"DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_2" as const;

export const QUEST_OPTIONS = QUEST_NUMBER.map((questNumber) =>
	new StringSelectMenuOptionBuilder()
		.setLabel(`Quest ${questNumber}`)
		.setValue(String(questNumber)),
);

export const LOCALE_OPTIONS = LOCALES.map((locale) =>
	new StringSelectMenuOptionBuilder().setLabel(locale).setValue(locale),
);

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

// Daily guides distribution.
export const DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
	ChannelType.PublicThread,
] as const;

// Data.
export const DATA_DELETION_CUSTOM_ID = "DATA_DELETION_CUSTOM_ID" as const;

// Guess.
export enum GuessDifficultyLevel {
	Original = 0,
	Hard = 1,
}

export const GUESS_DIFFICULTY_LEVEL_VALUES = Object.values(GuessDifficultyLevel).filter(
	(guessDifficultyLevel) => typeof guessDifficultyLevel === "number",
);

export const GuessDifficultyLevelToName = {
	[GuessDifficultyLevel.Original]: "Original",
	[GuessDifficultyLevel.Hard]: "Hard",
} as const satisfies Readonly<Record<GuessDifficultyLevel, string>>;

export const GuessDifficultyToStreakColumn = {
	[GuessDifficultyLevel.Original]: "streak",
	[GuessDifficultyLevel.Hard]: "streak_hard",
} as const satisfies Readonly<Record<GuessDifficultyLevel, string>>;

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

export const NotificationType = {
	DailyReset: 0,
	EyeOfEden: 1,
	InternationalSpaceStation: 2,
	Dragon: 3,
	PollutedGeyser: 4,
	Grandma: 5,
	Turtle: 6,
	RegularShardEruption: 7,
	StrongShardEruption: 8,
	AURORA: 9,
	Passage: 10,
	AviarysFireworkFestival: 11,
} as const satisfies Readonly<Record<string, number>>;

export type NotificationTypes = (typeof NotificationType)[keyof typeof NotificationType];
export const NOTIFICATION_TYPE_VALUES = Object.values(NotificationType);

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
} as const satisfies Readonly<Record<NotificationTypes, number>>;

export const NOTIFICATION_SETUP_OFFSET_CUSTOM_ID = "NOTIFICATION_SETUP_OFFSET_CUSTOM_ID" as const;

// Schedule.
export const PASSAGE_TRUNCATION_LIMIT = 9 as const;

// Sky profiles.
export const SKY_PROFILE_MAXIMUM_NAME_LENGTH = 16 as const;
export const SKY_PROFILE_MAXIMUM_ASSET_SIZE = 5_000_000 as const;
export const SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH = 3_000 as const;
export const SKY_PROFILE_MINIMUM_COUNTRY_LENGTH = 2 as const;
export const SKY_PROFILE_MAXIMUM_COUNTRY_LENGTH = 60 as const;
export const SKY_PROFILE_MINIMUM_WINGED_LIGHT_LENGTH = 1 as const;
export const SKY_PROFILE_MAXIMUM_WINGED_LIGHT_LENGTH = 3 as const;
export const SKY_PROFILE_MINIMUM_SPOT_LENGTH = 2 as const;
export const SKY_PROFILE_MAXIMUM_SPOT_LENGTH = 50 as const;
export const SKY_PROFILE_EXPLORE_MAXIMUM_OPTION_NUMBER = 25 as const;
export const SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH = 100 as const;
export const SKY_PROFILE_EXPLORE_AUTOCOMPLETE_NAME_LENGTH = 100 as const;
export const SKY_PROFILE_REPORT_MAXIMUM_LENGTH = 1000 as const;
export const SKY_PROFILE_REPORT_MINIMUM_LENGTH = 10 as const;
export const SKY_PROFILE_UNKNOWN_NAME = "Anonymous" as const;
