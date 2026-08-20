import { AlertTriangle, ExternalLinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	auroraSchedule,
	aviarysFireworkFestivalSchedule,
	DOUBLE_HEART_EVENTS,
	dreamsSkaterSchedule,
	formatEmojiURL,
	grandmaSchedule,
	internationalSpaceStationSchedule,
	isActive,
	MAINTENANCE_PERIODS,
	meteorShowerSchedule,
	nextDailyReset,
	nextEyeOfEden,
	nextNestingWorkshop,
	nextPassage,
	nineColouredDeerSchedule,
	pollutedGeyserSchedule,
	projectorOfMemoriesSchedule,
	RADIANCE_EVENTS,
	returningSpiritsSchedule,
	ScheduleType,
	type ScheduleTypes,
	type SpiritIds,
	shardEruptionSchedule,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyUpcomingSeason,
	TIME_ZONE,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	travellingSpiritSchedule,
	turtleSchedule,
	vaultEldersBlessingSchedule,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { ExternalLinkList, type ExternalLinkListItem } from "~/components/ExternalLinkList";
import { CentredSitePage } from "~/components/PageLayout";
import { TimeTopBar } from "~/components/TimeTopBar";
import { useCurrentTimestamp } from "~/hooks/use-current-timestamp.js";
import { getLocale } from "~/middleware/i18next.js";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import { APPLICATION_NAME, SCHEDULE_DESCRIPTION, SCHEDULE_TITLE } from "~/utility/constants.js";
import { DyeTypeToEmoji } from "~/utility/emojis.js";
import { getPreferredHour12 } from "~/utility/hour-cycle.server";
import { SCHEDULE_TYPE_TO_WIKI_KEY } from "~/utility/schedule.js";
import { getPreferredTimeZone } from "~/utility/time-zone.server";
import type { Route } from "./+types/schedule.js";

export const meta: Route.MetaFunction = ({ location, matches }) => {
	const cdnURL = getCDNURLFromMatches(matches);
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Sky schedule, Sky timers, Sky events`,
		},
		{ title: SCHEDULE_TITLE },
		{ name: "description", content: SCHEDULE_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: SCHEDULE_TITLE },
		{ property: "og:description", content: SCHEDULE_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: cdnAssetURL(cdnURL, "avatar_icons/caelus.webp") },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: SCHEDULE_TITLE },
		{ name: "twitter:description", content: SCHEDULE_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

function formatRelativeTime(
	date: Temporal.ZonedDateTime,
	now: Temporal.ZonedDateTime,
	locale: string,
) {
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });
	const diffMinutes = Math.round(date.since(now).total("minutes"));
	const diffHours = Math.round(date.since(now).total("hours"));
	const diffDays = Math.round(date.since(now).total({ unit: "days", relativeTo: now }));

	if (Math.abs(diffMinutes) < 60) {
		return rtf.format(diffMinutes, "minute");
	}

	if (Math.abs(diffHours) < 24) {
		return rtf.format(diffHours, "hour");
	}

	return rtf.format(diffDays, "day");
}

interface BaseSchedule<Type extends ScheduleTypes> {
	type: Type;
	now?: boolean | SpiritIds;
	next: string;
	nextUnix: number;
	relative: string;
	end?: string;
	endUnix?: number | null;
	endRelative?: string | null;
}

interface ScheduleWithEnd<
	Type extends Exclude<
		ScheduleTypes,
		| typeof ScheduleType.DailyReset
		| typeof ScheduleType.EyeOfEden
		| typeof ScheduleType.Passage
		| typeof ScheduleType.NestingWorkshop
	>,
> extends BaseSchedule<Type> {
	now: Required<BaseSchedule<Type>>["now"];
	end: string;
	endUnix: number | null;
	endRelative: string | null;
}

interface ScheduleTravellingSpirit extends ScheduleWithEnd<typeof ScheduleType.TravellingSpirit> {
	now: SpiritIds | false;
	spiritId: SpiritIds | null;
}

interface ScheduleReturningSpirits extends ScheduleWithEnd<typeof ScheduleType.ReturningSpirits> {
	spiritIds: readonly SpiritIds[];
}

function dailyResetNext(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): BaseSchedule<typeof ScheduleType.DailyReset> {
	const schedule = nextDailyReset(now);

	return {
		type: ScheduleType.DailyReset,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.epochMilliseconds,
		),
		nextUnix: schedule.epochMilliseconds,
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function eyeOfEdenNext(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): BaseSchedule<typeof ScheduleType.EyeOfEden> {
	const schedule = nextEyeOfEden(now);
	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

	if (schedule.since(now).total({ unit: "days", relativeTo: now }) > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.EyeOfEden,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.epochMilliseconds),
		nextUnix: schedule.epochMilliseconds,
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function internationalSpaceStationOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.InternationalSpaceStation> | null {
	const schedule = internationalSpaceStationSchedule(now);

	if (!schedule) {
		return null;
	}

	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

	if (schedule.start.since(now).total({ unit: "days", relativeTo: now }) > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.InternationalSpaceStation,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.start.epochMilliseconds),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function travellingSpiritOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleTravellingSpirit {
	const schedule = travellingSpiritSchedule(now);
	const startOptions: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };
	const endOptions: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

	if (schedule.start.since(now).total({ unit: "days", relativeTo: now }) > 1) {
		startOptions.dateStyle = "medium";
	}

	if (
		schedule.visit &&
		schedule.visit.end.since(now).total({ unit: "days", relativeTo: now }) > 1
	) {
		endOptions.dateStyle = "medium";
	}

	return {
		type: ScheduleType.TravellingSpirit,
		now: schedule.visit?.spiritId ?? false,
		spiritId: schedule.spirit?.spiritId ?? null,
		next: new Intl.DateTimeFormat(locale, startOptions).format(schedule.start.epochMilliseconds),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, endOptions).format(schedule.visit?.end.epochMilliseconds),
		endUnix: schedule.visit ? schedule.visit.end.epochMilliseconds : null,
		endRelative: schedule.visit ? formatRelativeTime(schedule.visit.end, now, locale) : null,
	};
}

function returningSpiritsOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleReturningSpirits | null {
	const schedule = returningSpiritsSchedule(now);

	if (!schedule) {
		return null;
	}

	const startOptions: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };
	const endOptions: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

	if (schedule.start.since(now).total({ unit: "days", relativeTo: now }) > 1) {
		startOptions.dateStyle = "medium";
	}

	if (schedule.end.since(now).total({ unit: "days", relativeTo: now }) > 1) {
		endOptions.dateStyle = "medium";
	}

	return {
		type: ScheduleType.ReturningSpirits,
		now: schedule.active,
		spiritIds: schedule.spiritIds,
		next: new Intl.DateTimeFormat(locale, startOptions).format(schedule.start.epochMilliseconds),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, endOptions).format(schedule.end.epochMilliseconds),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function pollutedGeyserOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.PollutedGeyser> {
	const schedule = pollutedGeyserSchedule(now);

	return {
		type: ScheduleType.PollutedGeyser,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.start.epochMilliseconds,
		),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function grandmaOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.Grandma> {
	const schedule = grandmaSchedule(now);

	return {
		type: ScheduleType.Grandma,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.start.epochMilliseconds,
		),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function turtleOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.Turtle> {
	const schedule = turtleSchedule(now);

	return {
		type: ScheduleType.Turtle,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.start.epochMilliseconds,
		),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function shardEruptionOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.ShardEruption> {
	const schedule = shardEruptionSchedule(now);

	return {
		type: ScheduleType.ShardEruption,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "medium", timeZone, hour12 }).format(
			schedule.start.epochMilliseconds,
		),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function dreamsSkaterOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.DreamsSkater> | null {
	const schedule = dreamsSkaterSchedule(now);

	if (!schedule) {
		return null;
	}

	const options: Intl.DateTimeFormatOptions = { timeStyle: "short", timeZone, hour12 };

	if (now.dayOfWeek < 5) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.DreamsSkater,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.start.epochMilliseconds),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function auroraOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.AURORA> {
	const schedule = auroraSchedule(now);

	return {
		type: ScheduleType.AURORA,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.start.epochMilliseconds,
		),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function passageNext(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): BaseSchedule<typeof ScheduleType.Passage> | null {
	const schedule = nextPassage(now);

	if (!schedule) {
		return null;
	}

	return {
		type: ScheduleType.Passage,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.epochMilliseconds,
		),
		nextUnix: schedule.epochMilliseconds,
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function aviarysFireworkFestivalOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.AviarysFireworkFestival> | null {
	const schedule = aviarysFireworkFestivalSchedule(now);

	if (!schedule) {
		return null;
	}

	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

	if (schedule.start.since(now).total({ unit: "days", relativeTo: now }) > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.AviarysFireworkFestival,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.start.epochMilliseconds),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function meteorShowerOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.MeteorShower> | null {
	const schedule = meteorShowerSchedule(now);

	if (!schedule) {
		return null;
	}

	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

	if (schedule.start.since(now).total({ unit: "days", relativeTo: now }) > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.MeteorShower,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.start.epochMilliseconds),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, options).format(schedule.end.epochMilliseconds),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function nineColouredDeerOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.NineColouredDeer> {
	const schedule = nineColouredDeerSchedule(now);

	return {
		type: ScheduleType.NineColouredDeer,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.start.epochMilliseconds,
		),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function nestingWorkshopNext(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): BaseSchedule<typeof ScheduleType.NestingWorkshop> {
	const schedule = nextNestingWorkshop(now);
	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

	if (schedule.since(now).total({ unit: "days", relativeTo: now }) > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.NestingWorkshop,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.epochMilliseconds),
		nextUnix: schedule.epochMilliseconds,
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function vaultEldersBlessingOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.VaultEldersBlessing> | null {
	const schedule = vaultEldersBlessingSchedule(now);

	if (!schedule) {
		return null;
	}

	return {
		type: ScheduleType.VaultEldersBlessing,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.start.epochMilliseconds,
		),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function projectorOfMemoriesOverview(
	now: Temporal.ZonedDateTime,
	timeZone: string,
	locale: string,
	hour12: boolean | undefined,
): ScheduleWithEnd<typeof ScheduleType.ProjectorOfMemories> | null {
	const schedule = projectorOfMemoriesSchedule(now);

	if (!schedule) {
		return null;
	}

	return {
		type: ScheduleType.ProjectorOfMemories,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.start.epochMilliseconds,
		),
		nextUnix: schedule.start.epochMilliseconds,
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 }).format(
			schedule.end.epochMilliseconds,
		),
		endUnix: schedule.end.epochMilliseconds,
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	return {
		initialTimestamp: Date.now(),
		locale: getLocale(context),
		timeZone: await getPreferredTimeZone(request),
		hour12: getPreferredHour12(request),
	};
};

interface DisplayCardBase {
	type: DisplayCardType;
	badge?: DisplayCardBadge | undefined;
	key: string;
	label: string;
	spiritLinks?: readonly ExternalLinkListItem[] | undefined;
	dyeIcons?: readonly { label: string; url: string }[] | undefined;
	wikiHref?: string | undefined;
	pageHref?: string | undefined;
}

interface KnownDisplayCard extends DisplayCardBase {
	active: boolean;
	next: string;
	nextUnix: number;
	relative: string;
	end?: string | null | undefined;
	endRelative?: string | null | undefined;
	endUnix?: number | null | undefined;
}

const enum DisplayCardType {
	Season = 0,
	Event = 1,
	Schedule = 2,
	Maintenance = 3,
}

const enum DisplayCardBadge {
	Season = 0,
	Event = 1,
	TravellingSpirit = 2,
	Light = 3,
	ReturningSpirits = 4,
}

function DisplayCardRow({ item, locale }: { item: KnownDisplayCard; locale: string }) {
	const { t } = useTranslation();
	const timestamp = item.active
		? t("schedule.overview-ends-timestamp", {
				ns: "features",
				timestamp: item.end,
			})
		: item.next;
	const relative = item.active ? item.endRelative : item.relative;
	const spiritLinks = item.spiritLinks;

	return (
		<div className="col-span-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-2 md:grid-cols-subgrid">
			<span className="min-w-0">
				<span className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
					{item.type === DisplayCardType.Maintenance && (
						<AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
					)}
					{item.pageHref ? (
						<Link className="regular-link" to={item.pageHref}>
							{item.label}
						</Link>
					) : (
						item.label
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
					{item.badge === DisplayCardBadge.Season && (
						<span className="inline-flex items-center rounded bg-sky-100 px-1.5 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900 dark:text-sky-300">
							{t("season", { ns: "general" })}
						</span>
					)}
					{item.badge === DisplayCardBadge.Event && (
						<span className="inline-flex items-center rounded bg-rose-100 px-1.5 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-900 dark:text-rose-300">
							{t("event", { ns: "general" })}
						</span>
					)}
					{item.badge === DisplayCardBadge.TravellingSpirit && (
						<span className="inline-flex items-center rounded bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900 dark:text-violet-300">
							{t("travelling-spirit-initialism", { ns: "general" })}
						</span>
					)}
					{item.badge === DisplayCardBadge.ReturningSpirits && (
						<span className="inline-flex items-center rounded bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900 dark:text-violet-300">
							RS
						</span>
					)}
					{item.badge === DisplayCardBadge.Light && (
						<span className="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900 dark:text-amber-300">
							{t("light", { ns: "general" })}
						</span>
					)}
				</span>
				<span className="w-15 shrink-0 text-sm font-medium">
					{item.wikiHref && (
						<a
							className="regular-link inline-flex items-center gap-1"
							href={item.wikiHref}
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
				{timestamp}{" "}
				{relative && <span className="text-gray-400 dark:text-gray-500">({relative})</span>}
			</span>
		</div>
	);
}

export default function Schedule({ loaderData }: Route.ComponentProps) {
	const { initialTimestamp, locale, timeZone, hour12 } = loaderData;
	const { t } = useTranslation();
	const currentTimestamp = useCurrentTimestamp(initialTimestamp);

	const now =
		Temporal.Instant.fromEpochMilliseconds(currentTimestamp).toZonedDateTimeISO(TIME_ZONE);

	const schedules = [
		dailyResetNext(now, timeZone, locale, hour12),
		eyeOfEdenNext(now, timeZone, locale, hour12),
		internationalSpaceStationOverview(now, timeZone, locale, hour12),
		travellingSpiritOverview(now, timeZone, locale, hour12),
		returningSpiritsOverview(now, timeZone, locale, hour12),
		pollutedGeyserOverview(now, timeZone, locale, hour12),
		grandmaOverview(now, timeZone, locale, hour12),
		turtleOverview(now, timeZone, locale, hour12),
		shardEruptionOverview(now, timeZone, locale, hour12),
		dreamsSkaterOverview(now, timeZone, locale, hour12),
		auroraOverview(now, timeZone, locale, hour12),
		passageNext(now, timeZone, locale, hour12),
		aviarysFireworkFestivalOverview(now, timeZone, locale, hour12),
		nineColouredDeerOverview(now, timeZone, locale, hour12),
		meteorShowerOverview(now, timeZone, locale, hour12),
		nestingWorkshopNext(now, timeZone, locale, hour12),
		vaultEldersBlessingOverview(now, timeZone, locale, hour12),
		projectorOfMemoriesOverview(now, timeZone, locale, hour12),
	].filter((schedule) => schedule !== null) satisfies readonly BaseSchedule<ScheduleTypes>[];
	const scheduleBadges: Partial<Record<ScheduleTypes, DisplayCardBadge>> = {
		[ScheduleType.TravellingSpirit]: DisplayCardBadge.TravellingSpirit,
		[ScheduleType.ReturningSpirits]: DisplayCardBadge.ReturningSpirits,
		[ScheduleType.PollutedGeyser]: DisplayCardBadge.Light,
		[ScheduleType.Grandma]: DisplayCardBadge.Light,
		[ScheduleType.Turtle]: DisplayCardBadge.Light,
		[ScheduleType.DreamsSkater]: DisplayCardBadge.Light,
	};

	const allCards: KnownDisplayCard[] = [];

	for (const schedule of schedules) {
		let label = t(`schedule.type.${schedule.type}`, { ns: "features" });
		const wikiKey = SCHEDULE_TYPE_TO_WIKI_KEY[schedule.type];
		let wikiHref = wikiKey ? t(wikiKey) : undefined;

		const spiritLinks =
			schedule.type === ScheduleType.ReturningSpirits
				? schedule.spiritIds.map((spiritId) => ({
						id: spiritId,
						label: t(`spirits.${spiritId}`, { ns: "general" }),
						href: t(`spirit-wiki.${spiritId}`, { ns: "general" }),
					}))
				: undefined;
		const isActive = schedule.now !== undefined && schedule.now !== false;

		if (schedule.type === ScheduleType.TravellingSpirit && schedule.spiritId) {
			label = t(`spirits.${schedule.spiritId}`, { ns: "general" });
			wikiHref = t(`spirit-wiki.${schedule.spiritId}`, { ns: "general" });
		}

		allCards.push({
			type: DisplayCardType.Schedule,
			badge: scheduleBadges[schedule.type],
			key: `${schedule.type}`,
			label,
			spiritLinks,
			wikiHref,
			pageHref: schedule.type === ScheduleType.ShardEruption ? "/shard-eruption" : undefined,
			active: isActive,
			next: schedule.next,
			nextUnix: schedule.nextUnix,
			relative: schedule.relative,
			end: schedule.end,
			endRelative: schedule.endRelative,
			endUnix: "endUnix" in schedule ? schedule.endUnix : undefined,
		});
	}

	const season = skyCurrentSeason(now);

	if (season) {
		const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

		if (season.end.since(now).total({ unit: "days", relativeTo: now }) > 1) {
			options.dateStyle = "medium";
		}

		const seasonName = t(`seasons.${season.id}`, { ns: "general" });
		allCards.push({
			type: DisplayCardType.Season,
			badge: DisplayCardBadge.Season,
			key: `season-${season.id}`,
			label: seasonName,
			wikiHref: t(`season-wiki.${season.id}`, { ns: "general" }),
			active: true,
			next: new Intl.DateTimeFormat(locale, options).format(season.end.epochMilliseconds),
			nextUnix: season.end.epochMilliseconds,
			relative: formatRelativeTime(season.end, now, locale),
			end: new Intl.DateTimeFormat(locale, options).format(season.end.epochMilliseconds),
			endRelative: formatRelativeTime(season.end, now, locale),
			endUnix: season.end.epochMilliseconds,
		});
	}

	const nextSeason = skyUpcomingSeason(now);

	if (nextSeason) {
		const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

		if (nextSeason.start.since(now).total({ unit: "days", relativeTo: now }) > 1) {
			options.dateStyle = "medium";
		}

		const nextSeasonName = t(`seasons.${nextSeason.id}`, { ns: "general" });
		allCards.push({
			type: DisplayCardType.Season,
			badge: DisplayCardBadge.Season,
			key: `season-${nextSeason.id}`,
			label: nextSeasonName,
			wikiHref: t(`season-wiki.${nextSeason.id}`, { ns: "general" }),
			active: false,
			next: new Intl.DateTimeFormat(locale, options).format(nextSeason.start.epochMilliseconds),
			nextUnix: nextSeason.start.epochMilliseconds,
			relative: formatRelativeTime(nextSeason.start, now, locale),
			endUnix: nextSeason.end.epochMilliseconds,
		});
	}

	for (const { id, name, start, end } of skyNotEndedEvents(now).values()) {
		const daysUntilStart = start.since(now).total({ unit: "days", relativeTo: now });
		const eventName = t(name, { ns: "general" });

		if (daysUntilStart <= 0) {
			const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

			if (end.since(now).total({ unit: "days", relativeTo: now }) > 1) {
				options.dateStyle = "medium";
			}

			allCards.push({
				type: DisplayCardType.Event,
				badge: DisplayCardBadge.Event,
				key: `event-${id}`,
				label: eventName,
				wikiHref: t(`event-wiki.${id}`, { ns: "general" }),
				active: true,
				next: new Intl.DateTimeFormat(locale, options).format(end.epochMilliseconds),
				nextUnix: end.epochMilliseconds,
				relative: formatRelativeTime(end, now, locale),
				end: new Intl.DateTimeFormat(locale, options).format(end.epochMilliseconds),
				endRelative: formatRelativeTime(end, now, locale),
				endUnix: end.epochMilliseconds,
			});
		} else {
			const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

			if (start.since(now).total({ unit: "days", relativeTo: now }) > 1) {
				options.dateStyle = "medium";
			}

			allCards.push({
				type: DisplayCardType.Event,
				badge: DisplayCardBadge.Event,
				key: `event-${id}`,
				label: eventName,
				wikiHref: t(`event-wiki.${id}`, { ns: "general" }),
				active: false,
				next: new Intl.DateTimeFormat(locale, options).format(start.epochMilliseconds),
				nextUnix: start.epochMilliseconds,
				relative: formatRelativeTime(start, now, locale),
			});
		}
	}

	for (const { start, end, dyes } of RADIANCE_EVENTS) {
		if (Temporal.ZonedDateTime.compare(end, now) <= 0) {
			continue;
		}

		const label = t("event-names.radiance-event", { ns: "general" });
		const isActive = Temporal.ZonedDateTime.compare(now, start) >= 0;
		const relevantDate = isActive ? end : start;
		const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

		if (relevantDate.since(now).total({ unit: "days", relativeTo: now }) > 1) {
			options.dateStyle = "medium";
		}

		allCards.push({
			type: DisplayCardType.Event,
			badge: DisplayCardBadge.Event,
			key: `radiance-${start.epochMilliseconds}`,
			label,
			dyeIcons: dyes.map((dye) => {
				const emoji = DyeTypeToEmoji[dye];
				return { label: emoji.name.replace("_", " "), url: formatEmojiURL(emoji.id) };
			}),
			active: isActive,
			next: new Intl.DateTimeFormat(locale, options).format(relevantDate.epochMilliseconds),
			nextUnix: relevantDate.epochMilliseconds,
			relative: formatRelativeTime(relevantDate, now, locale),
			end: isActive
				? new Intl.DateTimeFormat(locale, options).format(end.epochMilliseconds)
				: undefined,
			endRelative: isActive ? formatRelativeTime(end, now, locale) : undefined,
			endUnix: isActive ? end.epochMilliseconds : undefined,
		});
	}

	for (const doubleSeasonalLightSeason of [season, nextSeason]) {
		if (!doubleSeasonalLightSeason) {
			continue;
		}

		for (const { start, end } of doubleSeasonalLightSeason.doubleSeasonalLight ?? []) {
			if (Temporal.ZonedDateTime.compare(end, now) <= 0) {
				continue;
			}

			const isActive = Temporal.ZonedDateTime.compare(now, start) >= 0;
			const relevantDate = isActive ? end : start;
			const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

			if (relevantDate.since(now).total({ unit: "days", relativeTo: now }) > 1) {
				options.dateStyle = "medium";
			}

			allCards.push({
				type: DisplayCardType.Event,
				badge: DisplayCardBadge.Event,
				key: `double-seasonal-light-${doubleSeasonalLightSeason.id}-${start.epochMilliseconds}`,
				label: t("event-names.double-seasonal-light", { ns: "general" }),
				active: isActive,
				next: new Intl.DateTimeFormat(locale, options).format(relevantDate.epochMilliseconds),
				nextUnix: relevantDate.epochMilliseconds,
				relative: formatRelativeTime(relevantDate, now, locale),
				end: isActive
					? new Intl.DateTimeFormat(locale, options).format(end.epochMilliseconds)
					: undefined,
				endRelative: isActive ? formatRelativeTime(end, now, locale) : undefined,
				endUnix: isActive ? end.epochMilliseconds : undefined,
			});
		}
	}

	for (const { start, end } of TREASURE_CANDLES_DOUBLE_CONFIGURATIONS) {
		if (Temporal.ZonedDateTime.compare(end, now) <= 0) {
			continue;
		}

		const isActive = Temporal.ZonedDateTime.compare(now, start) >= 0;
		const relevantDate = isActive ? end : start;
		const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

		if (relevantDate.since(now).total({ unit: "days", relativeTo: now }) > 1) {
			options.dateStyle = "medium";
		}

		allCards.push({
			type: DisplayCardType.Event,
			badge: DisplayCardBadge.Event,
			key: `double-treasure-candle-${start.epochMilliseconds}`,
			label: t("event-names.double-treasure-candles", { ns: "general" }),
			active: isActive,
			next: new Intl.DateTimeFormat(locale, options).format(relevantDate.epochMilliseconds),
			nextUnix: relevantDate.epochMilliseconds,
			relative: formatRelativeTime(relevantDate, now, locale),
			end: isActive
				? new Intl.DateTimeFormat(locale, options).format(end.epochMilliseconds)
				: undefined,
			endRelative: isActive ? formatRelativeTime(end, now, locale) : undefined,
			endUnix: isActive ? end.epochMilliseconds : undefined,
		});
	}

	for (const { start, end } of DOUBLE_HEART_EVENTS) {
		if (Temporal.ZonedDateTime.compare(end, now) <= 0) {
			continue;
		}

		const isActive = Temporal.ZonedDateTime.compare(now, start) >= 0;
		const relevantDate = isActive ? end : start;
		const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

		if (relevantDate.since(now).total({ unit: "days", relativeTo: now }) > 1) {
			options.dateStyle = "medium";
		}

		allCards.push({
			type: DisplayCardType.Event,
			badge: DisplayCardBadge.Event,
			key: `double-heart-${start.epochMilliseconds}`,
			label: t("event-names.double-hearts", { ns: "general" }),
			active: isActive,
			next: new Intl.DateTimeFormat(locale, options).format(relevantDate.epochMilliseconds),
			nextUnix: relevantDate.epochMilliseconds,
			relative: formatRelativeTime(relevantDate, now, locale),
			end: isActive
				? new Intl.DateTimeFormat(locale, options).format(end.epochMilliseconds)
				: undefined,
			endRelative: isActive ? formatRelativeTime(end, now, locale) : undefined,
			endUnix: isActive ? end.epochMilliseconds : undefined,
		});
	}

	const active: KnownDisplayCard[] = [];
	const upcoming: KnownDisplayCard[] = [];

	for (const card of allCards) {
		if (card.active) {
			active.push(card);
		} else {
			upcoming.push(card);
		}
	}

	active.sort(
		(a, b) => (b.endUnix ?? Number.POSITIVE_INFINITY) - (a.endUnix ?? Number.POSITIVE_INFINITY),
	);

	const activeMaintenances = MAINTENANCE_PERIODS.filter((period) =>
		isActive(period.start, period.end, now),
	);

	const upcomingMaintenance = MAINTENANCE_PERIODS.find(
		(period) => Temporal.ZonedDateTime.compare(now, period.start) < 0,
	);

	if (upcomingMaintenance) {
		const startOptions: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short", hour12 };

		if (upcomingMaintenance.start.since(now).total({ unit: "days", relativeTo: now }) > 1) {
			startOptions.dateStyle = "medium";
		}

		upcoming.push({
			type: DisplayCardType.Maintenance,
			key: "maintenance",
			label: t("maintenance", { ns: "general" }),
			active: false,
			next: new Intl.DateTimeFormat(locale, startOptions).format(
				upcomingMaintenance.start.epochMilliseconds,
			),
			nextUnix: upcomingMaintenance.start.epochMilliseconds,
			relative: formatRelativeTime(upcomingMaintenance.start, now, locale),
		});
	}

	upcoming.sort((a, b) => a.nextUnix - b.nextUnix);

	const localTime = new Intl.DateTimeFormat(locale, {
		hour: "2-digit",
		minute: "2-digit",
		timeZone,
		timeZoneName: "short",
		hour12,
	}).format(currentTimestamp);

	const skyTime = new Intl.DateTimeFormat(locale, {
		timeZone: TIME_ZONE,
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
		hour12,
	}).format(currentTimestamp);

	return (
		<CentredSitePage>
			<div className="w-full max-w-2xl space-y-4">
				<TimeTopBar localTime={localTime} skyTime={skyTime} />
				{activeMaintenances.length > 0 && (
					<div className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 shadow-xl dark:border-amber-800 dark:bg-amber-950/40">
						<AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
						<div>
							<p className="m-0 text-sm font-medium text-amber-800 dark:text-amber-200">
								{t("maintenance", { ns: "general" })}
							</p>
							{activeMaintenances.length === 1 ? (
								<p className="m-0 text-xs text-amber-700 dark:text-amber-300">
									{t("maintenance-description-singular", {
										ns: "general",
										start: new Intl.DateTimeFormat(locale, {
											timeStyle: "short",
											timeZone,
											hour12,
										}).format(activeMaintenances[0]!.start.epochMilliseconds),
										end: new Intl.DateTimeFormat(locale, {
											timeStyle: "short",
											timeZone,
											hour12,
										}).format(activeMaintenances[0]!.end.epochMilliseconds),
									})}
								</p>
							) : (
								<>
									<p className="m-0 text-xs text-amber-700 dark:text-amber-300">
										{t("maintenance-description-many", { ns: "general" })}
									</p>
									<ul className="m-0 list-disc ps-4 text-xs text-amber-600 dark:text-amber-400">
										{activeMaintenances.map((maintenance) => (
											<li key={maintenance.start.epochMilliseconds}>
												{t("time-range", {
													ns: "general",
													start: new Intl.DateTimeFormat(locale, {
														timeStyle: "short",
														timeZone,
														hour12,
													}).format(maintenance.start.epochMilliseconds),
													end: new Intl.DateTimeFormat(locale, {
														timeStyle: "short",
														timeZone,
														hour12,
													}).format(maintenance.end.epochMilliseconds),
												})}
											</li>
										))}
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
									<DisplayCardRow item={item} key={item.key} locale={locale} />
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
								<DisplayCardRow item={item} key={item.key} locale={locale} />
							))}
						</div>
					</div>
				</div>
			</div>
		</CentredSitePage>
	);
}
