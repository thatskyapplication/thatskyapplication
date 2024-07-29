import { URL } from "node:url";
import type { DateTime } from "luxon";
import { CDN_URL } from "../Utility/Constants.js";
import {
	type EventName,
	EventNameToEventCurrencyEmoji,
	type EventNameUnique,
	EventNameUniqueToEventName,
	type Item,
	type ItemRaw,
	resolveOffer,
	snakeCaseName,
	wikiURL,
} from "../Utility/catalogue.js";
import type { EventEmojis } from "../Utility/emojis.js";

// const EVENT_ROTATION_LETTER = ["A", "C", "B"] as const;

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
	 * Data related to event currency.
	 */
	eventCurrency?: EventCurrencyData;
	/**
	 * What the event offers.
	 */
	offer?: readonly ItemRaw[];
	/**
	 * Whether this event has an infographic URL regarding the items it offers.
	 */
	offerInfographicURL?: boolean;
}

interface EventCurrencyData {
	amount: readonly EventCurrencyAmountData[];
	pool?: readonly EventCurrencyPoolData[];
	end?: DateTime;
}

interface EventCurrencyAmountData {
	date: DateTime;
	amount: number;
	infographicURL?: string;
}

interface EventCurrencyPoolData {
	start: DateTime;
	end: DateTime;
	amount: number;
}

interface EventCurrency {
	/**
	 * The emoji representing the event currency.
	 *
	 * @remarks This is `null` for events that do not (yet) have an event currency emoji.
	 */
	emoji: EventEmojis | null;
	amount: readonly EventCurrencyAmount[];
	pool?: readonly EventCurrencyPool[];
	end: DateTime;
}

interface EventCurrencyAmount {
	date: DateTime;
	amount: number;
	infographicURL: string | null;
}

interface EventCurrencyPool {
	start: DateTime;
	end: DateTime;
	amount: number;
}

export class Event {
	public readonly name: EventName;

	public readonly nameUnique: EventNameUnique;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly eventCurrency: EventCurrency | null;

	public readonly offer: readonly Item[];

	public readonly maximumItemsBit: number | null;

	public readonly offerInfographicURL: string | null;

	public readonly wikiURL: string;

	public constructor(data: EventData) {
		this.name = EventNameUniqueToEventName[data.nameUnique];
		this.nameUnique = data.nameUnique;
		this.start = data.start;
		this.end = data.end;

		this.eventCurrency = data.eventCurrency
			? {
					...data.eventCurrency,
					amount: data.eventCurrency.amount.map((amount) => ({
						...amount,
						infographicURL: amount.infographicURL ?? null,
					})),
					emoji: EventNameToEventCurrencyEmoji[this.name],
					end: data.eventCurrency.end ?? data.end,
				}
			: null;

		this.offer = data.offer ? resolveOffer(data.offer, { eventName: this.name }) : [];
		this.maximumItemsBit = data.offer ? this.resolveMaxItemsBit(data.offer) : null;

		this.offerInfographicURL = data.offerInfographicURL
			? String(new URL(`events/${this.start.year}/${snakeCaseName(this.name)}/offer.webp`, CDN_URL))
			: null;

		this.wikiURL = wikiURL(this.name);
	}

	private resolveMaxItemsBit(offer: readonly ItemRaw[]) {
		return offer.reduce((bits, { bit }) => bit | bits, 0) ?? 0;
	}

	public daysText(date: DateTime) {
		const { end, start, name } = this;
		const startOfDay = date.startOf("day");
		const daysLeft = Math.floor(end.diff(startOfDay, "days").days);
		const daysUntilStart = Math.floor(start.diff(startOfDay, "days").days);

		if (daysLeft <= 0) {
			if (daysLeft === 0) {
				return `${name} ends today.`;
			}

			return daysLeft === -1
				? `${name} ended ${Math.abs(daysLeft)} day ago.`
				: `${name} ended ${Math.abs(daysLeft)} days ago.`;
		}

		if (daysUntilStart > 0) {
			return daysUntilStart === 0
				? `${name} starts today.`
				: daysUntilStart === 1
					? `${name} starts tomorrow.`
					: `${name} starts in ${daysUntilStart} days.`;
		}

		return `${daysLeft === 1 ? `${daysLeft} day` : `${daysLeft} days`} left in ${name}.`;
	}

	public resolveInfographicURL(date: DateTime): string | null {
		return (
			this.eventCurrency?.amount.find(
				(amount) => date.startOf("day") === amount.date.startOf("day"),
			)?.infographicURL ?? null
		);
	}

	public rotation(/* date: DateTime */) {
		return null;
		// return EVENT_ROTATION_LETTER[date.diff(this.start, "day").days % 3]!;
	}
}
