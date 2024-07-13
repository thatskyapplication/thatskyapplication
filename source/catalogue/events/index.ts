import type { DateTime } from "luxon";
import { skyNow } from "../../Utility/dates.js";
import Year1 from "./2019/index.js";
import Year2 from "./2020/index.js";
import Year3 from "./2021/index.js";
import Year4 from "./2022/index.js";
import Year5 from "./2023/index.js";
import Year6 from "./2024/index.js";

const EVENTS = [...Year1, ...Year2, ...Year3, ...Year4, ...Year5, ...Year6] as const;

export function currentEvents() {
	return EVENTS.filter((event) => skyNow() >= event.start);
}

export function currentEventsYears() {
	return [...new Set(currentEvents().map(({ start: { year } }) => year))];
}

export function resolveEvents(date: DateTime) {
	return EVENTS.filter(({ start, end }) => date >= start && date <= end) ?? null;
}

export function plannedEvents(date: DateTime) {
	return EVENTS.filter(({ end }) => date <= end);
}

export function upcomingEvents(date: DateTime) {
	return EVENTS.filter(({ start }) => start > date);
}
