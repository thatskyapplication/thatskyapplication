import { deepStrictEqual, ok, strictEqual } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import {
	skyCurrentEventsWithEventTickets,
	skyEventFamilies,
	skyEvents,
	skyEventsBetween,
} from "../source/events/index.js";
import { DOUBLE_HEART_EVENTS, RADIANCE_EVENTS } from "../source/events/miscellaneous.js";
import { Event } from "../source/models/event.js";
import { EventFamilyId, EventId } from "../source/utility/event.js";

test("Events are indexed chronologically.", () => {
	const events = [...skyEvents().values()];
	ok(events.length > 1, "Expected several events to be indexed.");

	for (let index = 1; index < events.length; index++) {
		const previous = events[index - 1]!;
		const event = events[index]!;

		ok(
			Temporal.ZonedDateTime.compare(event.start, previous.start) >= 0,
			`Expected event ${event.id} to start no earlier than event ${previous.id}.`,
		);
	}
});

test("Each family holds its occurrences newest first.", () => {
	for (const { occurrences } of skyEventFamilies().values()) {
		for (let index = 1; index < occurrences.length; index++) {
			const newer = occurrences[index - 1]!;
			const occurrence = occurrences[index]!;

			ok(
				Temporal.ZonedDateTime.compare(occurrence.start, newer.start) <= 0,
				`Expected event ${occurrence.id} to start no later than event ${newer.id}.`,
			);
		}
	}
});

test("Families are indexed newest first.", () => {
	const families = [...skyEventFamilies().values()];
	ok(families.length > 1, "Expected several families to be indexed.");

	for (let index = 1; index < families.length; index++) {
		const newer = families[index - 1]!;
		const family = families[index]!;

		ok(
			Temporal.ZonedDateTime.compare(family.latest.start, newer.latest.start) <= 0,
			`Expected family ${family.id} to be represented no later than family ${newer.id}.`,
		);
	}
});

test("A family names itself after its latest occurrence.", () => {
	for (const family of skyEventFamilies().values()) {
		const [firstName] = [...family.names.keys()];

		ok(
			firstName === family.latest.name,
			`Expected family ${family.id} to lead with the name of its latest occurrence.`,
		);
	}
});

test("skyEventsBetween gathers every event overlapping the range.", () => {
	const events = skyEventsBetween(skyDate(2026, 2, 1), skyDate(2026, 3, 1));
	ok(events.size > 1, "Expected several events to overlap February 2026.");

	for (const { id, start, end } of events.values()) {
		ok(
			Temporal.ZonedDateTime.compare(start, skyDate(2026, 3, 1)) < 0 &&
				Temporal.ZonedDateTime.compare(skyDate(2026, 2, 1), end) < 0,
			`Expected event ${id} to overlap February 2026.`,
		);
	}
});

test("skyEventsBetween treats the range as half-open.", () => {
	const { start, end } = skyEvents().get(EventId.DaysOfLove2026)!;

	ok(
		!skyEventsBetween(start.subtract({ days: 1 }), start).has(EventId.DaysOfLove2026),
		"Expected an event starting at the range end to fall outside the range.",
	);

	ok(
		!skyEventsBetween(end, end.add({ days: 1 })).has(EventId.DaysOfLove2026),
		"Expected an event ending at the range start to fall outside the range.",
	);

	ok(
		skyEventsBetween(start, start.add({ days: 1 })).has(EventId.DaysOfLove2026),
		"Expected an event starting at the range start to fall inside the range.",
	);

	ok(
		skyEventsBetween(end.subtract({ days: 1 }), end).has(EventId.DaysOfLove2026),
		"Expected an event ending at the range end to fall inside the range.",
	);
});

test("skyCurrentEventsWithEventTickets leaves out events without event tickets.", () => {
	strictEqual(skyCurrentEventsWithEventTickets(skyDate(2024, 2, 12)).size, 2);
	strictEqual(skyCurrentEventsWithEventTickets(skyDate(2026, 2, 7)).size, 1);
});

test("Remaining event tickets count today onwards and the pools running today.", () => {
	const start = skyDate(2030, 1, 1);
	const end = start.add({ days: 3 });

	const data = {
		id: EventId.DaysOfLove2026,
		name: "days-of-love",
		family: EventFamilyId.DaysOfLove,
		start,
		end,
	};

	const amount = [
		{ date: start, amount: 5 },
		{ date: start.add({ days: 1 }), amount: 7 },
		{ date: start.add({ days: 2 }), amount: 11 },
	];

	const event = new Event({
		...data,
		eventTickets: { amount, pool: [{ start, end: start.add({ days: 1 }), amount: 3 }] },
	});

	deepStrictEqual(event.remainingEventTickets(start.add({ days: 1, hours: 6 })), {
		dailyEventTicketsLeft: 18,
		poolEventTicketsLeft: 3,
	});

	deepStrictEqual(event.remainingEventTickets(start.add({ days: 2 })), {
		dailyEventTicketsLeft: 11,
		poolEventTicketsLeft: 0,
	});

	deepStrictEqual(
		new Event({ ...data, eventTickets: { amount } }).remainingEventTickets(start.add({ days: 2 })),
		{ dailyEventTicketsLeft: 11, poolEventTicketsLeft: null },
	);

	deepStrictEqual(new Event(data).remainingEventTickets(start), {
		dailyEventTicketsLeft: 0,
		poolEventTicketsLeft: null,
	});
});

test("Double heart events are positive and chronological.", () => {
	for (const [index, event] of DOUBLE_HEART_EVENTS.entries()) {
		ok(
			Temporal.ZonedDateTime.compare(event.start, event.end) < 0,
			`Expected double heart event ${index} to end after it starts.`,
		);

		const next = DOUBLE_HEART_EVENTS[index + 1];

		if (next) {
			ok(
				Temporal.ZonedDateTime.compare(event.end, next.start) <= 0,
				`Expected double heart event ${index} to end before the next one starts.`,
			);
		}
	}
});

test("Radiance events are positive and chronological.", () => {
	for (const [index, event] of RADIANCE_EVENTS.entries()) {
		ok(
			Temporal.ZonedDateTime.compare(event.start, event.end) < 0,
			`Expected radiance event ${index} to end after it starts.`,
		);

		const next = RADIANCE_EVENTS[index + 1];

		if (next) {
			ok(
				Temporal.ZonedDateTime.compare(event.end, next.start) <= 0,
				`Expected radiance event ${index} to end before the next one starts.`,
			);
		}
	}
});
