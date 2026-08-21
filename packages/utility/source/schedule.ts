import { isActive, skyDate, TIME_ZONE } from "./dates.js";
import { skyNotEndedEvents } from "./events/index.js";
import { RETURNING_DATES, TRAVELLING_DATES } from "./kingdom/seasons/index.js";
import { SHARD_ERUPTION_START_DATE, shardEruption } from "./shard-eruption.js";
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
	ReturningSpirits: 22,
	Update: 23,
} as const satisfies Readonly<Record<string, number>>;

export const SCHEDULE_TYPE_VALUES = Object.values(ScheduleType);
export type ScheduleTypes = (typeof SCHEDULE_TYPE_VALUES)[number];
const INTERNATIONAL_SPACE_STATION_DATES = [6, 14, 22, 30] as const;
const INTERNATIONAL_SPACE_STATION_PRIOR_DATES = [6, 13, 20, 27] as const;
const INTERNATIONAL_SPACE_STATION_START_DATE = Temporal.PlainDate.from("2019-09-22");
const INTERNATIONAL_SPACE_STATION_ROTATION_CHANGE_DATE = Temporal.PlainDate.from("2023-06-01");
/**
 * Introduced with Days of Nature at 00:00 PDT on 19 April 2021.
 *
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/784-patch-notes---april-15-2021---0-13-3-165938}
 */
export const POLLUTED_GEYSER_START_DATE = skyDate(2021, 4, 19);
/**
 * Released on 18 November 2021, first observed at 12:33 PST.
 *
 * @remarks Time is observed from a user on Discord.
 *
 * @see {@link https://discord.com/channels/575762611111592007/575827782144098304/910991017518432297}
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/857-patch-notes---november-18-2021---0-15-5-179535-ios-179644-android-179482-switch-1637266164}
 */
export const GRANDMA_START_DATE = skyDate(2021, 11, 18, 12, 33, 3);
/**
 * Introduced with Days of Nature on 18 April 2022.
 */
export const TURTLE_START_DATE = skyDate(2022, 4, 18);
/**
 * Introduced with Days of Feast at 00:00 on 19 December 2022.
 *
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/968-patch-notes---november-28-2022---0-19-5-206971-android-huawei-ios-206872-switch}
 */
export const DREAMS_SKATER_START_DATE = skyDate(2022, 12, 19);
/**
 * The concert debuted at 20:30 PST on 8 December 2022. The observed concert window began 10
 * minutes later at 20:40 and lasted 48 minutes.
 *
 * @remarks After the season, the concert remained available on its schedule through the
 * Wings of AURORA.
 *
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/968-patch-notes---november-28-2022---0-19-5-206971-android-huawei-ios-206872-switch}
 */
export const AURORA_START_DATE = skyDate(2022, 12, 8, 20, 30);
const AURORA_FIRST_CONCERT_START_DATE = AURORA_START_DATE.add({ minutes: 10 });
const AURORA_FIRST_CONCERT_END_DATE = AURORA_FIRST_CONCERT_START_DATE.add({ minutes: 48 });
/**
 * First observed report that 0.27.5 was available, at 20:12:02.562 UTC on 21 November 2024. The
 * concert was observed on its two-hour rotation from this update, before 0.27.6 documented it.
 *
 * @see {@link https://discord.com/channels/575762611111592007/575827924343848960/1309249991080017950}
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1365-hotfix---december-5-2024---0-27-6-305399-android-huawei-ios-304953-playstation-steam-switch}
 */
const AURORA_TWO_HOUR_ROTATION_START_DATE =
	Temporal.Instant.fromEpochMilliseconds(1_732_219_922_562).toZonedDateTimeISO(TIME_ZONE);
const PASSAGE_SCHEDULE_START_DATE = skyDate(2023, 5, 1);
/**
 * The finale ran every 4 hours from 00:00 on 12 December 2023, with the last show at 20:00 on
 * 17 December 2023. From 2024, it returns on the first day of each month on the same rotation.
 *
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1259-patch-notes---december-11-2023---0-23-5-238437-android-huawei-ios-switch-238018-playstation}
 */
export const AVIARYS_FIREWORK_FESTIVAL_START_DATE = skyDate(2023, 12, 12);
const AVIARYS_FIREWORK_FESTIVAL_FINALE_LAST_SHOW_DATE = skyDate(2023, 12, 17, 20);
/**
 * Introduced with the Season of Nesting on 15 April 2024, opening on Mondays. From 6 March 2026,
 * it swapped to Fridays.
 */
export const NESTING_WORKSHOP_START_DATE = skyDate(2024, 4, 15);
const NESTING_WORKSHOP_FRIDAY_CHANGE_DATE = skyDate(2026, 3, 6);
/**
 * Clamped to the season's last quest, which is when players could reach the deer, rather than to
 * the update that introduced it.
 *
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1264-patch-notes---january-11-2024---0-24-0-240551-ios-playstation-switch-241911-android-huawei}
 */
export const NINE_COLOURED_DEER_START_DATE = skyDate(2024, 3, 11);
/**
 * Available from 20:10 BST on 28 August 2025 (12:10 PDT).
 *
 * @remarks Time is observed from Discord.
 *
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1410-patch-notes---august-28-2025---0-30-5-342290-android-huawei-ios-341589-playstation-steam-341718-switch}
 * @see {@link https://discord.com/channels/575762611111592007/575768778789617674/1410710379494899832}
 */
export const VAULT_ELDERS_BLESSING_START_DATE = skyDate(2025, 8, 28, 12, 10);
/**
 * Available in the in-game shop from 06/09/2025.
 *
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1411-hotfix---september-5-2025---0-30-6-343782-android-huawei-ios-playstation-steam}
 */
export const PROJECTOR_OF_MEMORIES_START_DATE = skyDate(2025, 9, 6);

export function internationalSpaceStationDates(
	date: Temporal.ZonedDateTime,
): readonly Temporal.ZonedDateTime[] {
	const startOfMonth = date.with({ day: 1 }).startOfDay();
	const rotation =
		Temporal.PlainDate.compare(
			startOfMonth.toPlainDate(),
			INTERNATIONAL_SPACE_STATION_ROTATION_CHANGE_DATE,
		) < 0
			? INTERNATIONAL_SPACE_STATION_PRIOR_DATES
			: INTERNATIONAL_SPACE_STATION_DATES;

	return rotation
		.filter((day) => day <= startOfMonth.daysInMonth)
		.map((day) => startOfMonth.with({ day }))
		.filter(
			(internationalSpaceStationDate) =>
				Temporal.PlainDate.compare(
					internationalSpaceStationDate.toPlainDate(),
					INTERNATIONAL_SPACE_STATION_START_DATE,
				) >= 0,
		);
}

export function isInternationalSpaceStationDate(date: Temporal.ZonedDateTime) {
	return internationalSpaceStationDates(date).some((internationalSpaceStationDate) =>
		internationalSpaceStationDate.toPlainDate().equals(date.toPlainDate()),
	);
}

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
	if (Temporal.PlainDate.compare(date.toPlainDate(), INTERNATIONAL_SPACE_STATION_START_DATE) < 0) {
		return null;
	}

	const start = internationalSpaceStationDates(date).find(
		(internationalSpaceStationDate) => internationalSpaceStationDate.day >= date.day,
	);
	const nextMonth = date.add({ months: 1 }).with({ day: 1 });
	const nextStart = start ?? internationalSpaceStationDates(nextMonth)[0]!;
	const end = nextStart.add({ days: 1 });
	return { start: nextStart, end, active: isActive(nextStart, end, date) };
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

export function returningSpiritsSchedule(date: Temporal.ZonedDateTime) {
	const visit = RETURNING_DATES.find(({ end }) => Temporal.ZonedDateTime.compare(date, end) < 0);

	return visit ? { ...visit, active: isActive(visit.start, visit.end, date) } : null;
}

export function pollutedGeyserSchedule(date: Temporal.ZonedDateTime) {
	if (Temporal.ZonedDateTime.compare(date, POLLUTED_GEYSER_START_DATE) < 0) {
		return null;
	}

	const { hour, minute } = date;
	const start = addWallClockMinutes(
		startOfHour(date),
		hour % 2 === 0 ? (minute < 15 ? 5 : 125) : 65,
	);
	const end = start.add({ minutes: 10 });
	return { start, end, active: isActive(start, end, date) };
}

export function grandmaSchedule(date: Temporal.ZonedDateTime) {
	if (Temporal.ZonedDateTime.compare(date, GRANDMA_START_DATE) < 0) {
		return null;
	}

	const { hour, minute } = date;
	const start = addWallClockMinutes(
		startOfHour(date),
		hour % 2 === 0 ? (minute < 45 ? 35 : 155) : 95,
	);
	const end = start.add({ minutes: 10 });
	return { start, end, active: isActive(start, end, date) };
}

export function turtleSchedule(date: Temporal.ZonedDateTime) {
	if (Temporal.ZonedDateTime.compare(date, TURTLE_START_DATE) < 0) {
		return null;
	}

	const start = addWallClockMinutes(startOfHour(date), date.hour % 2 === 0 ? 50 : 110);
	const end = start.add({ minutes: 10 });
	return { start, end, active: isActive(start, end, date) };
}

export function shardEruptionSchedule(date: Temporal.ZonedDateTime) {
	const skyDay = date.withTimeZone(TIME_ZONE).startOfDay();
	const previousShard =
		Temporal.ZonedDateTime.compare(skyDay, SHARD_ERUPTION_START_DATE) > 0
			? shardEruption(skyDay.subtract({ days: 1 }))
			: null;
	let nextShard = previousShard?.timestamps.find(
		({ end }) => Temporal.ZonedDateTime.compare(date, end) < 0,
	);

	for (let index = 0; !nextShard; index++) {
		const nextPossibleShard = shardEruption(skyDay.add({ days: index }));

		if (nextPossibleShard === null) {
			continue;
		}

		nextShard = nextPossibleShard.timestamps.find(
			({ end }) => Temporal.ZonedDateTime.compare(date, end) < 0,
		);
	}

	return {
		start: nextShard.start,
		end: nextShard.end,
		active: isActive(nextShard.start, nextShard.end, date),
	};
}

export function dreamsSkaterSchedule(date: Temporal.ZonedDateTime) {
	if (Temporal.ZonedDateTime.compare(date, DREAMS_SKATER_START_DATE) < 0) {
		return null;
	}

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
	if (Temporal.ZonedDateTime.compare(date, AURORA_START_DATE) < 0) {
		return null;
	}

	if (Temporal.ZonedDateTime.compare(date, AURORA_FIRST_CONCERT_END_DATE) < 0) {
		return {
			start: AURORA_FIRST_CONCERT_START_DATE,
			end: AURORA_FIRST_CONCERT_END_DATE,
			active: isActive(AURORA_FIRST_CONCERT_START_DATE, AURORA_FIRST_CONCERT_END_DATE, date),
		};
	}

	const intervalHours =
		Temporal.ZonedDateTime.compare(date, AURORA_TWO_HOUR_ROTATION_START_DATE) < 0 ? 4 : 2;
	const hourRemainder = date.hour % intervalHours;
	const start = addWallClockMinutes(
		startOfHour(date),
		hourRemainder === 0
			? date.minute < 58
				? 10
				: intervalHours * 60 + 10
			: (intervalHours - hourRemainder) * 60 + 10,
	);

	const end = start.add({ minutes: 48 });
	return { start, end, active: isActive(start, end, date) };
}

export function nextPassage(date: Temporal.ZonedDateTime) {
	const start = date
		.add({ minutes: 15 - (date.minute % 15) })
		.round({ smallestUnit: "minute", roundingMode: "trunc" });

	return Temporal.ZonedDateTime.compare(start, PASSAGE_SCHEDULE_START_DATE) < 0 ? null : start;
}

export function aviarysFireworkFestivalSchedule(date: Temporal.ZonedDateTime) {
	if (Temporal.ZonedDateTime.compare(date, AVIARYS_FIREWORK_FESTIVAL_START_DATE) < 0) {
		return null;
	}

	const { day, hour, minute } = date;
	const targetHour = hour % 4 === 0 ? (minute < 10 ? hour : hour + 4) : hour + (4 - (hour % 4));

	const nextShow =
		targetHour <= 20
			? startOfHour(date.with({ hour: targetHour }))
			: date.add({ days: 1 }).startOfDay();

	const start =
		Temporal.ZonedDateTime.compare(nextShow, AVIARYS_FIREWORK_FESTIVAL_FINALE_LAST_SHOW_DATE) <=
			0 ||
		(day === 1 && targetHour <= 20)
			? nextShow
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
	if (Temporal.ZonedDateTime.compare(date, NINE_COLOURED_DEER_START_DATE) < 0) {
		return null;
	}

	const { minute } = date;
	const start = addWallClockMinutes(startOfHour(date), minute < 20 ? 0 : minute < 50 ? 30 : 60);
	const end = start.add({ minutes: 20 });
	return { start, end, active: isActive(start, end, date) };
}

export function nextNestingWorkshop(date: Temporal.ZonedDateTime) {
	const monday = date.add({ days: (1 - date.dayOfWeek + 7) % 7 || 7 }).startOfDay();

	const start =
		Temporal.ZonedDateTime.compare(monday, NESTING_WORKSHOP_FRIDAY_CHANGE_DATE) < 0
			? monday
			: date.add({ days: (5 - date.dayOfWeek + 7) % 7 || 7 }).startOfDay();

	return Temporal.ZonedDateTime.compare(start, NESTING_WORKSHOP_START_DATE) < 0 ? null : start;
}

export function vaultEldersBlessingSchedule(date: Temporal.ZonedDateTime) {
	if (Temporal.ZonedDateTime.compare(date, VAULT_ELDERS_BLESSING_START_DATE) < 0) {
		return null;
	}

	const { minute } = date;

	const start = addWallClockMinutes(
		startOfHour(date),
		minute < 1 ? 0 : minute < 21 ? 20 : minute < 41 ? 40 : 60,
	);

	const end = start.add({ minutes: 1 });
	return { start, end, active: isActive(start, end, date) };
}

export function projectorOfMemoriesSchedule(date: Temporal.ZonedDateTime) {
	if (Temporal.ZonedDateTime.compare(date, PROJECTOR_OF_MEMORIES_START_DATE) < 0) {
		return null;
	}

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
