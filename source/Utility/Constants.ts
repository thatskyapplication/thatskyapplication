import process from "node:process";
import { URL } from "node:url";
import { Locale } from "discord.js";

export const enum Emoji {
	AscendedCandle = "1074399464627912755",
	WingedLight = "1075042577776136313",
	Yes = "1111792276394475580",
	No = "1111792367104708699",
	PlatformIOS = "1112935921197789304",
	PlatformAndroid = "1112936417182621727",
	PlatformMac = "1112936431464235058",
	PlatformSwitch = "1112936564004237392",
	PlatformPlayStation = "1112937466312278036",
	SeasonGratitude = "1113247310114193458",
	SeasonLightseekers = "1113247330221707314",
	SeasonBelonging = "1113247355932778598",
	SeasonRhythm = "1113247376908496916",
	SeasonEnchantment = "1113247405454921859",
	SeasonSanctuary = "1113247420080463902",
	SeasonProphecy = "1113247443857985547",
	SeasonDreams = "1113247473230676008",
	SeasonAssembly = "1113247484001652817",
	SeasonLittlePrince = "1113247526812921856",
	SeasonFlight = "1113247537399332926",
	SeasonAbyss = "1113247546219974726",
	SeasonPerformance = "1113247572069457951",
	SeasonShattering = "1113247601081471136",
	SeasonAurora = "1113247614138322984",
	SeasonRemembrance = "1113247635885793330",
	SeasonPassage = "1113247650259677254",
	SeasonalCandle = "1115305105642758145",
	SeasonalHeart = "1115841397493346325",
	SeasonMoments = "1130091541151629332",
	Candle = "1134669696822689882",
	Heart = "1134669722353401977",
	CandleGratitude = "1135233671255830619",
	CandleLightseekers = "1135233695343718411",
	CandleBelonging = "1135302561088409741",
	CandleRhythm = "1135302602121298060",
	CandleEnchantment = "1135302620181970944",
	CandleSanctuary = "1135302635189182614",
	CandleProphecy = "1135302685080432660",
	CandleDreams = "1135302699655630849",
	CandleAssembly = "1135302713366810685",
	CandleLittlePrince = "1135302724880175134",
	CandleFlight = "1135302737962221608",
	CandleAbyss = "1135302746787029144",
	CandlePerformance = "1135302762029138040",
	CandleShattering = "1135302774205186048",
	CandleAurora = "1135302785714360390",
	CandleRemembrance = "1135302796397256755",
	CandlePassage = "1135302811819708569",
	CandleMoments = "1135302823593119804",
	HeartBelonging = "1135304922997465168",
	HeartRhythm = "1135304943302082760",
	HeartEnchantment = "1135304955104862279",
	HeartSanctuary = "1135304967679389868",
	HeartProphecy = "1135304979532496906",
	HeartDreams = "1135305001149935696",
	HeartAssembly = "1135305017449001091",
	HeartLittlePrince = "1135305036113649724",
	HeartFlight = "1135305050084880484",
	HeartAbyss = "1135305058838384670",
	HeartPerformance = "1135305071509377085",
	HeartShattering = "1135305088043327578",
	HeartAurora = "1135305121153159311",
	HeartRemembrance = "1135305133614432266",
	HeartPassage = "1135305161498181765",
	HeartMoments = "1135305178027933899",
	SeasonRevival = "1162098085455999117",
	CandleRevival = "1162098562209951746",
	HeartRevival = "1162098577456238663",
	Light = "1164342686950625300",
	ShardRegular = "1164672237761200130",
	ShardStrong = "1164672254911713382",
}

// Content delivery network bucket.
export const CDN_BUCKET = "thatskyapplication" as const;

// Content delivery network link.
export const CDN_URL = "https://cdn.thatskyapplication.com" as const;

// Log channels.
export const ERROR_LOG_CHANNEL_ID = "1040806599293407263" as const;
export const GUILD_LOG_CHANNEL_ID = "1107804841813749780" as const;
export const COMMAND_LOG_CHANNEL_ID = "1114135883604566057" as const;
export const MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID = "1131896865378549832" as const;

// Concurrency limit to not hit the global rate limit of 50 requests per second.
export const MAXIMUM_NOTIFICATION_CONCURRENCY_LIMIT = 45 as const;

// Miscellaneous constants.
export const PRODUCTION = process.env.NODE_ENV === "production";
export const DEVELOPER_GUILD_ID = "1017993798170726411" as const;
export const WEBSITE_URL = "https://thatskyapplication.com" as const;
export const APPLICATION_INVITE_URL = String(new URL("invite", WEBSITE_URL));
export const THATSKYGAME_URL = "https://thatskygame.com" as const;
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
export const PATREON_URL = "https://patreon.com/Jiralite" as const;
export const KO_FI_URL = "https://ko-fi.com/jiralite" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki" as const;
export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = 222 as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const INFOGRAPHICS_DATABASE_GUILD_ID = "736912435654688868" as const;
export const MAX_HUG_NO = 24 as const;
export const ISS_DATES_ACCESSIBLE = [6, 14, 22, 30] as const;
export const DEFAULT_EMBED_COLOUR = 0x6f68c9 as const;
export const MAXIMUM_EMBED_FIELD_NAME_LENGTH = 256 as const;
export const MAXIMUM_EMBED_FIELD_VALUE_LENGTH = 1_024 as const;

export const enum Channel {
	dailyGuides = "1041420071614042152",
}

export const enum User {
	Jiralite = "618976181026422814",
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

export const RealmToSpanishRealm = {
	[Realm.IslesOfDawn]: "Isla del Amanecer",
	[Realm.DaylightPrairie]: "Planicie Luz de Día",
	[Realm.HiddenForest]: "Bosque Escondido",
	[Realm.ValleyOfTriumph]: "Valle del Triunfo",
	[Realm.GoldenWasteland]: "Páramo Dorado",
	[Realm.VaultOfKnowledge]: "Bóveda de Conocimiento",
	[Realm.EyeOfEden]: "Ojo de edén",
} as const satisfies Readonly<Record<Realm, string>>;

export enum Map {
	// Daylight Prairie
	BirdNest = "Bird Nest",
	ButterflyFields = "Butterfly Fields",
	Cave = "Cave",
	KoiPond = "Koi Pond",
	VillageIslands = "Village Islands",
	SanctuaryIslands = "Sanctuary Islands",

	// Hidden Forest
	Boneyard = "Boneyard",
	ElevatedClearing = "Elevated Clearing",
	ForestBrook = "Forest Brook",
	ForestClearing = "Forest Clearing",
	ForestEnd = "Forest End",
	Treehouse = "Treehouse",
	WindPaths = "Wind Paths",

	// Valley of Triumph
	IceRink = "Ice Rink",
	Citadel = "Citadel",
	Coliseum = "Coliseum",
	HermitValley = "Hermit Valley",
	VillageOfDreams = "Village of Dreams",

	// Golden Wasteland
	Battlefield = "Battlefield",
	Boat = "Boat",
	BrokenTemple = "Broken Temple",
	CrabFields = "Crab Fields",
	ForgottenArk = "Forgotten Ark",
	Graveyard = "Graveyard",
	TreasureReef = "Treasure Reef",

	// Vault of Knowledge
	VaultEntrance = "Vault Entrance",
	JellyfishCove = "Jellyfish Cove",
	StarlightDesert = "Starlight Desert",
	VaultSecondFloor = "Vault Second Floor",
	VaultSummit = "Vault Summit",

	// Orbit
	Orbit = "Orbit",

	// Season of Shattering
	AncientMemory = "Ancient Memory",
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

export const WINGED_LIGHT_AREAS = [...REALM_VALUES, Map.AncientMemory] as const;
export const WingedLightAreasToSpanish = { ...RealmToSpanishRealm, [Map.AncientMemory]: "Recuerdo Ancestral" } as const;

// This exists due to the Infographics server's inconsistencies and faults alongside no desire to fix them.
export const INCONSISTENT_MAP = {
	// Daylight Prairie
	"Sanctuary Island": Map.SanctuaryIslands,

	// Hidden Forest
	"Forest's Brook": Map.ForestBrook,

	// Valley of Triumph
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

export const WINGED_LIGHT_AREAS_COUNT = {
	IslesOfDawn: 9,
	DaylightPrairie: 24,
	HiddenForest: 19,
	ValleyOfTriumph: 17,
	GoldenWasteland: 18,
	VaultOfKnowledge: 12,
	EyeOfEden: 10,
	AncientMemory: 6,
	Orbit: 1,
} as const;

export const WINGED_LIGHT_AREAS_COUNT_VALUES = Object.values(WINGED_LIGHT_AREAS_COUNT);
type WingedLightAreasCount = (typeof WINGED_LIGHT_AREAS_COUNT_VALUES)[number];

export const AreaToWingedLightCount = {
	[Realm.IslesOfDawn]: WINGED_LIGHT_AREAS_COUNT.IslesOfDawn,
	[Realm.DaylightPrairie]: WINGED_LIGHT_AREAS_COUNT.DaylightPrairie,
	[Realm.HiddenForest]: WINGED_LIGHT_AREAS_COUNT.HiddenForest,
	[Realm.ValleyOfTriumph]: WINGED_LIGHT_AREAS_COUNT.ValleyOfTriumph,
	[Realm.GoldenWasteland]: WINGED_LIGHT_AREAS_COUNT.GoldenWasteland,
	[Realm.VaultOfKnowledge]: WINGED_LIGHT_AREAS_COUNT.VaultOfKnowledge,
	[Realm.EyeOfEden]: WINGED_LIGHT_AREAS_COUNT.EyeOfEden,
	[Map.AncientMemory]: WINGED_LIGHT_AREAS_COUNT.AncientMemory,
	[Map.Orbit]: WINGED_LIGHT_AREAS_COUNT.Orbit,
} as const satisfies Readonly<Record<Realm | Map.AncientMemory | Map.Orbit, WingedLightAreasCount>>;

export const LOCALES = Object.values(Locale);
