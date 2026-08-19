import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	type CalendarEntry,
	CalendarEntryKindToSwatchClassName,
	calendarPath,
	type CalendarViews,
} from "~/utility/calendar";

function SummarySection({
	className,
	entries,
	heading,
	skyTime,
	timestampKey,
	view,
}: {
	className?: string;
	entries: readonly CalendarEntry[];
	heading: string;
	skyTime: boolean;
	timestampKey: "schedule.overview-ends-timestamp" | "schedule.overview-next-timestamp";
	view: CalendarViews;
}) {
	const { t } = useTranslation();

	return (
		<section className={className}>
			<h2 className="mt-0 mb-1 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
				{heading}
			</h2>
			{entries.length > 0 ? (
				<ul className="m-0 -mx-2 list-none p-0">
					{entries.map((entry) => (
						<li key={entry.key}>
							<Link
								className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
								preventScrollReset
								to={calendarPath({ view, skyTime, date: entry.firstDate, day: entry.firstDate })}
							>
								<span
									className={clsx(
										"h-2.5 w-2.5 shrink-0 rounded-full",
										CalendarEntryKindToSwatchClassName[entry.kind],
									)}
								/>
								{entry.iconURLs.map((iconURL) => (
									<span
										aria-hidden="true"
										className="discord-emoji h-4 w-4"
										key={iconURL}
										style={{ backgroundImage: `url(${iconURL})` }}
									/>
								))}
								<span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
									{entry.label}
								</span>
								<span className="ms-auto shrink-0 text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
									{t(timestampKey, {
										ns: "features",
										timestamp:
											timestampKey === "schedule.overview-ends-timestamp"
												? entry.endLabel
												: entry.startLabel,
									})}
								</span>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<p className="m-0 text-sm text-gray-500 dark:text-gray-400">
					{t("calendar.nothing-scheduled", { ns: "features" })}
				</p>
			)}
		</section>
	);
}

export function CalendarSummary({
	active,
	skyTime,
	upcoming,
	view,
}: {
	active: readonly CalendarEntry[];
	skyTime: boolean;
	upcoming: readonly CalendarEntry[];
	view: CalendarViews;
}) {
	const { t } = useTranslation();

	return (
		<div className="grid gap-x-6 gap-y-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-xl md:grid-cols-2 dark:border-gray-700 dark:bg-gray-900">
			<SummarySection
				entries={active}
				heading={t("schedule.overview-active", { ns: "features" })}
				skyTime={skyTime}
				timestampKey="schedule.overview-ends-timestamp"
				view={view}
			/>
			<SummarySection
				className="border-t border-gray-200 pt-4 md:border-s md:border-t-0 md:ps-6 md:pt-0 dark:border-gray-700"
				entries={upcoming}
				heading={t("schedule.overview-upcoming", { ns: "features" })}
				skyTime={skyTime}
				timestampKey="schedule.overview-next-timestamp"
				view={view}
			/>
		</div>
	);
}
