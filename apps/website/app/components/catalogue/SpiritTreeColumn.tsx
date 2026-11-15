import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	cataloguePercentage,
	catalogueProgress,
	friendshipTreeToItems,
	type Spirit,
} from "@thatskyapplication/utility";
import { TREE_COLUMN_CLASS, TREE_COLUMN_LABEL_CLASS } from "~/utility/catalogue.js";
import { FriendshipTree } from "./FriendshipTree";

export function SpiritTreeColumn({
	data,
	locale,
	spirit,
	tree = spirit.displayFriendshipTree,
}: {
	data: ReadonlySet<number>;
	locale: string;
	spirit: Spirit;
	tree?: Spirit["displayFriendshipTree"];
}) {
	const { t } = useTranslation();
	const seasonId =
		spirit.isSeasonalSpirit() || spirit.isGuideSpirit() ? spirit.seasonId : undefined;
	const percentage = useMemo(
		() => cataloguePercentage(catalogueProgress(friendshipTreeToItems(tree), data)),
		[tree, data],
	);

	return (
		<div className={TREE_COLUMN_CLASS}>
			<FriendshipTree data={data} locale={locale} seasonId={seasonId} tree={tree} />
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
