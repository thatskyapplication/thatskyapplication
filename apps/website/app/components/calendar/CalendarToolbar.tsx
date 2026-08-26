import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CalendarSettings } from "~/components/calendar/CalendarSettings";
import { DatePicker } from "~/components/DatePicker";
import { SkeletonText } from "~/components/SkeletonText.js";
import { useCalendarKeyboardNavigation } from "~/hooks/use-calendar-keyboard-navigation";
import {
	CALENDAR_MINIMUM_DATE,
	calendarNavigableMaximumDate,
	calendarPath,
	type CalendarEntryKinds,
	CalendarView,
	type CalendarViews,
} from "~/utility/calendar";

const NAVIGATION_BUTTON_CLASS =
	"inline-flex h-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" as const;

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
	anchorEstimated,
	dayDate,
	hiddenKinds,
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
	anchorEstimated: boolean;
	dayDate: string;
	hiddenKinds: ReadonlySet<CalendarEntryKinds>;
	locale: string;
	nextDate: string | null;
	previousDate: string | null;
	skyTime: boolean;
	title: string;
	todayDate: string;
	view: CalendarViews;
	weekStartsOn: number;
}) {
	const { i18n, t } = useTranslation();

	const maximumDate = calendarNavigableMaximumDate(Temporal.PlainDate.from(todayDate)).toString();

	const previousPath =
		previousDate === null ? null : calendarPath({ view, skyTime, hiddenKinds, date: previousDate });

	const nextPath =
		nextDate === null ? null : calendarPath({ view, skyTime, hiddenKinds, date: nextDate });

	const todayPath = calendarPath({ view, skyTime, hiddenKinds });

	useCalendarKeyboardNavigation({
		nextPath,
		previousPath,
		rightToLeft: i18n.dir(i18n.language) === "rtl",
		todayPath,
	});

	const previousLabel = t(PREVIOUS_LABEL_KEYS[view], { ns: "features" });
	const nextLabel = t(NEXT_LABEL_KEYS[view], { ns: "features" });

	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<h1 className="my-0 text-xl sm:text-2xl lg:text-2xl">
				{anchorEstimated ? <SkeletonText>{title}</SkeletonText> : title}
			</h1>
			<div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
				<div className="flex items-center gap-2">
					{previousPath === null ? (
						<button
							aria-label={previousLabel}
							className={clsx(NAVIGATION_BUTTON_CLASS, "w-9 cursor-not-allowed opacity-40")}
							disabled
							type="button"
						>
							<ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
						</button>
					) : (
						<Link
							aria-label={previousLabel}
							className={clsx(NAVIGATION_BUTTON_CLASS, "w-9")}
							preventScrollReset
							to={previousPath}
						>
							<ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
						</Link>
					)}
					<Link className={clsx(NAVIGATION_BUTTON_CLASS, "px-3")} preventScrollReset to={todayPath}>
						{t("today", { ns: "general" })}
					</Link>
					<DatePicker
						anchorDate={anchorDate}
						className={clsx(NAVIGATION_BUTTON_CLASS, "w-9")}
						getDateURL={(date) => calendarPath({ view, skyTime, hiddenKinds, date })}
						iconOnly
						label={t("jump-to-date", { ns: "general" })}
						locale={locale}
						maximumDate={maximumDate}
						minimumDate={CALENDAR_MINIMUM_DATE}
						todayDate={todayDate}
						weekStartsOn={weekStartsOn}
					/>
					{nextPath === null ? (
						<button
							aria-label={nextLabel}
							className={clsx(NAVIGATION_BUTTON_CLASS, "w-9 cursor-not-allowed opacity-40")}
							disabled
							type="button"
						>
							<ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
						</button>
					) : (
						<Link
							aria-label={nextLabel}
							className={clsx(NAVIGATION_BUTTON_CLASS, "w-9")}
							preventScrollReset
							to={nextPath}
						>
							<ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
						</Link>
					)}
				</div>
				<CalendarSettings
					anchorDate={anchorDate}
					hiddenKinds={hiddenKinds}
					className={clsx(NAVIGATION_BUTTON_CLASS, "w-9")}
					dayDate={dayDate}
					skyTime={skyTime}
					view={view}
				/>
			</div>
		</div>
	);
}
