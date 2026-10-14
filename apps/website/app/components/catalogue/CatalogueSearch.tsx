import type { TFunction } from "i18next";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
	type CatalogueSearchEntry,
	catalogueSearchEntries,
	CatalogueSearchType,
	spiritOriginTranslationKey,
	CatalogueCollectionToLocaleKey,
} from "@thatskyapplication/utility";
import { catalogueTargetQuery, eventFamilyYears } from "~/utility/catalogue.js";
import {
	CosmeticToEmoji,
	EventIdToEventTicketEmoji,
	SeasonIdToSeasonalEmoji,
} from "~/utility/emojis.js";
import { CatalogueSearchAutocomplete } from "./CatalogueSearchAutocomplete.js";

function targetResult(entry: CatalogueSearchEntry, t: TFunction) {
	const { cosmeticDisplay, target } = entry;
	const to = catalogueTargetQuery(target);

	switch (target.type) {
		case CatalogueSearchType.Season:
			return {
				to,
				emoji: SeasonIdToSeasonalEmoji[target.season.id],
				detail:
					cosmeticDisplay === null
						? t("season", { ns: "general" })
						: t(`seasons.${target.season.id}`, { ns: "general" }),
			};
		case CatalogueSearchType.Event:
			return {
				to,
				emoji: EventIdToEventTicketEmoji[target.event.id],
				detail: String(target.event.start.year),
			};
		case CatalogueSearchType.EventFamily:
			return {
				to,
				emoji: EventIdToEventTicketEmoji[target.occurrences[0].id],
				detail: eventFamilyYears(target.occurrences, t),
			};
		case CatalogueSearchType.Spirit: {
			const { spirit } = target;
			const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();

			return {
				to,
				emoji: seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null,
				detail: t(spiritOriginTranslationKey(spirit), { ns: "general" }),
			};
		}
		case CatalogueSearchType.Collection: {
			return {
				to,
				emoji: null,
				detail: t(CatalogueCollectionToLocaleKey[target.collection]),
			};
		}
	}
}

export function CatalogueSearch() {
	const { t } = useTranslation();
	const getEntries = useCallback(
		() => catalogueSearchEntries((key) => t(key, { ns: "general" }), { groupEventFamilies: true }),
		[t],
	);

	return (
		<CatalogueSearchAutocomplete
			getEntries={getEntries}
			placeholder={t("catalogue.search-placeholder", { ns: "features" })}
			resolveResult={(entry) => {
				const result = targetResult(entry, t);
				return {
					...result,
					emoji:
						entry.cosmeticDisplay === null ? result.emoji : CosmeticToEmoji[entry.cosmeticDisplay],
				};
			}}
		/>
	);
}
