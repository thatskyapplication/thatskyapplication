import type { DateTime } from "luxon";
import { todayDate } from "../../Utility/dates.js";
import Year1 from "./2019/index.js";
import Year2 from "./2020/index.js";
import Year3 from "./2021/index.js";
import Year4 from "./2022/index.js";
import Year5 from "./2023/index.js";
import Year6 from "./2024/index.js";

const EVENTS = [...Year1, ...Year2, ...Year3, ...Year4, ...Year5, ...Year6] as const;
export const CURRENT_EVENTS = EVENTS.filter((event) => todayDate() > event.start);
export const CURRENT_EVENTS_YEARS = [...new Set(CURRENT_EVENTS.map(({ start: { year } }) => year))];

export function resolveEvents(date: DateTime) {
	return EVENTS.filter(({ start, end }) => date >= start && date <= end) ?? null;
}

export function plannedEvents(date: DateTime) {
	return EVENTS.filter(({ end }) => date <= end);
}
