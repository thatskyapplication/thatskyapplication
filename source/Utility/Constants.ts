import process from "node:process";
import { URL } from "node:url";
import { Locale, MessageFlags, hyperlink } from "discord.js";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

// Application ids.
const APPLICATION_ID_DEVELOPMENT = "1071822091814441000" as const;
const APPLICATION_ID_PRODUCTION = "982740693070012506" as const;
export const APPLICATION_ID = PRODUCTION ? APPLICATION_ID_PRODUCTION : APPLICATION_ID_DEVELOPMENT;

// Content delivery network buckets.
const CDN_BUCKET_DEVELOPMENT = "thatskyapplication-dev" as const;
const CDN_BUCKET_PRODUCTION = "thatskyapplication" as const;
export const CDN_BUCKET = PRODUCTION ? CDN_BUCKET_PRODUCTION : CDN_BUCKET_DEVELOPMENT;

// Content delivery network links.
const CDN_URL_DEVELOPMENT = "https://cdn-development.thatskyapplication.com" as const;
const CDN_URL_PRODUCTION = "https://cdn.thatskyapplication.com" as const;
export const CDN_URL = PRODUCTION ? CDN_URL_PRODUCTION : CDN_URL_DEVELOPMENT;

// Log channels.
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

// Miscellaneous constants.
export const DEVELOPER_GUILD_ID = "1017993798170726411" as const;
export const THATSKYGAME_URL = "https://thatskygame.com" as const;
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
export const PATREON_URL = "https://patreon.com/Jiralite" as const;
export const KO_FI_URL = "https://ko-fi.com/jiralite" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki" as const;
export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = 237 as const;
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
	SkyMap.ButterflyFields,
	SkyMap.SanctuaryIslands,
	SkyMap.Cave,
	SkyMap.KoiPond,
	SkyMap.ForestClearing,
	SkyMap.ForestBrook,
	SkyMap.ElevatedClearing,
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

export const AREA_TO_WINGED_LIGHT_COUNT_VALUES = Object.values(AreaToWingedLightCount);

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
