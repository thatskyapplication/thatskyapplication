import { URL } from "node:url";
import { Locale } from "@discordjs/core";
import { t } from "i18next";
import type { DateTime } from "luxon";
import {
	EventIdToEventCurrencyEmoji,
	type EventIds,
	type Item,
	type ItemRaw,
	resolveAllCosmetics,
	resolveOffer,
	snakeCaseName,
	wikiURL,
} from "../utility/catalogue.js";
import { CDN_URL } from "../utility/constants.js";
import type { EventEmojis } from "../utility/emojis.js";

// const EVENT_ROTATION_LETTER = ["A", "C", "B"] as const;

/**
 * Data to create an event.
 */
interface EventData {
	/**
	 * The id of the event.
	 */
	id: EventIds;
	/**
	 * The start date of the event.
	 */
	start: DateTime;
	/**
	 * The end date of the event.
	 *
	 * @remarks The end date is exclusive.
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
	/**
	 * The URL of the patch notes that detail the event.
	 */
	patchNotesURL?: string;
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
	public readonly id: EventIds;

	private readonly name: string;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly eventCurrency: EventCurrency | null;

	public readonly offer: readonly Item[];

	public readonly allCosmetics: number[];

	public readonly offerInfographicURL: string | null;

	public readonly wikiURL: string;

	public readonly patchNotesURL: string | null;

	public constructor(data: EventData) {
		this.id = data.id;
		this.name = t(`events.${data.id}`, { lng: Locale.EnglishGB, ns: "general" });
		this.start = data.start;
		this.end = data.end;

		this.eventCurrency = data.eventCurrency
			? {
					...data.eventCurrency,
					amount: data.eventCurrency.amount.map((amount) => ({
						...amount,
						infographicURL: amount.infographicURL ?? null,
					})),
					emoji: EventIdToEventCurrencyEmoji[data.id],
					end: data.eventCurrency.end ?? data.end,
				}
			: null;

		this.offer = data.offer ? resolveOffer(data.offer, { eventId: data.id }) : [];
		this.allCosmetics = data.offer ? resolveAllCosmetics(this.offer) : [];

		this.offerInfographicURL = data.offerInfographicURL
			? String(new URL(`events/${this.start.year}/${snakeCaseName(this.name)}/offer.webp`, CDN_URL))
			: null;

		this.wikiURL = wikiURL(this.name);
		this.patchNotesURL = data.patchNotesURL ?? null;
	}

	public daysText(date: DateTime, locale: Locale) {
		const { end, start, name } = this;
		const daysLeft = end.diff(date, "days").days;
		const daysUntilStart = start.diff(date, "days").days;

		if (daysLeft <= 0) {
			return daysLeft === 0
				? `${name} ended ${Math.abs(daysLeft)} day ago.`
				: `${name} ended ${Math.abs(daysLeft)} days ago.`;
		}

		if (daysUntilStart > 0) {
			return daysUntilStart < 1
				? `${name} starts today.`
				: daysUntilStart >= 2
					? `${name} starts in ${Math.floor(daysUntilStart)} days.`
					: `${name} starts tomorrow.`;
		}

		return t("days-left.event", {
			lng: locale,
			ns: "general",
			count: Math.ceil(daysLeft) - 1,
			name,
		});
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
