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
import { CentredSitePage } from "~/components/PageLayout";
import { TimeTopBar } from "~/components/TimeTopBar";
import { useCurrentTimestamp } from "~/hooks/use-current-timestamp.js";
import { getLocale } from "~/middleware/i18next.js";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import { APPLICATION_NAME, SCHEDULE_DESCRIPTION, SCHEDULE_TITLE } from "~/utility/constants.js";
import { DyeTypeToEmoji } from "~/utility/emojis.js";
import { getPreferredHour12 } from "~/utility/hour-cycle.server";
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
): ScheduleWithEnd<typeof ScheduleType.InternationalSpaceStation> {
	const schedule = internationalSpaceStationSchedule(now);
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
): ScheduleWithEnd<typeof ScheduleType.DreamsSkater> {
	const schedule = dreamsSkaterSchedule(now);
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
): BaseSchedule<typeof ScheduleType.Passage> {
	const schedule = nextPassage(now);

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
): ScheduleWithEnd<typeof ScheduleType.AviarysFireworkFestival> {
	const schedule = aviarysFireworkFestivalSchedule(now);
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
): ScheduleWithEnd<typeof ScheduleType.VaultEldersBlessing> {
	const schedule = vaultEldersBlessingSchedule(now);

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
): ScheduleWithEnd<typeof ScheduleType.ProjectorOfMemories> {
	const schedule = projectorOfMemoriesSchedule(now);

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

interface DisplayCard {
	type: DisplayCardType;
	key: string;
	label: string;
	dyeIcons?: readonly { label: string; url: string }[] | undefined;
	link?: { href: string; text: string } | undefined;
	pageHref?: string | undefined;
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

	const allCards: DisplayCard[] = [];

	for (const schedule of schedules) {
		const label = t(`schedule.type.${schedule.type}`, { ns: "features" });
		let link: DisplayCard["link"];
		const isActive = schedule.now !== undefined && schedule.now !== false;

		if (schedule.type === ScheduleType.TravellingSpirit && schedule.spiritId) {
			const spiritName = t(`spirits.${schedule.spiritId}`, { ns: "general" });
			link = { href: t(`spirit-wiki.${schedule.spiritId}`, { ns: "general" }), text: spiritName };
		}

		allCards.push({
			type: DisplayCardType.Schedule,
			key: `${schedule.type}`,
			label,
			link,
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
			key: `season-${season.id}`,
			label: seasonName,
			link: { href: t(`season-wiki.${season.id}`, { ns: "general" }), text: seasonName },
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
			key: `season-${nextSeason.id}`,
			label: nextSeasonName,
			link: { href: t(`season-wiki.${nextSeason.id}`, { ns: "general" }), text: nextSeasonName },
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
				key: `event-${id}`,
				label: eventName,
				link: { href: t(`event-wiki.${id}`, { ns: "general" }), text: eventName },
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
				key: `event-${id}`,
				label: eventName,
				link: { href: t(`event-wiki.${id}`, { ns: "general" }), text: eventName },
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

	const active: DisplayCard[] = [];
	const upcoming: DisplayCard[] = [];

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
				{/* Active. */}
				{active.length > 0 && (
					<div className="rounded-xl border border-gray-200 bg-white px-4 pt-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
						<div className="mt-1 mb-2">
							<span className="rounded bg-green-100 px-2 py-0.5 text-sm font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
								{t("schedule.overview-active", { ns: "features" })}
							</span>
						</div>
						<div className="divide-y divide-gray-100 dark:divide-gray-800">
							{active.map((item) => (
								<div
									className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
									key={item.key}
								>
									<span className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
										{item.type === DisplayCardType.Maintenance && (
											<AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
										)}
										{item.pageHref ? (
											<Link className="regular-link" to={item.pageHref}>
												{item.label}
											</Link>
										) : item.link && item.link.text === item.label ? (
											<a
												className="regular-link inline-flex items-center"
												href={item.link.href}
												rel="noopener noreferrer"
												target="_blank"
											>
												{item.label}
												<ExternalLinkIcon className="ml-1.5 h-3.5 w-3.5" />
											</a>
										) : (
											<>
												{item.label}
												{item.link && (
													<a
														className="regular-link inline-flex items-center"
														href={item.link.href}
														rel="noopener noreferrer"
														target="_blank"
													>
														{item.link.text}
														<ExternalLinkIcon className="ml-1.5 h-3.5 w-3.5" />
													</a>
												)}
											</>
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
										{item.type === DisplayCardType.Season && (
											<span className="rounded bg-sky-100 px-1.5 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900 dark:text-sky-300">
												{t("season", { ns: "general" })}
											</span>
										)}
										{item.type === DisplayCardType.Event && (
											<span className="rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">
												{t("event", { ns: "general" })}
											</span>
										)}
									</span>
									<span className="text-sm text-gray-500 sm:text-right dark:text-gray-400">
										{t("schedule.overview-ends-timestamp", {
											ns: "features",
											timestamp: item.end,
										})}{" "}
										({item.endRelative})
									</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Upcoming. */}
				<div className="rounded-xl border border-gray-200 bg-white px-4 pt-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
					<div className="mt-1 mb-2">
						<span className="rounded bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
							{t("schedule.overview-upcoming", { ns: "features" })}
						</span>
					</div>
					<div className="divide-y divide-gray-100 dark:divide-gray-800">
						{upcoming.map((item) => (
							<div
								className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
								key={item.key}
							>
								<span className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
									{item.type === DisplayCardType.Maintenance && (
										<AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
									)}
									{item.pageHref ? (
										<Link className="regular-link" to={item.pageHref}>
											{item.label}
										</Link>
									) : item.link && item.link.text === item.label ? (
										<a
											className="regular-link inline-flex items-center"
											href={item.link.href}
											rel="noopener noreferrer"
											target="_blank"
										>
											{item.label}
											<ExternalLinkIcon className="ml-1.5 h-3.5 w-3.5" />
										</a>
									) : (
										<>
											{item.label}
											{item.link && (
												<a
													className="regular-link inline-flex items-center"
													href={item.link.href}
													rel="noopener noreferrer"
													target="_blank"
												>
													{item.link.text}
													<ExternalLinkIcon className="ml-1.5 h-3.5 w-3.5" />
												</a>
											)}
										</>
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
									{item.type === DisplayCardType.Season && (
										<span className="rounded bg-sky-100 px-1.5 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900 dark:text-sky-300">
											{t("season", { ns: "general" })}
										</span>
									)}
									{item.type === DisplayCardType.Event && (
										<span className="rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">
											{t("event", { ns: "general" })}
										</span>
									)}
								</span>
								<span className="text-sm text-gray-500 sm:text-right dark:text-gray-400">
									{item.next}{" "}
									<span className="text-gray-400 dark:text-gray-500">({item.relative})</span>
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</CentredSitePage>
	);
}
