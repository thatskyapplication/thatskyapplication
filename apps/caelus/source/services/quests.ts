import type { APIEmbed, Locale } from "@discordjs/core";
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

export function questEmbed(quest: DailyQuests, locale: Locale) {
	const url = DailyQuestToInfographicURL[quest];

	const embed: APIEmbed = {
		title: t(`quests.${quest}`, { lng: locale, ns: "general" }),
		color: DEFAULT_EMBED_COLOUR,
	};

	if (url) {
		embed.image = { url };
	} else {
		embed.description = "This quest does not have an infographic.";
	}

	return embed;
}
