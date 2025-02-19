import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { FriendshipTreeData, Node } from "../source/nodes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fileNames = await readdir(path.resolve(__dirname, "../source/friendship_trees"));
const urls = new Set();

function extractURLs(data: readonly (Node | null)[]) {
	for (const node of data) {
		if (node) {
			const url = node.icon;
			const assetName = url.split("/")[7];

			if (!assetName) {
				throw new Error(`Failed to extract asset name from ${url}`);
			}

			urls.add(`https://sky-children-of-the-light.fandom.com/wiki/File:${assetName}?action=watch`);

			if (node.nodes) {
				extractURLs(node.nodes);
			}
		}
	}
}

for (const fileName of fileNames) {
	const file = await import(path.resolve(__dirname, `../source/friendship_trees/${fileName}`));

	const { CURRENT, SEASONAL } = file as {
		CURRENT?: FriendshipTreeData;
		SEASONAL?: FriendshipTreeData;
	};

	if (CURRENT) {
		extractURLs(CURRENT.flat());
	}

	if (SEASONAL) {
		extractURLs(SEASONAL.flat());
	}
}

console.log(JSON.stringify([...urls]));
