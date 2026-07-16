import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { styleText } from "node:util";
import { Cosmetic, CosmeticCommon, CosmeticPackName } from "../source/cosmetics.js";
import { DailyQuest } from "../source/daily-guides.js";
import { AreaName } from "../source/kingdom/geography.js";
import { SeasonId } from "../source/season.js";
import { SpiritId } from "../source/utility/spirits.js";

// --update-en also updates en-gb.ts.

const blue = (text: string) => styleText("blue", text);
const bold = (text: string) => styleText("bold", text);
const cyan = (text: string) => styleText("cyan", text);
const dim = (text: string) => styleText("dim", text);
const green = (text: string) => styleText("green", text);
const yellow = (text: string) => styleText("yellow", text);
const ROOT = resolve(import.meta.dirname, "..");
const LPROJ_DIR = join(ROOT, "locales");
const CHANGE_LOG_PATH = join(LPROJ_DIR, "changes.txt");
const SOURCE_LOCALES_DIR = join(ROOT, "source", "locales");
const EN_GB_TS = join(SOURCE_LOCALES_DIR, "en-gb.ts");
const changes: string[] = [];

const LPROJ_TO_JSON: Record<string, string[]> = {
	Base: [], // handled separately via --update-en
	de: ["de"],
	es: ["es-es", "es-419"],
	fr: ["fr"],
	id: [], // no JSON counterpart
	it: ["it"],
	ja: ["ja"],
	ko: ["ko"],
	pt: ["pt-br"],
	ru: ["ru"],
	th: ["th"],
	vi: ["vi"],
	"zh-Hans": ["zh-cn"],
	"zh-Hant": ["zh-tw"],
};

/**
 * Maps a TS object name to its runtime value object.
 * Add new entries here when other objects need syncing.
 */
const TS_KEY_OBJECTS: Record<string, Readonly<Record<string, number | string>>> = {
	Cosmetic,
	CosmeticCommon,
	CosmeticPackName,
	DailyQuest,
	AreaName,
	SeasonId,
	SpiritId,
};

/**
 * Maps a TS object name to its dot-path prefix in the JSON locale files.
 */
const TS_KEY_JSON_PREFIXES: Record<string, string> = {
	Cosmetic: "general.cosmetic-names",
	CosmeticCommon: "general.cosmetic-common-names",
	CosmeticPackName: "general.cosmetic-pack-names",
	DailyQuest: "general.quests",
	AreaName: "general.areas",
	SeasonId: "general.seasons",
	SpiritId: "general.spirits",
};

/**
 * Resolves a TS key like "DailyQuest.MemberName" to its JSON dot-path
 * like "general.quests.284" by looking up the runtime value.
 */
function resolveJsonPath(tsKey: string): string {
	const dotIndex = tsKey.indexOf(".");
	const objectName = tsKey.slice(0, dotIndex);
	const memberName = tsKey.slice(dotIndex + 1);
	const obj = TS_KEY_OBJECTS[objectName];

	if (!obj) {
		throw new Error(`Unknown TS object "${objectName}" — add it to TS_KEY_OBJECTS`);
	}

	// Numeric enums include reverse mappings (number → name); we only want named keys.
	const value = obj[memberName];

	if (typeof value !== "number" && typeof value !== "string") {
		throw new Error(`Unknown member "${memberName}" on ${objectName}`);
	}

	const prefix = TS_KEY_JSON_PREFIXES[objectName];
	if (!prefix) {
		throw new Error(`No JSON prefix for "${objectName}" — add it to TS_KEY_JSON_PREFIXES`);
	}

	return `${prefix}.${value}`;
}

interface LocaleOverride {
	/** Normalised upstream value this override is allowed to replace. */
	upstreamValue: string;
	value: string;
}

type LocaleMapping =
	| {
			/** Key in upstream Localizable.strings. */
			upstreamKey: string;
			/** Locale-specific output overrides for strings where the upstream value is not suitable as a standalone locale entry. */
			overrides?: Readonly<Record<string, LocaleOverride>>;
			/**
			 * TypeScript computed-property key used in en-gb.ts.
			 * The JSON path is derived automatically from the TS object's runtime value.
			 *
			 * @example "DailyQuest.TidyUpTheAncestorsTableOfBelongingInHiddenForestsElevatedClearing"
			 */
			tsKey: string;
			jsonPath?: never;
	  }
	| {
			upstreamKey: string;
			overrides?: Readonly<Record<string, LocaleOverride>>;
			/**
			 * Explicit dot-separated path into the JSON locale object.
			 * Use this for strings that have no corresponding TS object.
			 * E.g. "general.quests.284" → obj.general.quests["284"]
			 */
			jsonPath: string;
			/**
			 * Optional TS key, needed when running with --update-en.
			 */
			tsKey?: string;
	  };

/**
 * Stuff should be added here. The good stuff. Oh yeah.
 */
const MAPPINGS: LocaleMapping[] = [
	{
		upstreamKey: "title_dawn_01",
		tsKey: "AreaName.DawnCircle",
	},
	{
		upstreamKey: "title_dawn_start_01",
		tsKey: "AreaName.PassageRock",
	},
	{
		upstreamKey: "title_dawn_shrine_01",
		tsKey: "AreaName.TempleOfTheIsle",
	},
	{
		upstreamKey: "title_dawn_plateau_01",
		tsKey: "AreaName.DawnOverlook",
	},
	{
		upstreamKey: "title_water_trial_01",
		tsKey: "AreaName.TrialOfWater",
	},
	{
		upstreamKey: "title_earth_trial_01",
		tsKey: "AreaName.TrialOfEarth",
	},
	{
		upstreamKey: "title_air_trial_01",
		tsKey: "AreaName.TrialOfAir",
	},
	{
		upstreamKey: "title_fire_trial_01",
		tsKey: "AreaName.TrialOfFire",
	},
	{
		upstreamKey: "title_dawncave_01",
		tsKey: "AreaName.CaveOfProphecies",
	},
	{
		upstreamKey: "title_prairie_butterflyfields_town_01",
		tsKey: "AreaName.PrairieRest",
	},
	{
		upstreamKey: "title_prairie_butterflyfields_01",
		tsKey: "AreaName.ButterflyFields",
	},
	{
		upstreamKey: "name_prairie_nestandkeeper",
		tsKey: "AreaName.BirdNest",
	},
	{
		upstreamKey: "title_prairie_island_01",
		tsKey: "AreaName.SanctuaryIslands",
	},
	{
		upstreamKey: "name_prairie_cave",
		tsKey: "AreaName.PrairieCave",
	},
	{
		upstreamKey: "title_prairie_wildlifepark_01",
		tsKey: "AreaName.PrairiePeaks",
	},
	{
		upstreamKey: "title_prairie_village",
		tsKey: "AreaName.PrairieVillage",
	},
	{
		upstreamKey: "title_dayhubcave_01",
		tsKey: "AreaName.PrairieHeights",
	},
	{
		upstreamKey: "title_prairie_village_shrine_01",
		tsKey: "AreaName.TempleOfThePrairie",
	},
	{
		upstreamKey: "title_skyway_01",
		tsKey: "AreaName.TheWindPaths",
	},
	{
		upstreamKey: "title_rain_01",
		tsKey: "AreaName.ForestCourtyard",
	},
	{
		upstreamKey: "title_rain_basecamp_01",
		tsKey: "AreaName.TheTreehouse",
	},
	{
		upstreamKey: "name_rainforest",
		tsKey: "AreaName.ForestBrook",
	},
	{
		upstreamKey: "name_rainmid",
		tsKey: "AreaName.Boneyard",
	},
	{
		upstreamKey: "name_rainshelter",
		overrides: {
			fr: {
				upstreamValue: "clairière élevée",
				value: "Clairière élevée",
			},
		},
		tsKey: "AreaName.ElevatedClearing",
	},
	{
		upstreamKey: "title_rain_bluebirdtheater_01",
		tsKey: "AreaName.BlueBirdTheatre",
	},
	{
		upstreamKey: "title_rain_cave_01",
		tsKey: "AreaName.ForestCavern",
	},
	{
		upstreamKey: "title_rainend_pond_01",
		tsKey: "AreaName.SacredPond",
	},
	{
		upstreamKey: "title_sunset_town_01",
		tsKey: "AreaName.ValleyRest",
	},
	{
		upstreamKey: "title_sunset_01",
		tsKey: "AreaName.FrozenLake",
	},
	{
		upstreamKey: "title_sunset_citadel_01",
		tsKey: "AreaName.TheCitadel",
	},
	{
		upstreamKey: "title_sunsetrace_01",
		tsKey: "AreaName.LowerValleyTrack",
	},
	{
		upstreamKey: "title_sunset_flyrace_01",
		tsKey: "AreaName.UpperValleyTrack",
	},
	{
		upstreamKey: "title_sunsetcolosseum_01",
		tsKey: "AreaName.TempleOfTheValley",
	},
	{
		upstreamKey: "title_sunsetvillage_01",
		tsKey: "AreaName.VillageOfDreams",
	},
	{
		upstreamKey: "title_yetipark_01",
		tsKey: "AreaName.HermitValley",
	},
	{
		upstreamKey: "title_sunset_theater_01",
		tsKey: "AreaName.VillageTheatre",
	},
	{
		upstreamKey: "title_dusk_triangle_01",
		tsKey: "AreaName.TreasureReef",
	},
	{
		upstreamKey: "title_dusk_01",
		tsKey: "AreaName.TheOuterBailey",
	},
	{
		upstreamKey: "name_duskgraveyard",
		tsKey: "AreaName.TheGraveyard",
	},
	{
		upstreamKey: "title_oasis_01",
		tsKey: "AreaName.ForgottenArk",
	},
	{
		upstreamKey: "title_duskmid_01",
		tsKey: "AreaName.TheBattlefield",
	},
	{
		upstreamKey: "name_duskcrabfield",
		tsKey: "AreaName.CrabFields",
	},
	{
		upstreamKey: "title_duskend_01",
		tsKey: "AreaName.TempleOfTheWasteland",
	},
	{
		upstreamKey: "title_night_01",
		tsKey: "AreaName.VaultRest",
	},
	{
		upstreamKey: "title_nightarchive_01",
		tsKey: "AreaName.VaultArchive",
	},
	{
		upstreamKey: "title_night_shelter_01",
		tsKey: "AreaName.RepositoryOfRefuge",
	},
	{
		upstreamKey: "title_night_thirdfloor_01",
		tsKey: "AreaName.LowerVault",
	},
	{
		upstreamKey: "title_night2_01",
		tsKey: "AreaName.UpperVault",
	},
	{
		upstreamKey: "title_night2_secondfloor_01",
		tsKey: "AreaName.TempleOfTheVault",
	},
	{
		upstreamKey: "title_nightdesert_01",
		tsKey: "AreaName.StarlightDesert",
	},
	{
		upstreamKey: "name_nightdesert_beach",
		tsKey: "AreaName.JellyfishCove",
	},
	{
		upstreamKey: "title_night_paintedWorld_01",
		tsKey: "AreaName.CrescentOasis",
	},
	{
		upstreamKey: "title_night_storybook_01",
		tsKey: "AreaName.Moominvalley",
	},
	{
		upstreamKey: "title_night_workshop_01",
		tsKey: "AreaName.FracturedLanternStorage",
	},
	{
		upstreamKey: "title_night_go_gallery_01",
		tsKey: "AreaName.StarryGallery",
	},
	{
		upstreamKey: "title_stormstart_01",
		tsKey: "AreaName.GateOfEden",
	},
	{
		upstreamKey: "title_storm_01",
		tsKey: "AreaName.PathOfEden",
	},
	{
		upstreamKey: "storm_endtitle_01",
		tsKey: "AreaName.EyeOfEden",
	},
	{
		upstreamKey: "title_candlespaceend_01",
		tsKey: "AreaName.ThePassage",
	},
	{
		upstreamKey: "title_stormy_void_memeory_01",
		tsKey: "AreaName.AncientMemory",
	},
	{
		upstreamKey: "name_questap15",
		tsKey: "AreaName.TheVoidOfShattering",
	},
	{
		upstreamKey: "name_mainstreet",
		tsKey: "AreaName.AviaryVillage",
	},
	{
		upstreamKey: "title_aviary_carnival_01",
		tsKey: "AreaName.WanderingCarnival",
	},
	{
		upstreamKey: "title_duskmid_past_01",
		tsKey: "AreaName.TheLastCity",
	},
	{
		upstreamKey: "name_season_02",
		tsKey: "SeasonId.Gratitude",
	},
	{
		upstreamKey: "name_season_03",
		tsKey: "SeasonId.Lightseekers",
	},
	{
		upstreamKey: "name_season_04",
		tsKey: "SeasonId.Belonging",
	},
	{
		upstreamKey: "name_season_05",
		tsKey: "SeasonId.Rhythm",
	},
	{
		upstreamKey: "name_season_06",
		tsKey: "SeasonId.Enchantment",
	},
	{
		upstreamKey: "name_season_07",
		tsKey: "SeasonId.Sanctuary",
	},
	{
		upstreamKey: "name_season_08",
		tsKey: "SeasonId.Prophecy",
	},
	{
		upstreamKey: "name_season_09",
		tsKey: "SeasonId.Dreams",
	},
	{
		upstreamKey: "name_season_10",
		tsKey: "SeasonId.Assembly",
	},
	{
		upstreamKey: "name_season_11",
		tsKey: "SeasonId.LittlePrince",
	},
	{
		upstreamKey: "name_season_12",
		tsKey: "SeasonId.Flight",
	},
	{
		upstreamKey: "name_season_13",
		tsKey: "SeasonId.Abyss",
	},
	{
		upstreamKey: "name_season_14",
		tsKey: "SeasonId.Performance",
	},
	{
		upstreamKey: "name_season_15",
		tsKey: "SeasonId.Shattering",
	},
	{
		upstreamKey: "name_season_16",
		tsKey: "SeasonId.AURORA",
	},
	{
		upstreamKey: "name_season_17",
		tsKey: "SeasonId.Remembrance",
	},
	{
		upstreamKey: "name_season_18",
		tsKey: "SeasonId.Passage",
	},
	{
		upstreamKey: "name_season_19",
		tsKey: "SeasonId.Moments",
	},
	{
		upstreamKey: "name_season_20",
		tsKey: "SeasonId.Revival",
	},
	{
		upstreamKey: "name_season_21",
		tsKey: "SeasonId.NineColouredDeer",
	},
	{
		upstreamKey: "name_season_22",
		tsKey: "SeasonId.Nesting",
	},
	{
		upstreamKey: "name_season_23",
		tsKey: "SeasonId.Duets",
	},
	{
		upstreamKey: "name_season_24",
		tsKey: "SeasonId.Moomin",
	},
	{
		upstreamKey: "name_season_25",
		tsKey: "SeasonId.Radiance",
	},
	{
		upstreamKey: "name_season_26",
		tsKey: "SeasonId.BlueBird",
	},
	{
		upstreamKey: "name_season_27",
		tsKey: "SeasonId.TwoEmbersPart1",
	},
	{
		upstreamKey: "name_season_28",
		tsKey: "SeasonId.Migration",
	},
	{
		upstreamKey: "name_season_29",
		tsKey: "SeasonId.Lightmending",
	},
	{
		upstreamKey: "name_season_30",
		tsKey: "SeasonId.Carnival",
	},
	{
		upstreamKey: "name_season_31",
		tsKey: "SeasonId.DearVanGogh",
	},
	{
		upstreamKey: "daily_quest_world_quest_ap09_fetch_04_desc",
		tsKey: "DailyQuest.RehearseForAPerformanceWithTheSkater",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_island_1_desc",
		tsKey: "DailyQuest.HelpCacklingCannoneerGratefulShellCollectorFindTreasureInSanctuaryIslands",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_island_2_desc",
		tsKey: "DailyQuest.HelpAnxiousAnglerGratefulShellCollectorFindTreasureInSanctuaryIslands",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_village_1_desc",
		tsKey: "DailyQuest.HelpBumblingBoatswainSlumberingShipwrightFindTreasureInPrairieVillage",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_village_2_desc",
		tsKey: "DailyQuest.HelpCacklingCannoneerSlumberingShipwrightFindTreasureInPrairieVillage",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_wildlifepark_1_desc",
		tsKey: "DailyQuest.HelpAnxiousAnglerJollyGeologistFindTreasureInPrairiePeaks",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_wildlifepark_2_desc",
		tsKey: "DailyQuest.HelpBumblingBoatswainJollyGeologistFindTreasureInPrairiePeaks",
	},
	{
		upstreamKey: "daily_quest_dotreasure_dusk_1_desc",
		tsKey: "DailyQuest.HelpCeasingCommodoreMarchingAdventurerFindTreasureInTreasureReef",
	},
	{
		upstreamKey: "daily_quest_dotreasure_dusk_2_desc",
		tsKey: "DailyQuest.HelpAnxiousAnglerMarchingAdventurerFindTreasureInTreasureReef",
	},
	{
		upstreamKey: "daily_quest_dotreasure_night_1_desc",
		tsKey: "DailyQuest.HelpAnxiousAnglerStarCollectorFindTreasureInStarlightDesert",
	},
	{
		upstreamKey: "daily_quest_dotreasure_night_2_desc",
		tsKey: "DailyQuest.HelpCacklingCannoneerStarCollectorFindTreasureInStarlightDesert",
	},
	{
		upstreamKey: "daily_quest_dotreasure_rain_1_desc",
		tsKey: "DailyQuest.HelpCacklingCannoneerOrScoldingStudentFindTreasureInHiddenForest",
	},
	{
		upstreamKey: "daily_quest_dotreasure_rain_2_desc",
		tsKey: "DailyQuest.HelpCeasingCommodoreOrScoldingStudentFindTreasureInHiddenForest",
	},
	{
		upstreamKey: "daily_quest_dotreasure_sunset_1_desc",
		tsKey: "DailyQuest.HelpBumblingBoatswainOrBearhugHermitFindTreasureInVillageOfDreams",
	},
	{
		upstreamKey: "daily_quest_dotreasure_sunset_2_desc",
		tsKey: "DailyQuest.HelpCeasingCommodoreOrBearhugHermitFindTreasureInVillageOfDreams",
	},
	{
		upstreamKey: "daily_quest_wave_at_a_player_desc",
		tsKey: "DailyQuest.WaveToAPlayer",
	},
	{
		upstreamKey: "daily_quest_color_voted_for_kite_desc",
		tsKey: "DailyQuest.ProposeAKiteDesignInPrairieHeights",
	},
	{
		upstreamKey: "name_questap30",
		tsKey: "SpiritId.CarnivalGuide",
	},
	{
		upstreamKey: "name_breakdance",
		tsKey: "SpiritId.CarnivalAthleticDancer",
	},
	{
		upstreamKey: "name_balltrick",
		tsKey: "SpiritId.CarnivalJuggler",
	},
	{
		upstreamKey: "name_write",
		tsKey: "SpiritId.CarnivalPuzzleDirector",
	},
	{
		upstreamKey: "name_approve",
		tsKey: "SpiritId.CarnivalStuntActor",
	},
	{
		upstreamKey: "name_questap31",
		tsKey: "SpiritId.VaseWithFifteenSunflowers",
	},
	{
		upstreamKey: "name_frustration",
		tsKey: "SpiritId.DutchMemory",
	},
	{
		upstreamKey: "name_bask",
		tsKey: "SpiritId.RusticMemory",
	},
	{
		upstreamKey: "name_draw",
		tsKey: "SpiritId.ArtisticMemory",
	},
	{
		upstreamKey: "name_slowwalk",
		tsKey: "SpiritId.JoyfulMemory",
	},
	{
		upstreamKey: "commerce_item_name_starter_pack",
		tsKey: "Cosmetic.MobileCape",
	},
	{
		upstreamKey: "sheet_03",
		tsKey: "Cosmetic.BirdWhispererMusicSheet",
	},
	{
		upstreamKey: "sheet_04",
		tsKey: "Cosmetic.WhaleWhispererMusicSheet",
	},
	{
		upstreamKey: "consumable_name_shout_manta",
		tsKey: "Cosmetic.CallManta",
	},
	{
		upstreamKey: "sheet_05",
		tsKey: "Cosmetic.MantaWhispererMusicSheet",
	},
	{
		upstreamKey: "sheet_07",
		tsKey: "Cosmetic.ProvokingPerformerMusicSheet",
	},
	{
		upstreamKey: "sheet_08",
		tsKey: "Cosmetic.SalutingProtectorMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_founder_pack",
		tsKey: "Cosmetic.FoundersCape",
	},
	{
		upstreamKey: "sheet_09",
		tsKey: "Cosmetic.LaidbackPioneerMusicSheet",
	},
	{
		upstreamKey: "consumable_name_shout_crab",
		tsKey: "Cosmetic.CallCrab",
	},
	{
		upstreamKey: "sheet_10",
		tsKey: "Cosmetic.CrabWhispererMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_ap_cape_bat",
		tsKey: "Cosmetic.SpookyBatCape",
	},
	{
		upstreamKey: "commerce_item_name_ap_pumpkin_head",
		tsKey: "Cosmetic.HungryPumpkinHat",
	},
	{
		upstreamKey: "consumable_name_bonfire",
		tsKey: "Cosmetic.BelongingBonfire",
	},
	{
		upstreamKey: "sheet_12",
		tsKey: "Cosmetic.HairtousleTeenMusicSheet",
	},
	{
		upstreamKey: "sheet_11",
		tsKey: "Cosmetic.WiseGrandparentMusicSheet",
	},
	{
		upstreamKey: "sheet_01",
		tsKey: "Cosmetic.TroupeGreeterMusicSheet",
	},
	{
		upstreamKey: "sheet_02",
		tsKey: "Cosmetic.FestivalSpinDancerMusicSheet",
	},
	{
		upstreamKey: "sheet_06",
		tsKey: "Cosmetic.AdmiringActorMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_daysoflove_pack",
		tsKey: "Cosmetic.DaysOfLoveSwing",
	},
	{
		upstreamKey: "sheet_13",
		tsKey: "Cosmetic.PlayfightingHerbalistMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_daysofnature_pack",
		tsKey: "Cosmetic.EarthCape",
	},
	{
		upstreamKey: "commerce_item_name_covid_pack",
		tsKey: "Cosmetic.HealingHairAccessory",
	},
	{
		upstreamKey: "consumable_name_shout_jelly",
		tsKey: "Cosmetic.CallJellyfish",
	},
	{
		upstreamKey: "sheet_14",
		tsKey: "Cosmetic.JellyWhispererMusicSheet",
	},
	{
		upstreamKey: "sheet_15",
		tsKey: "Cosmetic.TimidBookwormMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_summer_pack",
		tsKey: "Cosmetic.DaysOfSummerLightsLantern",
	},
	{
		upstreamKey: "sheet_16",
		tsKey: "Cosmetic.ProphetOfEarthMusicSheet",
	},
	{
		upstreamKey: "sheet_17",
		tsKey: "Cosmetic.ProphetOfFireMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_mischief_web_cape",
		tsKey: "Cosmetic.MischiefWebCape",
	},
	{
		upstreamKey: "commerce_item_name_mischief_witch_hat",
		tsKey: "Cosmetic.MischiefWitchHat",
	},
	{
		upstreamKey: "commerce_item_name_xmas_cape",
		tsKey: "Cosmetic.DaysOfFeastCape",
	},
	{
		upstreamKey: "commerce_item_name_xmas_table",
		tsKey: "Cosmetic.DaysOfFeastTable",
	},
	{
		upstreamKey: "commerce_item_name_xmas_horn",
		tsKey: "Cosmetic.DaysOfFeastHorns",
	},
	{
		upstreamKey: "commerce_item_name_snowflake_cape",
		tsKey: "Cosmetic.SnowflakeCape",
	},
	{
		upstreamKey: "sheet_18",
		tsKey: "Cosmetic.PeekingPostmanMusicSheet",
	},
	{
		upstreamKey: "sheet_19",
		tsKey: "Cosmetic.BearhugHermitMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_fortune_orange",
		tsKey: "Cosmetic.DaysOfFortuneOrange",
	},
	{
		upstreamKey: "commerce_item_name_wool_hat",
		tsKey: "Cosmetic.DaysOfFortuneWoolHat",
	},
	{
		upstreamKey: "commerce_item_name_bloom_teatable",
		tsKey: "Cosmetic.PinkBloomTeaset",
	},
	{
		upstreamKey: "sheet_21",
		tsKey: "Cosmetic.ScaredyCadetMusicSheet",
	},
	{
		upstreamKey: "sheet_20",
		tsKey: "Cosmetic.DaydreamForesterMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_nature_oceannecklace",
		tsKey: "Cosmetic.OceanNecklace",
	},
	{
		upstreamKey: "commerce_item_name_nature_oceancape",
		tsKey: "Cosmetic.OceanCape",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_rainbowhair",
		tsKey: "Cosmetic.RainbowHat",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_pack",
		tsKey: "Cosmetic.RainbowFlower",
	},
	{
		upstreamKey: "commerce_item_name_littleprince_fox",
		tsKey: "Cosmetic.LittlePrinceFox",
	},
	{
		upstreamKey: "sheet_22",
		tsKey: "Cosmetic.GloatingNarcissistMusicSheet",
	},
	{
		upstreamKey: "sheet_23",
		tsKey: "Cosmetic.SlouchingSoldierMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_littleprince_coat",
		tsKey: "Cosmetic.LittlePrinceAsteroidJacket",
	},
	{
		upstreamKey: "commerce_item_name_summer_umbrella_pack",
		tsKey: "Cosmetic.SummerUmbrella",
	},
	{
		upstreamKey: "commerce_item_name_summer_hairpin",
		tsKey: "Cosmetic.SummerShellHairPin",
	},
	{
		upstreamKey: "commerce_item_name_summerlights_bunny",
		tsKey: "Cosmetic.SummerLightsAccessory",
	},
	{
		upstreamKey: "sheet_24",
		tsKey: "Cosmetic.LivelyNavigatorMusicSheet",
	},
	{
		upstreamKey: "sheet_25",
		tsKey: "Cosmetic.TalentedBuilderMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_mischief_witch_body",
		tsKey: "Cosmetic.MischiefWitchJumper",
	},
	{
		upstreamKey: "commerce_item_name_mischief_withered_horn",
		tsKey: "Cosmetic.MischiefWitheredAntlers",
	},
	{
		upstreamKey: "commerce_item_name_mischief_spider_hair",
		tsKey: "Cosmetic.MischiefSpiderQuiff",
	},
	{
		upstreamKey: "commerce_item_name_mischief_pumpkin_prop",
		tsKey: "Cosmetic.MischiefPumpkinProp",
	},
	{
		upstreamKey: "sheet_26",
		tsKey: "Cosmetic.OdeToJoyMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_feast_snowflakepin",
		tsKey: "Cosmetic.SnowflakeHairAccessory",
	},
	{
		upstreamKey: "commerce_item_name_feast_wintereldercape",
		tsKey: "Cosmetic.WinterAncestorCape",
	},
	{
		upstreamKey: "commerce_item_name_feast_snowglobe",
		tsKey: "Cosmetic.WinterFeastSnowGlobe",
	},
	{
		upstreamKey: "consumable_name_pinwheel",
		tsKey: "Cosmetic.SparklerParentPinwheel",
	},
	{
		upstreamKey: "sheet_28",
		tsKey: "Cosmetic.BumblingBoatswainMusicSheet",
	},
	{
		upstreamKey: "sheet_27",
		tsKey: "Cosmetic.CacklingCannoneerMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_fortune_carp",
		tsKey: "Cosmetic.DaysOfFortuneFishAccessory",
	},
	{
		upstreamKey: "commerce_item_name_love_gondola",
		tsKey: "Cosmetic.DaysOfLoveGondola",
	},
	{
		upstreamKey: "commerce_item_name_bloom_wisteriatable",
		tsKey: "Cosmetic.PurpleBloomTeaset",
	},
	{
		upstreamKey: "sheet_30",
		tsKey: "Cosmetic.FranticStagehandMusicSheet",
	},
	{
		upstreamKey: "sheet_29",
		tsKey: "Cosmetic.ModestDancerMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_nature_turtlewing",
		tsKey: "Cosmetic.NatureTurtleCape",
	},
	{
		upstreamKey: "commerce_item_name_nature_turtlepack",
		tsKey: "Cosmetic.NatureShoulderTurtle",
	},
	{
		upstreamKey: "sheet_minik0",
		tsKey: "Cosmetic.HarmonyHallMusicSheet1",
	},
	{
		upstreamKey: "sheet_minik1",
		tsKey: "Cosmetic.HarmonyHallMusicSheet2",
	},
	{
		upstreamKey: "sheet_minik2",
		tsKey: "Cosmetic.HarmonyHallMusicSheet3",
	},
	{
		upstreamKey: "sheet_minik3",
		tsKey: "Cosmetic.HarmonyHallMusicSheet4",
	},
	{
		upstreamKey: "commerce_item_name_musicshop_harp",
		tsKey: "Cosmetic.FledglingHarp",
	},
	{
		upstreamKey: "commerce_item_name_musicshop_guitar",
		tsKey: "Cosmetic.RhythmGuitar",
	},
	{
		upstreamKey: "commerce_item_name_musicshop_handpan",
		tsKey: "Cosmetic.TriumphHandpan",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_trousers",
		tsKey: "Cosmetic.RainbowTrousers",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_earring",
		tsKey: "Cosmetic.RainbowEarring",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_headphones",
		tsKey: "Cosmetic.RainbowHeadphones",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_pack2",
		tsKey: "Cosmetic.RainbowDoubleFlower",
	},
	{
		upstreamKey: "commerce_item_name_summer_jelly",
		tsKey: "Cosmetic.JellyShoulderBuddy",
	},
	{
		upstreamKey: "commerce_item_name_summer_marshmallow",
		tsKey: "Cosmetic.CampfireSnackKit",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_colorberet",
		tsKey: "Cosmetic.RainbowBeret",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_colortied_jumpsuit",
		tsKey: "Cosmetic.RainbowTiedJumpsuit",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_colorsleek",
		tsKey: "Cosmetic.RainbowMask",
	},
	{
		upstreamKey: "sheet_32",
		tsKey: "Cosmetic.AncientLightMantaMusicSheet",
	},
	{
		upstreamKey: "sheet_31",
		tsKey: "Cosmetic.AncientDarknessPlantMusicSheet",
	},
	{
		upstreamKey: "sheet_happy_birthday",
		tsKey: "Cosmetic.HappyBirthdayMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_tgc_guitar",
		tsKey: "Cosmetic.TGCGuitar",
	},
	{
		upstreamKey: "commerce_item_name_aurora_hair_accessory",
		tsKey: "Cosmetic.TiaraWeCanTouch",
	},
	{
		upstreamKey: "commerce_item_name_aurora_runaway_body",
		tsKey: "Cosmetic.RunawayOutfit",
	},
	{
		upstreamKey: "sheet_37",
		tsKey: "Cosmetic.RunningWayfarerMusicSheet",
	},
	{
		upstreamKey: "sheet_36",
		tsKey: "Cosmetic.WarriorOfLoveMusicSheet",
	},
	{
		upstreamKey: "sheet_34",
		tsKey: "Cosmetic.SeedOfHopeMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_mischief_catprop",
		tsKey: "Cosmetic.FelineFamiliarProp",
	},
	{
		upstreamKey: "commerce_item_name_aurora_instrument",
		tsKey: "Cosmetic.VoiceOfAURORA",
	},
	{
		upstreamKey: "sheet_33",
		tsKey: "Cosmetic.AURORAMusicSheet1",
	},
	{
		upstreamKey: "commerce_item_name_aurora_orangecape",
		tsKey: "Cosmetic.GivingInCape",
	},
	{
		upstreamKey: "commerce_item_name_aurora_orangedress",
		tsKey: "Cosmetic.ToTheLoveOutfit",
	},
	{
		upstreamKey: "sheet_35",
		tsKey: "Cosmetic.AURORAMusicSheet2",
	},
	{
		upstreamKey: "commerce_item_name_aurora_cape",
		tsKey: "Cosmetic.WingsOfAURORA",
	},
	{
		upstreamKey: "commerce_item_name_feast_ballgame",
		tsKey: "Cosmetic.TournamentSkyballSet",
	},
	{
		upstreamKey: "commerce_item_name_feast_furcape",
		tsKey: "Cosmetic.CosyHermitCape",
	},
	{
		upstreamKey: "commerce_item_name_fortune_muralist",
		tsKey: "Cosmetic.DaysOfFortuneMuralistsSmock",
	},
	{
		upstreamKey: "commerce_item_name_fortune_umbrella",
		tsKey: "Cosmetic.DaysOfFortuneEnchantedUmbrella",
	},
	{
		upstreamKey: "commerce_item_name_love_bow",
		tsKey: "Cosmetic.DaysOfLoveClassyCravat",
	},
	{
		upstreamKey: "commerce_item_name_love_heartstaff",
		tsKey: "Cosmetic.DaysOfLoveSerendipitousSceptre",
	},
	{
		upstreamKey: "commerce_item_name_bloom_gardenerbody",
		tsKey: "Cosmetic.BloomGardeningTunic",
	},
	{
		upstreamKey: "commerce_item_name_bloom_picnicblanket",
		tsKey: "Cosmetic.BloomPicnicBasket",
	},
	{
		upstreamKey: "commerce_item_name_nature_bluesunglasses",
		tsKey: "Cosmetic.NatureGlasses",
	},
	{
		upstreamKey: "commerce_item_name_nature_musicshell",
		tsKey: "Cosmetic.NatureSonorousSeashell",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_pack3",
		tsKey: "Cosmetic.DarkRainbowEarrings",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_darktunic",
		tsKey: "Cosmetic.DarkRainbowTunic",
	},
	{
		upstreamKey: "sheet_38",
		tsKey: "Cosmetic.DaysOfMusicMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_musicshop_violin",
		tsKey: "Cosmetic.TriumphViolin",
	},
	{
		upstreamKey: "sheet_39",
		tsKey: "Cosmetic.JollyGeologistMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_birthday_oreo",
		tsKey: "Cosmetic.AnniversaryPlush",
	},
	{
		upstreamKey: "commerce_item_name_aurora_sneakers",
		tsKey: "Cosmetic.MusicalVoyageSneakers",
	},
	{
		upstreamKey: "commerce_item_name_sunlight_sandals",
		tsKey: "Cosmetic.SunlightChunkySandals",
	},
	{
		upstreamKey: "commerce_item_name_sunlight_surfboard",
		tsKey: "Cosmetic.SunlightSurfboard",
	},
	{
		upstreamKey: "commerce_item_name_fashion_starglasses",
		tsKey: "Cosmetic.StyleStarSunglasses",
	},
	{
		upstreamKey: "commerce_item_name_fashion_balletflats",
		tsKey: "Cosmetic.StyleSilkBalletSlippers",
	},
	{
		upstreamKey: "commerce_item_name_fashion_flameglasses",
		tsKey: "Cosmetic.StyleFlameSunglasses",
	},
	{
		upstreamKey: "commerce_item_name_fashion_heartglasses",
		tsKey: "Cosmetic.StyleHeartSunglasses",
	},
	{
		upstreamKey: "commerce_item_name_fashion_bunnyslippers",
		tsKey: "Cosmetic.StyleBunnySlippers",
	},
	{
		upstreamKey: "commerce_item_name_fashion_jeans",
		tsKey: "Cosmetic.StyleWideLegJeans",
	},
	{
		upstreamKey: "sheet_40",
		tsKey: "Cosmetic.EchoOfAnAbandonedRefugeMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_mischief_cobwebcape",
		tsKey: "Cosmetic.MischiefGossamerCape",
	},
	{
		upstreamKey: "commerce_item_name_mischief_draculacape",
		tsKey: "Cosmetic.MischiefCrabulaCloak",
	},
	{
		upstreamKey: "commerce_item_name_mischief_draculamask",
		tsKey: "Cosmetic.MischiefCrabulaMask",
	},
	{
		upstreamKey: "commerce_item_name_feast_snowboard",
		tsKey: "Cosmetic.WinterFeastSnowboard",
	},
	{
		upstreamKey: "commerce_item_name_feast_yetiboots",
		tsKey: "Cosmetic.CosyHermitBoots",
	},
	{
		upstreamKey: "commerce_item_name_feast_puffercape",
		tsKey: "Cosmetic.WinterQuiltedCape",
	},
	{
		upstreamKey: "commerce_item_name_spring_sprouthorn",
		tsKey: "Cosmetic.SpringCloverSprout",
	},
	{
		upstreamKey: "sheet_41",
		tsKey: "Cosmetic.FeudalLordMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_fortune_dragonrobe",
		tsKey: "Cosmetic.DaysOfFortuneDragonVestment",
	},
	{
		upstreamKey: "commerce_item_name_fortune_dragoncape",
		tsKey: "Cosmetic.DaysOfFortuneDragonStole",
	},
	{
		upstreamKey: "commerce_item_name_fortune_dragonearring",
		tsKey: "Cosmetic.DaysOfFortuneDragonBangles",
	},
	{
		upstreamKey: "sheet_42",
		tsKey: "Cosmetic.DaysofLoveMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_love_meteorwing",
		tsKey: "Cosmetic.DaysofLoveMeteorMantle",
	},
	{
		upstreamKey: "commerce_item_name_bloom_leafumbrella",
		tsKey: "Cosmetic.BloomLilypadUmbrella",
	},
	{
		upstreamKey: "commerce_item_name_cafe_pastryplush",
		tsKey: "Cosmetic.CinnamorollPopUpCafePlushie",
	},
	{
		upstreamKey: "commerce_item_name_cafe_pastrymini",
		tsKey: "Cosmetic.CinnamorollPopUpCafeMiniCompanion",
	},
	{
		upstreamKey: "commerce_item_name_nature_waterwavewing",
		tsKey: "Cosmetic.NatureWaveCape",
	},
	{
		upstreamKey: "commerce_item_name_nature_waterhair",
		tsKey: "Cosmetic.NatureWaveTouchedHair",
	},
	{
		upstreamKey: "placeable_radio_title",
		tsKey: "Cosmetic.MusicPlayer",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_darkloafers",
		tsKey: "Cosmetic.DarkRainbowLoafers",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_bubblemachine",
		tsKey: "Cosmetic.ColourBubbleMachine",
	},
	{
		upstreamKey: "commerce_item_name_oreoheadband",
		tsKey: "Cosmetic.SkyFestOreoHeadband",
	},
	{
		upstreamKey: "commerce_item_name_tgcwireframe",
		tsKey: "Cosmetic.SkyFestWireframeCape",
	},
	{
		upstreamKey: "sheet_43",
		tsKey: "Cosmetic.TheMusiciansLegacyMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_competition_laurel",
		tsKey: "Cosmetic.TournamentGoldenGarland",
	},
	{
		upstreamKey: "commerce_item_name_competition_greekrobe",
		tsKey: "Cosmetic.TournamentTunic",
	},
	{
		upstreamKey: "commerce_item_name_sunlight_mantafloat",
		tsKey: "Cosmetic.SunlightMantaFloat",
	},
	{
		upstreamKey: "commerce_item_name_sunlight_sunnyearring",
		tsKey: "Cosmetic.SunlightHeliosHoops",
	},
	{
		upstreamKey: "commerce_item_name_sunlight_linencover",
		tsKey: "Cosmetic.SunlightWovenWrap",
	},
	{
		upstreamKey: "commerce_item_name_moonlight_earring",
		tsKey: "Cosmetic.MoonlightEarrings",
	},
	{
		upstreamKey: "commerce_item_name_moomin_hattineck",
		tsKey: "Cosmetic.HattifattenerShoulderBuddy",
	},
	{
		upstreamKey: "commerce_item_name_moomin_snufkinhat",
		tsKey: "Cosmetic.PointedSnufkinHat",
	},
	{
		upstreamKey: "sheet_45",
		tsKey: "Cosmetic.SenseOfSelfMusicSheet",
	},
	{
		upstreamKey: "sheet_44",
		tsKey: "Cosmetic.SpiritOfAdventureMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_mischief_ravencape",
		tsKey: "Cosmetic.MischiefRavenFeatheredCloak",
	},
	{
		upstreamKey: "commerce_item_name_mischief_broomprop",
		tsKey: "Cosmetic.MischiefWitheredBroom",
	},
	{
		upstreamKey: "commerce_item_name_musicshop_banduniform",
		tsKey: "Cosmetic.MusicMarchingUniform",
	},
	{
		upstreamKey: "commerce_item_name_musicshop_pianoupright",
		tsKey: "Cosmetic.FledglingUprightPiano",
	},
	{
		upstreamKey: "commerce_item_name_moomin_ninnycape",
		tsKey: "Cosmetic.MoominmammasMasterpiece",
	},
	{
		upstreamKey: "commerce_item_name_feast_wonderland_crabbithole",
		tsKey: "Cosmetic.WonderlandCafeCorridor",
	},
	{
		upstreamKey: "sheet_46",
		tsKey: "Cosmetic.DragonDanceMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_fortune_fanprop",
		tsKey: "Cosmetic.FortuneHandFan",
	},
	{
		upstreamKey: "commerce_item_name_love_crystalhearts",
		tsKey: "Cosmetic.DaysOfLoveAmethystAccessory",
	},
	{
		upstreamKey: "commerce_item_name_love_meteorpigtails",
		tsKey: "Cosmetic.DaysOfLoveAmethystTippedTails",
	},
	{
		upstreamKey: "sheet_47",
		tsKey: "Cosmetic.WoodcuttingPleafulParentMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_bloom_rosewing",
		tsKey: "Cosmetic.BloomRoseEmbroideredCape",
	},
	{
		upstreamKey: "commerce_item_name_nature_maskwaves",
		tsKey: "Cosmetic.OceanWavesMask",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_shawl",
		tsKey: "Cosmetic.RainbowRibbonShawl",
	},
	{
		upstreamKey: "commerce_item_name_rainbow_facepaint",
		tsKey: "Cosmetic.RainbowFacePaintMask",
	},
	{
		upstreamKey: "commerce_item_name_tgcwireframe_evergreen",
		tsKey: "Cosmetic.TGCWireframeCape",
	},
	{
		upstreamKey: "commerce_item_name_anniversary_blackhoodie",
		tsKey: "Cosmetic.AnniversaryBlackAndBlueSwagHoodie",
	},
	{
		upstreamKey: "commerce_item_name_anniversary_oreoslippers",
		tsKey: "Cosmetic.AnniversaryOreoSlippers",
	},
	{
		upstreamKey: "commerce_item_name_anniversary_skykidplush",
		tsKey: "Cosmetic.AnniversaryMothPlush",
	},
	{
		upstreamKey: "commerce_item_name_ember_memoryhat",
		tsKey: "Cosmetic.ButterflyBlossomMemento",
	},
	{
		upstreamKey: "commerce_item_name_ember_manateehat",
		tsKey: "Cosmetic.MiniManateeAccessory",
	},
	{
		upstreamKey: "commerce_item_name_ember_darknesscape",
		tsKey: "Cosmetic.CloakOfDarkness",
	},
	{
		upstreamKey: "sheet_48",
		tsKey: "Cosmetic.SternShepherdMusicSheet",
	},
	{
		upstreamKey: "commerce_item_name_ember_manateeplush",
		tsKey: "Cosmetic.ManateePlush",
	},
	{
		upstreamKey: "commerce_item_name_anniversary_tuxwing",
		tsKey: "Cosmetic.AnniversaryTuxedoCape",
	},
	{
		upstreamKey: "commerce_item_name_ember_projector",
		tsKey: "Cosmetic.ProjectorOfMemories",
	},
	{
		upstreamKey: "commerce_item_name_moonlight_cape",
		tsKey: "Cosmetic.MoonlightGarlandCape",
	},
	{
		upstreamKey: "sheet_49",
		tsKey: "Cosmetic.MusicSheetAncientEcho",
	},
	{
		upstreamKey: "commerce_item_name_mischief_featherhat",
		tsKey: "Cosmetic.MischiefPuzzlewrightsBrimmedHat",
	},
	{
		upstreamKey: "commerce_item_name_feast_scarfcape",
		tsKey: "Cosmetic.WinterScarfCape",
	},
	{
		upstreamKey: "commerce_item_name_feast_snowkidhat",
		tsKey: "Cosmetic.SnowkidAccessory",
	},
	{
		upstreamKey: "commerce_item_name_personality_bluecap",
		tsKey: "Cosmetic.BluePinnedCap",
	},
	{
		upstreamKey: "commerce_item_name_personality_purpleglasses",
		tsKey: "Cosmetic.PurpleSpectacles",
	},
	{
		upstreamKey: "commerce_item_name_personality_greenears",
		tsKey: "Cosmetic.GreenFoldedEars",
	},
	{
		upstreamKey: "commerce_item_name_personality_yellowbrush",
		tsKey: "Cosmetic.YellowPaintbrush",
	},
	{
		upstreamKey: "commerce_item_name_competition_icecape",
		tsKey: "Cosmetic.TournamentCrystallineCape",
	},
	{
		upstreamKey: "commerce_item_name_fortune_ponyprop",
		tsKey: "Cosmetic.FortunePlushMount",
	},
	{
		upstreamKey: "commerce_item_name_fortune_paneldress",
		tsKey: "Cosmetic.FortunePleatedDress",
	},
	{
		upstreamKey: "commerce_item_name_fortune_ponytail",
		tsKey: "Cosmetic.FortuneRibbonedPonytail",
	},
	{
		upstreamKey: "commerce_item_name_fortune_coinglasses",
		tsKey: "Cosmetic.FortuneTokenGlasses",
	},
	{
		upstreamKey: "commerce_item_name_bloom_sunflowerdress",
		tsKey: "Cosmetic.BloomSunflowerSundress",
	},
	{
		upstreamKey: "commerce_item_name_bloom_sunflowerumbrella",
		tsKey: "Cosmetic.BloomSunflowerUmbrella",
	},
	{
		upstreamKey: "commerce_item_name_bloom_sunflowerearrings",
		tsKey: "Cosmetic.BloomSunflowerStuds",
	},
	{
		upstreamKey: "commerce_item_name_treasure_coincape",
		tsKey: "Cosmetic.TreasureCoinCape",
	},
	{
		upstreamKey: "commerce_item_name_treasure_seekershat",
		tsKey: "Cosmetic.TreasureSeekersHat",
	},
	{
		upstreamKey: "commerce_item_name_treasure_matecompanion",
		tsKey: "Cosmetic.TreasureMateCompanion",
	},
	{
		upstreamKey: "sheet_50",
		tsKey: "Cosmetic.MusicSheetAirship",
	},
	{
		upstreamKey: "commerce_item_name_fortune_pack",
		tsKey: "CosmeticPackName.DaysOfFortunePack",
	},
	{
		upstreamKey: "commerce_item_name_nintendo_pack",
		tsKey: "CosmeticPackName.NintendoSwitchPack",
	},
	{
		upstreamKey: "commerce_item_name_fortune_carppack",
		tsKey: "CosmeticPackName.DaysOfFortuneFishPack",
	},
	{
		upstreamKey: "commerce_item_name_kizuna_pack_red",
		tsKey: "CosmeticPackName.KizunaAIPack",
	},
	{
		upstreamKey: "commerce_item_name_mischief_catcostume",
		tsKey: "CosmeticPackName.CatCostumePack",
	},
	{
		upstreamKey: "commerce_item_name_sony_redtraveler_pack",
		tsKey: "CosmeticPackName.JourneyPack",
	},
	{
		upstreamKey: "commerce_item_name_mainstreet_moth",
		tsKey: "CosmeticPackName.MothAppreciationPack",
	},
	{
		upstreamKey: "commerce_item_name_mainstreet_sparrow",
		tsKey: "CosmeticPackName.SparrowAppreciationPack",
	},
	{
		upstreamKey: "commerce_item_name_cafe_pastryhair",
		tsKey: "CosmeticPackName.CinnamorollPopUpCafeHairAndEars",
	},
	{
		upstreamKey: "commerce_item_name_cafe_pastrywing",
		tsKey: "CosmeticPackName.CinnamorollPopUpCafeBowtieAndCape",
	},
	{
		upstreamKey: "commerce_item_name_moonlight_dress",
		tsKey: "CosmeticPackName.MoonlightFrockPack",
	},
	{
		upstreamKey: "commerce_item_name_style_crystalsuit",
		tsKey: "CosmeticPackName.StyleDapperPack",
	},
	{
		upstreamKey: "commerce_item_name_moomin_snufkinset",
		tsKey: "CosmeticPackName.RovingSnufkinPack",
	},
	{
		upstreamKey: "commerce_item_name_moomin_trollset",
		tsKey: "CosmeticPackName.MoomintrollPack",
	},
	{
		upstreamKey: "commerce_item_name_feast_wonderland_pinafore",
		tsKey: "CosmeticPackName.WonderlandPrimrosePinaforePack",
	},
	{
		upstreamKey: "commerce_item_name_fortune_snakecapehair",
		tsKey: "CosmeticPackName.FortuneSnakePack",
	},
	{
		upstreamKey: "commerce_item_name_treasure_eyepatchpants",
		tsKey: "CosmeticPackName.TreasureSeekerPack",
	},
	{
		upstreamKey: "commerce_item_name_sony_whitetraveler_pack",
		tsKey: "CosmeticPackName.TranscendentJourneyPack",
	},
	{
		upstreamKey: "commerce_item_name_nature_seafoamset",
		tsKey: "CosmeticPackName.OceanSeaFoamPack",
	},
	{
		upstreamKey: "commerce_item_name_anniversary_cinema",
		tsKey: "CosmeticPackName.AnniversaryCinemaPack",
	},
	{
		upstreamKey: "commerce_item_name_ember_manateeset",
		tsKey: "CosmeticPackName.SpiritedManateePack",
	},
	{
		upstreamKey: "commerce_item_name_ember_krillset",
		tsKey: "CosmeticPackName.VestigeOfDarkDragonsPack",
	},
	{
		upstreamKey: "commerce_item_name_anniversary_gownshoes",
		tsKey: "CosmeticPackName.AnniversaryGownPack",
	},
	{
		upstreamKey: "commerce_item_name_sunlight_jellypack",
		tsKey: "CosmeticPackName.SunlightBonnetPack",
	},
	{
		upstreamKey: "commerce_item_name_mischief_cattail",
		tsKey: "CosmeticPackName.MischiefFelinePack",
	},
	{
		upstreamKey: "commerce_item_name_feast_warmerset",
		tsKey: "CosmeticPackName.FluffyWinterWearPack",
	},
	{
		upstreamKey: "commerce_item_name_competition_skaterset",
		tsKey: "CosmeticPackName.TournamentSleekSkatingPack",
	},
	{
		upstreamKey: "commerce_item_name_nature_naturefinspack",
		tsKey: "CosmeticPackName.CharmingCreaturePack",
	},
	{
		upstreamKey: "commerce_item_name_sony_flowerflow_pack",
		tsKey: "CosmeticPackName.FlOwPack",
	},
	{
		upstreamKey: "lootbox_name_color_black",
		tsKey: "CosmeticCommon.BlackDye",
	},
	{
		upstreamKey: "lootbox_name_color_blue",
		tsKey: "CosmeticCommon.BlueDye",
	},
	{
		upstreamKey: "lootbox_name_color_cyan",
		tsKey: "CosmeticCommon.CyanDye",
	},
	{
		upstreamKey: "lootbox_name_color_green",
		tsKey: "CosmeticCommon.GreenDye",
	},
	{
		upstreamKey: "lootbox_name_color_magenta",
		tsKey: "CosmeticCommon.PurpleDye",
	},
	{
		upstreamKey: "lootbox_name_color_random",
		tsKey: "CosmeticCommon.Dye",
	},
	{
		upstreamKey: "lootbox_name_color_red",
		tsKey: "CosmeticCommon.RedDye",
	},
	{
		upstreamKey: "lootbox_name_color_white",
		tsKey: "CosmeticCommon.WhiteDye",
	},
	{
		upstreamKey: "lootbox_name_color_yellow",
		tsKey: "CosmeticCommon.YellowDye",
	},
];

function parseLocalizableStrings(content: string): Map<string, string> {
	const map = new Map<string, string>();

	for (const line of content.split("\n")) {
		const separatorIndex = line.indexOf('" = "');
		if (separatorIndex === -1) {
			continue;
		}

		const key = line.slice(1, separatorIndex);
		const value = line.slice(separatorIndex + 5, line.lastIndexOf('";'));
		map.set(key, decodeLocalisableString(value));
	}

	return map;
}

async function writeChangeLog(): Promise<void> {
	await writeFile(CHANGE_LOG_PATH, `${changes.join("\n")}\n`);
	console.log(dim(`Detailed changes written to ${CHANGE_LOG_PATH}`));
}

function stripMarkup(value: string): string {
	return normaliseQuotes(value.replace(/<[^>]+>/g, "").replaceAll(/\s*\n\s*/g, "")).trim();
}

function stripCommerceItemNameBadge(upstreamKey: string, value: string): string {
	return upstreamKey.startsWith("commerce_item_name_")
		? value.replace(/^\s*<2>.*?<\/2>\s*(?=\S)/s, "")
		: value;
}

function localeValue(mapping: LocaleMapping, lproj: string, value: string): string {
	const strippedValue = stripMarkup(stripCommerceItemNameBadge(mapping.upstreamKey, value));
	const override = mapping.overrides?.[lproj];

	if (!override) {
		return strippedValue;
	}

	if (override.upstreamValue !== strippedValue) {
		throw new Error(
			`Override for "${mapping.upstreamKey}" in ${lproj}.lproj expected "${override.upstreamValue}" but received "${strippedValue}"`,
		);
	}

	return override.value;
}

function normaliseQuotes(value: string): string {
	const normalised = value.replace(/[‘’]/g, "'");

	return normalised.includes('"') ? normalised.replace(/[“”„‟]/g, '"') : normalised;
}

function decodeLocalisableString(value: string): string {
	return value.replaceAll(
		/\\(U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|["\\nrtbf])/g,
		(_, escaped: string) => {
			switch (escaped) {
				case '"':
					return '"';
				case "\\":
					return "\\";
				case "b":
					return "\b";
				case "f":
					return "\f";
				case "n":
					return "\n";
				case "r":
					return "\r";
				case "t":
					return "\t";
				default: {
					if (escaped.startsWith("u")) {
						return String.fromCodePoint(Number.parseInt(escaped.slice(1), 16));
					}

					return String.fromCodePoint(Number.parseInt(escaped.slice(1), 16));
				}
			}
		},
	);
}

function encodeTsStringLiteralValue(value: string): string {
	return value
		.replaceAll("\\", "\\\\")
		.replaceAll('"', '\\"')
		.replaceAll("\b", "\\b")
		.replaceAll("\f", "\\f")
		.replaceAll("\n", "\\n")
		.replaceAll("\r", "\\r")
		.replaceAll("\t", "\\t");
}

function getUpstreamValue(
	strings: ReadonlyMap<string, string>,
	upstreamKey: string,
	lproj: string,
): string {
	const raw = strings.get(upstreamKey);

	if (raw === undefined) {
		throw new Error(`Upstream key "${upstreamKey}" does not exist in ${lproj}.lproj`);
	}

	return raw;
}

function getAtPath(root: Record<string, unknown>, dotPath: string): unknown {
	for (const part of dotPath.split(".")) {
		if (!(part in root)) {
			return undefined;
		}

		// biome-ignore lint/style/noParameterAssign: Don't care.
		root = root[part] as Record<string, unknown>;
	}

	return root;
}

/**
 * Traverse a nested object by dot-separated path and set the leaf value.
 */
function setAtPath(root: Record<string, unknown>, dotPath: string, value: string): void {
	const parts = dotPath.split(".");

	for (let index = 0; index < parts.length - 1; index++) {
		if (typeof root[parts[index]!] !== "object" || root[parts[index]!] === null) {
			root[parts[index]!] = {};
		}

		// biome-ignore lint/style/noParameterAssign: Don't care.
		root = root[parts[index]!] as Record<string, unknown>;
	}

	root[parts.at(-1)!] = value;
}

const jsonLocaleCache = new Map<string, Record<string, unknown>>();
const dirtyJsonLocales = new Set<string>();

async function loadJsonLocale(filePath: string): Promise<Record<string, unknown>> {
	let obj = jsonLocaleCache.get(filePath);

	if (obj === undefined) {
		obj = JSON.parse(await readFile(filePath, "utf-8")) as Record<string, unknown>;
		jsonLocaleCache.set(filePath, obj);
	}

	return obj;
}

async function updateJsonLocale(
	filePath: string,
	dotPath: string,
	value: string,
): Promise<boolean> {
	const obj = await loadJsonLocale(filePath);

	if (getAtPath(obj, dotPath) === value) {
		return false;
	}

	setAtPath(obj, dotPath, value);
	dirtyJsonLocales.add(filePath);
	return true;
}

/**
 * Find the line in en-gb.ts that contains `[tsKey]:` and replace the
 * immediately following string literal with the new value.
 */
async function updateEnGbTs(tsKey: string, upstreamKey: string, value: string): Promise<boolean> {
	const content = await readFile(EN_GB_TS, "utf-8");

	// Escape special regex metacharacters in the key (mainly the dot).
	const escapedKey = RegExp.escape(tsKey);

	// Match [Key]: optionally followed by whitespace/newline, then "old value".
	const pattern = new RegExp(`(\\[${escapedKey}\\]:\\s*\\n?\\s*)"((?:\\\\.|[^"])*)"`);
	const match = pattern.exec(content);

	if (!match) {
		console.warn(`  ${yellow("⚠")} Could not locate ${cyan(`[${tsKey}]`)} in en-gb.ts — skipped`);
		return false;
	}

	if (decodeLocalisableString(match[2]!) === value) {
		return false;
	}

	const safeValue = encodeTsStringLiteralValue(value).replace(/\$/g, "$$$$");
	await writeFile(EN_GB_TS, content.replace(pattern, `$1"${safeValue}"`));
	changes.push(`en-gb.ts\t${tsKey}\t${upstreamKey}\t${value}`);

	return true;
}

const updateEn = process.argv.includes("--update-en");

if (MAPPINGS.length === 0) {
	console.log(yellow("No mappings defined. Add entries to MAPPINGS in scripts/locale.ts."));
	process.exit(0);
}

const basePath = join(LPROJ_DIR, "Base.lproj", "Localizable.strings");
const baseContent = await readFile(basePath, "utf-8");
const baseStrings = parseLocalizableStrings(baseContent);

const stringsByLproj = new Map<string, Map<string, string> | null>();

async function loadStrings(lproj: string): Promise<Map<string, string> | null> {
	if (stringsByLproj.has(lproj)) {
		return stringsByLproj.get(lproj)!;
	}

	const stringsPath = join(LPROJ_DIR, `${lproj}.lproj`, "Localizable.strings");

	try {
		const strings = parseLocalizableStrings(await readFile(stringsPath, "utf-8"));
		stringsByLproj.set(lproj, strings);
		return strings;
	} catch {
		stringsByLproj.set(lproj, null);
		return null;
	}
}

for (const mapping of MAPPINGS) {
	const jsonPath = mapping.jsonPath ?? resolveJsonPath(mapping.tsKey);
	let changedJsonLocaleCount = 0;
	let foundUpstreamKey = baseStrings.has(mapping.upstreamKey);

	console.log(
		`\n${bold(cyan("Syncing"))} ${yellow(`"${mapping.upstreamKey}"`)} ${dim("→")} ${cyan(jsonPath)}`,
	);

	// Update JSON locales.
	for (const [lproj, jsonNames] of Object.entries(LPROJ_TO_JSON)) {
		if (lproj === "Base") {
			continue;
		}

		const strings = await loadStrings(lproj);

		if (!strings) {
			console.warn(`  ${yellow("⚠")} ${dim(`${lproj}.lproj`)} not found — skipped`);
			continue;
		}

		const raw = strings.get(mapping.upstreamKey);

		if (raw === undefined) {
			if (jsonNames.length > 0) {
				console.warn(`  ${yellow("⚠")} Key not found in ${dim(`${lproj}.lproj`)} — skipped`);
			}

			continue;
		}

		foundUpstreamKey = true;

		if (jsonNames.length === 0) {
			continue;
		}

		const value = localeValue(mapping, lproj, raw);

		for (const jsonName of jsonNames) {
			const jsonFile = join(SOURCE_LOCALES_DIR, `${jsonName}.json`);
			const changed = await updateJsonLocale(jsonFile, jsonPath, value);
			if (changed) {
				changedJsonLocaleCount++;
				changes.push(`${jsonName}.json\t${jsonPath}\t${mapping.upstreamKey}\t${value}`);
			}
		}
	}

	if (!foundUpstreamKey) {
		throw new Error(
			`Upstream key "${mapping.upstreamKey}" does not exist in any upstream locale file`,
		);
	}

	if (changedJsonLocaleCount === 0) {
		console.log(`  ${blue("ℹ")} JSON locales — nothing changed`);
	} else {
		console.log(`  ${green("✔")} ${changedJsonLocaleCount} JSON locale update(s)`);
	}

	if (updateEn) {
		if (!mapping.tsKey) {
			console.warn(
				`  ${yellow("⚠")} ${dim("--update-en")} passed but no tsKey defined for this mapping — skipped`,
			);

			continue;
		}

		const raw = getUpstreamValue(baseStrings, mapping.upstreamKey, "Base");

		if (await updateEnGbTs(mapping.tsKey, mapping.upstreamKey, localeValue(mapping, "Base", raw))) {
			console.log(`  ${green("✔")} ${bold("en-gb.ts")} updated`);
		}
	}
}

for (const filePath of dirtyJsonLocales) {
	await writeFile(filePath, JSON.stringify(jsonLocaleCache.get(filePath)!, null, 2));
}

await writeChangeLog();

// Need to do this because running the command will put the flag on the command.
spawnSync("pnpm", ["run", "format"], { stdio: "inherit", shell: true });
console.log(`\n${bold(green("Done."))}`);
