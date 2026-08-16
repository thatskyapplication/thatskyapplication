import type { TFunction } from "i18next";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
	CatalogueCollection,
	type CatalogueSearchEntry,
	catalogueSearchEntries,
	CatalogueSearchType,
	spiritOriginTranslationKey,
} from "@thatskyapplication/utility";
import { eventAnchor, eventFamilyYears } from "~/utility/catalogue.js";
import {
	CosmeticToEmoji,
	EventIdToEventTicketEmoji,
	SeasonIdToSeasonalEmoji,
} from "~/utility/emojis.js";
import { CatalogueSearchAutocomplete } from "./CatalogueSearchAutocomplete.js";

const CATALOGUE_COLLECTIONS = {
	[CatalogueCollection.StarterPacks]: {
		view: "starter-packs",
		translationKey: "catalogue.starter-packs",
	},
	[CatalogueCollection.SecretArea]: {
		view: "secret-area",
		translationKey: "catalogue.secret-area",
	},
	[CatalogueCollection.ClothingShop]: {
		view: "clothing-shop",
		translationKey: "catalogue.clothing-shop",
	},
	[CatalogueCollection.NestingWorkshop]: {
		view: "nesting-workshop",
		translationKey: "catalogue.nesting-workshop",
	},
} as const satisfies Readonly<
	Record<CatalogueCollection, { view: string; translationKey: string }>
>;

function targetResult(entry: CatalogueSearchEntry, t: TFunction) {
	const { cosmeticDisplay, target } = entry;

	switch (target.type) {
		case CatalogueSearchType.Season:
			return {
				to: `?view=season&season=${target.season.id}`,
				emoji: SeasonIdToSeasonalEmoji[target.season.id],
				detail:
					cosmeticDisplay === null
						? t("season", { ns: "general" })
						: t(`seasons.${target.season.id}`, { ns: "general" }),
			};
		case CatalogueSearchType.Event:
			return {
				to: `?view=event-family&family=${target.event.family}#${eventAnchor(target.event.id)}`,
				emoji: EventIdToEventTicketEmoji[target.event.id],
				detail: String(target.event.start.year),
			};
		case CatalogueSearchType.EventFamily:
			return {
				to: `?view=event-family&family=${target.family.id}`,
				emoji: EventIdToEventTicketEmoji[target.occurrences[0].id],
				detail: eventFamilyYears(target.occurrences, t),
			};
		case CatalogueSearchType.Spirit: {
			const { spirit } = target;
			const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();

			return {
				to: `?view=spirit&spirit=${spirit.id}`,
				emoji: seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null,
				detail: t(spiritOriginTranslationKey(spirit), { ns: "general" }),
			};
		}
		case CatalogueSearchType.Collection: {
			const { view, translationKey } = CATALOGUE_COLLECTIONS[target.collection];
			return { to: `?view=${view}`, emoji: null, detail: t(translationKey, { ns: "features" }) };
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
