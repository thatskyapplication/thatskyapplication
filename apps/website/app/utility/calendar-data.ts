import type { TFunction } from "i18next";
import { TIME_ZONE } from "@thatskyapplication/utility";
import { calendarDayOccurrences } from "~/utility/calendar-day.js";
import { calendarEntriesBetween } from "~/utility/calendar-entries.js";
import {
	CALENDAR_MAXIMUM_DATE,
	CALENDAR_MINIMUM_DATE,
	CALENDAR_SKY_TIME_PARAMETER,
	type CalendarDay,
	type CalendarDayDetail,
	type CalendarWeek,
	CalendarView,
	isCalendarView,
	isDayMarkerKind,
} from "~/utility/calendar.js";

interface CalendarDataOptions {
	hour12: boolean | undefined;
	locale: string;
	nowMilliseconds: number;
	preferredTimeZone: string;
	searchParams: URLSearchParams;
	t: TFunction;
}

function parsePlainDate(value: string | null) {
	if (value === null) {
		return null;
	}

	try {
		return Temporal.PlainDate.from(value);
	} catch {
		return null;
	}
}

function clampPlainDate(
	date: Temporal.PlainDate,
	minimum: Temporal.PlainDate,
	maximum: Temporal.PlainDate,
) {
	if (Temporal.PlainDate.compare(date, minimum) < 0) {
		return minimum;
	}

	return Temporal.PlainDate.compare(date, maximum) > 0 ? maximum : date;
}

function firstDayOfWeek(locale: string) {
	return new Intl.Locale(locale).getWeekInfo().firstDay;
}

export function calendarData({
	hour12,
	locale,
	nowMilliseconds,
	preferredTimeZone,
	searchParams,
	t,
}: CalendarDataOptions) {
	const skyTime = searchParams.get("zone") === CALENDAR_SKY_TIME_PARAMETER;
	const timeZone = skyTime ? TIME_ZONE : preferredTimeZone;
	const viewParameter = searchParams.get("view");
	const view = isCalendarView(viewParameter) ? viewParameter : CalendarView.Month;
	const now = Temporal.Instant.fromEpochMilliseconds(nowMilliseconds).toZonedDateTimeISO(timeZone);
	const today = now.toPlainDate();
	const minimum = Temporal.PlainDate.from(CALENDAR_MINIMUM_DATE);
	const maximum = Temporal.PlainDate.from(CALENDAR_MAXIMUM_DATE);
	const requested = parsePlainDate(searchParams.get("date")) ?? today;
	const anchor = clampPlainDate(requested, minimum, maximum);
	const weekStartsOn = firstDayOfWeek(locale);
	const isMonth = view === CalendarView.Month;
	const isDay = view === CalendarView.Day;
	const focus = isMonth ? anchor.with({ day: 1 }) : anchor;

	const gridStart = isDay
		? anchor
		: focus.subtract({ days: (focus.dayOfWeek - weekStartsOn + 7) % 7 });

	const weekCount = isDay
		? 0
		: isMonth
			? Math.ceil((focus.daysInMonth + gridStart.until(focus, { largestUnit: "day" }).days) / 7)
			: 1;

	const gridEnd = isDay
		? anchor
		: clampPlainDate(gridStart.add({ days: weekCount * 7 - 1 }), minimum, maximum);

	const rangeStart = gridStart.toZonedDateTime(timeZone);
	const rangeEnd = gridEnd.add({ days: 1 }).toZonedDateTime(timeZone);

	const entries = calendarEntriesBetween({
		rangeStart,
		rangeEnd,
		timeZone,
		locale,
		hour12,
		t,
		dayMarkers: true,
	});

	const summaryEntries = calendarEntriesBetween({
		rangeStart: now,
		rangeEnd: now.add({ years: 1 }),
		timeZone,
		locale,
		hour12,
		t,
		dayMarkers: false,
		summary: true,
	});

	const summary = {
		active: summaryEntries.filter(
			(entry) => entry.startsAt <= nowMilliseconds && nowMilliseconds < entry.endsAt,
		),
		upcoming: summaryEntries
			.filter((entry) => entry.startsAt > nowMilliseconds)
			.sort((a, b) => a.startsAt - b.startsAt),
	};

	const dayFormat = new Intl.DateTimeFormat(locale, { timeZone, day: "numeric" });
	const fullDayFormat = new Intl.DateTimeFormat(locale, { timeZone, dateStyle: "full" });
	const weeks: CalendarWeek[] = [];

	for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
		const weekStart = gridStart.add({ days: weekIndex * 7 });

		const days: CalendarDay[] = Array.from({ length: 7 }, (_, dayIndex) => {
			const date = weekStart.add({ days: dayIndex });
			const epochMilliseconds = date.toZonedDateTime(timeZone).epochMilliseconds;

			return {
				date: date.toString(),
				label: dayFormat.format(epochMilliseconds),
				fullLabel: fullDayFormat.format(epochMilliseconds),
				startsAt: epochMilliseconds,
				endsAt: date.add({ days: 1 }).toZonedDateTime(timeZone).epochMilliseconds,
				exists: Temporal.PlainDate.compare(date, minimum) >= 0,
				outsideFocus: isMonth && date.month !== focus.month,
			};
		});

		if (!days.some((day) => day.exists)) {
			continue;
		}

		weeks.push({ key: weekStart.toString(), days });
	}

	const weekdayFormat = new Intl.DateTimeFormat(locale, { timeZone, weekday: "short" });

	const weekdayLabels = isDay
		? []
		: Array.from({ length: 7 }, (_, dayIndex) =>
				weekdayFormat.format(
					gridStart.add({ days: dayIndex }).toZonedDateTime(timeZone).epochMilliseconds,
				),
			);

	const title = isDay
		? fullDayFormat.format(anchor.toZonedDateTime(timeZone).epochMilliseconds)
		: isMonth
			? new Intl.DateTimeFormat(locale, { timeZone, month: "long", year: "numeric" }).format(
					focus.toZonedDateTime(timeZone).epochMilliseconds,
				)
			: new Intl.DateTimeFormat(locale, {
					timeZone,
					day: "numeric",
					month: "long",
					year: "numeric",
				}).formatRange(
					gridStart.toZonedDateTime(timeZone).epochMilliseconds,
					gridEnd.toZonedDateTime(timeZone).epochMilliseconds,
				);

	const day = isDay ? anchor : parsePlainDate(searchParams.get("day"));

	const dayDetail: CalendarDayDetail | null =
		day &&
		Temporal.PlainDate.compare(day, minimum) >= 0 &&
		Temporal.PlainDate.compare(day, gridStart) >= 0 &&
		Temporal.PlainDate.compare(day, gridEnd) <= 0
			? {
					date: day.toString(),
					heading: fullDayFormat.format(day.toZonedDateTime(timeZone).epochMilliseconds),
					allDay: entries.filter(
						(entry) =>
							!isDayMarkerKind(entry.kind) &&
							entry.firstDate <= day.toString() &&
							day.toString() <= entry.lastDate,
					),
					occurrences: calendarDayOccurrences(
						day.toZonedDateTime(timeZone),
						locale,
						new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }),
						t,
					),
				}
			: null;

	const previous = isDay
		? anchor.subtract({ days: 1 })
		: isMonth
			? focus.subtract({ months: 1 })
			: gridStart.subtract({ weeks: 1 });

	const previousEnd = isDay
		? previous
		: isMonth
			? previous.with({ day: previous.daysInMonth })
			: previous.add({ days: 6 });

	const next = isDay
		? anchor.add({ days: 1 })
		: isMonth
			? focus.add({ months: 1 })
			: gridStart.add({ weeks: 1 });

	const focusedDay =
		Temporal.PlainDate.compare(today, gridStart) >= 0 &&
		Temporal.PlainDate.compare(today, gridEnd) <= 0
			? today
			: focus;

	return {
		anchorDate: (isMonth ? focus : gridStart).toString(),
		dayDate: focusedDay.toString(),
		dayDetail,
		entries,
		summary,
		initialTimestamp: nowMilliseconds,
		locale,
		nextDate: Temporal.PlainDate.compare(next, maximum) > 0 ? null : next.toString(),
		previousDate: Temporal.PlainDate.compare(previousEnd, minimum) < 0 ? null : previous.toString(),
		skyTime,
		timeZone,
		title,
		todayDate: today.toString(),
		view,
		weekdayLabels,
		weekStartsOn,
		weeks,
	};
}
