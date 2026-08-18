import { clsx } from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CalendarEntryBar } from "~/components/calendar/CalendarEntryBar";
import {
	type CalendarEntry,
	calendarPath,
	type CalendarViews,
	CalendarView,
	type CalendarWeek,
	packCalendarWeek,
} from "~/utility/calendar";

const MONTH_LANE_HEIGHT = "1.375rem" as const;
const WEEK_LANE_HEIGHT = "1.875rem" as const;

function CalendarWeekRow({
	anchorDate,
	entries,
	locale,
	view,
	week,
}: {
	anchorDate: string;
	entries: readonly CalendarEntry[];
	locale: string;
	view: CalendarViews;
	week: CalendarWeek;
}) {
	const { t } = useTranslation();
	const isWeek = view === CalendarView.Week;
	const laneHeight = isWeek ? WEEK_LANE_HEIGHT : MONTH_LANE_HEIGHT;

	const { laneCount, segments } = useMemo(
		() => packCalendarWeek(week.days, entries),
		[week.days, entries],
	);

	return (
		<div
			className={clsx("grid grid-cols-7", isWeek ? "min-h-40" : "min-h-24")}
			style={{
				gridTemplateRows:
					laneCount > 0
						? `auto repeat(${laneCount}, ${laneHeight}) minmax(0.25rem, 1fr)`
						: "auto 1fr",
			}}
		>
			{week.days.map((day, index) =>
				day.exists ? (
					<Link
						aria-label={t("calendar.view-day", { ns: "features", date: day.fullLabel })}
						className={clsx(
							"border-s border-b border-gray-100 transition-colors first:border-s-0 hover:bg-sky-50 dark:border-gray-800 dark:hover:bg-sky-950/40",
							day.isToday
								? "bg-discord-button/10 ring-2 ring-discord-button ring-inset dark:bg-discord-button/20"
								: day.outsideFocus && "bg-gray-50 dark:bg-gray-950/40",
						)}
						key={day.date}
						preventScrollReset
						style={{ gridColumn: index + 1, gridRow: "1 / -1" }}
						to={calendarPath(view, anchorDate, day.date)}
					/>
				) : (
					<div
						className="border-s border-b border-gray-100 bg-gray-100 first:border-s-0 dark:border-gray-800 dark:bg-gray-950/70"
						key={day.date}
						style={{ gridColumn: index + 1, gridRow: "1 / -1" }}
					/>
				),
			)}
			{week.days.map((day, index) =>
				day.exists ? (
					<div
						className="pointer-events-none px-1 pt-1 pb-0.5 text-center"
						key={`${day.date}-label`}
						style={{ gridColumn: index + 1, gridRow: 1 }}
					>
						<span
							className={clsx(
								"inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-medium",
								day.isToday
									? "bg-discord-button text-white"
									: day.outsideFocus
										? "text-gray-400 dark:text-gray-600"
										: "text-gray-700 dark:text-gray-300",
							)}
						>
							{day.label}
						</span>
					</div>
				) : null,
			)}
			{segments.map((segment) => (
				<CalendarEntryBar key={segment.key} locale={locale} segment={segment} view={view} />
			))}
		</div>
	);
}

export function CalendarGrid({
	anchorDate,
	entries,
	locale,
	view,
	weekdayLabels,
	weeks,
}: {
	anchorDate: string;
	entries: readonly CalendarEntry[];
	locale: string;
	view: CalendarViews;
	weekdayLabels: readonly string[];
	weeks: readonly CalendarWeek[];
}) {
	return (
		<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
			<div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
				{weekdayLabels.map((weekdayLabel, index) => (
					<div
						className="truncate px-1 py-2 text-center text-xs font-semibold text-gray-500 uppercase dark:text-gray-400"
						key={`weekday-${index}`}
					>
						{weekdayLabel}
					</div>
				))}
			</div>
			{weeks.map((week) => (
				<CalendarWeekRow
					anchorDate={anchorDate}
					entries={entries}
					key={week.key}
					locale={locale}
					view={view}
					week={week}
				/>
			))}
		</div>
	);
}
