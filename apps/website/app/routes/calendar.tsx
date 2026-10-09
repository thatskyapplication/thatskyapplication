import { ComponentType } from "@discordjs/core/http-only";
import i18next, { type TFunction } from "i18next";
import { useMemo } from "react";
import { type ShouldRevalidateFunctionArgs, useSearchParams } from "react-router";
import { formatEmoji, TIME_ZONE, WEBSITE_URL } from "@thatskyapplication/utility";
import { CalendarDayDialogue } from "~/components/calendar/CalendarDayDialogue";
import { CalendarDayView } from "~/components/calendar/CalendarDayView";
import { CalendarGrid } from "~/components/calendar/CalendarGrid";
import { CalendarLegend } from "~/components/calendar/CalendarLegend";
import { CalendarSummary } from "~/components/calendar/CalendarSummary";
import { CalendarToolbar } from "~/components/calendar/CalendarToolbar";
import { SitePage } from "~/components/PageLayout";
import {
	useCurrentTimestamp,
	useDailyRevalidator,
	useSkyDailyResetRevalidator,
} from "~/hooks/use-current-timestamp.js";
import { getInstance } from "~/middleware/i18next.js";
import { calendarData } from "~/utility/calendar-data.js";
import {
	CALENDAR_HIDDEN_KINDS_PARAMETER,
	type CalendarEntryKinds,
	type CalendarSummaryEntry,
	CalendarView,
	parseHiddenCalendarKinds,
	serialiseHiddenCalendarKinds,
} from "~/utility/calendar.js";
import { CALENDAR_DESCRIPTION, WEBSITE_COLOUR, WEBSITE_ICON_URL } from "~/utility/constants.js";
import {
	cardContainer,
	fitsDiscordComponentEmbed,
} from "~/utility/discord-component-embed.server.js";
import { hexColour } from "~/utility/functions.js";
import { getDocumentHour12 } from "~/utility/hour-cycle.js";
import { getBrowserTimeZone } from "~/utility/time-zone.js";
import { getTimePreferences } from "~/utility/time.server.js";
import type { Route } from "./+types/calendar.js";

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
	const url = String(new URL(`${location.pathname}${location.search}`, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{
			name: "robots",
			content: location.search.length > 0 ? "noindex, follow" : "index, follow",
		},
		{ title: loaderData.title },
		{ name: "description", content: CALENDAR_DESCRIPTION },
		{ name: "theme-color", content: hexColour(WEBSITE_COLOUR) },
		{ property: "og:title", content: loaderData.title },
		{ property: "og:description", content: CALENDAR_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: WEBSITE_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: loaderData.title },
		{ name: "twitter:description", content: CALENDAR_DESCRIPTION },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

function summaryContent(t: TFunction, entries: readonly CalendarSummaryEntry[], active: boolean) {
	const heading = t(active ? "schedule.overview-active" : "schedule.overview-upcoming", {
		ns: "features",
	});

	if (entries.length === 0) {
		return `### ${heading}\n${t("calendar.nothing-scheduled", { ns: "features" })}`;
	}

	const lines = entries.map((entry) => {
		const name = [
			entry.iconEmojiIds.map((id) => formatEmoji({ id, name: "emoji" })).join(""),
			entry.label,
		]
			.filter(Boolean)
			.join(" ");

		const timestamp = t(
			active ? "schedule.overview-ends-timestamp" : "schedule.overview-next-timestamp",
			{
				ns: "features",
				timestamp: `<t:${Math.floor((active ? entry.endsAt : entry.startsAt) / 1_000)}:R>`,
			},
		);

		return `- ${name} | ${timestamp}`;
	});

	return `### ${heading}\n${lines.join("\n")}`;
}

export const loader = ({ context, request, url }: Route.LoaderArgs) => {
	const { locale, timeZone, timeZoneEstimated, hour12 } = getTimePreferences(request, context);
	const t = getInstance(context).getFixedT(locale);
	const title = t("calendar.name", { ns: "features" });

	const data = calendarData({
		hour12,
		locale,
		nowMilliseconds: Date.now(),
		preferredTimeZone: timeZone,
		searchParams: url.searchParams,
		t,
		timeZoneEstimated,
	});

	const hiddenKinds = parseHiddenCalendarKinds(url.searchParams);

	const discordComponentEmbed = cardContainer({
		colour: WEBSITE_COLOUR,
		components: [
			{ type: ComponentType.Separator },
			{
				type: ComponentType.TextDisplay,
				content: summaryContent(
					t,
					data.summary.active.filter((entry) => !hiddenKinds.has(entry.kind)),
					true,
				),
			},
			{
				type: ComponentType.TextDisplay,
				content: summaryContent(
					t,
					data.summary.upcoming.filter((entry) => !hiddenKinds.has(entry.kind)),
					false,
				),
			},
		],
		description: CALENDAR_DESCRIPTION,
		icon: WEBSITE_ICON_URL,
		title: title,
		url: new URL(`${url.pathname}${url.search}`, WEBSITE_URL).href,
	});

	return {
		...data,
		discordComponentEmbed: fitsDiscordComponentEmbed(discordComponentEmbed)
			? discordComponentEmbed
			: null,
		title,
	};
};

export const clientLoader = ({ request }: Route.ClientLoaderArgs) => {
	const locale = i18next.language;
	const t = i18next.getFixedT(locale);

	return {
		...calendarData({
			hour12: getDocumentHour12(),
			locale,
			nowMilliseconds: Date.now(),
			preferredTimeZone: getBrowserTimeZone() ?? TIME_ZONE,
			searchParams: new URL(request.url).searchParams,
			t,
			timeZoneEstimated: false,
		}),
		title: t("calendar.name", { ns: "features" }),
	};
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
		zoneEstimated,
		anchorEstimated,
		heading,
		todayDate,
		view,
		weekdayLabels,
		weekStartsOn,
		weeks,
	} = loaderData;

	const currentTimestamp = useCurrentTimestamp(initialTimestamp);
	useDailyRevalidator(currentTimestamp, timeZone);
	useSkyDailyResetRevalidator(currentTimestamp);
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
					anchorEstimated={anchorEstimated}
					dayDate={dayDate}
					heading={heading}
					hiddenKinds={hiddenKinds}
					locale={locale}
					nextDate={nextDate}
					previousDate={previousDate}
					skyTime={skyTime}
					todayDate={todayDate}
					view={view}
					weekStartsOn={weekStartsOn}
				/>
				<CalendarLegend hiddenKinds={hiddenKinds} onToggle={toggleKind} />
				{isDay ? (
					dayDetail && (
						<CalendarDayView
							allDay={visible.allDay}
							detail={dayDetail}
							locale={locale}
							zoneEstimated={zoneEstimated}
						/>
					)
				) : (
					<CalendarGrid
						anchorDate={anchorDate}
						anchorEstimated={anchorEstimated}
						currentTimestamp={currentTimestamp}
						entries={visible.entries}
						hiddenKinds={hiddenKinds}
						locale={locale}
						skyTime={skyTime}
						zoneEstimated={zoneEstimated}
						view={view}
						weekdayLabels={weekdayLabels}
						weeks={weeks}
					/>
				)}
				<CalendarSummary
					active={visible.active}
					hiddenKinds={hiddenKinds}
					skyTime={skyTime}
					zoneEstimated={zoneEstimated}
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
					zoneEstimated={zoneEstimated}
					view={view}
				/>
			)}
		</SitePage>
	);
}
