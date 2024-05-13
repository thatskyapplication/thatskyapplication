import type { DateTime } from "luxon";
import { type EventEmojis } from "../Utility/emojis.js";
import type { EventName } from "../Utility/events.js";

// const EVENT_ROTATION_LETTER = ["A", "C", "B"] as const;

interface EventData {
	name: EventName;
	start: DateTime;
	end: DateTime;
	eventCurrencyEnd?: DateTime;
	url: string | readonly EventDataURL[] | null;
	eventCurrencyPerDay: number;
	eventCurrencyEmoji: EventEmojis;
}

interface EventDataURL {
	date: DateTime;
	url: string;
}

export class Event {
	public readonly name: EventName;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly eventCurrencyEnd: DateTime;

	public readonly url: string | readonly EventDataURL[] | null;

	public readonly eventCurrencyPerDay: number;

	public readonly eventCurrencyEmoji: EventEmojis;

	public constructor(data: EventData) {
		this.name = data.name;
		this.start = data.start;
		this.end = data.end;
		this.eventCurrencyEnd = data.eventCurrencyEnd ?? data.end;
		this.url = data.url;
		this.eventCurrencyPerDay = data.eventCurrencyPerDay;
		this.eventCurrencyEmoji = data.eventCurrencyEmoji;
	}

	public daysText(date: DateTime) {
		const { end, start, name } = this;
		const daysLeftInEvent = end.diff(date, "days").days;
		const daysUntilStart = start.diff(date, "days").days;

		return daysUntilStart <= 0 && daysLeftInEvent >= 0
			? daysLeftInEvent === 0
				? `${name} ends today.`
				: `${daysLeftInEvent === 1 ? `${daysLeftInEvent} day` : `${daysLeftInEvent} days`} left in ${name}.`
			: daysUntilStart > 0
			? daysUntilStart === 1
				? `${name} starts tomorrow.`
				: `${name} starts in ${daysUntilStart} days.`
			: daysLeftInEvent === -1
			? `${name} ended ${Math.abs(daysLeftInEvent)} day ago.`
			: `${name} ended ${Math.abs(daysLeftInEvent)} days ago.`;
	}

	public rotation(/* date: DateTime */) {
		return null;
		// return EVENT_ROTATION_LETTER[date.diff(this.start, "day").days % 3]!;
	}
}
