import type { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	type EventName,
	type EventNameUnique,
	type Item,
	type ItemRaw,
	EventNameToEventCurrencyEmoji,
	EventNameUniqueToEventName,
	resolveOffer,
	wikiURL,
} from "../Utility/catalogue.js";
import { type EventEmojis } from "../Utility/emojis.js";

// const EVENT_ROTATION_LETTER = ["A", "C", "B"] as const;

interface EventFriendshipTreeOfferData {
	hasInfographic?: boolean;
	items: Collection<number, ItemRaw>;
}

/**
 * Data to create an event.
 */
interface EventData {
	/**
	 * The unique name of the event.
	 */
	nameUnique: EventNameUnique;
	/**
	 * The start date of the event.
	 */
	start: DateTime;
	/**
	 * The end date of the event.
	 *
	 * @remarks The end date is inclusive.
	 */
	end: DateTime;
	/**
	 * The date at which event currency is no longer available.
	 *
	 * @remarks The end date is inclusive.
	 */
	eventCurrencyEnd?: DateTime;
	/**
	 * The URL to the infographic of the event.
	 */
	url: string | readonly EventDataURL[] | null;
	/**
	 * The amount of event currency available per day.
	 */
	eventCurrencyPerDay?: number;
	/**
	 * What the event offers.
	 */
	offer?: EventFriendshipTreeOfferData;
}

interface EventDataURL {
	date: DateTime;
	url: string;
}

export class Event {
	public readonly name: EventName;

	public readonly nameUnique: EventNameUnique;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly eventCurrencyEnd: DateTime;

	public readonly url: string | readonly EventDataURL[] | null;

	public readonly eventCurrencyPerDay: number | null;

	/**
	 * The emoji representing the event currency.
	 *
	 * @remarks This is `null` for events that do not (yet) have event currency.
	 */
	public readonly eventCurrencyEmoji: EventEmojis | null;

	public readonly offer: Collection<number, Item> | null;

	public readonly maxItemsBit: number | null;

	public readonly imageURL: string | null;

	public readonly wikiURL: string;

	public constructor(data: EventData) {
		this.name = EventNameUniqueToEventName[data.nameUnique];
		this.nameUnique = data.nameUnique;
		this.start = data.start;
		this.end = data.end;
		this.eventCurrencyEnd = data.eventCurrencyEnd ?? data.end;
		this.url = data.url;
		this.eventCurrencyPerDay = data.eventCurrencyPerDay ?? null;
		this.eventCurrencyEmoji = EventNameToEventCurrencyEmoji[this.name];
		this.offer = data.offer ? resolveOffer(data.offer.items, { eventName: this.name }) : null;
		this.maxItemsBit = data.offer ? this.resolveMaxItemsBit(data.offer.items) : null;
		this.imageURL = data.offer
			? data.offer.hasInfographic ?? true
				? "https://cdn.thatskyapplication.com/hugs/1.gif"
				: null
			: null;
		this.wikiURL = wikiURL(this.name);
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
