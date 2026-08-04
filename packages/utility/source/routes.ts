export const CDN_URL = "https://cdn.thatskyapplication.com" as const;

export function dailyGuidesQuestRoute<Quest extends string>(
	quest: Quest,
	gif?: boolean,
):
	| `${typeof CDN_URL}/daily_guides/quests/${Quest}.webp`
	| `${typeof CDN_URL}/daily_guides/quests/${Quest}.gif` {
	return `${CDN_URL}/daily_guides/quests/${quest}.${gif ? "gif" : "webp"}`;
}
