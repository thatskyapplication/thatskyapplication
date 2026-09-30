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
		upstreamKey: "eventboard_name_camping",
		jsonPath: "general.event-names.summer-camping",
	},
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
		upstreamKey: "title_duskstart_01",
		tsKey: "AreaName.WastelandRest",
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
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al cañonero tentado o a la coleccionista de caracolas agradecida a buscar tesoros en las Islas Santuario.",
				value:
					"Ayuda al cañonero tentado o a la coleccionista de caracolas agradecida a buscar tesoros en las Islas Santuario",
			},
			fr: {
				upstreamValue:
					"Aidez la Canonnière caquetante ou la Collectionneuse de coquillages reconnaissante à trouver des trésors sur les Îles du Sanctuaire.",
				value:
					"Aidez la Canonnière caquetante ou la Collectionneuse de coquillages reconnaissante à trouver des trésors sur les Îles du Sanctuaire",
			},
			ru: {
				upstreamValue:
					"Помогите Хохотушке с пушкой или Благодарному собирателю раковин найти сокровище на Островах укрытия.",
				value:
					"Помогите Хохотушке с пушкой или Благодарному собирателю раковин найти сокровище на Островах укрытия",
			},
		},
		tsKey: "DailyQuest.HelpCacklingCannoneerGratefulShellCollectorFindTreasureInSanctuaryIslands",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_island_2_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al pescador ansioso o a la coleccionista de caracolas agradecida a buscar tesoros en las Islas Santuario.",
				value:
					"Ayuda al pescador ansioso o a la coleccionista de caracolas agradecida a buscar tesoros en las Islas Santuario",
			},
			ru: {
				upstreamValue:
					"Помогите Беспокойной рыбачке или Благодарному собирателю раковин найти сокровище на Островах укрытия.",
				value:
					"Помогите Беспокойной рыбачке или Благодарному собирателю раковин найти сокровище на Островах укрытия",
			},
		},
		tsKey: "DailyQuest.HelpAnxiousAnglerGratefulShellCollectorFindTreasureInSanctuaryIslands",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_village_1_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda a contramaestre torpe o al fabricante de barcos dormilón a buscar tesoros en la aldea de la Planicie.",
				value:
					"Ayuda a contramaestre torpe o al fabricante de barcos dormilón a buscar tesoros en la aldea de la Planicie",
			},
			ru: {
				upstreamValue:
					"Помогите Нерадивому боцману или Сонному корабелу найти сокровище в Деревне Прерии.",
				value: "Помогите Нерадивому боцману или Сонному корабелу найти сокровище в Деревне Прерии",
			},
		},
		tsKey: "DailyQuest.HelpBumblingBoatswainSlumberingShipwrightFindTreasureInPrairieVillage",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_village_2_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al cañonero tentado o al fabricante de barcos dormilón a buscar tesoros en la aldea de la Planicie.",
				value:
					"Ayuda al cañonero tentado o al fabricante de barcos dormilón a buscar tesoros en la aldea de la Planicie",
			},
			ru: {
				upstreamValue:
					"Помогите Хохотушке с пушкой или Сонному корабелу найти сокровище в Деревне Прерии.",
				value: "Помогите Хохотушке с пушкой или Сонному корабелу найти сокровище в Деревне Прерии",
			},
		},
		tsKey: "DailyQuest.HelpCacklingCannoneerSlumberingShipwrightFindTreasureInPrairieVillage",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_wildlifepark_1_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al pescador ansioso o a la geóloga alegre a buscar tesoros en las cumbres de la Planicie.",
				value:
					"Ayuda al pescador ansioso o a la geóloga alegre a buscar tesoros en las cumbres de la Planicie",
			},
			ru: {
				upstreamValue:
					"Помогите Беспокойной рыбачке или Весёлому геологу найти сокровище в Степных вершинах.",
				value:
					"Помогите Беспокойной рыбачке или Весёлому геологу найти сокровище в Степных вершинах",
			},
		},
		tsKey: "DailyQuest.HelpAnxiousAnglerJollyGeologistFindTreasureInPrairiePeaks",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_wildlifepark_2_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al contramaestre torpe o a la geóloga alegre a buscar tesoros en las cumbres de la Planicie.",
				value:
					"Ayuda al contramaestre torpe o a la geóloga alegre a buscar tesoros en las cumbres de la Planicie",
			},
			ru: {
				upstreamValue:
					"Помогите Нерадивому боцману или Весёлому геологу найти сокровище в Степных вершинах.",
				value:
					"Помогите Нерадивому боцману или Весёлому геологу найти сокровище в Степных вершинах",
			},
		},
		tsKey: "DailyQuest.HelpBumblingBoatswainJollyGeologistFindTreasureInPrairiePeaks",
	},
	{
		upstreamKey: "daily_quest_dotreasure_dusk_1_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al capitán de navío cesante o a la aventurera en marcha a buscar tesoros en el Coral del tesoro.",
				value:
					"Ayuda al capitán de navío cesante o a la aventurera en marcha a buscar tesoros en el Coral del tesoro",
			},
			pt: {
				upstreamValue:
					"Ajude o Comodoro Abandonado ou a Aventureira Marchante a encontrar tesouros no Recife do Tesouro.",
				value:
					"Ajude o Comodoro Abandonado ou a Aventureira Marchante a encontrar tesouros no Recife do Tesouro",
			},
			ru: {
				upstreamValue:
					"Помогите Командору-начальнику или Марширующей авантюристке найти сокровище на Острове сокровищ.",
				value:
					"Помогите Командору-начальнику или Марширующей авантюристке найти сокровище на Острове сокровищ",
			},
		},
		tsKey: "DailyQuest.HelpCeasingCommodoreMarchingAdventurerFindTreasureInTreasureReef",
	},
	{
		upstreamKey: "daily_quest_dotreasure_dusk_2_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al pescador ansioso o a la aventurera en marcha a buscar tesoros en el Coral del tesoro.",
				value:
					"Ayuda al pescador ansioso o a la aventurera en marcha a buscar tesoros en el Coral del tesoro",
			},
			pt: {
				upstreamValue:
					"Ajude a Pescadora Ansiosa ou a Aventureira Marchante a encontrar tesouros no Recife do Tesouro.",
				value:
					"Ajude a Pescadora Ansiosa ou a Aventureira Marchante a encontrar tesouros no Recife do Tesouro",
			},
			ru: {
				upstreamValue:
					"Помогите Беспокойной рыбачке или Марширующей авантюристке найти сокровище на Острове сокровищ.",
				value:
					"Помогите Беспокойной рыбачке или Марширующей авантюристке найти сокровище на Острове сокровищ",
			},
		},
		tsKey: "DailyQuest.HelpAnxiousAnglerMarchingAdventurerFindTreasureInTreasureReef",
	},
	{
		upstreamKey: "daily_quest_dotreasure_night_1_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al pescador ansioso o al coleccionista de estrellas a buscar tesoros en el desierto Luz de Estrellas.",
				value:
					"Ayuda al pescador ansioso o al coleccionista de estrellas a buscar tesoros en el desierto Luz de Estrellas",
			},
			ru: {
				upstreamValue:
					"Помогите Беспокойной рыбачке или Собирателю звёзд найти сокровище в Звёздной пустыне.",
				value:
					"Помогите Беспокойной рыбачке или Собирателю звёзд найти сокровище в Звёздной пустыне",
			},
		},
		tsKey: "DailyQuest.HelpAnxiousAnglerStarCollectorFindTreasureInStarlightDesert",
	},
	{
		upstreamKey: "daily_quest_dotreasure_night_2_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al cañonero tentado o al coleccionista de estrellas a buscar tesoros en el desierto Luz de Estrellas.",
				value:
					"Ayuda al cañonero tentado o al coleccionista de estrellas a buscar tesoros en el desierto Luz de Estrellas",
			},
			pt: {
				upstreamValue:
					"Ajude a Canhoneira Sorridente ou o Contador de Estrelas a encontrar tesouros no Deserto da Luz Estelar.",
				value:
					"Ajude a Canhoneira Sorridente ou o Contador de Estrelas a encontrar tesouros no Deserto da Luz Estelar",
			},
			ru: {
				upstreamValue:
					"Помогите Хохотушке с пушкой или Собирателю звёзд найти сокровище в Звёздной пустыне.",
				value:
					"Помогите Хохотушке с пушкой или Собирателю звёзд найти сокровище в Звёздной пустыне",
			},
		},
		tsKey: "DailyQuest.HelpCacklingCannoneerStarCollectorFindTreasureInStarlightDesert",
	},
	{
		upstreamKey: "daily_quest_dotreasure_rain_1_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al cañonero tentado o a la estudiante gruñona a buscar tesoros en el Bosque Escondido.",
				value:
					"Ayuda al cañonero tentado o a la estudiante gruñona a buscar tesoros en el Bosque Escondido",
			},
			ru: {
				upstreamValue:
					"Помогите Хохотушке с пушкой или Ворчливой студентке найти сокровище в Тайном лесу.",
				value: "Помогите Хохотушке с пушкой или Ворчливой студентке найти сокровище в Тайном лесу",
			},
		},
		tsKey: "DailyQuest.HelpCacklingCannoneerOrScoldingStudentFindTreasureInHiddenForest",
	},
	{
		upstreamKey: "daily_quest_dotreasure_rain_2_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al capitán de navío cesante o a la estudiante gruñona a buscar tesoros en el Bosque Escondido.",
				value:
					"Ayuda al capitán de navío cesante o a la estudiante gruñona a buscar tesoros en el Bosque Escondido",
			},
			pt: {
				upstreamValue:
					"Ajude o Comodoro Abandonado ou o Estudante Esbravejante a encontrar tesouros na Floresta Oculta.",
				value:
					"Ajude o Comodoro Abandonado ou o Estudante Esbravejante a encontrar tesouros na Floresta Oculta",
			},
			ru: {
				upstreamValue:
					"Помогите Командору-начальнику или Ворчливой студентке найти сокровище в Тайном лесу.",
				value:
					"Помогите Командору-начальнику или Ворчливой студентке найти сокровище в Тайном лесу",
			},
		},
		tsKey: "DailyQuest.HelpCeasingCommodoreOrScoldingStudentFindTreasureInHiddenForest",
	},
	{
		upstreamKey: "daily_quest_dotreasure_sunset_1_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al contramaestre torpe o alyeti abrazoso a buscar tesoros en la Aldea de los Sueños.",
				value:
					"Ayuda al contramaestre torpe o alyeti abrazoso a buscar tesoros en la Aldea de los Sueños",
			},
			pt: {
				upstreamValue:
					"Ajude o Contramestre Trapalhão ou o Iéti do Abraço de Urso a encontrar tesouros na Aldeia dos Sonhos.",
				value:
					"Ajude o Contramestre Trapalhão ou o Iéti do Abraço de Urso a encontrar tesouros na Aldeia dos Sonhos",
			},
			ru: {
				upstreamValue:
					"Помогите Нерадивому боцману или Отшельнику-обнимателю найти сокровище в Деревушке мечтаний.",
				value:
					"Помогите Нерадивому боцману или Отшельнику-обнимателю найти сокровище в Деревушке мечтаний",
			},
		},
		tsKey: "DailyQuest.HelpBumblingBoatswainOrBearhugHermitFindTreasureInVillageOfDreams",
	},
	{
		upstreamKey: "daily_quest_dotreasure_sunset_2_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al capitán de navío cesante o al yeti abrazoso a buscar tesoros en la Aldea de los Sueños.",
				value:
					"Ayuda al capitán de navío cesante o al yeti abrazoso a buscar tesoros en la Aldea de los Sueños",
			},
			ru: {
				upstreamValue:
					"Помогите Командору-начальнику или Отшельнику-обнимателю найти сокровище в Деревушке мечтаний.",
				value:
					"Помогите Командору-начальнику или Отшельнику-обнимателю найти сокровище в Деревушке мечтаний",
			},
		},
		tsKey: "DailyQuest.HelpCeasingCommodoreOrBearhugHermitFindTreasureInVillageOfDreams",
	},
	{
		upstreamKey: "daily_quest_wave_at_a_player_desc",
		tsKey: "DailyQuest.WaveToAPlayer",
	},
	{
		upstreamKey: "daily_quest_color_voted_for_kite_desc",
		overrides: {
			es: {
				upstreamValue: "Propone un diseño de cometa en las Alturas de la planicie.",
				value: "Propone un diseño de cometa en las Alturas de la planicie",
			},
		},
		tsKey: "DailyQuest.ProposeAKiteDesignInPrairieHeights",
	},
	{
		upstreamKey: "daily_quest_recharge_another_avatar_desc",
		tsKey: "DailyQuest.RechargeAnotherPlayersLight",
	},
	{
		upstreamKey: "daily_quest_recharge_by_avatar_desc",
		tsKey: "DailyQuest.RechargeYourLightFromAnotherPlayer",
	},
	{
		upstreamKey: "daily_quest_meditate_night_night_desc",
		tsKey: "DailyQuest.MeditateWithTheSpiritMantas",
	},
	{
		upstreamKey: "daily_quest_meditate_prairie_village_faerie_desc",
		tsKey: "DailyQuest.MeditateInPrairieVillage",
	},
	{
		upstreamKey: "daily_quest_meditate_tgc_office_xmas_desc",
		tsKey: "DailyQuest.ShareYourHolidayWishInTheOffice",
	},
	{
		upstreamKey: "daily_quest_meditate_tgc_office_nye_desc",
		tsKey: "DailyQuest.ShareYourNewYearsResolutionInTheOffice",
	},
	{
		upstreamKey: "daily_quest_visit_prairie_cozycave_desc",
		tsKey: "DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie",
	},
	{
		upstreamKey: "daily_quest_pickup_30_wax_desc",
		tsKey: "DailyQuest.Collect30PiecesOfLight",
	},
	{
		upstreamKey: "daily_quest_light_20_candles_desc",
		tsKey: "DailyQuest.Light20Candles",
	},
	{
		upstreamKey: "daily_quest_forge_a_candle_desc",
		tsKey: "DailyQuest.ForgeACandle",
	},
	{
		upstreamKey: "daily_quest_melt_10_darkstones_desc",
		tsKey: "DailyQuest.Melt10Darkness",
	},
	{
		upstreamKey: "daily_quest_bow_at_a_player_desc",
		tsKey: "DailyQuest.BowAtAPlayer",
	},
	{
		upstreamKey: "daily_quest_follow_another_player_desc",
		tsKey: "DailyQuest.FollowAFriend",
	},
	{
		upstreamKey: "daily_quest_hug_someone_desc",
		tsKey: "DailyQuest.HugAFriend",
	},
	{
		upstreamKey: "daily_quest_wave_at_a_friend_desc",
		tsKey: "DailyQuest.WaveToAFriend",
	},
	{
		upstreamKey: "daily_quest_hold_someones_hand_desc",
		tsKey: "DailyQuest.HoldAFriendsHand",
	},
	{
		upstreamKey: "daily_quest_send_a_gift_desc",
		tsKey: "DailyQuest.SendAGiftToAFriend",
	},
	{
		upstreamKey: "daily_quest_make_a_new_acquaintance_desc",
		tsKey: "DailyQuest.MakeANewAcquaintance",
	},
	{
		upstreamKey: "daily_quest_high_five_someone_desc",
		tsKey: "DailyQuest.HighFiveAFriend",
	},
	{
		upstreamKey: "daily_quest_express_an_emote_to_a_friend_desc",
		tsKey: "DailyQuest.UseAnExpressionNearAFriend",
	},
	{
		upstreamKey: "daily_quest_sit_at_a_bench_with_a_stranger_desc",
		tsKey: "DailyQuest.SitOnABenchWithAStranger",
	},
	{
		upstreamKey: "daily_quest_fly_with_a_manta_desc",
		tsKey: "DailyQuest.RideWithAManta",
	},
	{
		upstreamKey: "daily_quest_save_a_spirit_desc",
		tsKey: "DailyQuest.ReliveASpiritsMemories",
	},
	{
		upstreamKey: "daily_quest_save_a_spirit_in_day_desc",
		tsKey: "DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie",
	},
	{
		upstreamKey: "daily_quest_save_a_spirit_in_rain_desc",
		tsKey: "DailyQuest.ReliveASpiritsMemoriesInHiddenForest",
	},
	{
		upstreamKey: "daily_quest_save_a_spirit_in_sunset_desc",
		tsKey: "DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph",
	},
	{
		upstreamKey: "daily_quest_save_a_spirit_in_dusk_desc",
		tsKey: "DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland",
	},
	{
		upstreamKey: "daily_quest_save_a_spirit_in_night_desc",
		tsKey: "DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge",
	},
	{
		upstreamKey: "daily_quest_seen_by_dark_creature_desc",
		tsKey: "DailyQuest.FaceTheDarkDragon",
	},
	{
		upstreamKey: "daily_quest_lightseeker_prairie_desc",
		tsKey: "DailyQuest.CatchTheLightInTheDaylightPrairie",
	},
	{
		upstreamKey: "daily_quest_lightseeker_forest_desc",
		tsKey: "DailyQuest.CatchTheLightInTheHiddenForest",
	},
	{
		upstreamKey: "daily_quest_lightseeker_valley_desc",
		tsKey: "DailyQuest.CatchTheLightInTheValleyOfTriumph",
	},
	{
		upstreamKey: "daily_quest_lightseeker_wasteland_desc",
		tsKey: "DailyQuest.CatchTheLightInTheGoldenWasteland",
	},
	{
		upstreamKey: "daily_quest_lightseeker_vault_desc",
		tsKey: "DailyQuest.CatchTheLightInTheVaultOfKnowledge",
	},
	{
		upstreamKey: "daily_quest_visit_rain_grandmatable_desc",
		tsKey: "DailyQuest.VisitTheAncestorsTableInTheElevatedClearing",
	},
	{
		upstreamKey: "daily_quest_world_quest_nature_vortex1_desc",
		tsKey: "DailyQuest.RidTheSanctuaryVortexOfDarkness",
	},
	{
		upstreamKey: "daily_quest_visit_rainbow_prairie_desc",
		tsKey: "DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie",
	},
	{
		upstreamKey: "daily_quest_visit_rainbow_rain_desc",
		tsKey: "DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest",
	},
	{
		upstreamKey: "daily_quest_visit_rainbow_sunset_desc",
		tsKey: "DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph",
	},
	{
		upstreamKey: "daily_quest_visit_rainbow_dusk_desc",
		tsKey: "DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland",
	},
	{
		upstreamKey: "daily_quest_visit_rainbow_night_desc",
		tsKey: "DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge",
	},
	{
		upstreamKey: "daily_quest_meditate_prairie_nestkeeper_desc",
		tsKey: "DailyQuest.MeditateByTheBirdNest",
	},
	{
		upstreamKey: "daily_quest_meditate_prairie_butterfly_desc",
		tsKey: "DailyQuest.MeditateInButterflyFields",
	},
	{
		upstreamKey: "daily_quest_meditate_prairie_cave_desc",
		tsKey: "DailyQuest.MeditateInPrairieCave",
	},
	{
		upstreamKey: "daily_quest_meditate_prairie_village_koi_desc",
		tsKey: "DailyQuest.MeditateByPrairieTemplesKoiPond",
	},
	{
		upstreamKey: "daily_quest_meditate_rain_main_desc",
		tsKey: "DailyQuest.MeditateOutsideTheForestCourtyard",
	},
	{
		upstreamKey: "daily_quest_meditate_rain_rainforest_desc",
		tsKey: "DailyQuest.MeditateAboveTheForestBrook",
	},
	{
		upstreamKey: "daily_quest_meditate_rain_shelter_desc",
		tsKey: "DailyQuest.MeditateInTheElevatedClearing",
	},
	{
		upstreamKey: "daily_quest_meditate_rain_rainend_desc",
		tsKey: "DailyQuest.MeditateAtTheSacredPond",
	},
	{
		upstreamKey: "daily_quest_meditate_rain_rainmid_desc",
		tsKey: "DailyQuest.MeditateByTheForestsBoneyard",
	},
	{
		upstreamKey: "daily_quest_meditate_sunset_main_desc",
		tsKey: "DailyQuest.MeditateOverlookingTheFrozenLake",
	},
	{
		upstreamKey: "daily_quest_meditate_sunset_citadel_desc",
		overrides: {
			de: {
				upstreamValue: "Meditiere auf dem Eingang zur Zitadelle.",
				value: "Meditiere auf dem Eingang zur Zitadelle",
			},
		},
		tsKey: "DailyQuest.MeditateAtopTheEntranceToTheCitadel",
	},
	{
		upstreamKey: "daily_quest_meditate_sunset_citadel2_desc",
		tsKey: "DailyQuest.MeditateHighAboveTheCitadel",
	},
	{
		upstreamKey: "daily_quest_meditate_sunset_raceend_desc",
		tsKey: "DailyQuest.MeditateInTheColiseum",
	},
	{
		upstreamKey: "daily_quest_meditate_dusk_main_desc",
		tsKey: "DailyQuest.MeditateInTheBrokenTemple",
	},
	{
		upstreamKey: "daily_quest_meditate_dusk_oasis_desc",
		tsKey: "DailyQuest.MeditateByTheForgottenArk",
	},
	{
		upstreamKey: "daily_quest_meditate_dusk_graveyard_desc",
		tsKey: "DailyQuest.MeditateInTheGraveyard",
	},
	{
		upstreamKey: "daily_quest_meditate_dusk_crabfields_desc",
		tsKey: "DailyQuest.MeditateInTheCrabFields",
	},
	{
		upstreamKey: "daily_quest_meditate_dusk_duskmid_desc",
		tsKey: "DailyQuest.MeditateOnTheBattlefield",
	},
	{
		upstreamKey: "daily_quest_meditate_night_main2_desc",
		overrides: {
			de: {
				upstreamValue: "Meditiere am Eingang des Tresor des Wissens.",
				value: "Meditiere am Eingang des Tresor des Wissens",
			},
			fr: {
				upstreamValue: "Méditez à l'entrée de la Chambre forte de connaissance.",
				value: "Méditez à l'entrée de la Chambre forte de connaissance",
			},
			it: {
				upstreamValue: "Meditare all'ingresso della Cupola della Conoscenza.",
				value: "Meditare all'ingresso della Cupola della Conoscenza",
			},
			pt: {
				upstreamValue: "Meditar na entrada do Relicário do Conhecimento.",
				value: "Meditar na entrada do Relicário do Conhecimento",
			},
			vi: {
				upstreamValue: "Ngồi thiền ở lối vào Kho Tri Thức.",
				value: "Ngồi thiền ở lối vào Kho Tri Thức",
			},
			"zh-Hans": {
				upstreamValue: "在禁阁的入口冥想。",
				value: "在禁阁的入口冥想",
			},
			"zh-Hant": {
				upstreamValue: "在禁閣的入口處進行冥想。",
				value: "在禁閣的入口處進行冥想",
			},
		},
		tsKey: "DailyQuest.MeditateAtTheVaultsEntrance",
	},
	{
		upstreamKey: "daily_quest_meditate_night_main_desc",
		tsKey: "DailyQuest.MeditateOnTheSecondFloorOfTheVault",
	},
	{
		upstreamKey: "daily_quest_meditate_night_night2_desc",
		tsKey: "DailyQuest.MeditateAtTheVaultTemple",
	},
	{
		upstreamKey: "daily_quest_fetchlight_earth_desc",
		overrides: {
			"zh-Hans": {
				upstreamValue: "收集 绿色光芒",
				value: "收集绿色光芒",
			},
			"zh-Hant": {
				upstreamValue: "收集 綠色光芒",
				value: "收集綠色光芒",
			},
		},
		tsKey: "DailyQuest.CollectGreenLight",
	},
	{
		upstreamKey: "daily_quest_fetchlight_fire_desc",
		overrides: {
			"zh-Hans": {
				upstreamValue: "收集 橙色光芒",
				value: "收集橙色光芒",
			},
			"zh-Hant": {
				upstreamValue: "收集 橙色光芒",
				value: "收集橙色光芒",
			},
		},
		tsKey: "DailyQuest.CollectOrangeLight",
	},
	{
		upstreamKey: "daily_quest_fetchlight_water_desc",
		tsKey: "DailyQuest.CollectBlueLight",
	},
	{
		upstreamKey: "daily_quest_fetchlight_void_desc",
		overrides: {
			"zh-Hans": {
				upstreamValue: "收集 红色光芒",
				value: "收集红色光芒",
			},
			"zh-Hant": {
				upstreamValue: "收集 紅色光芒",
				value: "收集紅色光芒",
			},
		},
		tsKey: "DailyQuest.CollectRedLight",
	},
	{
		upstreamKey: "daily_quest_fetchlight_mind_desc",
		tsKey: "DailyQuest.CollectPurpleLight",
	},
	{
		upstreamKey: "daily_quest_world_quest_ap10_fetch_06_desc",
		tsKey: "DailyQuest.CompleteTheHoopScavengerHunt",
	},
	{
		upstreamKey: "daily_quest_visit_stormy_event_desc",
		overrides: {
			de: {
				upstreamValue:
					"Besuche eine Scherbe der Finsternis, die in das Königreich von Sky gefallen ist.",
				value: "Besuche eine Scherbe der Finsternis, die in das Königreich von Sky gefallen ist",
			},
			"zh-Hant": {
				upstreamValue: "造訪墜入 Sky 國度的黑暗碎片。",
				value: "造訪墜入 Sky 國度的黑暗碎片",
			},
		},
		tsKey: "DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky",
	},
	{
		upstreamKey: "daily_quest_spirit_selfie_grumpy_desc",
		tsKey: "DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks",
	},
	{
		upstreamKey: "daily_quest_spirit_selfie_crabvoice_desc",
		tsKey: "DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks",
	},
	{
		upstreamKey: "daily_quest_spirit_selfie_evillaugh_desc",
		tsKey: "DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks",
	},
	{
		upstreamKey: "daily_quest_spirit_selfie_welcome_desc",
		tsKey: "DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks",
	},
	{
		upstreamKey: "daily_quest_find_cafe_rolling_desc",
		overrides: {
			de: {
				upstreamValue: "Triff Cinnamoroll auf einem Hügel im Volieren-Dorf.",
				value: "Triff Cinnamoroll auf einem Hügel im Volieren-Dorf",
			},
			es: {
				upstreamValue: "Busca a Cinnamoroll en una colina de la aldea aviaria.",
				value: "Busca a Cinnamoroll en una colina de la aldea aviaria",
			},
			fr: {
				upstreamValue: "Rencontrez Cinnamoroll sur une colline du village volière.",
				value: "Rencontrez Cinnamoroll sur une colline du village volière",
			},
			it: {
				upstreamValue: "Incontra Cinnamoroll su una collina nel Villaggio degli Uccelli.",
				value: "Incontra Cinnamoroll su una collina nel Villaggio degli Uccelli",
			},
			pt: {
				upstreamValue: "Encontre Cinnamoroll em uma colina na Aldeia Aviária.",
				value: "Encontre Cinnamoroll em uma colina na Aldeia Aviária",
			},
			ru: {
				upstreamValue: "Встретьтесь с Синаморолом на холме Птичьей деревни.",
				value: "Встретьтесь с Синаморолом на холме Птичьей деревни",
			},
			vi: {
				upstreamValue: "Gặp gỡ Cinnamoroll trên một ngọn đồi ở Làng Chuồng Chim.",
				value: "Gặp gỡ Cinnamoroll trên một ngọn đồi ở Làng Chuồng Chim",
			},
			"zh-Hant": {
				upstreamValue: "在雲巢的山丘上與 大耳狗喜拿 見面。",
				value: "在雲巢的山丘上與大耳狗喜拿見面",
			},
		},
		tsKey: "DailyQuest.MeetCinnamorollOnAHillInAviaryVillage",
	},
	{
		upstreamKey: "daily_quest_find_cafe_flowers_1_desc",
		overrides: {
			de: {
				upstreamValue: "Rieche an Blumen mit Cinnamoroll im Volieren-Dorf.",
				value: "Rieche an Blumen mit Cinnamoroll im Volieren-Dorf",
			},
			es: {
				upstreamValue: "Huele flores con Cinnamoroll en la aldea aviaria.",
				value: "Huele flores con Cinnamoroll en la aldea aviaria",
			},
			fr: {
				upstreamValue: "Sentez les fleurs avec Cinnamoroll au village volière.",
				value: "Sentez les fleurs avec Cinnamoroll au village volière",
			},
			it: {
				upstreamValue: "Annusa i fiori con Cinnamoroll nel Villaggio degli Uccelli.",
				value: "Annusa i fiori con Cinnamoroll nel Villaggio degli Uccelli",
			},
			pt: {
				upstreamValue: "Cheire flores com o Cinnamoroll na Aldeia Aviária.",
				value: "Cheire flores com o Cinnamoroll na Aldeia Aviária",
			},
			ru: {
				upstreamValue: "Вместе с Синаморолом насладитесь ароматом цветов в Птичьей деревне.",
				value: "Вместе с Синаморолом насладитесь ароматом цветов в Птичьей деревне",
			},
			vi: {
				upstreamValue: "Thưởng thức hương hoa cùng Cinnamoroll ở Làng Chuồng Chim.",
				value: "Thưởng thức hương hoa cùng Cinnamoroll ở Làng Chuồng Chim",
			},
			"zh-Hans": {
				upstreamValue: "在云巢与Cinnamoroll一起品味花香。",
				value: "在云巢与Cinnamoroll一起品味花香",
			},
			"zh-Hant": {
				upstreamValue: "在雲巢與 大耳狗喜拿 一起聞花香。",
				value: "在雲巢與大耳狗喜拿一起聞花香",
			},
		},
		tsKey: "DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage",
	},
	{
		upstreamKey: "daily_quest_find_cafe_flowers_2_desc",
		overrides: {
			de: {
				upstreamValue: "Finde Cinnamoroll, während er sich im Volieren-Dorf umsieht.",
				value: "Finde Cinnamoroll, während er sich im Volieren-Dorf umsieht",
			},
			es: {
				upstreamValue: "Busca a Cinnamoroll en la aldea aviaria.",
				value: "Busca a Cinnamoroll en la aldea aviaria",
			},
			fr: {
				upstreamValue: "Trouvez Cinnamoroll quelque part dans le village volière.",
				value: "Trouvez Cinnamoroll quelque part dans le village volière",
			},
			it: {
				upstreamValue: "Trova Cinnamoroll che gironzola nel Villaggio degli Uccelli.",
				value: "Trova Cinnamoroll che gironzola nel Villaggio degli Uccelli",
			},
			pt: {
				upstreamValue: "Encontre Cinnamoroll explorand a Aldeia Aviária.",
				value: "Encontre Cinnamoroll explorand a Aldeia Aviária",
			},
			ru: {
				upstreamValue: "Найдите Синаморола, который гуляет по Птичьей деревне.",
				value: "Найдите Синаморола, который гуляет по Птичьей деревне",
			},
			vi: {
				upstreamValue: "Tìm Cinnamoroll đang ẩn quanh Làng Chuồng Chim.",
				value: "Tìm Cinnamoroll đang ẩn quanh Làng Chuồng Chim",
			},
			"zh-Hans": {
				upstreamValue: "在云巢找到躲在角落的Cinnamoroll。",
				value: "在云巢找到躲在角落的Cinnamoroll",
			},
			"zh-Hant": {
				upstreamValue: "在雲巢找到躲在角落的 大耳狗喜拿。",
				value: "在雲巢找到躲在角落的大耳狗喜拿",
			},
		},
		tsKey: "DailyQuest.FindCinnamorollPeekingAroundAviaryVillage",
	},
	{
		upstreamKey: "daily_quest_find_cafe_sleeping_1_desc",
		overrides: {
			de: {
				upstreamValue: "Wecke Cinnamoroll im Volieren-Dorf auf.",
				value: "Wecke Cinnamoroll im Volieren-Dorf auf",
			},
			es: {
				upstreamValue: "Despierta a Cinnamoroll en la aldea aviaria.",
				value: "Despierta a Cinnamoroll en la aldea aviaria",
			},
			fr: {
				upstreamValue: "Réveillez Cinnamoroll dans le village volière.",
				value: "Réveillez Cinnamoroll dans le village volière",
			},
			it: {
				upstreamValue: "Sveglia Cinnamoroll nel Villaggio degli Uccelli.",
				value: "Sveglia Cinnamoroll nel Villaggio degli Uccelli",
			},
			pt: {
				upstreamValue: "Acorde Cinnamoroll na Aldeia Aviária.",
				value: "Acorde Cinnamoroll na Aldeia Aviária",
			},
			ru: {
				upstreamValue: "Разбудите Синаморола в Птичьей деревне.",
				value: "Разбудите Синаморола в Птичьей деревне",
			},
			vi: {
				upstreamValue: "Đánh thức Cinnamoroll ở Làng Chuồng Chim.",
				value: "Đánh thức Cinnamoroll ở Làng Chuồng Chim",
			},
			"zh-Hans": {
				upstreamValue: "在云巢叫醒Cinnamoroll。",
				value: "在云巢叫醒Cinnamoroll",
			},
			"zh-Hant": {
				upstreamValue: "在雲巢叫醒 大耳狗喜拿。",
				value: "在雲巢叫醒大耳狗喜拿",
			},
		},
		tsKey: "DailyQuest.WakeUpCinnamorollInAviaryVillage",
	},
	{
		upstreamKey: "daily_quest_find_cafe_sleeping_2_desc",
		overrides: {
			de: {
				upstreamValue: "Fliege mit Cinnamoroll zum Turm im Volieren-Dorf.",
				value: "Fliege mit Cinnamoroll zum Turm im Volieren-Dorf",
			},
			es: {
				upstreamValue: "Vuela hasta la torre con Cinnamoroll en la aldea aviaria.",
				value: "Vuela hasta la torre con Cinnamoroll en la aldea aviaria",
			},
			fr: {
				upstreamValue: "Volez jusqu'au clocher avec Cinnamoroll au village volière.",
				value: "Volez jusqu'au clocher avec Cinnamoroll au village volière",
			},
			it: {
				upstreamValue: "Vola sulla torre con Cinnamoroll nel Villaggio degli Uccelli.",
				value: "Vola sulla torre con Cinnamoroll nel Villaggio degli Uccelli",
			},
			pt: {
				upstreamValue: "Voe até a torre com Cinnamoroll na Aldeia Aviária.",
				value: "Voe até a torre com Cinnamoroll na Aldeia Aviária",
			},
			ru: {
				upstreamValue: "Вместе с Синаморолом взлетите на колокольню Птичьей деревни.",
				value: "Вместе с Синаморолом взлетите на колокольню Птичьей деревни",
			},
			vi: {
				upstreamValue: "Bay lên tòa tháp cùng Cinnamoroll ở Làng Chuồng Chim.",
				value: "Bay lên tòa tháp cùng Cinnamoroll ở Làng Chuồng Chim",
			},
			"zh-Hans": {
				upstreamValue: "在云巢与Cinnamoroll一起飞上塔顶。",
				value: "在云巢与Cinnamoroll一起飞上塔顶",
			},
			"zh-Hant": {
				upstreamValue: "與 大耳狗喜拿 一起飛到雲巢的塔上。",
				value: "與大耳狗喜拿一起飛到雲巢的塔上",
			},
		},
		tsKey: "DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage",
	},
	{
		upstreamKey: "daily_quest_find_cafe_sleeping_3_desc",
		overrides: {
			de: {
				upstreamValue: "Plansche im Wasser mit Cinnamoroll im Volieren-Dorf.",
				value: "Plansche im Wasser mit Cinnamoroll im Volieren-Dorf",
			},
			es: {
				upstreamValue: "Chapotea en el agua con Cinnamoroll en la aldea aviaria.",
				value: "Chapotea en el agua con Cinnamoroll en la aldea aviaria",
			},
			fr: {
				upstreamValue: "Plongez dans l'eau avec Cinnamoroll au village volière.",
				value: "Plongez dans l'eau avec Cinnamoroll au village volière",
			},
			it: {
				upstreamValue: "Tuffati nell'acqua con Cinnamoroll nel Villaggio degli Uccelli.",
				value: "Tuffati nell'acqua con Cinnamoroll nel Villaggio degli Uccelli",
			},
			pt: {
				upstreamValue: "Pule na água com Cinnamoroll na Aldeia Aviária.",
				value: "Pule na água com Cinnamoroll na Aldeia Aviária",
			},
			ru: {
				upstreamValue: "Отправляйтесь плескаться вместе с Синаморолом в Птичьей деревне.",
				value: "Отправляйтесь плескаться вместе с Синаморолом в Птичьей деревне",
			},
			vi: {
				upstreamValue: "Hãy té nước cùng Cinnamoroll tại Làng Chuồng Chim.",
				value: "Hãy té nước cùng Cinnamoroll tại Làng Chuồng Chim",
			},
			"zh-Hans": {
				upstreamValue: "在云巢与Cinnamoroll一起跃入水中。",
				value: "在云巢与Cinnamoroll一起跃入水中",
			},
			"zh-Hant": {
				upstreamValue: "在雲巢與 大耳狗喜拿 一起玩水。",
				value: "在雲巢與大耳狗喜拿一起玩水",
			},
		},
		tsKey: "DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage",
	},
	{
		upstreamKey: "daily_quest_do_competition_play_desc",
		tsKey: "DailyQuest.PlayAnyTournamentSport",
	},
	{
		upstreamKey: "daily_quest_change_hair_desc",
		tsKey: "DailyQuest.ChangeYourHairstyle",
	},
	{
		upstreamKey: "daily_quest_change_neck_desc",
		tsKey: "DailyQuest.ChangeYourNecklace",
	},
	{
		upstreamKey: "daily_quest_change_prop_desc",
		tsKey: "DailyQuest.ChangeYourProp",
	},
	{
		upstreamKey: "daily_quest_change_mask_desc",
		tsKey: "DailyQuest.ChangeYourMask",
	},
	{
		upstreamKey: "daily_quest_change_cape_desc",
		tsKey: "DailyQuest.ChangeYourCape",
	},
	{
		upstreamKey: "daily_quest_runway_recording_shrine_view_desc",
		tsKey: "DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine",
	},
	{
		upstreamKey: "daily_quest_runway_recording_shrine_walk_desc",
		tsKey: "DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_1_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al Cañonero tentado o al Explorador risueño a buscar tesoros en las Islas Santuario.",
				value:
					"Ayuda al Cañonero tentado o al Explorador risueño a buscar tesoros en las Islas Santuario",
			},
			fr: {
				upstreamValue:
					"Aidez la Canonnière caquetante ou le Scout ricanant à trouver des trésors sur les Îles du Sanctuaire.",
				value:
					"Aidez la Canonnière caquetante ou le Scout ricanant à trouver des trésors sur les Îles du Sanctuaire",
			},
			ru: {
				upstreamValue:
					"Помогите Хохотушке с пушкой или Хихикающему скауту найти сокровище на Островах укрытия.",
				value:
					"Помогите Хохотушке с пушкой или Хихикающему скауту найти сокровище на Островах укрытия",
			},
		},
		tsKey: "DailyQuest.HelpCacklingCannoneerOrChucklingScoutFindTreasureInSanctuaryIslands",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_2_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al Contramaestre torpe o al Guía del ensamblaje a buscar tesoros en las Islas Santuario.",
				value:
					"Ayuda al Contramaestre torpe o al Guía del ensamblaje a buscar tesoros en las Islas Santuario",
			},
			fr: {
				upstreamValue:
					"Aidez le Maître d'équipage maladroit ou le Guide du Rassemblement à trouver des trésors sur les Îles du Sanctuaire.",
				value:
					"Aidez le Maître d'équipage maladroit ou le Guide du Rassemblement à trouver des trésors sur les Îles du Sanctuaire",
			},
			ru: {
				upstreamValue:
					"Помогите Нерадивому боцману или Проводнику Сезона собрания найти сокровище на Островах укрытия.",
				value:
					"Помогите Нерадивому боцману или Проводнику Сезона собрания найти сокровище на Островах укрытия",
			},
			vi: {
				upstreamValue:
					"Giúp Thủy Thủ Hậu Đậu hoặc Chỉ Dẫn Tụ Hội tìm kho báu tại Quần Đảo Thánh Địa.",
				value: "Giúp Thủy Thủ Hậu Đậu hoặc Chỉ Dẫn Tụ Hội tìm kho báu tại Quần Đảo Thánh Địa",
			},
		},
		tsKey: "DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInSanctuaryIslands",
	},
	{
		upstreamKey: "daily_quest_dotreasure_night_3_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al Contramaestre torpe o al Guía del Ensamblaje a buscar tesoros en el desierto Luz de Estrellas.",
				value:
					"Ayuda al Contramaestre torpe o al Guía del Ensamblaje a buscar tesoros en el desierto Luz de Estrellas",
			},
			fr: {
				upstreamValue:
					"Aidez le Maître d'équipage maladroit ou le Guide du Rassemblement à trouver des trésors dans le Désert stellaire.",
				value:
					"Aidez le Maître d'équipage maladroit ou le Guide du Rassemblement à trouver des trésors dans le Désert stellaire",
			},
			ru: {
				upstreamValue:
					"Помогите Нерадивому боцману или Проводнику Сезона собрания найти сокровище в Звёздной пустыне.",
				value:
					"Помогите Нерадивому боцману или Проводнику Сезона собрания найти сокровище в Звёздной пустыне",
			},
			vi: {
				upstreamValue: "Giúp Thủy Thủ Hậu Đậu hoặc Người Dẫn Đoàn tìm kho báu tại Sa Mạc Ánh Sao.",
				value: "Giúp Thủy Thủ Hậu Đậu hoặc Người Dẫn Đoàn tìm kho báu tại Sa Mạc Ánh Sao",
			},
		},
		tsKey: "DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInStarlightDesert",
	},
	{
		upstreamKey: "daily_quest_dotreasure_day_3_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al Capitán de navío cesante o al Guardabosques soñador a buscar tesoros en las Islas Santuario.",
				value:
					"Ayuda al Capitán de navío cesante o al Guardabosques soñador a buscar tesoros en las Islas Santuario",
			},
			fr: {
				upstreamValue:
					"Aidez le Commodore commandant ou le Forestier rêveur à trouver des trésors sur les Îles du Sanctuaire.",
				value:
					"Aidez le Commodore commandant ou le Forestier rêveur à trouver des trésors sur les Îles du Sanctuaire",
			},
			ru: {
				upstreamValue:
					"Помогите Командору-начальнику или Мечтательному лесовичку найти сокровище на Островах укрытия.",
				value:
					"Помогите Командору-начальнику или Мечтательному лесовичку найти сокровище на Островах укрытия",
			},
			vi: {
				upstreamValue:
					"Giúp Thuyền Trưởng Uy Nghiêm hoặc Người Đi Rừng Mộng Du tìm kho báu tại Quần Đảo Thánh Địa.",
				value:
					"Giúp Thuyền Trưởng Uy Nghiêm hoặc Người Đi Rừng Mộng Du tìm kho báu tại Quần Đảo Thánh Địa",
			},
		},
		tsKey: "DailyQuest.HelpTheCeasingCommodoreOrTheDaydreamForesterFindTreasureInSanctuaryIslands",
	},
	{
		upstreamKey: "daily_quest_dotreasure_rain_3_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al Pescador ansioso o al Estudiante gruñona a buscar tesoros en el Bosque Escondido.",
				value:
					"Ayuda al Pescador ansioso o al Estudiante gruñona a buscar tesoros en el Bosque Escondido",
			},
			fr: {
				upstreamValue:
					"Aidez la Pêcheuse angoissée ou l'Étudiante moralisatrice à trouver des trésors dans la Forêt cachée.",
				value:
					"Aidez la Pêcheuse angoissée ou l'Étudiante moralisatrice à trouver des trésors dans la Forêt cachée",
			},
			ru: {
				upstreamValue:
					"Помогите Беспокойной рыбачке или Ворчливой студентке найти сокровище в Тайном лесу.",
				value: "Помогите Беспокойной рыбачке или Ворчливой студентке найти сокровище в Тайном лесу",
			},
			vi: {
				upstreamValue: "Giúp Ngư Dân Lo Lắng hoặc Đội Trưởng Quản Lý tìm kho báu tại Rừng Mưa.",
				value: "Giúp Ngư Dân Lo Lắng hoặc Đội Trưởng Quản Lý tìm kho báu tại Rừng Mưa",
			},
		},
		tsKey: "DailyQuest.HelpTheAnxiousAnglerOrTheScoldingStudentFindTreasureInHiddenForest",
	},
	{
		upstreamKey: "daily_quest_dotreasure_sunset_3_desc",
		overrides: {
			es: {
				upstreamValue:
					"Ayuda al Cañonero tentado o al Explorador risueño a buscar tesoros en la aldea de los sueños.",
				value:
					"Ayuda al Cañonero tentado o al Explorador risueño a buscar tesoros en la aldea de los sueños",
			},
			fr: {
				upstreamValue:
					"Aidez la Canonnière caquetante ou le Scout ricanant à trouver des trésors dans le Village des Rêves.",
				value:
					"Aidez la Canonnière caquetante ou le Scout ricanant à trouver des trésors dans le Village des Rêves",
			},
			ru: {
				upstreamValue:
					"Помогите Хохотушке с пушкой или Хихикающему скауту найти сокровище в Деревушке мечтаний.",
				value:
					"Помогите Хохотушке с пушкой или Хихикающему скауту найти сокровище в Деревушке мечтаний",
			},
			vi: {
				upstreamValue:
					"Giúp Xạ Thủ Vui Nhộn hoặc Hướng Đạo Sinh Khúc Khích tìm kho báu tại Làng Mộng Mơ.",
				value: "Giúp Xạ Thủ Vui Nhộn hoặc Hướng Đạo Sinh Khúc Khích tìm kho báu tại Làng Mộng Mơ",
			},
		},
		tsKey: "DailyQuest.HelpTheCacklingCannoneerOrTheChucklingScoutFindTreasureInVillageOfDreams",
	},
	{
		upstreamKey: "daily_quest_bluebirdchase_1_desc",
		tsKey: "DailyQuest.InvestigateABlueBirdSightingInTheFrozenLake",
	},
	{
		upstreamKey: "daily_quest_bluebirdchase_2_desc",
		tsKey: "DailyQuest.InvestigateABlueBirdSightingInTheVaultRepository",
	},
	{
		upstreamKey: "daily_quest_bluebirdchase_4_desc",
		tsKey: "DailyQuest.InvestigateABlueBirdSightingInTheForestClearing",
	},
	{
		upstreamKey: "daily_quest_bluebirdfeather_1_desc",
		tsKey: "DailyQuest.FindAClueOfTheBlueBirdsWhereaboutsInTheFrozenLake",
	},
	{
		upstreamKey: "daily_quest_bluebirdfeather_2_desc",
		tsKey: "DailyQuest.FindAClueOfTheBlueBirdsWhereaboutsInTheVaultRepository",
	},
	{
		upstreamKey: "daily_quest_bluebirdfeather_3_desc",
		tsKey: "DailyQuest.FindAClueOfTheBlueBirdsWhereaboutsInVillageTheatre",
	},
	{
		upstreamKey: "daily_quest_bluebirdfeather_4_desc",
		tsKey: "DailyQuest.FindAClueOfTheBlueBirdsWhereaboutsInTheForestClearing",
	},
	{
		upstreamKey: "daily_quest_pick_up_1_crab_desc",
		tsKey: "DailyQuest.PickUpACrab",
	},
	{
		upstreamKey: "daily_quest_spirit_anniversary_desc",
		overrides: {
			es: {
				upstreamValue:
					"Admira los espacios compartidos del campanario destrozado de la aldea aviaria por un momento.",
				value:
					"Admira los espacios compartidos del campanario destrozado de la aldea aviaria por un momento",
			},
		},
		tsKey: "DailyQuest.AdmireSharedSpacesAtTheBrokenBellTowerInAviaryVillageForAShortWhile",
	},
	{
		upstreamKey: "daily_quest_sunlight_photo_daily_desc",
		overrides: {
			de: {
				upstreamValue: "Hilf dem Betenden Messdiener, den Sommer im Tresor-Archiv zu archivieren.",
				value: "Hilf dem Betenden Messdiener, den Sommer im Tresor-Archiv zu archivieren",
			},
			es: {
				upstreamValue: "Ayuda al Acólito orador a clasificar el verano en el Archivo de la Bóveda.",
				value: "Ayuda al Acólito orador a clasificar el verano en el Archivo de la Bóveda",
			},
			it: {
				upstreamValue: "Aiuta l'Accolita supplicante a depositare l'estate negli archivi.",
				value: "Aiuta l'Accolita supplicante a depositare l'estate negli archivi",
			},
			ko: {
				upstreamValue: "기도하는 조수가 도서관 보관소에서 여름을 기록하는 것을 도와주세요.",
				value: "기도하는 조수가 도서관 보관소에서 여름을 기록하는 것을 도와주세요",
			},
			pt: {
				upstreamValue: "Ajude a Acólita que Reza a arquivar o verão nos Arquivos do Relicário.",
				value: "Ajude a Acólita que Reza a arquivar o verão nos Arquivos do Relicário",
			},
			ru: {
				upstreamValue: "Помогите молящемуся прислужнику сохранить лето в Архиве хранилища.",
				value: "Помогите молящемуся прислужнику сохранить лето в Архиве хранилища",
			},
			vi: {
				upstreamValue: "Giúp Thánh Đồ Cầu Nguyện lưu trữ mùa hè tại Kho Lưu Trữ.",
				value: "Giúp Thánh Đồ Cầu Nguyện lưu trữ mùa hè tại Kho Lưu Trữ",
			},
			"zh-Hans": {
				upstreamValue: "帮助祈祷圣徒在禁阁档案馆中归档夏天。",
				value: "帮助祈祷圣徒在禁阁档案馆中归档夏天",
			},
			"zh-Hant": {
				upstreamValue: "幫助祈禱聖徒在禁閣書庫典藏夏日。",
				value: "幫助祈禱聖徒在禁閣書庫典藏夏日",
			},
		},
		tsKey: "DailyQuest.HelpThePrayingAcolyteArchiveSummerInTheArchives",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_sunset_race_desc",
		tsKey: "DailyQuest.CatchThe3LightsDuringTheValleysSlidingRace",
	},
	{
		upstreamKey: "daily_quest_ap28_daily_generic_desc",
		tsKey: "DailyQuest.InviteASeasonOfMigrationSpiritToAdventureWithYouToday",
	},
	{
		upstreamKey: "daily_quest_emote_with_players_desc",
		tsKey: "DailyQuest.UseExpressionsWithPlayers",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_rain_rainforest_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsInTheForestBrook",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_day_birdnest_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsAroundTheBirdNest",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_day_prairievillage_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsInPrairieVillage",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_dusk_graveyard_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsInTheGraveyard",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_dusk_triangle_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsUnderTheSeaInTreasureReef",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_night_floor4_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsInTheUpperVault",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_night_shelter_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsInTheVaultsRepository",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_rain_basecamp_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsInTheTreehouse",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_sunset_citadel_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsInTheCitadel",
	},
	{
		upstreamKey: "daily_quest_ride_giant_manta_prairie_island_desc",
		tsKey: "DailyQuest.RideAGiantMantaInSanctuaryIslands",
	},
	{
		upstreamKey: "daily_quest_touch_butterflies_butterflyfields_desc",
		tsKey: "DailyQuest.FlyWithManyButterfliesInButterflyFields",
	},
	{
		upstreamKey: "daily_quest_mischief_broomrace_desc",
		tsKey: "DailyQuest.FinishNatsBroomstickRaceInCacklingCrab",
	},
	{
		upstreamKey: "daily_quest_catch_pumpkin_crab_desc",
		tsKey: "DailyQuest.HelpAustinCollect5CrabsInTheBasementOfTheCacklingCrab",
	},
	{
		upstreamKey: "daily_quest_light_mischief_cannon_desc",
		tsKey: "DailyQuest.HelpSkidmoreFireTheCannons3TimesInTheCacklingCrab",
	},
	{
		upstreamKey: "daily_quest_light_mischief_cauldron_desc",
		tsKey: "DailyQuest.HopIntoYoshisCauldronBrewInTheCacklingCrab",
	},
	{
		upstreamKey: "daily_quest_feast_fishing_desc",
		tsKey: "DailyQuest.CatchSomethingGoodWithAFishingPoleInVillageOfDreams",
	},
	{
		upstreamKey: "daily_quest_feast_play_race_desc",
		tsKey: "DailyQuest.FindBearhugHermitInVillageOfDreamsAndPlayARace",
	},
	{
		upstreamKey: "daily_quest_feast_play_skyball_desc",
		tsKey: "DailyQuest.PlaySkyballFor60SecondsInVillageOfDreams",
	},
	{
		upstreamKey: "daily_quest_feast_snowball_hit_avatar_desc",
		tsKey: "DailyQuest.ThrowASnowballAtSomeone",
	},
	{
		upstreamKey: "daily_quest_tidy_rain_grandmatable_desc",
		tsKey: "DailyQuest.TidyUpTheAncestorsTableOfBelongingInHiddenForestsElevatedClearing",
	},
	{
		upstreamKey: "daily_quest_rescue_a_manta_from_darkstone_desc",
		tsKey: "DailyQuest.RescueAMantaFromDarkness",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_sunset_yetipark_desc",
		tsKey: "DailyQuest.CatchTheWanderingLightsAtopHermitValley",
	},
	{
		upstreamKey: "daily_quest_lightseeker3_rain_skyway_desc",
		tsKey: "DailyQuest.CatchThe3LightsInTheWindPaths",
	},
	{
		upstreamKey: "daily_quest_bloom_harvesting_desc",
		overrides: {
			ru: {
				upstreamValue: "Соберите свет семян подсолнуха в саду Полуденной прерии.",
				value: "Соберите свет семян подсолнуха в саду Полуденной прерии",
			},
		},
		tsKey: "DailyQuest.HarvestTheSunflowerSeedLightAtTheGardenInDaylightPrairie",
	},
	{
		upstreamKey: "daily_quest_bloom_message_desc",
		overrides: {
			ru: {
				upstreamValue: "Посадите сообщение-подсолнух в саду Полуденной прерии.",
				value: "Посадите сообщение-подсолнух в саду Полуденной прерии",
			},
		},
		tsKey: "DailyQuest.PlantASunflowerMessageAtTheGardenInDaylightPrairie",
	},
	{
		upstreamKey: "daily_quest_bloom_music_desc",
		overrides: {
			ru: {
				upstreamValue: "Сыграйте музыку вместе со Смеющимся ловцом света Полуденной прерии.",
				value: "Сыграйте музыку вместе со Смеющимся ловцом света Полуденной прерии",
			},
		},
		tsKey: "DailyQuest.PlayMusicWithLaughingLightCatcherInDaylightPrairie",
	},
	{
		upstreamKey: "daily_quest_bloom_watering_desc",
		overrides: {
			ru: {
				upstreamValue: "Полейте подсолнух в саду Полуденной прерии.",
				value: "Полейте подсолнух в саду Полуденной прерии",
			},
		},
		tsKey: "DailyQuest.WaterTheSunflowerAtTheGardenInDaylightPrairie",
	},
	{
		upstreamKey: "daily_quest_honk_at_players_desc",
		tsKey: "DailyQuest.CallTo5DifferentPlayers",
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
		upstreamKey: "commerce_item_name_camping_shrinkmask",
		tsKey: "Cosmetic.FeatheryLashMask",
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
		overrides: {
			es: {
				upstreamValue: "Aretes de luz de luna.",
				value: "Aretes de luz de luna",
			},
		},
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
		upstreamKey: "commerce_item_name_dear_wheatcape",
		tsKey: "Cosmetic.WheatfieldCape",
	},
	{
		upstreamKey: "commerce_item_name_dear_starrymask",
		tsKey: "Cosmetic.StarryNightsVisage",
	},
	{
		upstreamKey: "commerce_item_name_dear_starryhair",
		tsKey: "Cosmetic.StarryNightsKiss",
	},
	{
		upstreamKey: "commerce_item_name_dear_starryumbrella",
		tsKey: "Cosmetic.StarryNightsCanopy",
	},
	{
		upstreamKey: "commerce_item_name_sunlight_sunglasses",
		tsKey: "Cosmetic.SunlightSportySunglasses",
	},
	{
		upstreamKey: "commerce_item_name_sunlight_crabfloatie",
		tsKey: "Cosmetic.SunlightCrabFloat",
	},
	{
		upstreamKey: "commerce_item_name_moonlight_lute",
		tsKey: "Cosmetic.MoonlightLute",
	},
	{
		upstreamKey: "commerce_item_name_moonlight_halohat",
		tsKey: "Cosmetic.MoonlightNimbus",
	},
	{
		upstreamKey: "commerce_item_name_moonlight_veilmask",
		tsKey: "Cosmetic.MoonlightVeil",
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
		overrides: {
			es: {
				upstreamValue: "Vestido y peinado de luz de luna.",
				value: "Vestido y peinado de luz de luna",
			},
		},
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
		upstreamKey: "commerce_item_name_dear_starrywing",
		tsKey: "CosmeticPackName.StarryNightsMantle",
	},
	{
		upstreamKey: "commerce_item_name_sunlight_wetsuit",
		tsKey: "CosmeticPackName.SunlightDiverDuo",
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
	return normaliseQuotes(value.replaceAll(/<[^>]+>/g, "").replaceAll(/\s*\n\s*/g, "")).trim();
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
	const normalised = value.replaceAll(/[‘’]/g, "'");

	return normalised.includes('"') ? normalised.replaceAll(/[“”„‟]/g, '"') : normalised;
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
		.replaceAll("\\", String.raw`\\`)
		.replaceAll('"', String.raw`\"`)
		.replaceAll("\b", String.raw`\b`)
		.replaceAll("\f", String.raw`\f`)
		.replaceAll("\n", String.raw`\n`)
		.replaceAll("\r", String.raw`\r`)
		.replaceAll("\t", String.raw`\t`);
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
	let current = root;

	for (const part of dotPath.split(".")) {
		if (!(part in current)) {
			return undefined;
		}

		current = current[part] as Record<string, unknown>;
	}

	return current;
}

/**
 * Traverse a nested object by dot-separated path and set the leaf value.
 */
function setAtPath(root: Record<string, unknown>, dotPath: string, value: string): void {
	const parts = dotPath.split(".");
	let current = root;

	for (let index = 0; index < parts.length - 1; index++) {
		const part = parts[index]!;

		if (typeof current[part] !== "object" || current[part] === null) {
			current[part] = {};
		}

		current = current[part] as Record<string, unknown>;
	}

	current[parts.at(-1)!] = value;
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

	const safeValue = encodeTsStringLiteralValue(value).replaceAll("$", "$$$$");
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
