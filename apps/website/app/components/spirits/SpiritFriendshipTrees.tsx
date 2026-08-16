import { useTranslation } from "react-i18next";
import type { Spirit } from "@thatskyapplication/utility";
import { FriendshipTree } from "~/components/catalogue/FriendshipTree.js";
import { FriendshipTreeCarousel } from "~/components/catalogue/FriendshipTreeCarousel.js";
import { TREE_COLUMN_CLASS } from "~/utility/catalogue.js";

const FRIENDSHIP_TREE_LABEL_KEYS = {
	current: "spirits.friendship-tree-current",
	seasonal: "spirits.friendship-tree-seasonal",
} as const;

type FriendshipTreeType = keyof typeof FRIENDSHIP_TREE_LABEL_KEYS;

export function SpiritFriendshipTrees({ locale, spirit }: { locale: string; spirit: Spirit }) {
	const { t } = useTranslation();
	const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();
	const seasonId = seasonal ? spirit.seasonId : undefined;
	const friendshipTrees: {
		key: FriendshipTreeType;
		tree: Spirit["displayFriendshipTree"];
	}[] = [];

	if (spirit.isSeasonalSpirit()) {
		if (spirit.seasonal.length > 0) {
			friendshipTrees.push({ key: "seasonal", tree: spirit.seasonal });
		}

		if (spirit.current.length > 0) {
			friendshipTrees.push({ key: "current", tree: spirit.current });
		}
	} else if (spirit.displayFriendshipTree.length > 0) {
		friendshipTrees.push({ key: "current", tree: spirit.displayFriendshipTree });
	}

	if (friendshipTrees.length > 1) {
		return (
			<FriendshipTreeCarousel
				accessibleLabel={t("spirits.friendship-trees", { ns: "features" })}
				key={spirit.id}
			>
				{friendshipTrees.map(({ key, tree }) => (
					<div className={TREE_COLUMN_CLASS} key={key}>
						<FriendshipTree
							label={t(FRIENDSHIP_TREE_LABEL_KEYS[key], { ns: "features" })}
							locale={locale}
							readOnly
							seasonId={seasonId}
							tree={tree}
						/>
					</div>
				))}
			</FriendshipTreeCarousel>
		);
	}

	if (friendshipTrees.length === 1) {
		const friendshipTree = friendshipTrees[0]!;

		return (
			<div className="flex justify-center">
				<FriendshipTree
					label={t(FRIENDSHIP_TREE_LABEL_KEYS[friendshipTree.key], { ns: "features" })}
					locale={locale}
					readOnly
					seasonId={seasonId}
					tree={friendshipTree.tree}
				/>
			</div>
		);
	}

	return (
		<p className="m-0 text-base text-gray-600 dark:text-gray-400">
			{t(`catalogue.kind-no-friendship-tree.${spirit.kind}`, { ns: "features" })}
		</p>
	);
}
