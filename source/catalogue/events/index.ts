import type { DateTime } from "luxon";
import Year5 from "./2023/index.js";
import Year6 from "./2024/index.js";

export const EVENTS = [...Year5, ...Year6] as const;

export function resolveEvents(date: DateTime) {
	return EVENTS.filter(({ start, end }) => date >= start && date <= end) ?? null;
}

export function plannedEvents(date: DateTime) {
	return EVENTS.filter(({ end }) => date <= end);
}
