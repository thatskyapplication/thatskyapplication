import { Popover } from "@base-ui/react/popover";
import { clsx } from "clsx";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CALENDAR_MINIMUM_DATE, calendarPath, type CalendarViews } from "~/utility/calendar";

const JUMP_DAY_COUNT = 42 as const;
const MONTHS_IN_YEAR = 12 as const;
const YEARS_AHEAD = 1 as const;

const JumpMode = {
	Days: 0,
	Months: 1,
	Years: 2,
} as const satisfies Readonly<Record<string, number>>;

type JumpModes = (typeof JumpMode)[keyof typeof JumpMode];

const NAVIGATION_CLASS =
	"inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800" as const;

const HEADER_CLASS =
	"rounded-md px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-100" as const;

const CELL_CLASS =
	"inline-flex items-center justify-center rounded-md text-sm transition-colors" as const;

const SELECTED_CLASS = "bg-discord-button font-semibold text-white" as const;

const ANCHORED_CLASS =
	"bg-gray-200 font-semibold text-gray-900 dark:bg-gray-700 dark:text-gray-100" as const;

const ENABLED_CLASS =
	"text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" as const;

const DISABLED_CLASS = "text-gray-300 dark:text-gray-700" as const;

function plainDateEpoch(date: Temporal.PlainDate) {
	return Temporal.ZonedDateTime.from({
		timeZone: "UTC",
		year: date.year,
		month: date.month,
		day: date.day,
	}).epochMilliseconds;
}

export function CalendarJump({
	anchorDate,
	className,
	locale,
	todayDate,
	view,
	weekStartsOn,
}: {
	anchorDate: string;
	className: string;
	locale: string;
	todayDate: string;
	view: CalendarViews;
	weekStartsOn: number;
}) {
	const { t } = useTranslation();
	const [mode, setMode] = useState<JumpModes>(JumpMode.Days);
	const [month, setMonth] = useState(() => Temporal.PlainDate.from(anchorDate).with({ day: 1 }));
	const minimum = Temporal.PlainDate.from(CALENDAR_MINIMUM_DATE);
	const today = Temporal.PlainDate.from(todayDate);
	const anchor = Temporal.PlainDate.from(anchorDate);
	const gridStart = month.subtract({ days: (month.dayOfWeek - weekStartsOn + 7) % 7 });

	const days = Array.from({ length: JUMP_DAY_COUNT }, (_, index) => gridStart.add({ days: index }));
	const dayFormat = new Intl.DateTimeFormat(locale, { timeZone: "UTC", day: "numeric" });
	const weekdayFormat = new Intl.DateTimeFormat(locale, { timeZone: "UTC", weekday: "narrow" });
	const monthFormat = new Intl.DateTimeFormat(locale, { timeZone: "UTC", month: "short" });
	const yearFormat = new Intl.DateTimeFormat(locale, { timeZone: "UTC", year: "numeric" });

	const monthYearFormat = new Intl.DateTimeFormat(locale, {
		timeZone: "UTC",
		month: "long",
		year: "numeric",
	});

	const months = Array.from({ length: MONTHS_IN_YEAR }, (_, index) =>
		month.with({ month: index + 1, day: 1 }),
	);

	const years = Array.from(
		{ length: today.year + YEARS_AHEAD - minimum.year + 1 },
		(_, index) => minimum.year + index,
	);

	const atMinimum =
		mode === JumpMode.Months
			? month.year <= minimum.year
			: Temporal.PlainDate.compare(month, minimum.with({ day: 1 })) <= 0;

	return (
		<Popover.Root
			onOpenChange={(open) => {
				if (open) {
					setMode(JumpMode.Days);
					setMonth(Temporal.PlainDate.from(anchorDate).with({ day: 1 }));
				}
			}}
		>
			<Popover.Trigger
				aria-label={t("calendar.jump-to-date", { ns: "features" })}
				className={className}
			>
				<CalendarDays aria-hidden="true" className="h-4 w-4" />
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Positioner align="center" collisionPadding={8} side="bottom" sideOffset={6}>
					<Popover.Popup className="z-50 w-60 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900">
						<div className="mb-2 flex items-center justify-between gap-2">
							{mode === JumpMode.Years ? (
								<span className="w-7" />
							) : (
								<button
									aria-label={t(
										mode === JumpMode.Days ? "calendar.previous-month" : "calendar.previous-year",
										{ ns: "features" },
									)}
									className={clsx(NAVIGATION_CLASS, atMinimum && "cursor-not-allowed opacity-40")}
									disabled={atMinimum}
									onClick={() =>
										setMonth(
											mode === JumpMode.Days
												? month.subtract({ months: 1 })
												: month.subtract({ years: 1 }),
										)
									}
									type="button"
								>
									<ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
								</button>
							)}
							{mode === JumpMode.Years ? (
								<span className={HEADER_CLASS}>
									{yearFormat.formatRange(
										plainDateEpoch(month.with({ year: years[0]!, month: 1, day: 1 })),
										plainDateEpoch(month.with({ year: years.at(-1)!, month: 1, day: 1 })),
									)}
								</span>
							) : (
								<button
									className={clsx(
										HEADER_CLASS,
										"cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
									)}
									onClick={() => setMode(mode === JumpMode.Days ? JumpMode.Months : JumpMode.Years)}
									type="button"
								>
									{mode === JumpMode.Days
										? monthYearFormat.format(plainDateEpoch(month))
										: yearFormat.format(plainDateEpoch(month.with({ month: 1, day: 1 })))}
								</button>
							)}
							{mode === JumpMode.Years ? (
								<span className="w-7" />
							) : (
								<button
									aria-label={t(
										mode === JumpMode.Days ? "calendar.next-month" : "calendar.next-year",
										{ ns: "features" },
									)}
									className={NAVIGATION_CLASS}
									onClick={() =>
										setMonth(
											mode === JumpMode.Days ? month.add({ months: 1 }) : month.add({ years: 1 }),
										)
									}
									type="button"
								>
									<ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
								</button>
							)}
						</div>
						{mode === JumpMode.Days && (
							<div className="grid grid-cols-7 gap-0.5">
								{days.slice(0, 7).map((day) => (
									<div
										className="pb-1 text-center text-[11px] font-semibold text-gray-500 dark:text-gray-400"
										key={`weekday-${day.dayOfWeek}`}
									>
										{weekdayFormat.format(plainDateEpoch(day))}
									</div>
								))}
								{days.map((day) => {
									const date = day.toString();
									const label = dayFormat.format(plainDateEpoch(day));

									if (Temporal.PlainDate.compare(day, minimum) < 0) {
										return (
											<span className={clsx(CELL_CLASS, "h-8 w-8", DISABLED_CLASS)} key={date}>
												{label}
											</span>
										);
									}

									return (
										<Popover.Close
											key={date}
											nativeButton={false}
											render={
												<Link
													className={clsx(
														CELL_CLASS,
														"h-8 w-8",
														date === todayDate
															? SELECTED_CLASS
															: date === anchorDate
																? ANCHORED_CLASS
																: day.month === month.month
																	? ENABLED_CLASS
																	: "text-gray-400 hover:bg-gray-100 dark:text-gray-600 dark:hover:bg-gray-800",
													)}
													to={calendarPath(view, date)}
												/>
											}
										>
											{label}
										</Popover.Close>
									);
								})}
							</div>
						)}
						{mode === JumpMode.Months && (
							<div className="grid grid-cols-3 gap-1">
								{months.map((entry) => {
									const label = monthFormat.format(plainDateEpoch(entry));

									if (
										Temporal.PlainDate.compare(entry.with({ day: entry.daysInMonth }), minimum) < 0
									) {
										return (
											<span className={clsx(CELL_CLASS, "h-9", DISABLED_CLASS)} key={label}>
												{label}
											</span>
										);
									}

									return (
										<Popover.Close
											key={label}
											nativeButton={false}
											render={
												<Link
													className={clsx(
														CELL_CLASS,
														"h-9",
														entry.year === today.year && entry.month === today.month
															? SELECTED_CLASS
															: entry.year === anchor.year && entry.month === anchor.month
																? ANCHORED_CLASS
																: ENABLED_CLASS,
													)}
													to={calendarPath(view, entry.toString())}
												/>
											}
										>
											{label}
										</Popover.Close>
									);
								})}
							</div>
						)}
						{mode === JumpMode.Years && (
							<div className="grid grid-cols-3 gap-1">
								{years.map((year) => (
									<button
										className={clsx(
											CELL_CLASS,
											"h-9 cursor-pointer",
											year === today.year
												? SELECTED_CLASS
												: year === anchor.year
													? ANCHORED_CLASS
													: ENABLED_CLASS,
										)}
										key={year}
										onClick={() => {
											setMonth(month.with({ year, month: 1, day: 1 }));
											setMode(JumpMode.Months);
										}}
										type="button"
									>
										{yearFormat.format(plainDateEpoch(month.with({ year, month: 1, day: 1 })))}
									</button>
								))}
							</div>
						)}
					</Popover.Popup>
				</Popover.Positioner>
			</Popover.Portal>
		</Popover.Root>
	);
}
