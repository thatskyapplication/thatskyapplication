import type { DateTime } from "luxon";
import { shardEruption } from "./shard-eruption.js";
import { TRAVELLING_DATES } from "./spirits/seasons/index.js";

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
} as const satisfies Readonly<Record<string, number>>;

export const SCHEDULE_TYPE_VALUES = Object.values(ScheduleType);
export type ScheduleTypes = (typeof SCHEDULE_TYPE_VALUES)[number];
export const INTERNATIONAL_SPACE_STATION_DATES = [6, 14, 22, 30] as const;

export function nextDailyReset(date: DateTime) {
	return date.plus({ day: 1 }).startOf("day");
}

export function nextEyeOfEden(date: DateTime) {
	return date.plus({ days: 7 - (date.weekday % 7) }).startOf("day");
}

export function internationalSpaceStationSchedule(date: DateTime) {
	const targetDay = INTERNATIONAL_SPACE_STATION_DATES.find(
		(internationalSpaceStationDates) => internationalSpaceStationDates > date.day,
	);

	return {
		now: INTERNATIONAL_SPACE_STATION_DATES.includes(
			date.day as (typeof INTERNATIONAL_SPACE_STATION_DATES)[number],
		),
		next: (targetDay
			? date.set({ day: targetDay })
			: date.plus({ month: 1 }).set({ day: INTERNATIONAL_SPACE_STATION_DATES[0] })
		).startOf("day"),
	};
}

export function travellingSpiritSchedule(now: DateTime) {
	return {
		visit: TRAVELLING_DATES.findLast(({ start, end }) => now >= start && now < end),
		next: TRAVELLING_DATES.last()!.start.plus({ weeks: 2 }).startOf("day"),
	};
}

export function pollutedGeyserSchedule(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 5 && minute < 15,
		next: date
			.plus({ minutes: hour % 2 === 0 ? (minute < 5 ? 5 - minute : 125 - minute) : 65 - minute })
			.startOf("minute"),
	};
}

export function grandmaSchedule(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 35 && minute < 45,
		next: date
			.plus({ minutes: hour % 2 === 0 ? (minute < 35 ? 35 - minute : 155 - minute) : 95 - minute })
			.startOf("minute"),
	};
}

export function turtleSchedule(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 50 && minute < 60,
		next: date
			.plus({ minutes: hour % 2 === 0 ? (minute < 50 ? 50 - minute : 170 - minute) : 110 - minute })
			.startOf("minute"),
	};
}

export function shardEruptionSchedule(date: DateTime) {
	const shard = shardEruption();
	let nextShard = shard?.timestamps.find(({ start }) => date < start);

	if (!nextShard) {
		for (let index = 1; ; index++) {
			const nextPossibleShard = shardEruption(index);

			if (!nextPossibleShard) {
				continue;
			}

			nextShard = nextPossibleShard.timestamps.find(({ start }) => date < start)!;
			break;
		}
	}

	return {
		now: shard?.timestamps.some(({ start, end }) => date >= start && date < end),
		next: nextShard.start,
	};
}

export function dreamsSkaterSchedule(date: DateTime) {
	const { weekday, hour, minute } = date;

	return {
		now: (weekday === 5 || weekday === 6 || weekday === 7) && hour % 2 === 1 && minute < 15,
		next: (weekday !== 5 && weekday !== 6 && weekday !== 7
			? date.plus({ days: 5 - weekday }).set({ hour: 1 })
			: hour % 2 === 0
				? date.plus({ minutes: 60 - minute })
				: date.plus({ minutes: 120 - minute })
		).startOf("minute"),
	};
}

export function auroraSchedule(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 10 && minute < 58,
		next: date
			.plus({ minutes: hour % 2 === 0 ? (minute < 10 ? 10 - minute : 130 - minute) : 70 - minute })
			.startOf("minute"),
	};
}

export function nextPassage(date: DateTime) {
	return date.plus({ minutes: 15 - (date.minute % 15) }).startOf("minute");
}

export function aviarysFireworkFestivalSchedule(date: DateTime) {
	const { hour, minute } = date;
	const minutesSince = hour * 60 + minute;

	return {
		now: date.day === 1 && hour % 4 === 0 && minute <= 10,
		next:
			date.day === 1
				? date.plus({ minutes: 240 - (minutesSince % 240) }).startOf("minute")
				: date.plus({ month: 1 }).startOf("month"),
	};
}

export function nineColouredDeerSchedule(date: DateTime) {
	const { minute } = date;

	return {
		now: minute < 20 || (minute >= 30 && minute < 50),
		next: date.plus({ minutes: 30 - (minute % 30) }).startOf("minute"),
	};
}

export function nextNestingWorkshop(now: DateTime) {
	return now.plus({ week: 1 }).startOf("week");
}

export function vaultEldersBlessingSchedule(date: DateTime) {
	const { minute } = date;

	return {
		now: minute % 20 === 0,
		next: date.plus({ minutes: 20 - (minute % 20) }).startOf("minute"),
	};
}

export function projectorOfMemoriesSchedule(date: DateTime) {
	const { hour, minute } = date;
	const minutesSince = hour * 60 + minute;

	return {
		now: minutesSince % 80 < 78,
		next: date.plus({ minutes: 80 - (minutesSince % 80) }).startOf("minute"),
	};
}
