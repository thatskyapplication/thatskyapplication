export const CDN_URL = "https://cdn.thatskyapplication.com" as const;
export const LINK_REDIRECTOR_URL = "https://thatsky.link" as const;

export function dailyGuidesQuestRoute<Quest extends string>(
	quest: Quest,
): `${typeof CDN_URL}/daily_guides/quests/${Quest}.webp` {
	return `${CDN_URL}/daily_guides/quests/${quest}.webp`;
}

export function patchNotesRoute<Version extends string>(
	version: Version,
): `${typeof LINK_REDIRECTOR_URL}/p/${Version}` {
	return `${LINK_REDIRECTOR_URL}/p/${version}`;
}
