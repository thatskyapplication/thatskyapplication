import {
	cataloguePercentage,
	catalogueProgress,
	catalogueSpiritItems,
	type Spirit,
} from "@thatskyapplication/utility";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { TREE_COLUMN_CLASS, TREE_COLUMN_LABEL_CLASS } from "~/utility/catalogue.js";
import { FriendshipTree } from "./FriendshipTree";

export function SpiritTreeColumn({
	data,
	locale,
	spirit,
}: {
	data: ReadonlySet<number>;
	locale: string;
	spirit: Spirit;
}) {
	const { t } = useTranslation();
	const seasonId =
		spirit.isSeasonalSpirit() || spirit.isGuideSpirit() ? spirit.seasonId : undefined;
	const percentage = useMemo(
		() => cataloguePercentage(catalogueProgress(catalogueSpiritItems([spirit]), data)),
		[spirit, data],
	);

	return (
		<div className={TREE_COLUMN_CLASS}>
			<FriendshipTree
				data={data}
				locale={locale}
				seasonId={seasonId}
				tree={spirit.displayFriendshipTree}
			/>
			<Link className={TREE_COLUMN_LABEL_CLASS} to={`?view=spirit&spirit=${spirit.id}`}>
				{t(`spirits.${spirit.id}`, { ns: "general" })}
				{percentage !== null && (
					<span className="ml-1.5 font-normal text-gray-600 dark:text-gray-400">
						({percentage}%)
					</span>
				)}
			</Link>
		</div>
	);
}
