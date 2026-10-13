import { Popover } from "@base-ui/react/popover";
import { clsx } from "clsx";
import type { TFunction } from "i18next";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import {
	CatalogueCollectionToLocaleKey,
	type CatalogueSearchTargetWithoutEventFamily,
	CatalogueSearchType,
	type Emoji,
	spiritOriginTranslationKey,
} from "@thatskyapplication/utility";
import { CatalogueSearchAutocomplete } from "~/components/catalogue/CatalogueSearchAutocomplete.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { SitePage } from "~/components/PageLayout";
import { Tooltip } from "~/components/Tooltip";
import { catalogueTargetQuery } from "~/utility/catalogue.js";
import {
	COSMETIC_ANCHOR_PREFIX,
	COSMETIC_CATALOGUE,
	COSMETIC_GROUP_TARGETS,
	COSMETICS_GROUPS,
	COSMETICS_SECTIONS,
	cosmeticAnchor,
} from "~/utility/cosmetics.js";
import { EventIdToEventTicketEmoji, SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { PAGE_TITLE_CLASS } from "~/utility/styles.js";

const cosmeticPopover = Popover.createHandle<Emoji>();

interface CosmeticSearchEntry {
	readonly emoji: Emoji;
	readonly keywords: readonly string[];
	readonly name: string;
	readonly section: string;
}

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

function CosmeticDetails({ emoji }: { emoji: Emoji }) {
	const { t } = useTranslation();
	const entry = COSMETIC_CATALOGUE.get(emoji.id);
	const sources = entry?.sources.map((source) => catalogueLocation(source, t)) ?? [];
	const reserveEmojiSpace = sources.some((source) => source.emoji);

	return (
		<>
			{entry?.nameKeys && (
				<Popover.Title className="px-2 pt-1 text-base font-semibold text-gray-900 dark:text-gray-100">
					{t(entry.nameKeys, { ns: "general" })}
				</Popover.Title>
			)}
			<h3 className="mt-1 px-2 text-xs font-medium text-gray-500 dark:text-gray-400">
				{t("cosmetics.source", { ns: "features", count: sources.length })}
			</h3>
			{sources.length === 0 ? (
				<p className="px-2 py-1.5 text-sm text-gray-600 dark:text-gray-400">
					{t("cosmetics.no-source", { ns: "features" })}
				</p>
			) : (
				<ul className="flex flex-col">
					{sources.map(({ detail, emoji: sourceEmoji, name, query }) => (
						<li key={query}>
							<Link
								className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
								to={`/me/catalogue${query}`}
							>
								{sourceEmoji ? (
									<EmojiIcon className="size-5 shrink-0" emoji={sourceEmoji} />
								) : (
									reserveEmojiSpace && <span aria-hidden="true" className="size-5 shrink-0" />
								)}
								<span className="flex min-w-0 flex-col">
									<span className="truncate text-sm text-gray-900 dark:text-gray-100">{name}</span>
									{detail && (
										<span className="truncate text-xs text-gray-600 dark:text-gray-300">
											{detail}
										</span>
									)}
								</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
}

function CosmeticSearch() {
	const { t } = useTranslation();

	const getEntries = useCallback(() => {
		const entries: CosmeticSearchEntry[] = [];

		for (const section of COSMETICS_SECTIONS) {
			const sectionName = t(section.heading, { ns: "features" });

			for (const emoji of section.emojis) {
				const entry = COSMETIC_CATALOGUE.get(emoji.id);
				const sourceNames = entry?.sources.map((source) => catalogueLocation(source, t).name) ?? [];
				const name = entry?.nameKeys ? t(entry.nameKeys, { ns: "general" }) : sourceNames[0];

				if (name) {
					entries.push({
						emoji,
						keywords: [...sourceNames, sectionName],
						name,
						section: sectionName,
					});
				}
			}
		}

		return entries;
	}, [t]);

	return (
		<CatalogueSearchAutocomplete
			getEntries={getEntries}
			placeholder={t("cosmetics.search-placeholder", { ns: "features" })}
			resolveResult={({ emoji, section }) => ({
				detail: section,
				emoji,
				replace: true,
				to: `#${cosmeticAnchor(emoji.id)}`,
			})}
		/>
	);
}

function CosmeticTile({ emoji }: { emoji: Emoji }) {
	const { t } = useTranslation();
	const nameKeys = COSMETIC_CATALOGUE.get(emoji.id)?.nameKeys;
	const name = nameKeys ? t(nameKeys, { ns: "general" }) : null;

	const trigger = (
		<Popover.Trigger
			aria-label={name ?? emoji.name}
			className="flex size-11 cursor-pointer items-center justify-center rounded-lg bg-black/70 transition-colors hover:bg-black/55 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none data-popup-open:bg-black/55 data-popup-open:ring-2 data-popup-open:ring-blue-500 dark:bg-black/30 dark:hover:bg-black/50 dark:focus-visible:ring-blue-300 dark:data-popup-open:bg-black/50 dark:data-popup-open:ring-blue-300"
			handle={cosmeticPopover}
			id={cosmeticAnchor(emoji.id)}
			payload={emoji}
		>
			<EmojiIcon className="size-8" emoji={emoji} />
		</Popover.Trigger>
	);

	return name ? <Tooltip content={name}>{trigger}</Tooltip> : trigger;
}

type CosmeticSection = (typeof COSMETICS_SECTIONS)[number];

function CosmeticSectionLabel({ section }: { section: CosmeticSection }) {
	const { t } = useTranslation();

	return (
		<>
			<EmojiIcon
				className="size-8"
				emoji={section.icon}
				label={t(section.heading, { ns: "features" })}
			/>
			<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
				{section.emojis.length}
			</span>
		</>
	);
}

function CosmeticGroup({
	activeTable,
	onSelect,
	sections,
}: {
	activeTable: string;
	onSelect: (table: string) => void;
	sections: readonly CosmeticSection[];
}) {
	const tabbed = sections.length > 1;

	return (
		<div>
			{tabbed && (
				<div className="mb-2 flex justify-center gap-1 lg:hidden">
					{sections.map((section) => (
						<button
							aria-pressed={section.table === activeTable}
							className={clsx(
								"flex cursor-pointer items-center gap-1.5 border-b-2 px-3 pb-1 transition-opacity",
								section.table === activeTable
									? "border-gray-500 dark:border-gray-300"
									: "border-transparent opacity-50 hover:opacity-80",
							)}
							key={section.table}
							onClick={() => onSelect(section.table)}
							type="button"
						>
							<CosmeticSectionLabel section={section} />
						</button>
					))}
				</div>
			)}
			{sections.map((section) => (
				<section
					className={clsx(
						"mx-auto mb-6 max-w-[26.75rem] break-inside-avoid",
						tabbed && section.table !== activeTable && "max-lg:hidden",
					)}
					key={section.table}
				>
					<h2 className={clsx("mb-2 flex justify-center", tabbed && "max-lg:hidden")}>
						<span className="flex items-center gap-1.5 border-b-2 border-gray-500 px-3 pb-1 dark:border-gray-300">
							<CosmeticSectionLabel section={section} />
						</span>
					</h2>
					<ul className="flex flex-wrap justify-center gap-1">
						{section.emojis.map((emoji) => (
							<li key={emoji.id}>
								<CosmeticTile emoji={emoji} />
							</li>
						))}
					</ul>
				</section>
			))}
		</div>
	);
}

export default function Cosmetics() {
	const { t } = useTranslation();
	const location = useLocation();

	const [selections, setSelections] = useState<
		readonly ({ readonly locationKey: string; readonly table: string } | null)[]
	>(() => COSMETICS_GROUPS.map(() => null));

	const anchor = location.hash.slice(1);

	const anchorTarget = anchor.startsWith(COSMETIC_ANCHOR_PREFIX)
		? COSMETIC_GROUP_TARGETS.get(anchor.slice(COSMETIC_ANCHOR_PREFIX.length))
		: undefined;

	const activeTables = COSMETICS_GROUPS.map((sections, groupIndex) => {
		const selection = selections[groupIndex];

		if (anchorTarget?.groupIndex === groupIndex && selection?.locationKey !== location.key) {
			return anchorTarget.table;
		}

		return selection?.table ?? sections[0]!.table;
	});

	useEffect(() => {
		const tile = anchorTarget ? document.getElementById(anchor) : null;

		if (tile) {
			tile.scrollIntoView({ block: "center" });
			cosmeticPopover.open(anchor);
		}
	}, [anchor, anchorTarget, location.key]);

	return (
		<SitePage>
			<div className="space-y-4">
				<h1 className={clsx(PAGE_TITLE_CLASS, "mb-6")}>
					{t("cosmetics.title", { ns: "features" })}
				</h1>
				<hr />
				<div className="max-w-xl">
					<CosmeticSearch />
				</div>

				<div className="columns-[26.75rem] gap-8">
					{COSMETICS_GROUPS.map((sections, groupIndex) => (
						<CosmeticGroup
							activeTable={activeTables[groupIndex]!}
							key={sections[0]!.table}
							onSelect={(table) =>
								setSelections((previous) =>
									previous.with(groupIndex, { locationKey: location.key, table }),
								)
							}
							sections={sections}
						/>
					))}
				</div>
			</div>

			<Popover.Root handle={cosmeticPopover}>
				{({ payload }) => (
					<Popover.Portal>
						<Popover.Positioner
							align="center"
							className="z-50"
							collisionPadding={8}
							side="bottom"
							sideOffset={6}
						>
							<Popover.Popup
								className="max-h-(--available-height) w-72 max-w-[calc(100vw-1rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900"
								initialFocus={false}
							>
								{payload && <CosmeticDetails emoji={payload} />}
							</Popover.Popup>
						</Popover.Positioner>
					</Popover.Portal>
				)}
			</Popover.Root>
		</SitePage>
	);
}
