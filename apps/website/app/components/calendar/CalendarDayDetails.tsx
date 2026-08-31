import { clsx } from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	CalendarEntryIcons,
	CalendarEntryLinks,
	CalendarTimeChips,
} from "~/components/calendar/CalendarEntryDetails";
import { EmojiImage } from "~/components/EmojiIcon";
import { ExternalLink } from "~/components/ExternalLink";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { InfographicPreview, type SelectedInfographic } from "~/components/InfographicPreview";
import { SkeletonText } from "~/components/SkeletonText.js";
import {
	type CalendarDayOccurrence,
	type CalendarEntry,
	CalendarEntryKindPresentations,
} from "~/utility/calendar";

const ENTRY_LINK_CLASS = "underline underline-offset-2 hover:no-underline" as const;

type CalendarDayInfographic = SelectedInfographic & { title: string };

function AllDayEntry({
	entry,
	locale,
	zoneEstimated,
}: {
	entry: CalendarEntry;
	locale: string;
	zoneEstimated: boolean;
}) {
	const { t } = useTranslation();
	const presentation = CalendarEntryKindPresentations[entry.kind];
	const kindLabel = t(presentation.labelKey);

	return (
		<li className={clsx("rounded-lg px-3 py-2", presentation.bar)}>
			<div className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
				<CalendarEntryIcons emojiIds={entry.iconEmojiIds} />
				{entry.label}
				{kindLabel !== entry.label && (
					<span className="text-xs font-normal opacity-75">{kindLabel}</span>
				)}
			</div>
			<p className="m-0 mt-0.5 text-xs opacity-90">
				{zoneEstimated ? <SkeletonText>{entry.range}</SkeletonText> : entry.range}
			</p>
			{entry.spiritLinks && (
				<p className="m-0 mt-1 text-xs">
					<ExternalLinkList
						className={ENTRY_LINK_CLASS}
						items={entry.spiritLinks}
						locale={locale}
					/>
				</p>
			)}
			<CalendarEntryLinks
				className="mt-1.5 flex flex-wrap items-center gap-3 text-xs font-medium"
				entry={entry}
				iconClassName="h-3 w-3"
				linkClassName={ENTRY_LINK_CLASS}
			/>
		</li>
	);
}

function DayOccurrence({
	occurrence,
	zoneEstimated,
	onPreview,
}: {
	occurrence: CalendarDayOccurrence;
	zoneEstimated: boolean;
	onPreview: (infographic: CalendarDayInfographic) => void;
}) {
	const { t } = useTranslation();
	const { acknowledgement, detail, infographicURL } = occurrence;

	return (
		<li className="border-t border-gray-100 py-2 first:border-t-0 dark:border-gray-800">
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 flex-wrap items-center gap-2">
					{occurrence.iconURL && <EmojiImage url={occurrence.iconURL} />}
					<span className="text-sm font-medium text-gray-900 dark:text-gray-100">
						{occurrence.label}
					</span>
					{detail &&
						(infographicURL ? (
							<button
								className="regular-link text-xs"
								onClick={() =>
									onPreview({ acknowledgement, imageURL: infographicURL, title: detail })
								}
								type="button"
							>
								{detail}
							</button>
						) : (
							<span className="text-xs text-gray-500 dark:text-gray-400">{detail}</span>
						))}
					{occurrence.pageURL && (
						<Link className="regular-link text-xs" to={occurrence.pageURL}>
							{t("view", { ns: "general" })}
						</Link>
					)}
					{occurrence.catalogueURL && (
						<Link className="regular-link text-xs" to={occurrence.catalogueURL}>
							{t("catalogue.main-title", { ns: "features" })}
						</Link>
					)}
				</div>
				<div className="flex shrink-0 items-center gap-2">
					{occurrence.light && (
						<span className="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900 dark:text-amber-300">
							{t("light", { ns: "general" })}
						</span>
					)}
					{occurrence.wikiURL && (
						<ExternalLink
							className="regular-link inline-flex items-center gap-1 text-xs"
							href={occurrence.wikiURL}
							icon
							iconClassName="h-3 w-3"
						>
							{t("wiki", { ns: "general" })}
						</ExternalLink>
					)}
				</div>
			</div>
			{occurrence.cadence && (
				<p className="m-0 mt-1 text-xs text-gray-500 dark:text-gray-400">{occurrence.cadence}</p>
			)}
			<div className="mt-1 flex flex-wrap gap-1">
				<CalendarTimeChips estimated={zoneEstimated} times={occurrence.times} />
			</div>
		</li>
	);
}

export function CalendarDayDetails({
	allDay,
	locale,
	occurrences,
	zoneEstimated,
}: {
	allDay: readonly CalendarEntry[];
	locale: string;
	occurrences: readonly CalendarDayOccurrence[];
	zoneEstimated: boolean;
}) {
	const { t } = useTranslation();
	const [selectedInfographic, setSelectedInfographic] = useState<CalendarDayInfographic | null>(
		null,
	);

	return (
		<>
			{allDay.length > 0 && (
				<section>
					<h3 className="m-0 mb-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
						{t("calendar.all-day", { ns: "features" })}
					</h3>
					<ul className="m-0 flex list-none flex-col gap-2 p-0">
						{allDay.map((entry) => (
							<AllDayEntry
								entry={entry}
								key={entry.key}
								locale={locale}
								zoneEstimated={zoneEstimated}
							/>
						))}
					</ul>
				</section>
			)}
			{occurrences.length > 0 && (
				<section className={clsx(allDay.length > 0 && "mt-4")}>
					<h3 className="m-0 mb-1 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
						{t("calendar.during-the-day", { ns: "features" })}
					</h3>
					<ul className="m-0 list-none p-0">
						{occurrences.map((occurrence) => (
							<DayOccurrence
								key={occurrence.key}
								occurrence={occurrence}
								onPreview={setSelectedInfographic}
								zoneEstimated={zoneEstimated}
							/>
						))}
					</ul>
				</section>
			)}
			{allDay.length === 0 && occurrences.length === 0 && (
				<p className="m-0 text-sm text-gray-500 dark:text-gray-400">
					{t("calendar.nothing-scheduled", { ns: "features" })}
				</p>
			)}
			{selectedInfographic && (
				<InfographicPreview
					acknowledgement={selectedInfographic.acknowledgement}
					imageURL={selectedInfographic.imageURL}
					onClose={() => setSelectedInfographic(null)}
					title={selectedInfographic.title}
				/>
			)}
		</>
	);
}
