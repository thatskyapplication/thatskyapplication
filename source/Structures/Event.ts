import type { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type EventName, type Item, type ItemRaw, EventNameToEventCurrencyEmoji, resolveOffer, wikiURL } from "../Utility/catalogue.js";
import { type EventEmojis } from "../Utility/emojis.js";

// const EVENT_ROTATION_LETTER = ["A", "C", "B"] as const;

interface EventFriendshipTreeOfferData {
	hasInfographic?: boolean;
	items: Collection<number, ItemRaw>;
}

interface EventData {
	name: EventName;
	start: DateTime;
	end: DateTime;
	eventCurrencyEnd?: DateTime;
	url: string | readonly EventDataURL[] | null;
	eventCurrencyPerDay: number;
	offer: EventFriendshipTreeOfferData;
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

	public readonly offer: Collection<number, Item>;

	public readonly maxItemsBit: number;

	public readonly imageURL: string | null;

	public readonly wikiURL: string;

	public constructor(data: EventData) {
		this.name = data.name;
		this.start = data.start;
		this.end = data.end;
		this.eventCurrencyEnd = data.eventCurrencyEnd ?? data.end;
		this.url = data.url;
		this.eventCurrencyPerDay = data.eventCurrencyPerDay;
		this.eventCurrencyEmoji = EventNameToEventCurrencyEmoji[data.name];
		this.offer = resolveOffer(data.offer.items);
		this.maxItemsBit = this.resolveMaxItemsBit(data.offer.items);
		this.imageURL = data.offer.hasInfographic ?? true ? "https://cdn.thatskyapplication.com/hugs/1.gif" : null;
		this.wikiURL = wikiURL(data.name);
	}

	private resolveMaxItemsBit(offer: Collection<number, ItemRaw>) {
		return offer.reduce((bits, _, bit) => bit | bits, 0) ?? 0;
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
