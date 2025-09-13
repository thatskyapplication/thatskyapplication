export const CDN_URL = "https://cdn.thatskyapplication.com" as const;
export const LINK_REDIRECTOR_URL = "https://thatsky.link" as const;

export function dailyGuidesQuestRoute<Quest extends string, GIF extends boolean | undefined>(
	quest: Quest,
	gif?: GIF | undefined,
):
	| `${typeof CDN_URL}/daily_guides/quests/${Quest}.webp`
	| `${typeof CDN_URL}/daily_guides/quests/${Quest}.gif` {
	return `${CDN_URL}/daily_guides/quests/${quest}.${gif ? "gif" : "webp"}`;
}

export function patchNotesRoute<Version extends `${number}`>(
	version: Version,
): `${typeof LINK_REDIRECTOR_URL}/p${Version}` {
	return `${LINK_REDIRECTOR_URL}/p${version}`;
}
