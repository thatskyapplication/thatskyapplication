import {
	cataloguePercentage,
	catalogueProgress,
	catalogueSeasonItems,
	skySeasons,
} from "@thatskyapplication/utility";
import { useTranslation } from "react-i18next";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { SectionCard } from "./SectionCard";

export function SeasonsView({ data }: { data: ReadonlySet<number> }) {
	const { t } = useTranslation();

	return (
		<>
			<Breadcrumb
				current={t("season-plural", { ns: "general" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			<p className="m-0 text-base text-gray-600 dark:text-gray-400">
				{t("catalogue.seasons-description", { ns: "features" })}
			</p>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{skySeasons()
					.toReversed()
					.map((season) => (
						<SectionCard
							emoji={SeasonIdToSeasonalEmoji[season.id]}
							key={season.id}
							percentage={cataloguePercentage(
								catalogueProgress(catalogueSeasonItems([season]), data),
							)}
							title={t(`seasons.${season.id}`, { ns: "general" })}
							to={`?view=season&season=${season.id}`}
						/>
					))}
			</div>
			<BackButton to="/me/catalogue" />
		</>
	);
}
