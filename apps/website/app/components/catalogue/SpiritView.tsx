import {
	type ElderSpirit,
	friendshipTreeToItems,
	type GuideSpirit,
	type SeasonalSpirit,
	type StandardSpirit,
} from "@thatskyapplication/utility";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	NOTE_CLASS,
	realmAnchor,
	resolveSpiritTree,
	spiritItemsGroup,
	VIEW_LINK_CLASS,
} from "~/utility/catalogue.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EverythingButton } from "./EverythingButton";
import { FriendshipTree } from "./FriendshipTree";
import { RemainingCostList } from "./RemainingCostList";

export function SpiritView({
	data,
	locale,
	showEverythingButton,
	spirit,
}: {
	data: ReadonlySet<number>;
	locale: string;
	showEverythingButton: boolean;
	spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit;
}) {
	const { t } = useTranslation();
	const isStandardSpirit = spirit.isStandardSpirit();
	const isElderSpirit = spirit.isElderSpirit();
	const isSeasonalSpirit = spirit.isSeasonalSpirit();
	const isGuideSpirit = spirit.isGuideSpirit();
	const friendshipTree = resolveSpiritTree(spirit);
	const items = friendshipTree.length > 0 ? friendshipTreeToItems(friendshipTree) : [];
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

	const group = spiritItemsGroup(spirit);
	const groupSpirits = group ? [...group.values()] : null;
	const index = groupSpirits?.findIndex(({ id }) => id === spirit.id) ?? -1;
	const before = groupSpirits && index > 0 ? groupSpirits[index - 1] : null;
	const after = groupSpirits && index !== -1 ? groupSpirits[index + 1] : null;

	return (
		<>
			<Breadcrumb current={spiritName} trail={trail} />

			<h1 className="my-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
				<a
					className="regular-link"
					href={t(`spirit-wiki.${spirit.id}`, { ns: "general" })}
					rel="noopener noreferrer"
					target="_blank"
				>
					{spiritName}
				</a>
			</h1>

			{isGuideSpirit && spirit.inProgress && (
				<p className={NOTE_CLASS}>{t("catalogue.spirit-not-fully-revealed", { ns: "features" })}</p>
			)}

			{friendshipTree.length > 0 ? (
				<>
					<RemainingCostList data={data} items={items} locale={locale} />
					<FriendshipTree
						data={data}
						locale={locale}
						seasonId={isSeasonalSpirit || isGuideSpirit ? spirit.seasonId : undefined}
						tree={friendshipTree}
					/>
				</>
			) : (
				<p className="m-0 text-base text-gray-600 dark:text-gray-400">
					{t("catalogue.spirit-no-friendship-tree", { ns: "features" })}
				</p>
			)}

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
