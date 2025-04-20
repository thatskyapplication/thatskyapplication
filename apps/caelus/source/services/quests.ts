import { type APIMessageTopLevelComponent, ComponentType, type Locale } from "@discordjs/core";
import { DAILY_QUEST_VALUES, type DailyQuests } from "@thatskyapplication/utility";
import { t } from "i18next";
import { DEFAULT_EMBED_COLOUR, DailyQuestToInfographicURL } from "../utility/constants.js";

export function questAutocomplete(focused: string, locale: Locale) {
	return focused === ""
		? []
		: DAILY_QUEST_VALUES.filter((dailyQuest) =>
				t(`quests.${dailyQuest}`, { lng: locale, ns: "general" })
					.toUpperCase()
					.includes(focused.toUpperCase()),
			)
				.map((dailyQuest) => ({
					name: t(`quests.${dailyQuest}`, { lng: locale, ns: "general" }),
					value: dailyQuest,
				}))
				.slice(0, 25);
}

export function questResponse(quest: DailyQuests, locale: Locale): [APIMessageTopLevelComponent] {
	const url = DailyQuestToInfographicURL[quest];

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t(`quests.${quest}`, { lng: locale, ns: "general" })}`,
				},
				url
					? { type: ComponentType.MediaGallery, items: [{ media: { url } }] }
					: {
							type: ComponentType.TextDisplay,
							content: "This quest does not have an infographic.",
						},
			],
		},
	];
}
