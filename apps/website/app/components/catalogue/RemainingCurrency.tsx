import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import type { CostEntry } from "@thatskyapplication/utility";
import { CARD_CLASS } from "~/utility/catalogue.js";
import { SUBSECTION_HEADING_CLASS } from "~/utility/styles.js";
import { CostList } from "./CostList";

export function RemainingCurrency({
	costs,
	locale,
}: {
	costs: readonly CostEntry[];
	locale: string;
}) {
	const { t } = useTranslation();

	if (costs.length === 0) {
		return null;
	}

	return (
		<div className={CARD_CLASS}>
			<h2 className={clsx(SUBSECTION_HEADING_CLASS, "mb-2")}>
				{t("catalogue.remaining-currency", { ns: "features" })}
			</h2>
			<span className="text-sm text-gray-600 dark:text-gray-400">
				<CostList costs={costs} locale={locale} />
			</span>
		</div>
	);
}
