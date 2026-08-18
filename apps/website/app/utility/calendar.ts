import type { ExternalLinkListItem } from "~/components/ExternalLinkList";

export const CALENDAR_MINIMUM_DATE = "2017-12-19" as const;

export const CalendarView = {
	Month: "month",
	Week: "week",
} as const satisfies Readonly<Record<string, string>>;

const CALENDAR_VIEW_VALUES = Object.values(CalendarView);
export type CalendarViews = (typeof CALENDAR_VIEW_VALUES)[number];

export const CalendarEntryKind = {
	Season: 0,
	Event: 1,
	TravellingSpirit: 2,
	ReturningSpirits: 3,
	DoubleSeasonalLight: 4,
	DoubleTreasureCandles: 5,
	DoubleHearts: 6,
	RadianceEvent: 7,
	CommunityEvent: 8,
	ShardEruption: 9,
	Maintenance: 10,
} as const satisfies Readonly<Record<string, number>>;

export const CALENDAR_ENTRY_KIND_VALUES = Object.values(CalendarEntryKind);
export type CalendarEntryKinds = (typeof CALENDAR_ENTRY_KIND_VALUES)[number];

export const CalendarEntryKindToLabelKey = {
	[CalendarEntryKind.Season]: "general:season",
	[CalendarEntryKind.Event]: "general:event",
	[CalendarEntryKind.TravellingSpirit]: "general:travelling-spirit",
	[CalendarEntryKind.ReturningSpirits]: "general:returning-spirits",
	[CalendarEntryKind.DoubleSeasonalLight]: "general:event-names.double-seasonal-light",
	[CalendarEntryKind.DoubleTreasureCandles]: "general:event-names.double-treasure-candles",
	[CalendarEntryKind.DoubleHearts]: "general:event-names.double-hearts",
	[CalendarEntryKind.RadianceEvent]: "general:event-names.radiance-event",
	[CalendarEntryKind.CommunityEvent]: "features:calendar.community-event",
	[CalendarEntryKind.ShardEruption]: "general:shard-eruption",
	[CalendarEntryKind.Maintenance]: "general:maintenance",
} as const satisfies Readonly<Record<CalendarEntryKinds, string>>;

export const CalendarEntryKindToBarClassName = {
	[CalendarEntryKind.Season]:
		"bg-sky-200 text-sky-900 hover:bg-sky-300 dark:bg-sky-800 dark:text-sky-50 dark:hover:bg-sky-700",
	[CalendarEntryKind.Event]:
		"bg-rose-200 text-rose-900 hover:bg-rose-300 dark:bg-rose-800 dark:text-rose-50 dark:hover:bg-rose-700",
	[CalendarEntryKind.TravellingSpirit]:
		"bg-violet-200 text-violet-900 hover:bg-violet-300 dark:bg-violet-800 dark:text-violet-50 dark:hover:bg-violet-700",
	[CalendarEntryKind.ReturningSpirits]:
		"bg-violet-200 text-violet-900 hover:bg-violet-300 dark:bg-violet-800 dark:text-violet-50 dark:hover:bg-violet-700",
	[CalendarEntryKind.DoubleSeasonalLight]:
		"bg-emerald-200 text-emerald-900 hover:bg-emerald-300 dark:bg-emerald-800 dark:text-emerald-50 dark:hover:bg-emerald-700",
	[CalendarEntryKind.DoubleTreasureCandles]:
		"bg-orange-200 text-orange-900 hover:bg-orange-300 dark:bg-orange-800 dark:text-orange-50 dark:hover:bg-orange-700",
	[CalendarEntryKind.DoubleHearts]:
		"bg-fuchsia-200 text-fuchsia-900 hover:bg-fuchsia-300 dark:bg-fuchsia-800 dark:text-fuchsia-50 dark:hover:bg-fuchsia-700",
	[CalendarEntryKind.RadianceEvent]:
		"bg-lime-200 text-lime-900 hover:bg-lime-300 dark:bg-lime-800 dark:text-lime-50 dark:hover:bg-lime-700",
	[CalendarEntryKind.CommunityEvent]:
		"bg-teal-200 text-teal-900 hover:bg-teal-300 dark:bg-teal-800 dark:text-teal-50 dark:hover:bg-teal-700",
	[CalendarEntryKind.ShardEruption]:
		"bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-50 dark:hover:bg-slate-600",
	[CalendarEntryKind.Maintenance]:
		"bg-amber-200 text-amber-900 hover:bg-amber-300 dark:bg-amber-800 dark:text-amber-50 dark:hover:bg-amber-700",
} as const satisfies Readonly<Record<CalendarEntryKinds, string>>;

export const CalendarEntryKindToSwatchClassName = {
	[CalendarEntryKind.Season]: "bg-sky-400 dark:bg-sky-600",
	[CalendarEntryKind.Event]: "bg-rose-400 dark:bg-rose-600",
	[CalendarEntryKind.TravellingSpirit]: "bg-violet-400 dark:bg-violet-600",
	[CalendarEntryKind.ReturningSpirits]: "bg-violet-400 dark:bg-violet-600",
	[CalendarEntryKind.DoubleSeasonalLight]: "bg-emerald-400 dark:bg-emerald-600",
	[CalendarEntryKind.DoubleTreasureCandles]: "bg-orange-400 dark:bg-orange-600",
	[CalendarEntryKind.DoubleHearts]: "bg-fuchsia-400 dark:bg-fuchsia-600",
	[CalendarEntryKind.RadianceEvent]: "bg-lime-400 dark:bg-lime-600",
	[CalendarEntryKind.CommunityEvent]: "bg-teal-400 dark:bg-teal-600",
	[CalendarEntryKind.ShardEruption]: "bg-slate-400 dark:bg-slate-500",
	[CalendarEntryKind.Maintenance]: "bg-amber-400 dark:bg-amber-600",
} as const satisfies Readonly<Record<CalendarEntryKinds, string>>;

export interface CalendarEntry {
	key: string;
	kind: CalendarEntryKinds;
	label: string;
	detail: string | null;
	firstDate: string;
	lastDate: string;
	startsAt: number;
	endsAt: number;
	startLabel: string;
	endLabel: string;
	iconURLs: readonly string[];
	range: string;
	duration: number;
	wikiURL: string | null;
	pageURL: string | null;
	catalogueURL: string | null;
	marketingURL: string | null;
	spiritLinks: readonly ExternalLinkListItem[] | null;
}

export interface CalendarDay {
	date: string;
	label: string;
	fullLabel: string;
	exists: boolean;
	outsideFocus: boolean;
	isToday: boolean;
}

export interface CalendarSegment {
	key: string;
	entry: CalendarEntry;
	startColumn: number;
	columnSpan: number;
	lane: number;
	continuesBefore: boolean;
	continuesAfter: boolean;
}

export interface CalendarDayOccurrence {
	key: string;
	label: string;
	detail: string | null;
	iconURL: string | null;
	light: boolean;
	infographicURL: string | null;
	acknowledgement: string | null;
	wikiURL: string | null;
	pageURL: string | null;
	catalogueURL: string | null;
	times: readonly string[];
	cadence: string | null;
	count: number;
}

export interface CalendarDayDetail {
	date: string;
	heading: string;
	allDay: readonly CalendarEntry[];
	occurrences: readonly CalendarDayOccurrence[];
}

export interface CalendarWeek {
	key: string;
	days: readonly CalendarDay[];
}

export function isCalendarView(value: unknown): value is CalendarViews {
	return CALENDAR_VIEW_VALUES.some((view) => view === value);
}

export function calendarPath(view: CalendarViews, date?: string, day?: string) {
	const searchParams = new URLSearchParams();

	if (view !== CalendarView.Month) {
		searchParams.set("view", view);
	}

	if (date !== undefined) {
		searchParams.set("date", date);
	}

	if (day !== undefined) {
		searchParams.set("day", day);
	}

	const query = searchParams.toString();
	return query.length > 0 ? `/calendar?${query}` : "/calendar";
}

export function packCalendarWeek(
	days: readonly CalendarDay[],
	entries: readonly CalendarEntry[],
): { segments: CalendarSegment[]; laneCount: number } {
	const firstDate = days[0]!.date;
	const lastDate = days.at(-1)!.date;
	const laneEndColumns: number[] = [];
	const segments: CalendarSegment[] = [];

	const place = (entry: CalendarEntry, minimumLane: number) => {
		if (entry.lastDate < firstDate || entry.firstDate > lastDate) {
			return;
		}

		const continuesBefore = entry.firstDate < firstDate;
		const continuesAfter = entry.lastDate > lastDate;
		const startIndex = continuesBefore ? 0 : days.findIndex((day) => day.date === entry.firstDate);
		const endIndex = continuesAfter
			? days.length - 1
			: days.findIndex((day) => day.date === entry.lastDate);

		let lane = laneEndColumns.length;

		for (let index = minimumLane; index < laneEndColumns.length; index++) {
			if (laneEndColumns[index]! < startIndex) {
				lane = index;
				break;
			}
		}

		laneEndColumns[lane] = endIndex;

		segments.push({
			key: `${entry.key}-${firstDate}`,
			entry,
			startColumn: startIndex + 1,
			columnSpan: endIndex - startIndex + 1,
			lane,
			continuesBefore,
			continuesAfter,
		});
	};

	for (const entry of entries) {
		if (entry.kind !== CalendarEntryKind.ShardEruption) {
			place(entry, 0);
		}
	}

	const shardEruptionLane = laneEndColumns.length;

	for (const entry of entries) {
		if (entry.kind === CalendarEntryKind.ShardEruption) {
			place(entry, shardEruptionLane);
		}
	}

	return { segments, laneCount: laneEndColumns.length };
}
