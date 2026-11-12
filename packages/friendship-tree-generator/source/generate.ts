import { mkdir, readFile, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { createInstance } from "i18next";
import {
	de,
	enGB,
	es419,
	esES,
	type FriendshipTree,
	fr,
	it,
	ja,
	ko,
	type LegacyFriendshipTree,
	ptBR,
	ru,
	type SeasonIds,
	type SpiritIds,
	spirits,
	th,
	vi,
	zhCN,
	zhTW,
} from "@thatskyapplication/utility";
import { renderFriendshipTree } from "./index.js";

const USAGE =
	"Usage: pnpm start <spirit id> [--post-season] [--background <file>] [--locale <locale>]" as const;

const OUTPUT_DIRECTORY = new URL("../output/", import.meta.url);
const DEFAULT_LOCALE = "en-GB" as const;

const RESOURCES = {
	de,
	"en-GB": enGB,
	"es-419": es419,
	"es-ES": esES,
	fr,
	it,
	ja,
	ko,
	"pt-BR": ptBR,
	ru,
	th,
	vi,
	"zh-CN": zhCN,
	"zh-TW": zhTW,
} as const;

const { positionals, values } = parseArgs({
	allowPositionals: true,
	options: {
		background: { type: "string" },
		locale: { type: "string", default: DEFAULT_LOCALE },
		"post-season": { type: "boolean", default: false },
	},
});

const [argument] = positionals;

const spirit =
	argument !== undefined && /^\d+$/.test(argument)
		? spirits().get(Number(argument) as SpiritIds)
		: undefined;

if (!spirit) {
	console.error(argument === undefined ? USAGE : `${argument} is not a spirit id. ${USAGE}`);
	process.exit(1);
}

const { locale } = values;

if (!Object.hasOwn(RESOURCES, locale)) {
	console.error(
		`${locale} is not a supported locale. Use one of ${Object.keys(RESOURCES).join(", ")}.`,
	);

	process.exit(1);
}

const postSeason = values["post-season"];
let tree: FriendshipTree | LegacyFriendshipTree | undefined;
let seasonId: SeasonIds | undefined;

if (spirit.isSeasonalSpirit() || spirit.isGuideSpirit()) {
	seasonId = spirit.seasonId;

	tree = postSeason
		? spirit.friendshipTrees.postSeason?.friendshipTree
		: spirit.friendshipTrees.seasonal.friendshipTree;
} else if (!postSeason) {
	tree = spirit.displayFriendshipTree;
}

if (!tree || tree.length === 0) {
	console.error(`Spirit ${spirit.id} has no ${postSeason ? "post-season " : ""}friendship tree.`);
	process.exit(1);
}

const infographic = seasonId !== undefined && !postSeason ? "seasonal" : "current";
const fileName = `${spirit.id}-${infographic}${locale === DEFAULT_LOCALE ? "" : `-${locale}`}.webp`;
const background = values.background === undefined ? undefined : await readFile(values.background);
const i18next = createInstance();
await i18next.init({ fallbackLng: DEFAULT_LOCALE, resources: RESOURCES, returnEmptyString: false });
await mkdir(OUTPUT_DIRECTORY, { recursive: true });

await writeFile(
	new URL(fileName, OUTPUT_DIRECTORY),
	await renderFriendshipTree({ tree, seasonId, background, locale, t: i18next.t }),
);

console.log(`Wrote output/${fileName}.`);
