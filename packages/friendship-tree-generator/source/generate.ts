import { mkdir, readFile, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import {
	type FriendshipTree,
	type LegacyFriendshipTree,
	type SeasonIds,
	type SpiritIds,
	spirits,
} from "@thatskyapplication/utility";
import { renderFriendshipTree } from "./index.js";

const USAGE = "Usage: pnpm start <spirit ID> [--post-season] [--background <file>]" as const;
const OUTPUT_DIRECTORY = new URL("../output/", import.meta.url);

const { positionals, values } = parseArgs({
	allowPositionals: true,
	options: {
		background: { type: "string" },
		"post-season": { type: "boolean", default: false },
	},
});

const [argument] = positionals;

const spirit =
	argument !== undefined && /^\d+$/.test(argument)
		? spirits().get(Number(argument) as SpiritIds)
		: undefined;

if (!spirit) {
	console.error(argument === undefined ? USAGE : `${argument} is not a spirit ID. ${USAGE}`);
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
const fileName = `${spirit.id}-${infographic}.webp`;
const background = values.background === undefined ? undefined : await readFile(values.background);
await mkdir(OUTPUT_DIRECTORY, { recursive: true });
await writeFile(
	new URL(fileName, OUTPUT_DIRECTORY),
	await renderFriendshipTree({ tree, seasonId, background }),
);
console.log(`Wrote output/${fileName}.`);
