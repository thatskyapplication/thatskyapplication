import { AlertTriangle, ExternalLinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { patchNoteVersion, upcomingPatchNote } from "@thatskyapplication/sky-links";
import {
	DOUBLE_HEART_EVENTS,
	formatEmojiURL,
	isActive,
	MAINTENANCE_PERIODS,
	RADIANCE_EVENTS,
	SCHEDULES,
	ScheduleType,
	type ScheduleTypes,
	type SpiritIds,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyUpcomingSeason,
	TIME_ZONE,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	WEBSITE_URL,
	ScheduleTypeToLocaleKey,
} from "@thatskyapplication/utility";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { CentredSitePage } from "~/components/PageLayout";
import { SkeletonText } from "~/components/SkeletonText";
import { TimeTopBar } from "~/components/TimeTopBar";
import { useCurrentTimestamp } from "~/hooks/use-current-timestamp.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { APPLICATION_ICON_URL, SCHEDULE_DESCRIPTION } from "~/utility/constants.js";
import { DyeTypeToEmoji } from "~/utility/emojis.js";
import { SCHEDULE_TYPE_TO_WIKI_KEY } from "~/utility/schedule.js";
import { formatClockTimes, type TimePreferences } from "~/utility/time.js";
import { getTimePreferences } from "~/utility/time.server";
import type { Route } from "./+types/schedule.js";

const SHARD_ERUPTION_PAGE_HREF = "/shard-eruption" as const;

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title: loaderData.title },
		{ name: "description", content: SCHEDULE_DESCRIPTION },
		{ name: "theme-color", content: "#49add8" },
		{ property: "og:title", content: loaderData.title },
		{ property: "og:description", content: SCHEDULE_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: APPLICATION_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: loaderData.title },
		{ name: "twitter:description", content: SCHEDULE_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

function daysUntil(date: Temporal.ZonedDateTime, now: Temporal.ZonedDateTime) {
	return date.toPlainDateTime().since(now.toPlainDateTime(), { largestUnit: "day" }).total("days");
}

function isDistant(date: Temporal.ZonedDateTime, now: Temporal.ZonedDateTime) {
	return daysUntil(date, now) > 1;
}

function formatTimestamp(
	date: Temporal.ZonedDateTime,
	{ locale, timeZone, hour12 }: TimePreferences,
	withDate: boolean,
	timeStyle: "medium" | "short" = "short",
) {
	return new Intl.DateTimeFormat(locale, {
		dateStyle: withDate ? "medium" : undefined,
		timeStyle,
		timeZone,
		hour12,
	}).format(date.epochMilliseconds);
}

function formatRelativeTime(
	date: Temporal.ZonedDateTime,
	now: Temporal.ZonedDateTime,
	{ locale }: TimePreferences,
) {
	const relativeTimeFormat = new Intl.RelativeTimeFormat(locale, { numeric: "always" });
	const differenceInMinutes = Math.round(date.since(now).total("minutes"));

	if (Math.abs(differenceInMinutes) < 60) {
		return relativeTimeFormat.format(differenceInMinutes, "minute");
	}

	const differenceInHours = Math.round(date.since(now).total("hours"));

	if (Math.abs(differenceInHours) < 24) {
		return relativeTimeFormat.format(differenceInHours, "hour");
	}

	return relativeTimeFormat.format(Math.round(daysUntil(date, now)), "day");
}

interface SchedulePresentation {
	readonly timeStyle?: "medium";
	readonly startShowsDate?: (now: Temporal.ZonedDateTime) => boolean;
}

const SCHEDULE_PRESENTATION: Readonly<Partial<Record<ScheduleTypes, SchedulePresentation>>> = {
	[ScheduleType.ShardEruption]: { timeStyle: "medium" },
	[ScheduleType.DreamsSkater]: { startShowsDate: (now) => now.dayOfWeek < 5 },
};

const enum DisplayCardType {
	Season = 0,
	Event = 1,
	Schedule = 2,
	Maintenance = 3,
	Update = 4,
}

const enum DisplayCardBadge {
	Season = 0,
	Event = 1,
	TravellingSpirit = 2,
	Light = 3,
	ReturningSpirits = 4,
}

const BADGE_STYLES: Readonly<
	Record<DisplayCardBadge, { className: string; labelKey: string | null }>
> = {
	[DisplayCardBadge.Season]: {
		className: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300",
		labelKey: "general:season",
	},
	[DisplayCardBadge.Event]: {
		className: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
		labelKey: "general:event",
	},
	[DisplayCardBadge.TravellingSpirit]: {
		className: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
		labelKey: "general:travelling-spirit-initialism",
	},
	[DisplayCardBadge.ReturningSpirits]: {
		className: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
		labelKey: null,
	},
	[DisplayCardBadge.Light]: {
		className: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
		labelKey: "general:light",
	},
};

const SCHEDULE_BADGES: Readonly<Partial<Record<ScheduleTypes, DisplayCardBadge>>> = {
	[ScheduleType.TravellingSpirit]: DisplayCardBadge.TravellingSpirit,
	[ScheduleType.ReturningSpirits]: DisplayCardBadge.ReturningSpirits,
	[ScheduleType.PollutedGeyser]: DisplayCardBadge.Light,
	[ScheduleType.Grandma]: DisplayCardBadge.Light,
	[ScheduleType.Turtle]: DisplayCardBadge.Light,
	[ScheduleType.DreamsSkater]: DisplayCardBadge.Light,
};

interface DisplayCard {
	type: DisplayCardType;
	badge?: DisplayCardBadge | undefined;
	key: string;
	labelKey: string;
	version?: string | undefined;
	wikiKey?: string | undefined;
	spiritIds?: readonly SpiritIds[] | undefined;
	dyeIcons?: readonly { label: string; url: string }[] | undefined;
	pageHref?: string | undefined;
	active: boolean;
	next: string;
	nextUnix: number;
	relative: string;
	end?: string | null | undefined;
	endRelative?: string | null | undefined;
	endUnix?: number | null | undefined;
}

interface RecurringEventGroup {
	source: readonly {
		start: Temporal.ZonedDateTime;
		end: Temporal.ZonedDateTime;
		dyes?: readonly (keyof typeof DyeTypeToEmoji)[] | undefined;
	}[];
	key: string;
	labelKey: string;
}

function periodTiming(
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
	now: Temporal.ZonedDateTime,
	preferences: TimePreferences,
) {
	const active = Temporal.ZonedDateTime.compare(now, start) >= 0;
	const date = active ? end : start;
	const timestamp = formatTimestamp(date, preferences, isDistant(date, now));
	const relative = formatRelativeTime(date, now, preferences);

	return {
		active,
		next: timestamp,
		nextUnix: date.epochMilliseconds,
		relative,
		end: active ? timestamp : null,
		endRelative: active ? relative : null,
		endUnix: end.epochMilliseconds,
	};
}

function buildScheduleView(timestamp: number, preferences: TimePreferences) {
	const now = Temporal.Instant.fromEpochMilliseconds(timestamp).toZonedDateTimeISO(TIME_ZONE);
	const cards: DisplayCard[] = [];

	for (const { type, resolve } of SCHEDULES) {
		const occurrence = resolve(now);
		const { timeStyle, startShowsDate } = SCHEDULE_PRESENTATION[type] ?? {};

		if (!occurrence) {
			continue;
		}

		const { start, end, active, spiritId, spiritIds } = occurrence;

		cards.push({
			type: DisplayCardType.Schedule,
			badge: SCHEDULE_BADGES[type],
			key: `${type}`,
			labelKey: spiritId ? `general:spirits.${spiritId}` : ScheduleTypeToLocaleKey[type],
			wikiKey: spiritId ? `general:spirit-wiki.${spiritId}` : SCHEDULE_TYPE_TO_WIKI_KEY[type],
			spiritIds,
			pageHref: type === ScheduleType.ShardEruption ? SHARD_ERUPTION_PAGE_HREF : undefined,
			active: active ?? false,
			next: formatTimestamp(
				start,
				preferences,
				startShowsDate?.(now) ?? isDistant(start, now),
				timeStyle,
			),
			nextUnix: start.epochMilliseconds,
			relative: formatRelativeTime(start, now, preferences),
			end: end ? formatTimestamp(end, preferences, isDistant(end, now)) : null,
			endRelative: end ? formatRelativeTime(end, now, preferences) : null,
			endUnix: end?.epochMilliseconds ?? null,
		});
	}

	const season = skyCurrentSeason(now);
	const nextSeason = skyUpcomingSeason(now);

	for (const displayedSeason of [season, nextSeason]) {
		if (!displayedSeason) {
			continue;
		}

		cards.push({
			type: DisplayCardType.Season,
			badge: DisplayCardBadge.Season,
			key: `season-${displayedSeason.id}`,
			labelKey: `general:seasons.${displayedSeason.id}`,
			wikiKey: `general:season-wiki.${displayedSeason.id}`,
			...periodTiming(displayedSeason.start, displayedSeason.end, now, preferences),
		});
	}

	for (const { id, name, start, end } of skyNotEndedEvents(now).values()) {
		cards.push({
			type: DisplayCardType.Event,
			badge: DisplayCardBadge.Event,
			key: `event-${id}`,
			labelKey: `general:${name}`,
			wikiKey: `general:event-wiki.${id}`,
			...periodTiming(start, end, now, preferences),
		});
	}

	const recurringEvents: readonly RecurringEventGroup[] = [
		{
			source: RADIANCE_EVENTS,
			key: "radiance",
			labelKey: "general:event-names.radiance-event",
		},
		...[season, nextSeason]
			.filter((displayedSeason) => displayedSeason !== null)
			.map((displayedSeason) => ({
				source: displayedSeason.doubleSeasonalLight ?? [],
				key: `double-seasonal-light-${displayedSeason.id}`,
				labelKey: "general:event-names.double-seasonal-light",
			})),
		{
			source: TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
			key: "double-treasure-candle",
			labelKey: "general:event-names.double-treasure-candles",
		},
		{
			source: DOUBLE_HEART_EVENTS,
			key: "double-heart",
			labelKey: "general:event-names.double-hearts",
		},
	];

	for (const { source, key, labelKey } of recurringEvents) {
		for (const { start, end, dyes } of source) {
			if (Temporal.ZonedDateTime.compare(end, now) <= 0) {
				continue;
			}

			cards.push({
				type: DisplayCardType.Event,
				badge: DisplayCardBadge.Event,
				key: `${key}-${start.epochMilliseconds}`,
				labelKey,
				dyeIcons: dyes?.map((dye) => {
					const emoji = DyeTypeToEmoji[dye];
					return { label: emoji.name.replace("_", " "), url: formatEmojiURL(emoji.id) };
				}),
				...periodTiming(start, end, now, preferences),
			});
		}
	}

	const upcomingMaintenance = MAINTENANCE_PERIODS.find(
		(period) => Temporal.ZonedDateTime.compare(now, period.start) < 0,
	);

	if (upcomingMaintenance) {
		cards.push({
			type: DisplayCardType.Maintenance,
			key: "maintenance",
			labelKey: "general:maintenance",
			active: false,
			next: formatTimestamp(
				upcomingMaintenance.start,
				preferences,
				isDistant(upcomingMaintenance.start, now),
			),
			nextUnix: upcomingMaintenance.start.epochMilliseconds,
			relative: formatRelativeTime(upcomingMaintenance.start, now, preferences),
		});
	}

	const today = now.withTimeZone(preferences.timeZone).toPlainDate();
	const upcomingUpdate = upcomingPatchNote(today.toString());

	if (upcomingUpdate) {
		const date = Temporal.PlainDate.from(upcomingUpdate.date);
		const start = date.toZonedDateTime(preferences.timeZone);

		cards.push({
			type: DisplayCardType.Update,
			key: `update-${upcomingUpdate.date}`,
			labelKey: "features:schedule.update-version",
			version: patchNoteVersion(upcomingUpdate.identifier),
			active: false,
			next: new Intl.DateTimeFormat(preferences.locale, {
				dateStyle: "medium",
				timeZone: preferences.timeZone,
			}).format(start.epochMilliseconds),
			nextUnix: start.epochMilliseconds,
			relative: new Intl.RelativeTimeFormat(preferences.locale, { numeric: "auto" }).format(
				today.until(date).days,
				"day",
			),
		});
	}

	const active: DisplayCard[] = [];
	const upcoming: DisplayCard[] = [];

	for (const card of cards) {
		if (card.active) {
			active.push(card);
		} else {
			upcoming.push(card);
		}
	}

	active.sort(
		(a, b) => (b.endUnix ?? Number.POSITIVE_INFINITY) - (a.endUnix ?? Number.POSITIVE_INFINITY),
	);

	upcoming.sort((a, b) => a.nextUnix - b.nextUnix);

	const maintenances = MAINTENANCE_PERIODS.filter((period) =>
		isActive(period.start, period.end, now),
	).map((period) => ({
		key: period.start.epochMilliseconds,
		start: formatTimestamp(period.start, preferences, false),
		end: formatTimestamp(period.end, preferences, false),
	}));

	return { active, upcoming, maintenances, ...formatClockTimes(timestamp, preferences) };
}

export const loader = ({ request, context }: Route.LoaderArgs) => {
	const initialTimestamp = Date.now();
	const preferences = getTimePreferences(request, context);
	const t = getInstance(context).getFixedT(getLocale(context));

	return {
		initialTimestamp,
		...preferences,
		initialView: buildScheduleView(initialTimestamp, preferences),
		title: t("schedule.name", { ns: "features" }),
	};
};

function DisplayCardRow({
	item,
	locale,
	timeZoneEstimated,
}: {
	item: DisplayCard;
	locale: string;
	timeZoneEstimated: boolean;
}) {
	const { t } = useTranslation();

	const timestamp = item.active
		? t("schedule.overview-ends-timestamp", {
				ns: "features",
				timestamp: item.end,
			})
		: item.next;

	const relative = item.active ? item.endRelative : item.relative;
	const wikiHref = item.wikiKey && t(item.wikiKey);
	const badge = item.badge === undefined ? undefined : BADGE_STYLES[item.badge];

	const spiritLinks = item.spiritIds?.map((spiritId) => ({
		id: spiritId,
		label: t(`spirits.${spiritId}`, { ns: "general" }),
		href: t(`spirit-wiki.${spiritId}`, { ns: "general" }),
	}));

	return (
		<div className="col-span-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-2 md:grid-cols-subgrid">
			<span className="min-w-0">
				<span className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
					{item.type === DisplayCardType.Maintenance && (
						<AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
					)}
					{item.pageHref ? (
						<Link className="regular-link" to={item.pageHref}>
							{t(item.labelKey, { version: item.version })}
						</Link>
					) : (
						t(item.labelKey, { version: item.version })
					)}
					{item.dyeIcons && (
						<span className="inline-flex items-center gap-1">
							{item.dyeIcons.map((emoji, index) => (
								<span
									aria-label={emoji.label}
									className="discord-emoji h-4 w-4"
									key={`${item.key}-${index}`}
									role="img"
									style={{ backgroundImage: `url(${emoji.url})` }}
								/>
							))}
						</span>
					)}
				</span>
				{spiritLinks && (
					<span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
						<ExternalLinkList items={spiritLinks} locale={locale} />
					</span>
				)}
			</span>
			<div className="flex shrink-0 items-center gap-3 md:contents">
				<span className="flex items-center">
					{badge && (
						<span
							className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${badge.className}`}
						>
							{badge.labelKey ? t(badge.labelKey) : "RS"}
						</span>
					)}
				</span>
				<span className="w-15 shrink-0 text-sm font-medium">
					{wikiHref && (
						<a
							className="regular-link inline-flex items-center gap-1"
							href={wikiHref}
							rel="noopener noreferrer"
							target="_blank"
						>
							{t("wiki", { ns: "general" })}
							<ExternalLinkIcon className="h-3.5 w-3.5" />
						</a>
					)}
				</span>
			</div>
			<span className="col-span-2 text-sm text-gray-500 md:col-span-1 md:text-right md:whitespace-nowrap dark:text-gray-400">
				{timeZoneEstimated ? <SkeletonText>{timestamp}</SkeletonText> : timestamp}{" "}
				{relative && <span className="text-gray-400 dark:text-gray-500">({relative})</span>}
			</span>
		</div>
	);
}

export default function Schedule({ loaderData }: Route.ComponentProps) {
	const { initialTimestamp, locale, timeZone, timeZoneEstimated, hour12, initialView } = loaderData;
	const { t } = useTranslation();
	const currentTimestamp = useCurrentTimestamp(initialTimestamp);

	const { active, upcoming, maintenances, localTime, skyTime } =
		currentTimestamp === initialTimestamp
			? initialView
			: buildScheduleView(currentTimestamp, { locale, timeZone, hour12 });

	const maintenanceDescription =
		maintenances.length === 1
			? t("maintenance-description-singular", {
					ns: "general",
					start: maintenances[0]!.start,
					end: maintenances[0]!.end,
				})
			: null;

	return (
		<CentredSitePage>
			<div className="w-full max-w-2xl space-y-4">
				<TimeTopBar
					localTime={timeZoneEstimated ? <SkeletonText>{localTime}</SkeletonText> : localTime}
					skyTime={skyTime}
				/>
				{maintenances.length > 0 && (
					<div className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 shadow-xl dark:border-amber-800 dark:bg-amber-950/40">
						<AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
						<div>
							<p className="m-0 text-sm font-medium text-amber-800 dark:text-amber-200">
								{t("maintenance", { ns: "general" })}
							</p>
							{maintenances.length === 1 ? (
								<p className="m-0 text-xs text-amber-700 dark:text-amber-300">
									{timeZoneEstimated ? (
										<SkeletonText>{maintenanceDescription}</SkeletonText>
									) : (
										maintenanceDescription
									)}
								</p>
							) : (
								<>
									<p className="m-0 text-xs text-amber-700 dark:text-amber-300">
										{t("maintenance-description-many", { ns: "general" })}
									</p>
									<ul className="m-0 list-disc ps-4 text-xs text-amber-600 dark:text-amber-400">
										{maintenances.map((maintenance) => {
											const range = t("time-range", {
												ns: "general",
												start: maintenance.start,
												end: maintenance.end,
											});

											return (
												<li key={maintenance.key}>
													{timeZoneEstimated ? <SkeletonText>{range}</SkeletonText> : range}
												</li>
											);
										})}
									</ul>
								</>
							)}
						</div>
					</div>
				)}
				<div className="grid grid-cols-[minmax(0,1fr)_auto_auto_0px] gap-y-4 md:grid-cols-[minmax(0,1fr)_5rem_3.75rem_auto]">
					{/* Active. */}
					{active.length > 0 && (
						<div className="col-span-4 grid grid-cols-subgrid rounded-xl border border-gray-200 bg-white px-4 pt-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
							<div className="col-span-4 mt-1 mb-2">
								<span className="rounded bg-green-100 px-2 py-0.5 text-sm font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
									{t("schedule.overview-active", { ns: "features" })}
								</span>
							</div>
							<div className="col-span-4 grid grid-cols-subgrid divide-y divide-gray-100 dark:divide-gray-800">
								{active.map((item) => (
									<DisplayCardRow
										item={item}
										key={item.key}
										locale={locale}
										timeZoneEstimated={timeZoneEstimated}
									/>
								))}
							</div>
						</div>
					)}
					{/* Upcoming. */}
					<div className="col-span-4 grid grid-cols-subgrid rounded-xl border border-gray-200 bg-white px-4 pt-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
						<div className="col-span-4 mt-1 mb-2">
							<span className="rounded bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
								{t("schedule.overview-upcoming", { ns: "features" })}
							</span>
						</div>
						<div className="col-span-4 grid grid-cols-subgrid divide-y divide-gray-100 dark:divide-gray-800">
							{upcoming.map((item) => (
								<DisplayCardRow
									item={item}
									key={item.key}
									locale={locale}
									timeZoneEstimated={timeZoneEstimated}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</CentredSitePage>
	);
}
