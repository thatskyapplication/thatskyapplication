import { Dialog } from "@base-ui/react/dialog";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight, ExternalLinkIcon, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import {
	CalendarEntryIcons,
	CalendarEntryLinks,
	CalendarTimeChips,
} from "~/components/calendar/CalendarEntryDetails";
import { EmojiImage } from "~/components/EmojiIcon";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { InfographicPreview, type SelectedInfographic } from "~/components/InfographicPreview";
import {
	type CalendarDayDetail,
	type CalendarDayOccurrence,
	type CalendarEntry,
	CalendarEntryKindPresentations,
	calendarPath,
	type CalendarViews,
} from "~/utility/calendar";

const ENTRY_LINK_CLASS = "underline underline-offset-2 hover:no-underline" as const;

const DIALOG_ICON_BUTTON_CLASS =
	"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" as const;

function AllDayEntry({ entry, locale }: { entry: CalendarEntry; locale: string }) {
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
			<p className="m-0 mt-0.5 text-xs opacity-90">{entry.range}</p>
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
	onPreview,
}: {
	occurrence: CalendarDayOccurrence;
	onPreview: (infographic: SelectedInfographic & { title: string }) => void;
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
						<a
							className="regular-link inline-flex items-center gap-1 text-xs"
							href={occurrence.wikiURL}
							rel="noopener noreferrer"
							target="_blank"
						>
							{t("wiki", { ns: "general" })}
							<ExternalLinkIcon className="h-3 w-3" />
						</a>
					)}
				</div>
			</div>
			{occurrence.cadence && (
				<p className="m-0 mt-1 text-xs text-gray-500 dark:text-gray-400">{occurrence.cadence}</p>
			)}
			<div className="mt-1 flex flex-wrap gap-1">
				<CalendarTimeChips times={occurrence.times} />
			</div>
		</li>
	);
}

export function CalendarDayDialog({
	allDay,
	anchorDate,
	detail,
	locale,
	skyTime,
	view,
}: {
	allDay: readonly CalendarEntry[];
	anchorDate: string;
	detail: CalendarDayDetail;
	locale: string;
	skyTime: boolean;
	view: CalendarViews;
}) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [selectedInfographic, setSelectedInfographic] = useState<
		(SelectedInfographic & { title: string }) | null
	>(null);

	const date = Temporal.PlainDate.from(detail.date);
	const previousDay = date.subtract({ days: 1 }).toString();
	const nextDay = date.add({ days: 1 }).toString();

	return (
		<>
			<Dialog.Root
				onOpenChange={(open) => {
					if (!open) {
						void navigate(calendarPath({ view, skyTime, date: anchorDate }), {
							preventScrollReset: true,
						});
					}
				}}
				open
			>
				<Dialog.Portal>
					<Dialog.Backdrop className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
					<Dialog.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[min(44rem,calc(100dvh-2rem))] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
						<div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
							<Dialog.Title className="my-0 text-lg font-semibold text-gray-900 dark:text-gray-100">
								{detail.heading}
							</Dialog.Title>
							<div className="flex shrink-0 items-center gap-1">
								<Link
									aria-label={t("calendar.previous-day", { ns: "features" })}
									className={DIALOG_ICON_BUTTON_CLASS}
									preventScrollReset
									to={calendarPath({ view, skyTime, date: previousDay, day: previousDay })}
								>
									<ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
								</Link>
								<Link
									aria-label={t("calendar.next-day", { ns: "features" })}
									className={DIALOG_ICON_BUTTON_CLASS}
									preventScrollReset
									to={calendarPath({ view, skyTime, date: nextDay, day: nextDay })}
								>
									<ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
								</Link>
								<Dialog.Close
									aria-label={t("close", { ns: "general" })}
									className={clsx(DIALOG_ICON_BUTTON_CLASS, "-me-1")}
								>
									<X aria-hidden="true" className="h-4 w-4" />
								</Dialog.Close>
							</div>
						</div>
						<div className="overflow-y-auto px-4 py-3">
							{allDay.length > 0 && (
								<section>
									<h3 className="m-0 mb-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
										{t("calendar.all-day", { ns: "features" })}
									</h3>
									<ul className="m-0 flex list-none flex-col gap-2 p-0">
										{allDay.map((entry) => (
											<AllDayEntry entry={entry} key={entry.key} locale={locale} />
										))}
									</ul>
								</section>
							)}
							{detail.occurrences.length > 0 && (
								<section className={clsx(allDay.length > 0 && "mt-4")}>
									<h3 className="m-0 mb-1 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
										{t("calendar.during-the-day", { ns: "features" })}
									</h3>
									<ul className="m-0 list-none p-0">
										{detail.occurrences.map((occurrence) => (
											<DayOccurrence
												key={occurrence.key}
												occurrence={occurrence}
												onPreview={setSelectedInfographic}
											/>
										))}
									</ul>
								</section>
							)}
							{allDay.length === 0 && detail.occurrences.length === 0 && (
								<p className="m-0 text-sm text-gray-500 dark:text-gray-400">
									{t("calendar.nothing-scheduled", { ns: "features" })}
								</p>
							)}
						</div>
					</Dialog.Popup>
				</Dialog.Portal>
			</Dialog.Root>
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
