import process from "node:process";
import { URL } from "node:url";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { resolveShardEruptionMapURL, skyDate } from "./Utility.js";

dayjs.extend(timezone);
dayjs.extend(utc);

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

export enum Season {
	Gratitude = "Gratitude",
	Lightseekers = "Lightseekers",
	Belonging = "Belonging",
	Rhythm = "Rhythm",
	Enchantment = "Enchantment",
	Sanctuary = "Sanctuary",
	Prophecy = "Prophecy",
	Dreams = "Dreams",
	Assembly = "Assembly",
	LittlePrince = "Little Prince",
	Flight = "Flight",
	Abyss = "Abyss",
	Performance = "Performance",
	Shattering = "Shattering",
	Aurora = "AURORA",
	Remembrance = "Remembrance",
	Passage = "Passage",
	Moments = "Moments",
	Revival = "Revival",
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

// Infographic URLs.
export const EVENT_CURRENCY_INFOGRAPHIC_URL: string | null = String(
	new URL("daily_guides/events/days_of_mischief/2023.webp", CDN_URL),
);

// Dates.
export const DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE = skyDate(2_023, 11, 20);
export const DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE = skyDate(2_023, 11, 26);

export const DOUBLE_SEASONAL_LIGHT_EVENT_DURATION =
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days") + 1;

export const SEASON_START_DATE = skyDate(2_023, 10, 16); // Season of Revival.
export const SEASON_END_DATE = skyDate(2_023, 12, 31); // Season of Revival.
export const SEASON_DURATION = SEASON_END_DATE.diff(SEASON_START_DATE, "days") + 1;
export const EVENT_START_DATE = skyDate(2_023, 10, 23); // Days of Mischief.
export const EVENT_END_DATE = skyDate(2_023, 11, 12); // Days of Mischief.

// Current seasonal information.
export const CURRENT_SEASON = Season.Revival;
export const CURRENT_SEASONAL_EMOJI = Emoji.SeasonRevival;
export const CURRENT_SEASONAL_CANDLE_EMOJI = Emoji.CandleRevival;

// Miscellaneous constants.
export const PRODUCTION = process.env.NODE_ENV === "production";
export const DEVELOPER_GUILD_ID = "1017993798170726411" as const;
export const WEBSITE_URL = "https://thatskyapplication.com" as const;
export const THATSKYGAME_URL = "https://thatskygame.com" as const;
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
export const PATREON_URL = "https://patreon.com/Jiralite" as const;
export const KO_FI_URL = "https://ko-fi.com/jiralite" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki" as const;
export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = 222 as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const SEASON_PASS_SEASONAL_CANDLES_BONUS = 30 as const;
export const INFOGRAPHICS_DATABASE_GUILD_ID = "736912435654688868" as const;
export const MAX_HUG_NO = 21 as const;
export const INITIAL_TRAVELLING_SPIRIT_SEEK = dayjs.tz("2023-05-25 00:00:00", "America/Los_Angeles"); // #88 Grateful Shell Collector.
export const INITIAL_TREASURE_CANDLE_REALM_SEEK = skyDate(2_023, 9, 29); // Daylight Prairie.
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

	// Season of Shattering
	AncientMemory = "Ancient Memory",
}

export const SOCIAL_LIGHT_AREA_MAPS = [Map.Cave, Map.ElevatedClearing, Map.VillageOfDreams, Map.Graveyard] as const;
export type SocialLightAreaMaps = (typeof SOCIAL_LIGHT_AREA_MAPS)[number];

export const SocialLightAreaMapToCDNString = {
	[Map.Cave]: "cosy_hideout",
	[Map.ElevatedClearing]: "ancestors_table_of_belonging",
	[Map.VillageOfDreams]: "hot_spring",
	[Map.Graveyard]: "bonfire",
} as const satisfies Readonly<Record<SocialLightAreaMaps, string>>;

export const SHARD_ERUPTION_PREDICTION_DATA = [
	{
		noShardWeekDay: [6, 0], // Saturday, Sunday
		interval: 8,
		// 1 hour and 50 minutes.
		offset: 6_600_000,
		area: [Map.ButterflyFields, Map.ForestBrook, Map.IceRink, Map.BrokenTemple, Map.StarlightDesert].map((map) => ({
			map,
			url: resolveShardEruptionMapURL(map),
			reward: 200,
		})),
	},
	{
		noShardWeekDay: [0, 1], // Sunday, Monday
		interval: 8,
		// 2 hours and 10 minutes.
		offset: 7_800_000,
		area: [Map.KoiPond, Map.Boneyard, Map.IceRink, Map.Battlefield, Map.StarlightDesert].map((map) => ({
			map,
			url: resolveShardEruptionMapURL(map),
			reward: 200,
		})),
	},
	{
		noShardWeekDay: [1, 2], // Monday, Tuesday
		interval: 6,
		// 7 hours and 40 minutes.
		offset: 27_600_000,
		area: [
			{ map: Map.Cave, url: resolveShardEruptionMapURL(Map.Cave), reward: 2 },
			{ map: Map.ForestEnd, url: resolveShardEruptionMapURL(Map.ForestEnd), reward: 2.5 },
			{ map: Map.VillageOfDreams, url: resolveShardEruptionMapURL(Map.VillageOfDreams), reward: 2.5 },
			{ map: Map.Graveyard, url: resolveShardEruptionMapURL(Map.Graveyard), reward: 2 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [2, 3], // Tuesday, Wednesday
		interval: 6,
		// 2 hours and 20 minutes.
		offset: 8_400_000,
		area: [
			{ map: Map.BirdNest, url: resolveShardEruptionMapURL(Map.BirdNest), reward: 2.5 },
			{ map: Map.Treehouse, url: resolveShardEruptionMapURL(Map.Treehouse), reward: 3.5 },
			{ map: Map.VillageOfDreams, url: resolveShardEruptionMapURL(Map.VillageOfDreams), reward: 2.5 },
			{ map: Map.CrabFields, url: resolveShardEruptionMapURL(Map.CrabFields), reward: 2.5 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [3, 4], // Wednesday, Thursday
		interval: 6,
		// 3 hours and 30 minutes.
		offset: 12_600_000,
		area: [
			{ map: Map.SanctuaryIslands, url: resolveShardEruptionMapURL(Map.SanctuaryIslands), reward: 3.5 },
			{ map: Map.ElevatedClearing, url: resolveShardEruptionMapURL(Map.ElevatedClearing), reward: 3.5 },
			{ map: Map.HermitValley, url: resolveShardEruptionMapURL(Map.HermitValley), reward: 3.5 },
			{ map: Map.ForgottenArk, url: resolveShardEruptionMapURL(Map.ForgottenArk), reward: 3.5 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
] as const;

export const WINGED_LIGHT_AREAS = [...REALM_VALUES, Map.AncientMemory] as const;

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
export type RotationNumber = 1 | 2;

export const SEASONAL_CANDLES_ROTATION = [
	{ rotation: 1, realm: Realm.DaylightPrairie },
	{ rotation: 1, realm: Realm.HiddenForest },
	{ rotation: 1, realm: Realm.ValleyOfTriumph },
	{ rotation: 1, realm: Realm.GoldenWasteland },
	{ rotation: 1, realm: Realm.VaultOfKnowledge },
	{ rotation: 2, realm: Realm.DaylightPrairie },
	{ rotation: 2, realm: Realm.HiddenForest },
	{ rotation: 2, realm: Realm.ValleyOfTriumph },
	{ rotation: 2, realm: Realm.GoldenWasteland },
	{ rotation: 2, realm: Realm.VaultOfKnowledge },
] as const satisfies Readonly<{ rotation: RotationNumber; realm: Realm }[]>;

export const WingedLightCount = {
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
