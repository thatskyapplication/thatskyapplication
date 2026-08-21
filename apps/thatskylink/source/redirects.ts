import { PATCH_NOTE_REDIRECTS } from "@thatskyapplication/patch-notes";
import {
	KNOWN_ISSUES_SECTION_REDIRECT,
	PATCH_NOTES_SECTION_REDIRECT,
	STORE_REDIRECT,
} from "./utility/constants.js";

export const REDIRECTS = new Map<string, `https://${string}`>([
	// General.
	["creator-troupe", "https://thatskygame.com/creator-troupe"],
	["cretro", "https://thatskygame.com/creator-troupe"],
	["ct", "https://thatskygame.com/creator-troupe"],
	["dailies", "https://thatskyapplication.com/daily-guides"],
	["daily-guides", "https://thatskyapplication.com/daily-guides"],
	["dc", "https://discord.gg/thatskygame"],
	["discord", "https://discord.gg/thatskygame"],
	["facebook", "https://facebook.com/thatskygame"],
	["fb", "https://facebook.com/thatskygame"],
	["ig", "https://instagram.com/thatskygame"],
	["insta", "https://instagram.com/thatskygame"],
	["instagram", "https://instagram.com/thatskygame"],
	["merch", "https://thatskyshop.com"],
	["merchandise", "https://thatskyshop.com"],
	["reddit", "https://reddit.com/r/SkyGame"],
	["reddit2", "https://reddit.com/r/SkyChildrenOfLight"],
	["shards", "https://thatskyapplication.com/shard-eruption"],
	["skycord", "https://discord.gg/thatskygame"],
	["store", STORE_REDIRECT],
	["tgc", "https://thatgamecompany.com"],
	["tiktok", "https://tiktok.com/@thatskygame"],
	["tsa", "https://thatskyapplication.com"],
	["tsg", "https://thatskygame.com"],
	["twitter", "https://x.com/thatskygame"],
	["webshop", STORE_REDIRECT],
	["webstore", STORE_REDIRECT],
	["wiki", "https://sky-children-of-the-light.fandom.com"],
	["x", "https://x.com/thatskygame"],
	["youtube", "https://youtube.com/@thatgamecompany"],
	["yt", "https://youtube.com/@thatgamecompany"],

	// Patch notes.
	["patch-notes", PATCH_NOTES_SECTION_REDIRECT],
	["patchnotes", PATCH_NOTES_SECTION_REDIRECT],
	["patches", PATCH_NOTES_SECTION_REDIRECT],

	// Known issues.
	["known-issues", KNOWN_ISSUES_SECTION_REDIRECT],
	["knownissues", KNOWN_ISSUES_SECTION_REDIRECT],
]);

for (const [identifier, redirect] of PATCH_NOTE_REDIRECTS) {
	REDIRECTS.set(identifier, redirect);
}
