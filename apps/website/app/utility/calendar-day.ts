import type { TFunction } from "i18next";
import {
	AURORA_START_DATE,
	auroraSchedule,
	AVIARYS_FIREWORK_FESTIVAL_START_DATE,
	aviarysFireworkFestivalSchedule,
	DREAMS_SKATER_START_DATE,
	dreamsSkaterSchedule,
	formatEmojiURL,
	GRANDMA_START_DATE,
	grandmaSchedule,
	internationalSpaceStationSchedule,
	meteorShowerSchedule,
	nextDailyReset,
	nextEyeOfEden,
	nextNestingWorkshop,
	nextPassage,
	NINE_COLOURED_DEER_START_DATE,
	nineColouredDeerSchedule,
	POLLUTED_GEYSER_START_DATE,
	pollutedGeyserSchedule,
	PROJECTOR_OF_MEMORIES_START_DATE,
	projectorOfMemoriesSchedule,
	ScheduleType,
	type ScheduleTypes,
	shardEruption,
	SHARD_ERUPTION_START_DATE,
	TIME_ZONE,
	TURTLE_START_DATE,
	turtleSchedule,
	VAULT_ELDERS_BLESSING_START_DATE,
	vaultEldersBlessingSchedule,
} from "@thatskyapplication/utility";
import type { CalendarDayOccurrence } from "~/utility/calendar.js";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { NESTING_WORKSHOP_CATALOGUE_URL, SCHEDULE_TYPE_TO_WIKI_KEY } from "~/utility/schedule.js";

const MAXIMUM_OCCURRENCES = 200 as const;
const CADENCE_THRESHOLD = 16 as const;
const WHOLE_DAY_HOURS = 23 as const;

interface SchedulePeriod {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
}

const PERIOD_SCHEDULES = [
	{
		type: ScheduleType.InternationalSpaceStation,
		schedule: internationalSpaceStationSchedule,
		start: null,
	},
	{
		type: ScheduleType.PollutedGeyser,
		schedule: pollutedGeyserSchedule,
		start: POLLUTED_GEYSER_START_DATE,
	},
	{ type: ScheduleType.Grandma, schedule: grandmaSchedule, start: GRANDMA_START_DATE },
	{ type: ScheduleType.Turtle, schedule: turtleSchedule, start: TURTLE_START_DATE },
	{
		type: ScheduleType.DreamsSkater,
		schedule: dreamsSkaterSchedule,
		start: DREAMS_SKATER_START_DATE,
	},
	{ type: ScheduleType.AURORA, schedule: auroraSchedule, start: AURORA_START_DATE },
	{
		type: ScheduleType.AviarysFireworkFestival,
		schedule: aviarysFireworkFestivalSchedule,
		start: AVIARYS_FIREWORK_FESTIVAL_START_DATE,
	},
	{
		type: ScheduleType.NineColouredDeer,
		schedule: nineColouredDeerSchedule,
		start: NINE_COLOURED_DEER_START_DATE,
	},
	{
		type: ScheduleType.VaultEldersBlessing,
		schedule: vaultEldersBlessingSchedule,
		start: VAULT_ELDERS_BLESSING_START_DATE,
	},
	{
		type: ScheduleType.ProjectorOfMemories,
		schedule: projectorOfMemoriesSchedule,
		start: PROJECTOR_OF_MEMORIES_START_DATE,
	},
	{ type: ScheduleType.MeteorShower, schedule: meteorShowerSchedule, start: null },
] as const satisfies readonly {
	type: ScheduleTypes;
	schedule: (date: Temporal.ZonedDateTime) => SchedulePeriod | null;
	start: Temporal.ZonedDateTime | null;
}[];

const INSTANT_SCHEDULES = [
	{ type: ScheduleType.DailyReset, next: nextDailyReset },
	{ type: ScheduleType.EyeOfEden, next: nextEyeOfEden },
	{ type: ScheduleType.NestingWorkshop, next: nextNestingWorkshop },
	{ type: ScheduleType.Passage, next: nextPassage },
] as const satisfies readonly {
	type: ScheduleTypes;
	next: (date: Temporal.ZonedDateTime) => Temporal.ZonedDateTime | null;
}[];

const LIGHT_SCHEDULE_TYPES: readonly ScheduleTypes[] = [
	ScheduleType.PollutedGeyser,
	ScheduleType.Grandma,
	ScheduleType.Turtle,
	ScheduleType.DreamsSkater,
];

function enumeratePeriods(
	schedule: (date: Temporal.ZonedDateTime) => SchedulePeriod | null,
	dayStart: Temporal.ZonedDateTime,
	dayEnd: Temporal.ZonedDateTime,
	scheduleStart: Temporal.ZonedDateTime | null,
): SchedulePeriod[] {
	const periods: SchedulePeriod[] = [];
	let cursor =
		scheduleStart && Temporal.ZonedDateTime.compare(scheduleStart, dayStart) >= 0
			? scheduleStart
			: dayStart;

	if (Temporal.ZonedDateTime.compare(cursor, dayEnd) >= 0) {
		return periods;
	}

	while (periods.length < MAXIMUM_OCCURRENCES) {
		const period = schedule(cursor);

		if (!period || Temporal.ZonedDateTime.compare(period.start, dayEnd) >= 0) {
			break;
		}

		if (
			Temporal.ZonedDateTime.compare(period.end, dayStart) > 0 &&
			(!scheduleStart || Temporal.ZonedDateTime.compare(period.start, scheduleStart) >= 0)
		) {
			periods.push(period);
		}

		if (Temporal.ZonedDateTime.compare(period.end, cursor) <= 0) {
			break;
		}

		cursor = period.end;
	}

	return periods;
}

function enumerateInstants(
	next: (date: Temporal.ZonedDateTime) => Temporal.ZonedDateTime | null,
	dayStart: Temporal.ZonedDateTime,
	dayEnd: Temporal.ZonedDateTime,
): Temporal.ZonedDateTime[] {
	const instants: Temporal.ZonedDateTime[] = [];
	let cursor = dayStart.subtract({ nanoseconds: 1 });

	while (instants.length < MAXIMUM_OCCURRENCES) {
		const instant = next(cursor);

		if (!instant || Temporal.ZonedDateTime.compare(instant, dayEnd) >= 0) {
			break;
		}

		instants.push(instant);

		if (Temporal.ZonedDateTime.compare(instant, cursor) <= 0) {
			break;
		}

		cursor = instant;
	}

	return instants;
}

function cadenceOf(starts: readonly Temporal.ZonedDateTime[], t: TFunction) {
	const [first, second] = starts;

	if (!first || !second) {
		return null;
	}

	return t("calendar.cadence", {
		ns: "features",
		count: Math.round(second.since(first).total({ unit: "minutes" })),
	});
}

function occurrenceFrom(
	type: ScheduleTypes,
	starts: readonly Temporal.ZonedDateTime[],
	times: readonly string[],
	t: TFunction,
): CalendarDayOccurrence {
	const wikiKey = SCHEDULE_TYPE_TO_WIKI_KEY[type];

	return {
		key: `schedule-${type}`,
		label: t(`schedule.type.${type}`, { ns: "features" }),
		detail: null,
		iconURL: null,
		light: LIGHT_SCHEDULE_TYPES.includes(type),
		infographicURL: null,
		acknowledgement: null,
		wikiURL: wikiKey ? t(wikiKey) : null,
		pageURL: null,
		catalogueURL: type === ScheduleType.NestingWorkshop ? NESTING_WORKSHOP_CATALOGUE_URL : null,
		times,
		cadence: starts.length > CADENCE_THRESHOLD ? cadenceOf(starts, t) : null,
		count: starts.length,
	};
}

function shardEruptionOccurrences(
	dayStart: Temporal.ZonedDateTime,
	dayEnd: Temporal.ZonedDateTime,
	timeFormat: Intl.DateTimeFormat,
	t: TFunction,
): CalendarDayOccurrence[] {
	const occurrences: CalendarDayOccurrence[] = [];
	const limit = dayEnd.withTimeZone(TIME_ZONE);
	let date = dayStart.withTimeZone(TIME_ZONE).startOfDay();

	if (Temporal.ZonedDateTime.compare(date, SHARD_ERUPTION_START_DATE) < 0) {
		date = SHARD_ERUPTION_START_DATE;
	}

	while (Temporal.ZonedDateTime.compare(date, limit) < 0) {
		const shard = shardEruption(date);

		const timestamps =
			shard?.timestamps.filter(
				({ start, end }) =>
					Temporal.ZonedDateTime.compare(start, dayEnd) < 0 &&
					Temporal.ZonedDateTime.compare(end, dayStart) > 0,
			) ?? [];

		if (shard && timestamps.length > 0) {
			const emoji = shard.strong
				? MISCELLANEOUS_EMOJIS.ShardStrong
				: MISCELLANEOUS_EMOJIS.ShardRegular;

			occurrences.push({
				key: `shard-eruption-${date.toPlainDate().toString()}`,
				label: t(`schedule.type.${ScheduleType.ShardEruption}`, { ns: "features" }),
				detail: t("shard-eruption.realm-area", {
					ns: "features",
					realm: shard.realm,
					area: shard.area,
				}),
				iconURL: formatEmojiURL(emoji.id),
				light: false,
				infographicURL: shard.infographic.url,
				acknowledgement: shard.infographic.acknowledgement,
				wikiURL: null,
				pageURL: null,
				catalogueURL: null,
				times: timestamps.map(({ start, end }) =>
					t("time-range", {
						ns: "general",
						start: timeFormat.format(start.epochMilliseconds),
						end: timeFormat.format(end.epochMilliseconds),
					}),
				),
				cadence: null,
				count: timestamps.length,
			});
		}

		date = date.add({ days: 1 });
	}

	return occurrences;
}

export function calendarDayOccurrences(
	dayStart: Temporal.ZonedDateTime,
	locale: string,
	timeFormat: Intl.DateTimeFormat,
	t: TFunction,
): CalendarDayOccurrence[] {
	const dayEnd = dayStart.add({ days: 1 }).withTimeZone(dayStart.timeZoneId).startOfDay();
	const skyDayStart = dayStart.withTimeZone(TIME_ZONE);
	const skyDayEnd = dayEnd.withTimeZone(TIME_ZONE);
	const occurrences: CalendarDayOccurrence[] = [];

	for (const { type, schedule, start } of PERIOD_SCHEDULES) {
		const periods = enumeratePeriods(schedule, skyDayStart, skyDayEnd, start);

		if (periods.length === 0) {
			continue;
		}

		occurrences.push(
			occurrenceFrom(
				type,
				periods.map(({ start }) => start),
				periods.map(({ start, end }) =>
					end.since(start).total({ unit: "hours" }) >= WHOLE_DAY_HOURS
						? t("calendar.all-day", { ns: "features" })
						: t("time-range", {
								ns: "general",
								start: timeFormat.format(start.epochMilliseconds),
								end: timeFormat.format(end.epochMilliseconds),
							}),
				),
				t,
			),
		);
	}

	for (const { type, next } of INSTANT_SCHEDULES) {
		const instants = enumerateInstants(next, skyDayStart, skyDayEnd);

		if (instants.length === 0) {
			continue;
		}

		occurrences.push(
			occurrenceFrom(
				type,
				instants,
				instants.map((instant) => timeFormat.format(instant.epochMilliseconds)),
				t,
			),
		);
	}

	occurrences.push(...shardEruptionOccurrences(dayStart, dayEnd, timeFormat, t));
	return occurrences.sort((a, b) => a.count - b.count || a.label.localeCompare(b.label, locale));
}
