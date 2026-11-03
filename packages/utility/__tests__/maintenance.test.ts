import { equal, ok } from "node:assert/strict";
import { test } from "node:test";
import {
	MAINTENANCE_PERIODS,
	maintenancePeriodsOn,
	upcomingMaintenancePeriods,
} from "../source/maintenance.js";

test("Maintenance periods on a day include the whole day and stop at midnight.", () => {
	const period = MAINTENANCE_PERIODS.findLast(({ end, start }) =>
		start.toPlainDate().equals(end.toPlainDate()),
	)!;

	const dayStart = period.start.startOfDay();
	const nextDayStart = dayStart.add({ days: 1 });

	for (const date of [
		dayStart,
		period.start,
		period.end,
		nextDayStart.subtract({ nanoseconds: 1 }),
	]) {
		ok(
			maintenancePeriodsOn(date).some((found) => found === period),
			`Expected the maintenance period to be listed at ${date.toString()}.`,
		);
	}

	for (const date of [dayStart.subtract({ nanoseconds: 1 }), nextDayStart]) {
		ok(
			!maintenancePeriodsOn(date).some((found) => found === period),
			`Expected the maintenance period not to be listed at ${date.toString()}.`,
		);
	}
});

test("Upcoming maintenance periods start after today and count the days until them.", () => {
	const period = MAINTENANCE_PERIODS.at(-1)!;
	const dayStart = period.start.startOfDay();

	const daysFrom = (date: Temporal.ZonedDateTime) =>
		upcomingMaintenancePeriods(date).find((upcoming) => upcoming.period === period)?.days;

	equal(daysFrom(period.start), undefined);
	equal(daysFrom(dayStart), undefined);
	equal(daysFrom(dayStart.subtract({ days: 1 })), 1);
	equal(daysFrom(dayStart.subtract({ days: 3 })), 3);
});

test("Upcoming maintenance periods list one period per day beyond tomorrow.", () => {
	const distantDays = upcomingMaintenancePeriods(
		MAINTENANCE_PERIODS[0].start.subtract({ days: 10 }),
	)
		.map(({ days }) => days)
		.filter((days) => days > 1);

	equal(new Set(distantDays).size, distantDays.length);
});

test("Maintenance periods are positive and chronological.", () => {
	for (const [index, period] of MAINTENANCE_PERIODS.entries()) {
		ok(
			Temporal.ZonedDateTime.compare(period.start, period.end) < 0,
			`Expected maintenance period ${index} to end after it starts.`,
		);

		const next = MAINTENANCE_PERIODS[index + 1];

		if (next) {
			ok(
				Temporal.ZonedDateTime.compare(period.end, next.start) <= 0,
				`Expected maintenance period ${index} to end before the next one starts.`,
			);
		}
	}
});
