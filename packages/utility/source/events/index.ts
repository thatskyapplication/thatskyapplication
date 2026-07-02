import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import { isActive, skyNow } from "../dates.js";
import type { Event } from "../models/event.js";
import type { EventIds } from "../utility/event.js";
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

export function skyEvents(): ReadonlyCollection<EventIds, Event> {
	return EVENTS.filter((event) => Temporal.ZonedDateTime.compare(skyNow(), event.start) >= 0);
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

export function communityUpcomingEvents(date: Temporal.ZonedDateTime): readonly CommunityEvent[] {
	return COMMUNITY_EVENTS.filter(({ start }) => Temporal.ZonedDateTime.compare(start, date) >= 0);
}
