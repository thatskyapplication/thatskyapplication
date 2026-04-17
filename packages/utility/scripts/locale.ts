import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import pc from "picocolors";
import { Cosmetic } from "../source/cosmetics.js";
import { DailyQuest } from "../source/daily-guides.js";
import { AreaName } from "../source/kingdom/geography.js";
import { SeasonId } from "../source/season.js";
import { SpiritId } from "../source/utility/spirits.js";

// --update-en also updates en-gb.ts.

const { blue, bold, cyan, dim, green, yellow } = pc;
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

type LocaleMapping =
	| {
			/** Key in upstream Localizable.strings. */
			upstreamKey: string;
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
		upstreamKey: "name_mainstreet",
		tsKey: "AreaName.AviaryVillage",
	},
	{
		upstreamKey: "title_aviary_carnival_01",
		tsKey: "AreaName.WanderingCarnival",
	},
	{
		upstreamKey: "daily_quest_world_quest_ap09_fetch_04_desc",
		tsKey: "DailyQuest.RehearseForAPerformanceWithTheSkater",
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
		upstreamKey: "name_season_30",
		tsKey: "SeasonId.Carnival",
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
		map.set(key, value);
	}

	return map;
}

async function writeChangeLog(): Promise<void> {
	await writeFile(CHANGE_LOG_PATH, `${changes.join("\n")}\n`);
	console.log(dim(`Detailed changes written to ${CHANGE_LOG_PATH}`));
}

function stripMarkup(value: string): string {
	return value.replace(/<[^>]+>/g, "").trim();
}

function getAtPath(root: Record<string, unknown>, dotPath: string): unknown {
	for (const part of dotPath.split(".")) {
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
		// biome-ignore lint/style/noParameterAssign: Don't care.
		root = root[parts[index]!] as Record<string, unknown>;
	}

	root[parts.at(-1)!] = value;
}

async function updateJsonLocale(
	filePath: string,
	dotPath: string,
	value: string,
): Promise<boolean> {
	const raw = await readFile(filePath, "utf-8");
	const obj = JSON.parse(raw) as Record<string, unknown>;

	if (getAtPath(obj, dotPath) === value) {
		return false;
	}

	setAtPath(obj, dotPath, value);
	await writeFile(filePath, JSON.stringify(obj, null, 2));
	return true;
}

/**
 * Find the line in en-gb.ts that contains `[tsKey]:` and replace the
 * immediately following string literal with the new value.
 */
async function updateEnGbTs(tsKey: string, upstreamKey: string, value: string): Promise<boolean> {
	const content = await readFile(EN_GB_TS, "utf-8");

	// Escape special regex metacharacters in the key (mainly the dot).
	const escapedKey = tsKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

	// Match [Key]: optionally followed by whitespace/newline, then "old value".
	const pattern = new RegExp(`(\\[${escapedKey}\\]:\\s*\\n?\\s*)"([^"]*)"`);
	const match = pattern.exec(content);

	if (!match) {
		console.warn(`  ${yellow("⚠")} Could not locate ${cyan(`[${tsKey}]`)} in en-gb.ts — skipped`);
		return false;
	}

	if (match[2] === value) {
		return false;
	}

	// Escape $ in value to avoid special replacement patterns.
	const safeValue = value.replace(/\$/g, "$$$$");
	await writeFile(EN_GB_TS, content.replace(pattern, `$1"${safeValue}"`));
	changes.push(`en-gb.ts\t${tsKey}\t${upstreamKey}\t${value}`);

	return true;
}

const updateEn = process.argv.includes("--update-en");

if (MAPPINGS.length === 0) {
	console.log(yellow("No mappings defined. Add entries to MAPPINGS in scripts/locale.ts."));
	process.exit(0);
}

for (const mapping of MAPPINGS) {
	const jsonPath = mapping.jsonPath ?? resolveJsonPath(mapping.tsKey);
	let changedJsonLocaleCount = 0;

	console.log(
		`\n${bold(cyan("Syncing"))} ${yellow(`"${mapping.upstreamKey}"`)} ${dim("→")} ${cyan(jsonPath)}`,
	);

	// Collect Base.lproj value upfront (needed for --update-en).
	let baseStrings: Map<string, string> | undefined;

	if (updateEn) {
		const basePath = join(LPROJ_DIR, "Base.lproj", "Localizable.strings");
		const baseContent = await readFile(basePath, "utf-8");
		baseStrings = parseLocalizableStrings(baseContent);
	}

	// Update JSON locales.
	for (const [lproj, jsonNames] of Object.entries(LPROJ_TO_JSON)) {
		if (jsonNames.length === 0) {
			continue;
		}

		const stringsPath = join(LPROJ_DIR, `${lproj}.lproj`, "Localizable.strings");
		let content: string;

		try {
			content = await readFile(stringsPath, "utf-8");
		} catch {
			console.warn(`  ${yellow("⚠")} ${dim(`${lproj}.lproj`)} not found — skipped`);
			continue;
		}

		const strings = parseLocalizableStrings(content);
		const raw = strings.get(mapping.upstreamKey);

		if (!raw) {
			console.warn(`  ${yellow("⚠")} Key not found in ${dim(`${lproj}.lproj`)} — skipped`);
			continue;
		}

		const value = stripMarkup(raw);

		for (const jsonName of jsonNames) {
			const jsonFile = join(SOURCE_LOCALES_DIR, `${jsonName}.json`);
			const changed = await updateJsonLocale(jsonFile, jsonPath, value);
			if (changed) {
				changedJsonLocaleCount++;
				changes.push(`${jsonName}.json\t${jsonPath}\t${mapping.upstreamKey}\t${value}`);
			}
		}
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

		const raw = baseStrings!.get(mapping.upstreamKey);

		if (!raw) {
			console.warn(
				`  ${yellow("⚠")} Key not found in ${dim("Base.lproj")} — skipped en-gb.ts update`,
			);

			continue;
		}

		if (await updateEnGbTs(mapping.tsKey, mapping.upstreamKey, stripMarkup(raw))) {
			console.log(`  ${green("✔")} ${bold("en-gb.ts")} updated`);
		}
	}
}

await writeChangeLog();

// Need to do this because running the command will put the flag on the command.
spawnSync("pnpm", ["run", "format"], { stdio: "inherit", shell: true });
console.log(`\n${bold(green("Done."))}`);
