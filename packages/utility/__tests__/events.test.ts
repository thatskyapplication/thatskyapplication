import { ok } from "node:assert/strict";
import { test } from "node:test";
import { skyEventFamilies, skyEvents } from "../source/events/index.js";

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
