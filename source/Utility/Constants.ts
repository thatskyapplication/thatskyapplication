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
export const MAX_HIGH_FIVE_NO = 6 as const;
export const MAX_HUG_NO = 25 as const;
export const MAX_PLAY_FIGHT_NO = 5 as const;
export const MAX_KRILL_NO = 10 as const;

// Website URLs.
export const WEBSITE_URL = "https://thatskyapplication.com" as const;
export const APPLICATION_INVITE_URL = String(new URL("invite", WEBSITE_URL));
export const SUPPORT_SERVER_INVITE_URL = String(new URL("support", WEBSITE_URL));

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

// Miscellaneous constants.
export const DEVELOPER_GUILD_ID = "1017993798170726411" as const;
export const THATSKYGAME_URL = "https://thatskygame.com" as const;
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
export const PATREON_URL = "https://patreon.com/Jiralite" as const;
export const KO_FI_URL = "https://ko-fi.com/jiralite" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki" as const;
export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = 227 as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const INFOGRAPHICS_DATABASE_GUILD_ID = "736912435654688868" as const;
export const ISS_DATES_ACCESSIBLE = [6, 14, 22, 30] as const;
export const DEFAULT_EMBED_COLOUR = 0x6f68c9 as const;
export const MAXIMUM_EMBED_FIELD_NAME_LENGTH = 256 as const;
export const MAXIMUM_EMBED_FIELD_VALUE_LENGTH = 1_024 as const;

export const enum Channel {
	dailyGuides = "1041420071614042152",
}

export enum Realm {
	IslesOfDawn = "Isles of Dawn",
	DaylightPrairie = "Daylight Prairie",
	HiddenForest = "Hidden Forest",
	ValleyOfTriumph = "Valley of Triumph",
	GoldenWasteland = "Golden Wasteland",
	VaultOfKnowledge = "Vault of Knowledge",
	EyeOfEden = "Eye of Eden",
}

export const REALM_VALUES = Object.values(Realm);

export enum Map {
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

	// Season of the Nine-Colored Deer.
	CrescentOasis = "Crescent Oasis",
}

export const MAP_VALUES = Object.values(Map);

export const MEDITATION_MAPS = [
	Map.ButterflyFields,
	Map.SanctuaryIslands,
	Map.Cave,
	Map.KoiPond,
	Map.ForestClearing,
	Map.ForestBrook,
	Map.ElevatedClearing,
	Map.Boneyard,
	Map.IceRink,
	Map.Citadel,
	Map.Coliseum,
	Map.BrokenTemple,
	Map.ForgottenArk,
	Map.Graveyard,
	Map.Boat,
	Map.Battlefield,
	Map.VaultEntrance,
	Map.VaultSecondFloor,
	Map.VaultSummit,
] as const;

export type MeditationMaps = (typeof MEDITATION_MAPS)[number];
export const SOCIAL_LIGHT_AREA_MAPS = [Map.Cave, Map.ElevatedClearing, Map.VillageOfDreams, Map.Graveyard] as const;
export type SocialLightAreaMaps = (typeof SOCIAL_LIGHT_AREA_MAPS)[number];

export const SocialLightAreaMapToCDNString = {
	[Map.Cave]: "cosy_hideout",
	[Map.ElevatedClearing]: "ancestors_table_of_belonging",
	[Map.VillageOfDreams]: "hot_spring",
	[Map.Graveyard]: "bonfire",
} as const satisfies Readonly<Record<SocialLightAreaMaps, string>>;

export const RAINBOW_ADMIRE_MAPS = [
	Map.SanctuaryIslands,
	Map.WindPaths,
	Map.HermitValley,
	Map.TreasureReef,
	Map.StarlightDesert,
] as const;

export type RainbowAdmireMaps = (typeof RAINBOW_ADMIRE_MAPS)[number];

export const WINGED_LIGHT_AREAS = [...REALM_VALUES, Map.AncientMemory, Map.CrescentOasis] as const;
type WingedLightAreas = (typeof WINGED_LIGHT_AREAS)[number];

// This exists due to the Infographics server's inconsistencies and faults alongside no desire to fix them.
export const INCONSISTENT_MAP = {
	// Daylight Prairie.
	"Sanctuary Island": Map.SanctuaryIslands,

	// Hidden Forest.
	"Forest's Brook": Map.ForestBrook,

	// Valley of Triumph.
	"Race End": Map.Coliseum,
} as const;

export const inconsistentMapKeys = Object.keys(INCONSISTENT_MAP);

export const VALID_REALM = [
	Realm.DaylightPrairie,
	Realm.HiddenForest,
	Realm.ValleyOfTriumph,
	Realm.GoldenWasteland,
	Realm.VaultOfKnowledge,
] as const;

export type ValidRealm = (typeof VALID_REALM)[number];

export const AreaToWingedLightCount = {
	[Realm.IslesOfDawn]: 9,
	[Realm.DaylightPrairie]: 24,
	[Realm.HiddenForest]: 19,
	[Realm.ValleyOfTriumph]: 17,
	[Realm.GoldenWasteland]: 18,
	[Realm.VaultOfKnowledge]: 12,
	[Realm.EyeOfEden]: 10,
	[Map.AncientMemory]: 6,
	[Map.Orbit]: 1,
	[Map.CrescentOasis]: 2,
} as const satisfies Readonly<Record<WingedLightAreas | Map.Orbit, number>>;

export const AREA_TO_WINGED_LIGHT_COUNT_VALUES = Object.values(AreaToWingedLightCount);

export const LOCALES = [
	Locale.German,
	Locale.EnglishGB,
	Locale.EnglishUS,
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
