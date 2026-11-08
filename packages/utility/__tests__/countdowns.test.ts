import { equal } from "node:assert/strict";
import { test } from "node:test";
import {
	daysLeftText,
	doublePeriodCountdown,
	eventDaysLeftText,
	returningSpiritsCountdown,
	upcomingEventCountdown,
	upcomingMaintenanceCountdown,
} from "../source/countdowns.js";
import { skyDate } from "../source/dates.js";

const formatting = {
	locale: "en-GB",
	t: (key: string, options: Record<string, unknown>) =>
		`${key}:${String(options.ns)}:${String(options.count)}:${String(options.name)}`,
};

const period = { end: skyDate(2026, 11, 10), start: skyDate(2026, 11, 5) };

test("Days left text says the period ends today on its last day.", () => {
	equal(
		daysLeftText("season", period.end, skyDate(2026, 11, 9), formatting),
		"days-left.season-ends-today:general:0:undefined",
	);

	equal(
		daysLeftText("event", period.end, skyDate(2026, 11, 7), formatting, "Event"),
		"days-left.event:general:2:Event",
	);
});

test("Event days left text gives no count while the end date is unconfirmed.", () => {
	equal(
		eventDaysLeftText(
			{ end: period.end, endUnconfirmed: true },
			skyDate(2026, 11, 7),
			formatting,
			"Event",
		),
		"days-left.event-end-unconfirmed:general:undefined:Event",
	);

	equal(
		eventDaysLeftText(
			{ end: period.end, endUnconfirmed: false },
			skyDate(2026, 11, 7),
			formatting,
			"Event",
		),
		"days-left.event:general:2:Event",
	);
});

test("Double period countdowns count down to the start, then to the end.", () => {
	equal(
		doublePeriodCountdown("double-hearts", period, skyDate(2026, 11, 1), formatting),
		"daily-guides.double-hearts-upcoming:features:4:undefined",
	);

	equal(
		doublePeriodCountdown("double-hearts", period, skyDate(2026, 11, 5), formatting),
		"days-left.double-hearts:general:4:undefined",
	);

	equal(
		doublePeriodCountdown("double-treasure-candles", period, skyDate(2026, 11, 9), formatting),
		"days-left.double-treasure-candles-ends-today:general:0:undefined",
	);
});

test("Returning spirits countdowns cover upcoming, active and the last day.", () => {
	const upcoming = { ...period, active: false };
	const active = { ...period, active: true };

	equal(
		returningSpiritsCountdown(upcoming, "Spirits", skyDate(2026, 11, 3), formatting),
		"daily-guides.returning-spirits-upcoming-list:features:2:undefined",
	);

	equal(
		returningSpiritsCountdown(active, "Spirits", skyDate(2026, 11, 7), formatting),
		"daily-guides.returning-spirits-active-list:features:2:undefined",
	);

	equal(
		returningSpiritsCountdown(active, "Spirits", skyDate(2026, 11, 9), formatting),
		"daily-guides.returning-spirits-leave-today:features:0:undefined",
	);
});

test("Upcoming maintenance countdowns name the time only for tomorrow.", () => {
	equal(
		upcomingMaintenanceCountdown(1, "13:00", formatting),
		"daily-guides.maintenance-tomorrow:features:undefined:undefined",
	);

	equal(
		upcomingMaintenanceCountdown(3, "13:00", formatting),
		"daily-guides.maintenance-upcoming:features:3:undefined",
	);
});

test("Upcoming event countdowns show the time when the event starts today.", () => {
	equal(
		upcomingEventCountdown(
			"Event",
			skyDate(2026, 11, 5, 12),
			"12:00",
			skyDate(2026, 11, 5),
			formatting,
		),
		"daily-guides.event-upcoming-time:features:undefined:undefined",
	);

	equal(
		upcomingEventCountdown(
			"Event",
			skyDate(2026, 11, 8),
			"00:00",
			skyDate(2026, 11, 5),
			formatting,
		),
		"daily-guides.event-upcoming:features:3:undefined",
	);
});
