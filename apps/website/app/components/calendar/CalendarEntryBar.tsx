import { Popover } from "@base-ui/react/popover";
import { clsx } from "clsx";
import { ExternalLinkIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { InfographicPreview } from "~/components/InfographicPreview";
import {
	CalendarEntryKindToBarClassName,
	CalendarEntryKindToSwatchClassName,
	CalendarEntryKindToLabelKey,
	type CalendarSegment,
	CalendarView,
	type CalendarViews,
} from "~/utility/calendar";

export function CalendarEntryBar({
	locale,
	segment,
	view,
}: {
	locale: string;
	segment: CalendarSegment;
	view: CalendarViews;
}) {
	const { t } = useTranslation();
	const [previewOpen, setPreviewOpen] = useState(false);
	const { entry } = segment;
	const kindLabel = t(CalendarEntryKindToLabelKey[entry.kind]);

	return (
		<>
			<Popover.Root>
				<Popover.Trigger
					className={clsx(
						"mb-0.5 flex min-w-0 items-center gap-1 rounded px-1 text-left font-medium transition hover:brightness-110",
						view === CalendarView.Week ? "py-0.5 text-xs sm:py-1 sm:text-sm" : "py-0.5 text-xs",
						CalendarEntryKindToBarClassName[entry.kind],
						segment.continuesBefore && "rounded-s-none",
						segment.continuesAfter && "rounded-e-none",
					)}
					style={{
						gridColumn: `${segment.startColumn} / span ${segment.columnSpan}`,
						gridRow: segment.lane + 2,
						marginInlineStart: `calc(${(segment.startInset / segment.columnSpan) * 100}% + 1px)`,
						marginInlineEnd: `calc(${(segment.endInset / segment.columnSpan) * 100}% + 1px)`,
					}}
				>
					{entry.iconURLs.map((iconURL) => (
						<span
							aria-hidden="true"
							className="discord-emoji h-3.5 w-3.5"
							key={iconURL}
							style={{ backgroundImage: `url(${iconURL})` }}
						/>
					))}
					<span className="min-w-0 truncate">{entry.label}</span>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Positioner align="center" collisionPadding={8} side="bottom" sideOffset={6}>
						<Popover.Popup className="z-50 w-72 max-w-[calc(100vw-1rem)] rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900">
							<div className="flex items-center gap-2">
								<span
									className={clsx(
										"h-2.5 w-2.5 shrink-0 rounded-full",
										CalendarEntryKindToSwatchClassName[entry.kind],
									)}
								/>
								<span className="text-xs font-medium text-gray-500 dark:text-gray-400">
									{kindLabel}
								</span>
							</div>
							<Popover.Title className="mt-1 mb-0 flex items-center gap-1.5 text-base font-semibold text-gray-900 dark:text-gray-100">
								{entry.iconURLs.map((iconURL) => (
									<span
										aria-hidden="true"
										className="discord-emoji h-4 w-4"
										key={iconURL}
										style={{ backgroundImage: `url(${iconURL})` }}
									/>
								))}
								{entry.label}
							</Popover.Title>
							{entry.detail &&
								(entry.infographicURL ? (
									<p className="m-0 mt-0.5 text-sm">
										<button
											className="regular-link"
											onClick={() => setPreviewOpen(true)}
											type="button"
										>
											{entry.detail}
										</button>
									</p>
								) : (
									<p className="m-0 mt-0.5 text-sm text-gray-600 dark:text-gray-400">
										{entry.detail}
									</p>
								))}
							<Popover.Description className="m-0 mt-1 text-sm text-gray-600 dark:text-gray-400">
								{entry.range}
							</Popover.Description>
							{entry.duration > 0 && (
								<p className="m-0 mt-0.5 text-xs text-gray-500 dark:text-gray-500">
									{t("calendar.duration", { ns: "features", count: entry.duration })}
								</p>
							)}
							{entry.times.length > 0 && (
								<div className="mt-2 flex flex-wrap gap-1">
									{entry.times.map((time) => (
										<span
											className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
											key={time}
										>
											{time}
										</span>
									))}
								</div>
							)}
							{entry.spiritLinks && (
								<p className="m-0 mt-2 text-sm text-gray-600 dark:text-gray-400">
									<ExternalLinkList items={entry.spiritLinks} locale={locale} />
								</p>
							)}
							<div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-medium">
								{entry.catalogueURL && (
									<Link className="regular-link" to={entry.catalogueURL}>
										{t("catalogue.main-title", { ns: "features" })}
									</Link>
								)}
								{entry.pageURL && (
									<Link className="regular-link" to={entry.pageURL}>
										{t("view", { ns: "general" })}
									</Link>
								)}
								{entry.marketingURL && (
									<a
										className="regular-link inline-flex items-center gap-1"
										href={entry.marketingURL}
										rel="noopener noreferrer"
										target="_blank"
									>
										{t("view", { ns: "general" })}
										<ExternalLinkIcon className="h-3.5 w-3.5" />
									</a>
								)}
								{entry.wikiURL && (
									<a
										className="regular-link inline-flex items-center gap-1"
										href={entry.wikiURL}
										rel="noopener noreferrer"
										target="_blank"
									>
										{t("wiki", { ns: "general" })}
										<ExternalLinkIcon className="h-3.5 w-3.5" />
									</a>
								)}
							</div>
						</Popover.Popup>
					</Popover.Positioner>
				</Popover.Portal>
			</Popover.Root>
			{previewOpen && entry.infographicURL && (
				<InfographicPreview
					acknowledgement={entry.acknowledgement}
					imageURL={entry.infographicURL}
					onClose={() => setPreviewOpen(false)}
					title={entry.detail ?? entry.label}
				/>
			)}
		</>
	);
}
