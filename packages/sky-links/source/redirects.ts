import {
	type HTTPSURL,
	isPublishedPatchNote,
	LATEST_PATCH_NOTE,
	PATCH_NOTES,
	type PatchNoteIdentifier,
} from "./patch-notes.js";

export interface Redirect {
	readonly identifiers: readonly string[];
	readonly url: HTTPSURL;
}

export interface PatchNoteRedirect extends Redirect {
	readonly identifier: PatchNoteIdentifier;
}

export interface ResolvedRedirect {
	readonly status: 301 | 302;
	readonly url: HTTPSURL;
}

export const THATSKYLINK_URL = "https://thatsky.link" as const;

export const THATSKYLINK_PAGE_URL = "https://thatskyapplication.com/thatskylink" as const;

export const LATEST_PATCH_NOTE_IDENTIFIER = "p" as const;

const SKY_PROFILE_PREFIX = "profiles/" as const;

const THIS_MONTH_IN_SKY_REGEX = /^tmis(\d{4})(\d{2})$/;

const THIS_MONTH_IN_SKY_MONTH_NAMES = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december",
] as const satisfies readonly string[];

export function skyProfileRedirect(pathname: string): HTTPSURL | null {
	if (!pathname.startsWith(SKY_PROFILE_PREFIX)) {
		return null;
	}

	const userId = pathname.slice(SKY_PROFILE_PREFIX.length);
	return userId ? `https://thatskyapplication.com/sky-profiles/${userId}` : null;
}

export function thisMonthInSkyRedirect(pathname: string): HTTPSURL | null {
	const match = THIS_MONTH_IN_SKY_REGEX.exec(pathname);

	if (match === null) {
		return null;
	}

	const [, year, rawMonth] = match;
	const monthName = THIS_MONTH_IN_SKY_MONTH_NAMES[Number(rawMonth) - 1];

	return monthName === undefined
		? null
		: `https://www.thatskygame.com/news/this-month-in-sky-${monthName}-${year}-edition`;
}

export const REDIRECTS: readonly Redirect[] = [
	{
		identifiers: ["creator-troupe", "cretro", "ct"],
		url: "https://thatskygame.com/creator-troupe",
	},
	{ identifiers: ["dailies", "daily-guides"], url: "https://thatskyapplication.com/daily-guides" },
	{ identifiers: ["dc", "discord", "skycord"], url: "https://discord.gg/thatskygame" },
	{ identifiers: ["facebook", "fb"], url: "https://facebook.com/thatskygame" },
	{ identifiers: ["ig", "insta", "instagram"], url: "https://instagram.com/thatskygame" },
	{
		identifiers: ["known-issues", "knownissues"],
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/section/111-known-issues",
	},
	{ identifiers: ["merch", "merchandise"], url: "https://thatskyshop.com" },
	{
		identifiers: ["patch-notes", "patchnotes", "patches"],
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/section/110-patch-notes",
	},
	{ identifiers: ["reddit"], url: "https://reddit.com/r/SkyGame" },
	{ identifiers: ["reddit2"], url: "https://reddit.com/r/SkyChildrenOfLight" },
	{ identifiers: ["shards"], url: "https://thatskyapplication.com/shard-eruption" },
	{ identifiers: ["store", "webshop", "webstore"], url: "https://store.thatskygame.com" },
	{ identifiers: ["tgc"], url: "https://thatgamecompany.com" },
	{ identifiers: ["tiktok"], url: "https://tiktok.com/@thatskygame" },
	{ identifiers: ["tsa"], url: "https://thatskyapplication.com" },
	{ identifiers: ["tsg"], url: "https://thatskygame.com" },
	{ identifiers: ["twitter", "x"], url: "https://x.com/thatskygame" },
	{ identifiers: ["wiki"], url: "https://sky-children-of-the-light.fandom.com" },
	{ identifiers: ["youtube", "yt"], url: "https://youtube.com/@thatgamecompany" },
];

const patchNoteRedirects: PatchNoteRedirect[] = [];

for (const patchNote of PATCH_NOTES) {
	if (!isPublishedPatchNote(patchNote)) {
		continue;
	}

	patchNoteRedirects.push({
		identifier: patchNote.identifier,
		identifiers: [patchNote.identifier, ...(patchNote.aliases ?? [])],
		url: patchNote.url,
	});
}

export const PATCH_NOTE_REDIRECTS: readonly PatchNoteRedirect[] = patchNoteRedirects;

const redirectURLs = new Map<string, HTTPSURL>();

for (const { identifiers, url } of [...REDIRECTS, ...PATCH_NOTE_REDIRECTS]) {
	for (const identifier of identifiers) {
		redirectURLs.set(identifier, url);
	}
}

export const REDIRECT_URLS: ReadonlyMap<string, HTTPSURL> = redirectURLs;

export function resolveRedirect(pathname: string): ResolvedRedirect | null {
	const skyProfile = skyProfileRedirect(pathname);

	if (skyProfile) {
		return { status: 301, url: skyProfile };
	}

	const thisMonthInSky = thisMonthInSkyRedirect(pathname);

	if (thisMonthInSky) {
		return { status: 301, url: thisMonthInSky };
	}

	if (pathname === LATEST_PATCH_NOTE_IDENTIFIER) {
		return { status: 302, url: LATEST_PATCH_NOTE.url };
	}

	const url = REDIRECT_URLS.get(pathname);
	return url === undefined ? null : { status: 301, url };
}
