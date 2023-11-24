import { URL } from "node:url";
import type { DateTime } from "luxon";
import { CDN_URL } from "../Utility/Constants.js";
import { skyDate } from "../Utility/dates.js";
import { type Emoji, MISCELLANEOUS_EMOJIS } from "../Utility/emojis.js";

// const EVENT_ROTATION_LETTER = ["A", "B", "C"] as const;

interface EventData {
	name: string;
	start: DateTime;
	end: DateTime;
	eventCurrencyEnd?: DateTime;
	url: string | null;
	eventCurrencyPerDay: number;
	eventCurrencyEmoji: Emoji;
}

class Event {
	public readonly name: string;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly eventCurrencyEnd: DateTime;

	public readonly url: string | null;

	public readonly eventCurrencyPerDay: number;

	public readonly eventCurrencyEmoji: Emoji;

	public constructor(data: EventData) {
		this.name = data.name;
		this.start = data.start;
		this.end = data.end;
		this.eventCurrencyEnd = data.eventCurrencyEnd ?? data.end;
		this.url = data.url;
		this.eventCurrencyPerDay = data.eventCurrencyPerDay;
		this.eventCurrencyEmoji = data.eventCurrencyEmoji;
	}

	public rotation(/* date: DateTime */) {
		return null;
		// return EVENT_ROTATION_LETTER[date.diff(this.start, "day").days % 3]!;
	}
}

const EVENTS = [
	new Event({
		name: "Days of Mischief",
		start: skyDate(2_023, 10, 23),
		end: skyDate(2_023, 11, 12),
		url: String(new URL("daily_guides/events/days_of_mischief/2023.webp", CDN_URL)),
		eventCurrencyPerDay: 6,
		eventCurrencyEmoji: MISCELLANEOUS_EMOJIS.EventMischief,
	}),
	new Event({
		name: "Aviary's Firework Festival",
		start: skyDate(2_023, 11, 27),
		end: skyDate(2_023, 12, 17),
		eventCurrencyEnd: skyDate(2_023, 12, 11),
		url: String(new URL("daily_guides/events/aviarys_firework_festival/2023.webp", CDN_URL)),
		eventCurrencyPerDay: 5,
		eventCurrencyEmoji: MISCELLANEOUS_EMOJIS.EventAviarysFireworkFestival,
	}),
	new Event({
		name: "Days of Feast",
		start: skyDate(2_023, 12, 18),
		end: skyDate(2_024, 1, 7),
		url: String(new URL("daily_guides/events/days_of_feast/2023.webp", CDN_URL)),
		eventCurrencyPerDay: 5,
		eventCurrencyEmoji: MISCELLANEOUS_EMOJIS.EventFeast,
	}),
] as const satisfies Readonly<Event[]>;

export function resolveEvent(date: DateTime) {
	return EVENTS.find(({ start, end }) => date >= start && date <= end) ?? null;
}

export function plannedEvents(date: DateTime) {
	return EVENTS.filter(({ end }) => date <= end);
}
