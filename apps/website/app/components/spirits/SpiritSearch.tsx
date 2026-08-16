import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router";
import {
	catalogueSpiritSearchEntries,
	spiritOriginTranslationKey,
} from "@thatskyapplication/utility";
import { CatalogueSearchAutocomplete } from "~/components/catalogue/CatalogueSearchAutocomplete.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { fromSpiritHistory, SPIRIT_HISTORY_LOCATION_STATE, spiritURL } from "~/utility/spirits.js";

export function SpiritSearch() {
	const { t } = useTranslation();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const getEntries = useCallback(
		() => catalogueSpiritSearchEntries((key) => t(key, { ns: "general" })),
		[t],
	);
	const selected = searchParams.has("spirit");
	const preserveHistory = !selected || fromSpiritHistory(location.state);

	return (
		<CatalogueSearchAutocomplete
			getEntries={getEntries}
			placeholder={t("spirits.search-placeholder", { ns: "features" })}
			resolveResult={(entry) => {
				const { spirit } = entry.target;
				const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();

				return {
					to: spiritURL(searchParams, spirit.id),
					detail: t(spiritOriginTranslationKey(spirit), { ns: "general" }),
					emoji: seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null,
					replace: selected,
					state: preserveHistory ? SPIRIT_HISTORY_LOCATION_STATE : null,
				};
			}}
		/>
	);
}
