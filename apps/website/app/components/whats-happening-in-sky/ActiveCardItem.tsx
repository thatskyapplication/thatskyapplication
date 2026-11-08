import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CostList } from "~/components/catalogue/CostList.js";
import type { CosmeticTileSelect } from "~/components/cosmetics/CosmeticTile.js";
import { OfferTiles } from "~/components/cosmetics/OfferTiles.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { ExternalLink } from "~/components/ExternalLink";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { SkeletonText } from "~/components/SkeletonText";
import { NOTE_CLASS, VIEW_LINK_CLASS } from "~/utility/styles.js";
import {
	type ActiveCard,
	type CardEarn,
	type Offer,
	WHATS_HAPPENING_IN_SKY_CARD_CLASS,
} from "~/utility/whats-happening-in-sky.js";
import { ChecklistToggle } from "./ChecklistToggle.js";
import { SpiritOffers, SpiritTrees } from "./SpiritOffers.js";

function CardHeader({
	card: { dayOf, daysLeft, emoji, ends, endUnconfirmed, label, offer, spiritLinks },
	locale,
	timeZoneEstimated,
}: {
	card: ActiveCard;
	locale: string;
	timeZoneEstimated: boolean;
}) {
	const { t } = useTranslation();

	return (
		<div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-2 gap-y-0.5 sm:gap-x-3">
			{emoji && (
				<span className="row-span-2 flex size-10 items-center justify-center rounded-lg bg-black/70">
					<EmojiIcon className="size-7" emoji={emoji} />
				</span>
			)}
			<h2 className="col-start-2 min-w-0 text-base font-semibold text-gray-900 dark:text-gray-100">
				{label}
			</h2>
			{!endUnconfirmed && (
				<div className="col-start-3 row-span-2 flex flex-col items-center rounded-lg bg-gray-100 px-2 py-1 leading-4 whitespace-nowrap text-gray-800 dark:bg-gray-800 dark:text-gray-200">
					<span className="text-[0.6875rem] font-medium opacity-75">{dayOf}</span>
					<span className="text-xs font-semibold">{daysLeft}</span>
				</div>
			)}
			{spiritLinks && (
				<p className="col-start-2 min-w-0 text-sm text-gray-600 dark:text-gray-300">
					<ExternalLinkList items={spiritLinks} locale={locale} />
				</p>
			)}
			<p className={clsx(NOTE_CLASS, "col-start-2 min-w-0", spiritLinks && "col-span-2")}>
				{endUnconfirmed ? (
					t("end-unconfirmed", { ns: "general" })
				) : timeZoneEstimated ? (
					<SkeletonText>{ends}</SkeletonText>
				) : (
					ends
				)}
			</p>
			{offer && offer.total.length > 0 && (
				<span className="col-span-2 col-start-2 flex min-w-0 items-center text-sm text-gray-900 dark:text-gray-100">
					<CostList costs={offer.total} locale={locale} />
				</span>
			)}
		</div>
	);
}

function CardOffer({
	earn,
	locale,
	offer: { flat, ownedLabel, remaining, spirits, trees },
	onSelectTile,
}: {
	earn: CardEarn | undefined;
	locale: string;
	offer: Offer;
	onSelectTile: CosmeticTileSelect;
}) {
	const { t } = useTranslation();

	return (
		<>
			{flat.length > 0 && <OfferTiles locale={locale} onSelect={onSelectTile} tiles={flat} />}
			{trees.length > 0 && <SpiritTrees locale={locale} onSelect={onSelectTile} trees={trees} />}
			{spirits.length > 0 && (
				<SpiritOffers locale={locale} offers={spirits} onSelect={onSelectTile} />
			)}
			<div className="flex flex-col gap-1 text-sm text-gray-600 empty:hidden dark:text-gray-400">
				{ownedLabel && <span>{ownedLabel}</span>}
				{earn && (
					<span className="flex flex-wrap items-center gap-x-2">
						{t("whats-happening-in-sky.still-to-earn", { ns: "features" })}
						<span className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
							{earn.emoji && <EmojiIcon emoji={earn.emoji} />}
							{earn.text}
						</span>
					</span>
				)}
				{remaining && remaining.length > 0 && (
					<span className="flex flex-wrap items-center gap-x-2">
						{t("whats-happening-in-sky.remaining", { ns: "features" })}
						<span className="flex items-center text-gray-900 dark:text-gray-100">
							<CostList costs={remaining} locale={locale} />
						</span>
					</span>
				)}
			</div>
		</>
	);
}

function CardLinks({ card: { catalogueURL, pageURL, wikiURL } }: { card: ActiveCard }) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-wrap items-center gap-2">
			{pageURL && (
				<Link className={VIEW_LINK_CLASS} to={pageURL}>
					{t("view", { ns: "general" })}
				</Link>
			)}
			{catalogueURL && (
				<Link className={VIEW_LINK_CLASS} to={catalogueURL}>
					{t("catalogue.main-title", { ns: "features" })}
				</Link>
			)}
			{wikiURL && (
				<ExternalLink
					className={clsx(VIEW_LINK_CLASS, "inline-flex items-center gap-1")}
					href={wikiURL}
					icon
					iconClassName="h-3 w-3"
				>
					{t("wiki", { ns: "general" })}
				</ExternalLink>
			)}
		</div>
	);
}

export function ActiveCardItem({
	card,
	locale,
	onSelectTile,
	timeZoneEstimated,
}: {
	card: ActiveCard;
	locale: string;
	onSelectTile: CosmeticTileSelect;
	timeZoneEstimated: boolean;
}) {
	return (
		<article
			className={clsx(WHATS_HAPPENING_IN_SKY_CARD_CLASS, "min-w-0", card.wide && "md:col-span-2")}
		>
			<CardHeader card={card} locale={locale} timeZoneEstimated={timeZoneEstimated} />
			{card.dyes && (
				<div className="flex items-center gap-1.5">
					{card.dyes.map((dye) => (
						<EmojiIcon
							className="size-6"
							emoji={dye}
							key={dye.id}
							label={dye.name.replace("_", " ")}
						/>
					))}
				</div>
			)}
			{card.offer && (
				<CardOffer
					earn={card.earn}
					locale={locale}
					offer={card.offer}
					onSelectTile={onSelectTile}
				/>
			)}
			{card.notes?.map(({ emoji, key, label, relative, when }) => (
				<div
					className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm dark:border-amber-800 dark:bg-amber-950/40"
					key={key}
				>
					<span className="flex items-center gap-2 font-medium text-amber-900 dark:text-amber-100">
						<EmojiIcon className="size-5" emoji={emoji} />
						{label}
					</span>
					<span className="flex flex-wrap items-center gap-x-3 text-xs text-amber-800 dark:text-amber-200">
						<span className="font-semibold">{relative}</span>
						{timeZoneEstimated ? <SkeletonText>{when}</SkeletonText> : when}
					</span>
				</div>
			))}
			{card.toggle && <ChecklistToggle toggle={card.toggle} />}
			{(card.pageURL || card.catalogueURL || card.wikiURL) && <CardLinks card={card} />}
		</article>
	);
}
