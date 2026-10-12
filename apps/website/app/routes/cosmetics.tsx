import { Popover } from "@base-ui/react/popover";
import { clsx } from "clsx";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	CatalogueCollectionToLocaleKey,
	type CatalogueSearchTargetWithoutEventFamily,
	CatalogueSearchType,
	type Emoji,
	spiritOriginTranslationKey,
} from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { SitePage } from "~/components/PageLayout";
import { catalogueTargetQuery } from "~/utility/catalogue.js";
import { COSMETICS_SECTIONS, cosmeticCatalogueTargets } from "~/utility/cosmetics.js";
import { EventIdToEventTicketEmoji, SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { PAGE_TITLE_CLASS, SECTION_HEADING_CLASS } from "~/utility/styles.js";

const catalogueLocationsPopover = Popover.createHandle<Emoji>();

function catalogueLocation(target: CatalogueSearchTargetWithoutEventFamily, t: TFunction) {
	const query = catalogueTargetQuery(target);

	switch (target.type) {
		case CatalogueSearchType.Season:
			return {
				query,
				emoji: SeasonIdToSeasonalEmoji[target.season.id],
				name: t(`seasons.${target.season.id}`, { ns: "general" }),
				detail: t("season", { ns: "general" }),
			};
		case CatalogueSearchType.Event:
			return {
				query,
				emoji: EventIdToEventTicketEmoji[target.event.id],
				name: t(target.event.name, { ns: "general" }),
				detail: String(target.event.start.year),
			};
		case CatalogueSearchType.Spirit: {
			const { spirit } = target;
			const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();

			return {
				query,
				emoji: seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null,
				name: t(`spirits.${spirit.id}`, { ns: "general" }),
				detail: t(spiritOriginTranslationKey(spirit), { ns: "general" }),
			};
		}
		case CatalogueSearchType.Collection:
			return {
				query,
				emoji: null,
				name: t(CatalogueCollectionToLocaleKey[target.collection]),
				detail: null,
			};
	}
}

function CatalogueLocations({ emoji }: { emoji: Emoji }) {
	const { t } = useTranslation();
	const locations = cosmeticCatalogueTargets(emoji).map((target) => catalogueLocation(target, t));

	if (locations.length === 0) {
		return (
			<p className="px-2 py-1.5 text-sm text-gray-600 dark:text-gray-400">
				{t("cosmetics.no-source", { ns: "features" })}
			</p>
		);
	}

	const reserveEmojiSpace = locations.some((location) => location.emoji);

	return (
		<ul className="flex flex-col">
			{locations.map(({ detail, emoji: locationEmoji, name, query }) => (
				<li key={query}>
					<Link
						className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
						to={`/me/catalogue${query}`}
					>
						{locationEmoji ? (
							<EmojiIcon className="size-5 shrink-0" emoji={locationEmoji} />
						) : (
							reserveEmojiSpace && <span aria-hidden="true" className="size-5 shrink-0" />
						)}
						<span className="flex min-w-0 flex-col">
							<span className="truncate text-sm text-gray-900 dark:text-gray-100">{name}</span>
							{detail && (
								<span className="truncate text-xs text-gray-600 dark:text-gray-300">{detail}</span>
							)}
						</span>
					</Link>
				</li>
			))}
		</ul>
	);
}

export default function Cosmetics() {
	const { t } = useTranslation();

	return (
		<SitePage>
			<div className="container mx-auto max-w-4xl space-y-4">
				<h1 className={clsx(PAGE_TITLE_CLASS, "mb-6")}>
					{t("cosmetics.title", { ns: "features" })}
				</h1>
				<hr />

				{COSMETICS_SECTIONS.map((section) => (
					<section className="flex flex-col gap-3" key={section.heading}>
						<h2 className={SECTION_HEADING_CLASS}>
							{t(section.heading, { ns: "features" })} ({section.emojis.length})
						</h2>
						<ul className="mx-auto flex max-w-[32.5rem] flex-wrap justify-center gap-2.5">
							{section.emojis.map((emoji) => (
								<li key={emoji.id}>
									<Popover.Trigger
										aria-label={emoji.name}
										className="flex size-12 cursor-pointer items-center justify-center rounded-xl bg-black/70 transition-colors hover:bg-black/55 data-popup-open:bg-black/55 dark:bg-black/30 dark:hover:bg-black/50 dark:data-popup-open:bg-black/50"
										handle={catalogueLocationsPopover}
										payload={emoji}
									>
										<EmojiIcon className="size-8" emoji={emoji} />
									</Popover.Trigger>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>

			<Popover.Root handle={catalogueLocationsPopover}>
				{({ payload }) => (
					<Popover.Portal>
						<Popover.Positioner
							align="center"
							className="z-50"
							collisionPadding={8}
							side="bottom"
							sideOffset={6}
						>
							<Popover.Popup className="max-h-(--available-height) w-72 max-w-[calc(100vw-1rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
								{payload && <CatalogueLocations emoji={payload} />}
							</Popover.Popup>
						</Popover.Positioner>
					</Popover.Portal>
				)}
			</Popover.Root>
		</SitePage>
	);
}
