import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { DateTime } from "luxon";
import { skyNow } from "../dates.js";
import type { Event } from "../models/event.js";
import type { EventIds } from "../utility/event.js";
import Year1 from "./2019/index.js";
import Year2 from "./2020/index.js";
import Year3 from "./2021/index.js";
import Year4 from "./2022/index.js";
import Year5 from "./2023/index.js";
import Year6 from "./2024/index.js";
import Year7 from "./2025/index.js";

const EVENTS = [...Year1, ...Year2, ...Year3, ...Year4, ...Year5, ...Year6, ...Year7].reduce(
	(events, event) => events.set(event.id, event),
	new Collection<EventIds, Event>(),
);

export function skyEvents(): ReadonlyCollection<EventIds, Event> {
	return EVENTS.filter((event) => skyNow() >= event.start);
}

export function skyEventYears() {
	return [...new Set(skyEvents().map(({ start: { year } }) => year))];
}

export function skyCurrentEvents(date: DateTime): ReadonlyCollection<EventIds, Event> {
	return EVENTS.filter(({ start, end }) => date >= start && date < end);
}

export function skyNotEndedEvents(date: DateTime): ReadonlyCollection<EventIds, Event> {
	return EVENTS.filter(({ end }) => date < end);
}

export function skyUpcomingEvents(date: DateTime): ReadonlyCollection<EventIds, Event> {
	return EVENTS.filter(({ start }) => start > date);
}
