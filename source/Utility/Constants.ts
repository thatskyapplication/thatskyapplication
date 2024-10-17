import process from "node:process";
import { URL } from "node:url";
import { ChannelType, Locale, MessageFlags, hyperlink } from "discord.js";

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

// Daily guides.
export const QUEST_NUMBER = [1, 2, 3, 4] as const;

// Daily guides distribution.
export const DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
	ChannelType.PublicThread,
] as const;

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

// Notifications.
export const NOTIFICATION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
] as const satisfies Readonly<ChannelType[]>;

export const NotificationType = {
	DailyReset: 0,
	EyeOfEden: 1,
	ISS: 2,
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

// Miscellaneous constants.
export const DEVELOPER_GUILD_ID = "1017993798170726411" as const;
export const THATSKYGAME_URL = "https://thatskygame.com" as const;
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
export const PATREON_URL = "https://patreon.com/Jiralite" as const;
export const KO_FI_URL = "https://ko-fi.com/jiralite" as const;
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
