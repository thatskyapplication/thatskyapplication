import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	friendshipTreeFor,
	friendshipTreeToItems,
	friendshipTreeVariants,
	KINGDOM,
	type Spirit,
} from "@thatskyapplication/utility";
import { ExternalLink } from "~/components/ExternalLink";
import { realmAnchor, TREE_COLUMN_CLASS } from "~/utility/catalogue.js";
import { NOTE_CLASS, VIEW_LINK_CLASS } from "~/utility/styles.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EverythingButton } from "./EverythingButton";
import { FriendshipTree } from "./FriendshipTree";
import { FriendshipTreeCarousel } from "./FriendshipTreeCarousel";

export function SpiritView({
	data,
	locale,
	showEverythingButton,
	spirit,
}: {
	data: ReadonlySet<number>;
	locale: string;
	showEverythingButton: boolean;
	spirit: Spirit;
}) {
	const { t } = useTranslation();
	const isStandardSpirit = spirit.isStandardSpirit();
	const isElderSpirit = spirit.isElderSpirit();
	const isSeasonalSpirit = spirit.isSeasonalSpirit();
	const isGuideSpirit = spirit.isGuideSpirit();
	const seasonId = isSeasonalSpirit || isGuideSpirit ? spirit.seasonId : undefined;

	const friendshipTrees = friendshipTreeVariants(spirit).map((variant) => ({
		variant,
		tree: friendshipTreeFor(spirit, variant)!,
	}));

	const items = friendshipTrees.flatMap(({ tree }) => friendshipTreeToItems(tree));
	const spiritName = t(`spirits.${spirit.id}`, { ns: "general" });

	const trail = [{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }];

	if (isStandardSpirit) {
		trail.push(
			{ label: t("catalogue.standard-spirits", { ns: "features" }), to: "?view=realms" },
			{
				label: t(`realms.${spirit.realm}`, { ns: "general" }),
				to: `?view=realms#${realmAnchor(spirit.realm)}`,
			},
		);
	} else if (isElderSpirit) {
		trail.push({ label: t("catalogue.elders", { ns: "features" }), to: "?view=elders" });
	} else {
		trail.push(
			{ label: t("season-plural", { ns: "general" }), to: "?view=seasons" },
			{
				label: t(`seasons.${spirit.seasonId}`, { ns: "general" }),
				to: `?view=season&season=${spirit.seasonId}`,
			},
		);
	}

	const { previous: before, next: after } = KINGDOM.adjacentSpirits(spirit.id);
	const [onlyFriendshipTree] = friendshipTrees;
	let friendshipTreeContent: ReactNode;

	if (friendshipTrees.length > 1) {
		friendshipTreeContent = (
			<FriendshipTreeCarousel
				accessibleLabel={t("spirits.friendship-trees", { ns: "features" })}
				key={spirit.id}
			>
				{friendshipTrees.map(({ variant, tree }) => (
					<div className={TREE_COLUMN_CLASS} key={variant}>
						<FriendshipTree
							data={data}
							label={t(`spirits.friendship-tree-${variant}`, { ns: "features" })}
							locale={locale}
							seasonId={seasonId}
							tree={tree}
						/>
					</div>
				))}
			</FriendshipTreeCarousel>
		);
	} else if (onlyFriendshipTree) {
		friendshipTreeContent = (
			<FriendshipTree
				data={data}
				locale={locale}
				seasonId={seasonId}
				tree={onlyFriendshipTree.tree}
			/>
		);
	} else {
		friendshipTreeContent = (
			<p className="text-base text-gray-600 dark:text-gray-400">
				{t(`catalogue.spirit-kind-no-friendship-tree.${spirit.kind}`, { ns: "features" })}
			</p>
		);
	}

	return (
		<>
			<Breadcrumb current={spiritName} trail={trail} />

			<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
				<ExternalLink href={t(`spirit-wiki.${spirit.id}`, { ns: "general" })} icon>
					{spiritName}
				</ExternalLink>
			</h1>

			{isGuideSpirit && spirit.friendshipTrees.seasonal.inProgress && (
				<p className={NOTE_CLASS}>
					{t(`catalogue.spirit-kind-not-fully-revealed.${spirit.kind}`, { ns: "features" })}
				</p>
			)}

			{friendshipTreeContent}

			<div className="flex flex-wrap items-center gap-2">
				{before && (
					<Link className={VIEW_LINK_CLASS} to={`?view=spirit&spirit=${before.id}`}>
						← {t("catalogue.spirit-previous-spirit", { ns: "features" })}
					</Link>
				)}
				{after && (
					<Link className={VIEW_LINK_CLASS} to={`?view=spirit&spirit=${after.id}`}>
						{t("catalogue.spirit-next-spirit", { ns: "features" })} →
					</Link>
				)}
			</div>

			{showEverythingButton && (
				<EverythingButton data={data} items={items} scope={`spirit:${spirit.id}`} />
			)}

			<BackButton to={trail.at(-1)!.to} />
		</>
	);
}
