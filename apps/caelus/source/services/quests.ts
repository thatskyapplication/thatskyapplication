import { type APIMessageTopLevelComponent, ComponentType, type Locale } from "@discordjs/core";
import {
	DAILY_QUEST_VALUES,
	type DailyQuests,
	DailyQuestToInfographicURL,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { DEFAULT_EMBED_COLOUR, MAXIMUM_AUTOCOMPLETE_NAME_LIMIT } from "../utility/constants.js";

export function questAutocomplete(focused: string, locale: Locale) {
	return focused === ""
		? []
		: DAILY_QUEST_VALUES.filter((dailyQuest) =>
				t(`quests.${dailyQuest}`, { lng: locale, ns: "general" })
					.toUpperCase()
					.includes(focused.toUpperCase()),
			)
				.map((dailyQuest) => {
					let quest = t(`quests.${dailyQuest}`, { lng: locale, ns: "general" });

					if (quest.length > MAXIMUM_AUTOCOMPLETE_NAME_LIMIT) {
						quest = `${quest.slice(0, MAXIMUM_AUTOCOMPLETE_NAME_LIMIT - 3)}...`;
					}

					return { name: quest, value: dailyQuest };
				})
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
