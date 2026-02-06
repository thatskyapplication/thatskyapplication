import type { DateTime } from "luxon";
import { skyNotEndedEvents } from "./events/index.js";
import { shardEruption } from "./shard-eruption.js";
import { TRAVELLING_DATES } from "./spirits/seasons/index.js";
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
		(internationalSpaceStationDates) => internationalSpaceStationDates >= date.day,
	);

	const start = (
		targetDay
			? date.set({ day: targetDay })
			: date.plus({ month: 1 }).set({ day: INTERNATIONAL_SPACE_STATION_DATES[0] })
	).startOf("day");

	const end = start.plus({ days: 1 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function travellingSpiritSchedule(date: DateTime) {
	const spirit = TRAVELLING_DATES.findLast(({ end }) => date < end);

	return {
		start: spirit ? spirit.start : TRAVELLING_DATES.last()!.start.plus({ weeks: 2 }),
		visit: spirit ? (date >= spirit.start ? spirit : null) : null,
		spirit: spirit ?? null,
	};
}

export function pollutedGeyserSchedule(date: DateTime) {
	const { hour, minute } = date;

	const start = date
		.set({ minute: hour % 2 === 0 ? (minute < 15 ? 5 : 125) : 65 })
		.startOf("minute");

	const end = date.plus({ minutes: 10 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function grandmaSchedule(date: DateTime) {
	const { hour, minute } = date;

	const start = date
		.set({ minute: hour % 2 === 0 ? (minute < 45 ? 35 : 155) : 95 })
		.startOf("minute");

	const end = start.plus({ minutes: 10 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function turtleSchedule(date: DateTime) {
	const start = date.set({ minute: date.hour % 2 === 0 ? 50 : 110 }).startOf("minute");
	const end = start.plus({ minutes: 10 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function shardEruptionSchedule(date: DateTime) {
	const shard = shardEruption();
	let nextShard = shard?.timestamps.find(({ end }) => date < end);

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
		active: date >= nextShard.start && date < nextShard.end,
	};
}

export function dreamsSkaterSchedule(date: DateTime) {
	const { weekday, hour, minute } = date;
	const isWeekend = weekday === 5 || weekday === 6 || weekday === 7;

	if (isWeekend) {
		let start = date
			.set({ minute: hour % 2 === 1 ? (minute < 15 ? 0 : 120) : 60 })
			.startOf("minute");

		// Sunday's last event would make the next event on Monday.
		// Move this to Friday.
		if (start.weekday === 1) {
			start = start.set({ weekday: 5 });
		}

		const end = start.plus({ minutes: 15 });
		const active = date >= start && date < end;
		return { start, end, active };
	}

	const start = date.set({ weekday: 5, hour: 1 }).startOf("hour");
	const end = start.plus({ minutes: 15 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function auroraSchedule(date: DateTime) {
	const start = date
		.set({ minute: date.hour % 2 === 0 && date.minute < 48 ? 10 : 70 })
		.startOf("minute");

	const end = start.plus({ minutes: 48 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function nextPassage(date: DateTime) {
	return date.plus({ minutes: 15 - (date.minute % 15) }).startOf("minute");
}

export function aviarysFireworkFestivalSchedule(date: DateTime) {
	const { day, hour, minute } = date;

	const start =
		day === 1
			? date
					.set({ hour: hour % 4 === 0 ? (minute < 10 ? hour : hour + 4) : hour + (4 - (hour % 4)) })
					.startOf("hour")
			: date.plus({ month: 1 }).startOf("month");

	const end = start.plus({ minutes: 10 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function meteorShowerSchedule(date: DateTime) {
	const events = skyNotEndedEvents(date).filter(
		(event) =>
			event.id === EventId.DaysOfLove2024 ||
			event.id === EventId.DaysOfLove2025 ||
			event.id === EventId.DaysOfLove2026,
	);

	if (events.size === 0) {
		return null;
	}

	const activeEvent = events.find(({ start }) => date >= start);

	if (!activeEvent) {
		const soonest = events.reduce((a, b) => (a.start < b.start ? a : b));
		const start = soonest.start.set({ minute: 5 }).startOf("minute");
		const end = start.plus({ minutes: 10 });
		return { start, end, active: false };
	}

	const { minute } = date;
	const start = date.set({ minute: minute < 15 ? 5 : minute < 45 ? 35 : 65 }).startOf("minute");

	if (start >= activeEvent.end) {
		return null;
	}

	const end = start.plus({ minutes: 10 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function nineColouredDeerSchedule(date: DateTime) {
	const { minute } = date;
	const start = date.set({ minute: minute < 20 ? 0 : minute < 50 ? 30 : 60 }).startOf("minute");
	const end = start.plus({ minutes: 20 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function nextNestingWorkshop(now: DateTime) {
	return now.plus({ week: 1 }).startOf("week");
}

export function vaultEldersBlessingSchedule(date: DateTime) {
	const { minute } = date;

	const start = date
		.set({ minute: minute < 1 ? 0 : minute < 21 ? 20 : minute < 41 ? 40 : 60 })
		.startOf("minute");

	const end = start.plus({ minutes: 1 });
	const active = date >= start && date < end;
	return { start, end, active };
}

export function projectorOfMemoriesSchedule(date: DateTime) {
	const { hour, minute } = date;
	const minutesSince = hour * 60 + minute;
	const remainder = minutesSince % 80;

	const start = date.startOf("day").set({
		minute: remainder < 78 ? minutesSince - remainder : minutesSince - remainder + 80,
	});

	const end = start.plus({ minutes: 78 });
	const active = date >= start && date < end;
	return { start, end, active };
}
