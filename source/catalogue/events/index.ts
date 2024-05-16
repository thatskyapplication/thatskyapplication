import type { DateTime } from "luxon";
import Year1 from "./2019/index.js";
import Year2 from "./2020/index.js";
import Year3 from "./2021/index.js";
import Year5 from "./2023/index.js";
import Year6 from "./2024/index.js";

export const EVENTS = [...Year1, ...Year2, ...Year3, ...Year5, ...Year6] as const;

export function resolveEvents(date: DateTime) {
	return EVENTS.filter(({ start, end }) => date >= start && date <= end) ?? null;
}

export function plannedEvents(date: DateTime) {
	return EVENTS.filter(({ end }) => date <= end);
}
