import { useTranslation } from "react-i18next";
import {
	friendshipTreeFor,
	friendshipTreeVariants,
	type Spirit,
} from "@thatskyapplication/utility";
import { FriendshipTree } from "~/components/catalogue/FriendshipTree.js";
import { FriendshipTreeCarousel } from "~/components/catalogue/FriendshipTreeCarousel.js";
import { TREE_COLUMN_CLASS } from "~/utility/catalogue.js";

export function SpiritFriendshipTrees({ locale, spirit }: { locale: string; spirit: Spirit }) {
	const { t } = useTranslation();

	const friendshipTrees = friendshipTreeVariants(spirit).map((variant) => ({
		variant,
		tree: friendshipTreeFor(spirit, variant)!,
	}));

	if (friendshipTrees.length > 1) {
		return (
			<FriendshipTreeCarousel
				accessibleLabel={t("spirits.friendship-trees", { ns: "features" })}
				key={spirit.id}
			>
				{friendshipTrees.map(({ variant, tree }) => (
					<div className={TREE_COLUMN_CLASS} key={variant}>
						<FriendshipTree
							label={t(`spirits.friendship-tree-${variant}`, { ns: "features" })}
							locale={locale}
							readOnly
							spirit={spirit}
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
					label={t(`spirits.friendship-tree-${friendshipTree.variant}`, { ns: "features" })}
					locale={locale}
					readOnly
					spirit={spirit}
					tree={friendshipTree.tree}
				/>
			</div>
		);
	}

	return (
		<p className="text-base text-gray-600 dark:text-gray-400">
			{t(`catalogue.spirit-kind-no-friendship-tree.${spirit.kind}`, { ns: "features" })}
		</p>
	);
}
