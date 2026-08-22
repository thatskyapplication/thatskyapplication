import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CalendarJump } from "~/components/calendar/CalendarJump";
import { CalendarSettings } from "~/components/calendar/CalendarSettings";
import { calendarPath, CalendarView, type CalendarViews } from "~/utility/calendar";

const NAVIGATION_BUTTON_CLASS =
	"inline-flex h-9 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" as const;

const PREVIOUS_LABEL_KEYS = {
	[CalendarView.Month]: "calendar.previous-month",
	[CalendarView.Week]: "calendar.previous-week",
	[CalendarView.Day]: "calendar.previous-day",
} as const satisfies Readonly<Record<CalendarViews, string>>;

const NEXT_LABEL_KEYS = {
	[CalendarView.Month]: "calendar.next-month",
	[CalendarView.Week]: "calendar.next-week",
	[CalendarView.Day]: "calendar.next-day",
} as const satisfies Readonly<Record<CalendarViews, string>>;

export function CalendarToolbar({
	anchorDate,
	dayDate,
	locale,
	nextDate,
	previousDate,
	skyTime,
	title,
	todayDate,
	view,
	weekStartsOn,
}: {
	anchorDate: string;
	dayDate: string;
	locale: string;
	nextDate: string | null;
	previousDate: string | null;
	skyTime: boolean;
	title: string;
	todayDate: string;
	view: CalendarViews;
	weekStartsOn: number;
}) {
	const { t } = useTranslation();
	const previousLabel = t(PREVIOUS_LABEL_KEYS[view], { ns: "features" });
	const nextLabel = t(NEXT_LABEL_KEYS[view], { ns: "features" });

	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<h1 className="my-0 text-xl sm:text-2xl lg:text-2xl">{title}</h1>
			<div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
				<div className="flex items-center gap-2">
					{previousDate === null ? (
						<button
							aria-label={previousLabel}
							className={clsx(NAVIGATION_BUTTON_CLASS, "w-9 cursor-not-allowed px-0 opacity-40")}
							disabled
							type="button"
						>
							<ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
						</button>
					) : (
						<Link
							aria-label={previousLabel}
							className={clsx(NAVIGATION_BUTTON_CLASS, "w-9 px-0")}
							preventScrollReset
							to={calendarPath({ view, skyTime, date: previousDate })}
						>
							<ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
						</Link>
					)}
					<Link
						className={NAVIGATION_BUTTON_CLASS}
						preventScrollReset
						to={calendarPath({ view, skyTime })}
					>
						{t("today", { ns: "general" })}
					</Link>
					<CalendarJump
						anchorDate={anchorDate}
						className={clsx(NAVIGATION_BUTTON_CLASS, "w-9 px-0")}
						locale={locale}
						skyTime={skyTime}
						todayDate={todayDate}
						view={view}
						weekStartsOn={weekStartsOn}
					/>
					{nextDate === null ? (
						<button
							aria-label={nextLabel}
							className={clsx(NAVIGATION_BUTTON_CLASS, "w-9 cursor-not-allowed px-0 opacity-40")}
							disabled
							type="button"
						>
							<ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
						</button>
					) : (
						<Link
							aria-label={nextLabel}
							className={clsx(NAVIGATION_BUTTON_CLASS, "w-9 px-0")}
							preventScrollReset
							to={calendarPath({ view, skyTime, date: nextDate })}
						>
							<ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
						</Link>
					)}
				</div>
				<CalendarSettings
					anchorDate={anchorDate}
					className={clsx(NAVIGATION_BUTTON_CLASS, "w-9 px-0")}
					dayDate={dayDate}
					skyTime={skyTime}
					view={view}
				/>
			</div>
		</div>
	);
}
