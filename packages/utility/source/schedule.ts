import { isActive } from "./dates.js";
import { skyNotEndedEvents } from "./events/index.js";
import { TRAVELLING_DATES } from "./kingdom/seasons/index.js";
import { shardEruption } from "./shard-eruption.js";
import { EventId } from "./utility/event.js";

export const ScheduleType = {
	DailyReset: 0,
	EyeOfEden: 1,
	InternationalSpaceStation: 2,
	TravellingSpirit: 3,
	Dragon: 4,
	PollutedGeyser: 5,
	Grandma: 6,
	Turtle: 7,
	ShardEruption: 8,
	DreamsSkater: 9,
	AURORA: 10,
	Passage: 11,
	AviarysFireworkFestival: 12,
	NineColouredDeer: 13,
	NestingWorkshop: 14,
	VaultEldersBlessing: 15,
	ProjectorOfMemories: 16,
	MeteorShower: 17,
	Maintenance: 18,
	RadianceEvent: 19,
	Events: 20,
	Season: 21,
} as const satisfies Readonly<Record<string, number>>;

export const SCHEDULE_TYPE_VALUES = Object.values(ScheduleType);
export type ScheduleTypes = (typeof SCHEDULE_TYPE_VALUES)[number];
export const INTERNATIONAL_SPACE_STATION_DATES = [6, 14, 22, 30] as const;

function startOfHour(date: Temporal.ZonedDateTime) {
	return date.round({ smallestUnit: "hour", roundingMode: "trunc" });
}

function addWallClockMinutes(date: Temporal.ZonedDateTime, minutes: number) {
	const target = date.toPlainDateTime().add({ minutes });

	return Temporal.ZonedDateTime.from(`${target.toString()}${date.offset}[${date.timeZoneId}]`, {
		offset: "prefer",
	});
}

export function nextDailyReset(date: Temporal.ZonedDateTime) {
	return date.add({ days: 1 }).startOfDay();
}

export function nextEyeOfEden(date: Temporal.ZonedDateTime) {
	return date.add({ days: 7 - (date.dayOfWeek % 7) }).startOfDay();
}

export function internationalSpaceStationSchedule(date: Temporal.ZonedDateTime) {
	const targetDay = INTERNATIONAL_SPACE_STATION_DATES.find(
		(internationalSpaceStationDates) =>
			internationalSpaceStationDates >= date.day &&
			// Addresses 30th February targeting 1st or 2nd March.
			internationalSpaceStationDates <= date.daysInMonth,
	);

	const start = (
		targetDay
			? date.with({ day: targetDay })
			: date.add({ months: 1 }).with({ day: INTERNATIONAL_SPACE_STATION_DATES[0] })
	).startOfDay();

	const end = start.add({ days: 1 });
	return { start, end, active: isActive(start, end, date) };
}

export function travellingSpiritSchedule(date: Temporal.ZonedDateTime) {
	const spirit = TRAVELLING_DATES.findLast(
		({ end }) => Temporal.ZonedDateTime.compare(date, end) < 0,
	);

	return {
		start: spirit ? spirit.start : TRAVELLING_DATES.last()!.start.add({ weeks: 2 }),
		visit: spirit
			? Temporal.ZonedDateTime.compare(date, spirit.start) >= 0
				? spirit
				: null
			: null,
		spirit: spirit ?? null,
	};
}

export function pollutedGeyserSchedule(date: Temporal.ZonedDateTime) {
	const { hour, minute } = date;
	const start = addWallClockMinutes(
		startOfHour(date),
		hour % 2 === 0 ? (minute < 15 ? 5 : 125) : 65,
	);
	const end = start.add({ minutes: 10 });
	return { start, end, active: isActive(start, end, date) };
}

export function grandmaSchedule(date: Temporal.ZonedDateTime) {
	const { hour, minute } = date;
	const start = addWallClockMinutes(
		startOfHour(date),
		hour % 2 === 0 ? (minute < 45 ? 35 : 155) : 95,
	);
	const end = start.add({ minutes: 10 });
	return { start, end, active: isActive(start, end, date) };
}

export function turtleSchedule(date: Temporal.ZonedDateTime) {
	const start = addWallClockMinutes(startOfHour(date), date.hour % 2 === 0 ? 50 : 110);
	const end = start.add({ minutes: 10 });
	return { start, end, active: isActive(start, end, date) };
}

export function shardEruptionSchedule(date: Temporal.ZonedDateTime) {
	const shard = shardEruption();
	let nextShard = shard?.timestamps.find(
		({ end }) => Temporal.ZonedDateTime.compare(date, end) < 0,
	);

	if (!nextShard) {
		for (let index = 1; ; index++) {
			const nextPossibleShard = shardEruption(index);

			if (!nextPossibleShard) {
				continue;
			}

			nextShard = nextPossibleShard.timestamps[0]!;
			break;
		}
	}

	return {
		start: nextShard.start,
		end: nextShard.end,
		active: isActive(nextShard.start, nextShard.end, date),
	};
}

export function dreamsSkaterSchedule(date: Temporal.ZonedDateTime) {
	const { dayOfWeek, hour, minute } = date;
	const isWeekend = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 7;

	if (isWeekend) {
		let start = addWallClockMinutes(
			startOfHour(date),
			hour % 2 === 1 ? (minute < 15 ? 0 : 120) : 60,
		);

		// Sunday's last event would make the next event on Monday.
		// Move this to Friday.
		if (start.dayOfWeek === 1) {
			start = start.add({ days: 4 });
		}

		const end = start.add({ minutes: 15 });
		return { start, end, active: isActive(start, end, date) };
	}

	const start = startOfHour(date.add({ days: 5 - date.dayOfWeek }).with({ hour: 1 }));
	const end = start.add({ minutes: 15 });
	return { start, end, active: isActive(start, end, date) };
}

export function auroraSchedule(date: Temporal.ZonedDateTime) {
	const start = addWallClockMinutes(
		startOfHour(date),
		date.hour % 2 === 0 ? (date.minute < 58 ? 10 : 130) : 70,
	);

	const end = start.add({ minutes: 48 });
	return { start, end, active: isActive(start, end, date) };
}

export function nextPassage(date: Temporal.ZonedDateTime) {
	return date
		.add({ minutes: 15 - (date.minute % 15) })
		.round({ smallestUnit: "minute", roundingMode: "trunc" });
}

export function aviarysFireworkFestivalSchedule(date: Temporal.ZonedDateTime) {
	const { day, hour, minute } = date;
	const targetHour = hour % 4 === 0 ? (minute < 10 ? hour : hour + 4) : hour + (4 - (hour % 4));

	const start =
		day === 1 && targetHour <= 20
			? startOfHour(date.with({ hour: targetHour }))
			: date.add({ months: 1 }).with({ day: 1 }).startOfDay();

	const end = start.add({ minutes: 10 });
	return { start, end, active: isActive(start, end, date) };
}

export function meteorShowerSchedule(date: Temporal.ZonedDateTime) {
	const events = skyNotEndedEvents(date).filter(
		(event) =>
			event.id === EventId.DaysOfLove2024 ||
			event.id === EventId.DaysOfLove2025 ||
			event.id === EventId.DaysOfLove2026,
	);

	if (events.size === 0) {
		return null;
	}

	const activeEvent = events.find(({ start }) => Temporal.ZonedDateTime.compare(date, start) >= 0);

	if (!activeEvent) {
		const soonest = events.reduce((a, b) =>
			Temporal.ZonedDateTime.compare(a.start, b.start) < 0 ? a : b,
		);

		const start = soonest.start
			.with({ minute: 5 })
			.round({ smallestUnit: "minute", roundingMode: "trunc" });

		const end = start.add({ minutes: 10 });
		return { start, end, active: false };
	}

	const { minute } = date;
	const start = addWallClockMinutes(startOfHour(date), minute < 15 ? 5 : minute < 45 ? 35 : 65);

	if (Temporal.ZonedDateTime.compare(start, activeEvent.end) >= 0) {
		return null;
	}

	const end = start.add({ minutes: 10 });
	return { start, end, active: isActive(start, end, date) };
}

export function nineColouredDeerSchedule(date: Temporal.ZonedDateTime) {
	const { minute } = date;
	const start = addWallClockMinutes(startOfHour(date), minute < 20 ? 0 : minute < 50 ? 30 : 60);
	const end = start.add({ minutes: 20 });
	return { start, end, active: isActive(start, end, date) };
}

export function nextNestingWorkshop(now: Temporal.ZonedDateTime) {
	return now.add({ days: (5 - now.dayOfWeek + 7) % 7 || 7 }).startOfDay();
}

export function vaultEldersBlessingSchedule(date: Temporal.ZonedDateTime) {
	const { minute } = date;

	const start = addWallClockMinutes(
		startOfHour(date),
		minute < 1 ? 0 : minute < 21 ? 20 : minute < 41 ? 40 : 60,
	);

	const end = start.add({ minutes: 1 });
	return { start, end, active: isActive(start, end, date) };
}

export function projectorOfMemoriesSchedule(date: Temporal.ZonedDateTime) {
	const { hour, minute } = date;
	const minutesSince = hour * 60 + minute;
	const remainder = minutesSince % 80;

	const start = addWallClockMinutes(
		date.startOfDay(),
		remainder < 78 ? minutesSince - remainder : minutesSince - remainder + 80,
	);

	const end = start.add({ minutes: 78 });
	return { start, end, active: isActive(start, end, date) };
}
