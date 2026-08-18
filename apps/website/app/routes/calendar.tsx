import { useMemo, useState } from "react";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { CalendarDayDialog } from "~/components/calendar/CalendarDayDialog";
import { CalendarGrid } from "~/components/calendar/CalendarGrid";
import { CalendarLegend } from "~/components/calendar/CalendarLegend";
import { CalendarSummary } from "~/components/calendar/CalendarSummary";
import { CalendarToolbar } from "~/components/calendar/CalendarToolbar";
import { SitePage } from "~/components/PageLayout";
import { useCurrentTimestamp, useDailyRevalidator } from "~/hooks/use-current-timestamp.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { calendarDayOccurrences } from "~/utility/calendar-day.server.js";
import { calendarEntriesBetween } from "~/utility/calendar-entries.server.js";
import {
	CALENDAR_MINIMUM_DATE,
	type CalendarDay,
	type CalendarDayDetail,
	CalendarEntryKind,
	type CalendarEntryKinds,
	type CalendarWeek,
	CalendarView,
	isCalendarView,
} from "~/utility/calendar.js";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import { APPLICATION_NAME, CALENDAR_DESCRIPTION, CALENDAR_TITLE } from "~/utility/constants.js";
import { getPreferredHour12 } from "~/utility/hour-cycle.server.js";
import { getPreferredTimeZone } from "~/utility/time-zone.server.js";
import type { Route } from "./+types/calendar.js";

export const meta: Route.MetaFunction = ({ location, matches }) => {
	const cdnURL = getCDNURLFromMatches(matches);
	const url = String(new URL(`${location.pathname}${location.search}`, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{
			name: "robots",
			content: location.search.length > 0 ? "noindex, follow" : "index, follow",
		},
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Sky calendar, Sky seasons, Sky events, travelling spirits, returning spirits`,
		},
		{ title: CALENDAR_TITLE },
		{ name: "description", content: CALENDAR_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: CALENDAR_TITLE },
		{ property: "og:description", content: CALENDAR_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: cdnAssetURL(cdnURL, "avatar_icons/caelus.webp") },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: CALENDAR_TITLE },
		{ name: "twitter:description", content: CALENDAR_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

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

function firstDayOfWeek(locale: string) {
	return new Intl.Locale(locale).getWeekInfo().firstDay;
}

function zonedStartOfDay(date: Temporal.PlainDate, timeZone: string) {
	return Temporal.ZonedDateTime.from({
		timeZone,
		year: date.year,
		month: date.month,
		day: date.day,
	});
}

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	const locale = getLocale(context);
	const timeZone = await getPreferredTimeZone(request);
	const hour12 = getPreferredHour12(request);
	const t = getInstance(context).getFixedT(locale);
	const viewParameter = url.searchParams.get("view");
	const view = isCalendarView(viewParameter) ? viewParameter : CalendarView.Month;
	const now = Temporal.Instant.fromEpochMilliseconds(Date.now()).toZonedDateTimeISO(timeZone);
	const today = now.toPlainDate();
	const minimum = Temporal.PlainDate.from(CALENDAR_MINIMUM_DATE);
	const requested = parsePlainDate(url.searchParams.get("date")) ?? today;
	const anchor = Temporal.PlainDate.compare(requested, minimum) < 0 ? minimum : requested;
	const weekStartsOn = firstDayOfWeek(locale);
	const isMonth = view === CalendarView.Month;
	const focus = isMonth ? anchor.with({ day: 1 }) : anchor;
	const gridStart = focus.subtract({ days: (focus.dayOfWeek - weekStartsOn + 7) % 7 });

	const weekCount = isMonth
		? Math.ceil((focus.daysInMonth + gridStart.until(focus, { largestUnit: "day" }).days) / 7)
		: 1;

	const gridEnd = gridStart.add({ days: weekCount * 7 - 1 });
	const rangeStart = zonedStartOfDay(gridStart, timeZone);
	const rangeEnd = zonedStartOfDay(gridEnd.add({ days: 1 }), timeZone);

	const entries = calendarEntriesBetween({
		rangeStart,
		rangeEnd,
		timeZone,
		locale,
		hour12,
		t,
		shardEruptions: true,
	});

	const nowMillis = now.epochMilliseconds;

	const summaryEntries = calendarEntriesBetween({
		rangeStart: now,
		rangeEnd: now.add({ years: 1 }),
		timeZone,
		locale,
		hour12,
		t,
		shardEruptions: false,
	});

	const summary = {
		active: summaryEntries.filter(
			(entry) => entry.startsAt <= nowMillis && nowMillis < entry.endsAt,
		),
		upcoming: summaryEntries
			.filter((entry) => entry.startsAt > nowMillis)
			.sort((a, b) => a.startsAt - b.startsAt),
	};

	const dayFormat = new Intl.DateTimeFormat(locale, { timeZone, day: "numeric" });
	const fullDayFormat = new Intl.DateTimeFormat(locale, { timeZone, dateStyle: "full" });
	const weeks: CalendarWeek[] = [];

	for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
		const weekStart = gridStart.add({ days: weekIndex * 7 });

		const days: CalendarDay[] = Array.from({ length: 7 }, (_, dayIndex) => {
			const date = weekStart.add({ days: dayIndex });

			const epochMilliseconds = zonedStartOfDay(date, timeZone).epochMilliseconds;

			return {
				date: date.toString(),
				label: dayFormat.format(epochMilliseconds),
				fullLabel: fullDayFormat.format(epochMilliseconds),
				exists: Temporal.PlainDate.compare(date, minimum) >= 0,
				outsideFocus: isMonth && date.month !== focus.month,
				isToday: date.equals(today),
			};
		});

		if (!days.some((day) => day.exists)) {
			continue;
		}

		weeks.push({ key: weekStart.toString(), days });
	}

	const weekdayFormat = new Intl.DateTimeFormat(locale, { timeZone, weekday: "short" });

	const weekdayLabels = Array.from({ length: 7 }, (_, dayIndex) =>
		weekdayFormat.format(
			zonedStartOfDay(gridStart.add({ days: dayIndex }), timeZone).epochMilliseconds,
		),
	);

	const title = isMonth
		? new Intl.DateTimeFormat(locale, { timeZone, month: "long", year: "numeric" }).format(
				zonedStartOfDay(focus, timeZone).epochMilliseconds,
			)
		: new Intl.DateTimeFormat(locale, {
				timeZone,
				day: "numeric",
				month: "long",
				year: "numeric",
			}).formatRange(
				zonedStartOfDay(gridStart, timeZone).epochMilliseconds,
				zonedStartOfDay(gridEnd, timeZone).epochMilliseconds,
			);

	const day = parsePlainDate(url.searchParams.get("day"));

	const dayDetail: CalendarDayDetail | null =
		day &&
		Temporal.PlainDate.compare(day, minimum) >= 0 &&
		Temporal.PlainDate.compare(day, gridStart) >= 0 &&
		Temporal.PlainDate.compare(day, gridEnd) <= 0
			? {
					date: day.toString(),
					heading: new Intl.DateTimeFormat(locale, { dateStyle: "full", timeZone }).format(
						zonedStartOfDay(day, timeZone).epochMilliseconds,
					),
					allDay: entries.filter(
						(entry) =>
							entry.kind !== CalendarEntryKind.ShardEruption &&
							entry.firstDate <= day.toString() &&
							day.toString() <= entry.lastDate,
					),
					occurrences: calendarDayOccurrences(
						zonedStartOfDay(day, timeZone),
						new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }),
						t,
					),
				}
			: null;

	const previous = isMonth ? focus.subtract({ months: 1 }) : gridStart.subtract({ weeks: 1 });

	const previousEnd = isMonth
		? previous.with({ day: previous.daysInMonth })
		: previous.add({ days: 6 });

	return {
		anchorDate: (isMonth ? focus : gridStart).toString(),
		dayDetail,
		entries,
		summary,
		initialTimestamp: Date.now(),
		locale,
		nextDate: (isMonth ? focus.add({ months: 1 }) : gridStart.add({ weeks: 1 })).toString(),
		previousDate: Temporal.PlainDate.compare(previousEnd, minimum) < 0 ? null : previous.toString(),
		timeZone,
		title,
		todayDate: today.toString(),
		view,
		weekdayLabels,
		weekStartsOn,
		weeks,
	};
};

export default function Calendar({ loaderData }: Route.ComponentProps) {
	const {
		anchorDate,
		dayDetail,
		entries,
		summary,
		initialTimestamp,
		locale,
		nextDate,
		previousDate,
		timeZone,
		title,
		todayDate,
		view,
		weekdayLabels,
		weekStartsOn,
		weeks,
	} = loaderData;

	const currentTimestamp = useCurrentTimestamp(initialTimestamp);
	useDailyRevalidator(currentTimestamp, timeZone);
	const [hiddenKinds, setHiddenKinds] = useState<ReadonlySet<CalendarEntryKinds>>(new Set());

	const visible = useMemo(
		() => ({
			entries: entries.filter((entry) => !hiddenKinds.has(entry.kind)),
			active: summary.active.filter((entry) => !hiddenKinds.has(entry.kind)),
			upcoming: summary.upcoming.filter((entry) => !hiddenKinds.has(entry.kind)),
			allDay: dayDetail?.allDay.filter((entry) => !hiddenKinds.has(entry.kind)) ?? [],
		}),
		[entries, summary, dayDetail, hiddenKinds],
	);

	const toggleKind = (kind: CalendarEntryKinds) =>
		setHiddenKinds((current) => {
			const next = new Set(current);

			if (!next.delete(kind)) {
				next.add(kind);
			}

			return next;
		});

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
				<CalendarToolbar
					anchorDate={anchorDate}
					locale={locale}
					nextDate={nextDate}
					previousDate={previousDate}
					title={title}
					todayDate={todayDate}
					view={view}
					weekStartsOn={weekStartsOn}
				/>
				<CalendarLegend hiddenKinds={hiddenKinds} onToggle={toggleKind} />
				<CalendarGrid
					anchorDate={anchorDate}
					entries={visible.entries}
					locale={locale}
					view={view}
					weekdayLabels={weekdayLabels}
					weeks={weeks}
				/>
				<CalendarSummary active={visible.active} upcoming={visible.upcoming} view={view} />
			</div>
			{dayDetail && (
				<CalendarDayDialog
					allDay={visible.allDay}
					anchorDate={anchorDate}
					detail={dayDetail}
					locale={locale}
					view={view}
				/>
			)}
		</SitePage>
	);
}
