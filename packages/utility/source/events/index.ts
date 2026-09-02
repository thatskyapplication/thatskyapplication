import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import { isActive, skyNow } from "../dates.js";
import { EventFamily } from "../models/event-family.js";
import type { Event } from "../models/event.js";
import type { EventFamilyIds, EventIds } from "../utility/event.js";
import Year1 from "./2019/index.js";
import Year2 from "./2020/index.js";
import Year3 from "./2021/index.js";
import Year4 from "./2022/index.js";
import Year5 from "./2023/index.js";
import Year6 from "./2024/index.js";
import Year7 from "./2025/index.js";
import Year8 from "./2026/index.js";
import { COMMUNITY_EVENTS, type CommunityEvent } from "./miscellaneous.js";

const EVENTS: ReadonlyCollection<EventIds, Event> = [
	...Year1,
	...Year2,
	...Year3,
	...Year4,
	...Year5,
	...Year6,
	...Year7,
	...Year8,
].reduce((events, event) => events.set(event.id, event), new Collection<EventIds, Event>());

let startedEvents: {
	events: ReadonlyCollection<EventIds, Event>;
	from: Temporal.ZonedDateTime;
	until: Temporal.ZonedDateTime | null;
} | null = null;

export function skyEvents(): ReadonlyCollection<EventIds, Event> {
	const now = skyNow();

	if (
		startedEvents !== null &&
		Temporal.ZonedDateTime.compare(now, startedEvents.from) >= 0 &&
		(startedEvents.until === null || Temporal.ZonedDateTime.compare(now, startedEvents.until) < 0)
	) {
		return startedEvents.events;
	}

	const events = EVENTS.filter((event) => Temporal.ZonedDateTime.compare(now, event.start) >= 0);
	let until: Temporal.ZonedDateTime | null = null;

	for (const event of EVENTS.values()) {
		if (
			Temporal.ZonedDateTime.compare(now, event.start) < 0 &&
			(until === null || Temporal.ZonedDateTime.compare(event.start, until) < 0)
		) {
			until = event.start;
		}
	}

	startedEvents = { events, from: now, until };
	return events;
}

export function skyEventFamilies(): ReadonlyCollection<EventFamilyIds, EventFamily> {
	const grouped = new Collection<EventFamilyIds, [Event, ...Event[]]>();

	for (const event of skyEvents().toReversed().values()) {
		const occurrences = grouped.get(event.family);

		if (occurrences) {
			occurrences.push(event);
		} else {
			grouped.set(event.family, [event]);
		}
	}

	return grouped.mapValues((occurrences) => new EventFamily(occurrences));
}

export function skyCurrentEvents(
	date: Temporal.ZonedDateTime,
): ReadonlyCollection<EventIds, Event> {
	return EVENTS.filter(({ start, end }) => isActive(start, end, date));
}

export function skyUpcomingEvents(
	date: Temporal.ZonedDateTime,
): ReadonlyCollection<EventIds, Event> {
	return EVENTS.filter(({ start }) => Temporal.ZonedDateTime.compare(start, date) >= 0);
}

export function skyNotEndedEvents(
	date: Temporal.ZonedDateTime,
): ReadonlyCollection<EventIds, Event> {
	return EVENTS.filter(({ end }) => Temporal.ZonedDateTime.compare(date, end) < 0);
}

export function skyEventsBetween(
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
): ReadonlyCollection<EventIds, Event> {
	return EVENTS.filter(
		(event) =>
			Temporal.ZonedDateTime.compare(event.start, end) < 0 &&
			Temporal.ZonedDateTime.compare(start, event.end) < 0,
	);
}

export function communityUpcomingEvents(date: Temporal.ZonedDateTime): readonly CommunityEvent[] {
	return COMMUNITY_EVENTS.filter(({ start }) => Temporal.ZonedDateTime.compare(start, date) >= 0);
}

export function communityEventsBetween(
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
): readonly CommunityEvent[] {
	return COMMUNITY_EVENTS.filter(
		(communityEvent) =>
			Temporal.ZonedDateTime.compare(start, communityEvent.start) <= 0 &&
			Temporal.ZonedDateTime.compare(communityEvent.start, end) < 0,
	);
}
