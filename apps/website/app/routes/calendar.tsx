import i18next from "i18next";
import { useMemo } from "react";
import { type ShouldRevalidateFunctionArgs, useSearchParams } from "react-router";
import { TIME_ZONE, WEBSITE_URL } from "@thatskyapplication/utility";
import { CalendarDayDialogue } from "~/components/calendar/CalendarDayDialogue";
import { CalendarDayView } from "~/components/calendar/CalendarDayView";
import { CalendarGrid } from "~/components/calendar/CalendarGrid";
import { CalendarLegend } from "~/components/calendar/CalendarLegend";
import { CalendarSummary } from "~/components/calendar/CalendarSummary";
import { CalendarToolbar } from "~/components/calendar/CalendarToolbar";
import { SitePage } from "~/components/PageLayout";
import { useCurrentTimestamp, useDailyRevalidator } from "~/hooks/use-current-timestamp.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { calendarData } from "~/utility/calendar-data.js";
import {
	CALENDAR_HIDDEN_KINDS_PARAMETER,
	type CalendarEntryKinds,
	CalendarView,
	parseHiddenCalendarKinds,
	serialiseHiddenCalendarKinds,
} from "~/utility/calendar.js";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import { APPLICATION_NAME, CALENDAR_DESCRIPTION, CALENDAR_TITLE } from "~/utility/constants.js";
import { getDocumentHour12 } from "~/utility/hour-cycle.js";
import { getPreferredHour12 } from "~/utility/hour-cycle.server.js";
import { getBrowserTimeZone } from "~/utility/time-zone.js";
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

export const loader = ({ context, request, url }: Route.LoaderArgs) => {
	const locale = getLocale(context);

	return calendarData({
		hour12: getPreferredHour12(request),
		locale,
		nowMilliseconds: Date.now(),
		preferredTimeZone: getPreferredTimeZone(request),
		searchParams: url.searchParams,
		t: getInstance(context).getFixedT(locale),
	});
};

export const clientLoader = ({ request }: Route.ClientLoaderArgs) => {
	const locale = i18next.language;

	return calendarData({
		hour12: getDocumentHour12(),
		locale,
		nowMilliseconds: Date.now(),
		preferredTimeZone: getBrowserTimeZone() ?? TIME_ZONE,
		searchParams: new URL(request.url).searchParams,
		t: i18next.getFixedT(locale),
	});
};

function loaderSearchParameters(url: URL) {
	const parameters = new URLSearchParams(url.search);
	parameters.delete(CALENDAR_HIDDEN_KINDS_PARAMETER);
	return parameters.toString();
}

export function shouldRevalidate({
	currentUrl,
	defaultShouldRevalidate,
	nextUrl,
}: ShouldRevalidateFunctionArgs) {
	return currentUrl.href !== nextUrl.href &&
		currentUrl.pathname === nextUrl.pathname &&
		loaderSearchParameters(currentUrl) === loaderSearchParameters(nextUrl)
		? false
		: defaultShouldRevalidate;
}

export default function Calendar({ loaderData }: Route.ComponentProps) {
	const {
		anchorDate,
		dayDate,
		dayDetail,
		entries,
		summary,
		initialTimestamp,
		locale,
		nextDate,
		previousDate,
		skyTime,
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
	const [searchParams, setSearchParams] = useSearchParams();
	const hiddenKinds = useMemo(() => parseHiddenCalendarKinds(searchParams), [searchParams]);
	const isDay = view === CalendarView.Day;

	const visible = useMemo(
		() => ({
			entries: entries.filter((entry) => !hiddenKinds.has(entry.kind)),
			active: summary.active.filter((entry) => !hiddenKinds.has(entry.kind)),
			upcoming: summary.upcoming.filter((entry) => !hiddenKinds.has(entry.kind)),
			allDay: dayDetail?.allDay.filter((entry) => !hiddenKinds.has(entry.kind)) ?? [],
		}),
		[entries, summary, dayDetail, hiddenKinds],
	);

	const toggleKind = (kind: CalendarEntryKinds) => {
		const next = new Set(hiddenKinds);

		if (!next.delete(kind)) {
			next.add(kind);
		}

		setSearchParams(
			(current) => {
				const updated = new URLSearchParams(current);

				if (next.size > 0) {
					updated.set(CALENDAR_HIDDEN_KINDS_PARAMETER, serialiseHiddenCalendarKinds(next));
				} else {
					updated.delete(CALENDAR_HIDDEN_KINDS_PARAMETER);
				}

				return updated;
			},
			{ preventScrollReset: true, replace: true },
		);
	};

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
				<CalendarToolbar
					anchorDate={anchorDate}
					dayDate={dayDate}
					hiddenKinds={hiddenKinds}
					locale={locale}
					nextDate={nextDate}
					previousDate={previousDate}
					skyTime={skyTime}
					title={title}
					todayDate={todayDate}
					view={view}
					weekStartsOn={weekStartsOn}
				/>
				<CalendarLegend hiddenKinds={hiddenKinds} onToggle={toggleKind} />
				{isDay ? (
					dayDetail && (
						<CalendarDayView allDay={visible.allDay} detail={dayDetail} locale={locale} />
					)
				) : (
					<CalendarGrid
						anchorDate={anchorDate}
						currentTimestamp={currentTimestamp}
						entries={visible.entries}
						hiddenKinds={hiddenKinds}
						locale={locale}
						skyTime={skyTime}
						view={view}
						weekdayLabels={weekdayLabels}
						weeks={weeks}
					/>
				)}
				<CalendarSummary
					active={visible.active}
					hiddenKinds={hiddenKinds}
					skyTime={skyTime}
					upcoming={visible.upcoming}
					view={view}
				/>
			</div>
			{!isDay && dayDetail && (
				<CalendarDayDialogue
					allDay={visible.allDay}
					anchorDate={anchorDate}
					detail={dayDetail}
					hiddenKinds={hiddenKinds}
					locale={locale}
					skyTime={skyTime}
					view={view}
				/>
			)}
		</SitePage>
	);
}
