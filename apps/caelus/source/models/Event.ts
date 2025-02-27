import { URL } from "node:url";
import { Locale } from "@discordjs/core";
import {
	type Emoji,
	type EventIds,
	type Item,
	type ItemRaw,
	resolveAllCosmetics,
	resolveOffer,
	wikiURL,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { EventIdToEventTicketEmoji } from "../utility/catalogue.js";
import { CDN_URL } from "../utility/constants.js";

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
	 * Data related to event tickets.
	 */
	eventTickets?: EventTicketsData;
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

interface EventTicketsData {
	amount: readonly EventTicketsAmountData[];
	pool?: readonly EventTicketsPoolData[];
	end?: DateTime;
}

interface EventTicketsAmountData {
	date: DateTime;
	amount: number;
	infographicURL?: string;
}

interface EventTicketsPoolData {
	start: DateTime;
	end: DateTime;
	amount: number;
}

interface EventTickets {
	/**
	 * The emoji representing the event tickets.
	 *
	 * @remarks This is `null` for events that do not (yet) have an event ticket emoji.
	 */
	emoji: Emoji | null;
	amount: readonly EventTicketsAmount[];
	pool?: readonly EventTicketsPool[];
	end: DateTime;
}

interface EventTicketsAmount {
	date: DateTime;
	amount: number;
	infographicURL: string | null;
}

interface EventTicketsPool {
	start: DateTime;
	end: DateTime;
	amount: number;
}

export class Event {
	public readonly id: EventIds;

	private readonly name: string;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly eventTickets: EventTickets | null;

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

		this.eventTickets = data.eventTickets
			? {
					...data.eventTickets,
					amount: data.eventTickets.amount.map((amount) => ({
						...amount,
						infographicURL: amount.infographicURL ?? null,
					})),
					emoji: EventIdToEventTicketEmoji[data.id],
					end: data.eventTickets.end ?? data.end,
				}
			: null;

		this.offer = data.offer ? resolveOffer(data.offer, { eventId: data.id }) : [];
		this.allCosmetics = data.offer ? resolveAllCosmetics(this.offer) : [];

		this.offerInfographicURL = data.offerInfographicURL
			? String(new URL(`events/${data.id}/offer.webp`, CDN_URL))
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
			this.eventTickets?.amount.find((amount) => date.startOf("day") === amount.date.startOf("day"))
				?.infographicURL ?? null
		);
	}

	public rotation(/* date: DateTime */) {
		return null;
		// return EVENT_ROTATION_LETTER[date.diff(this.start, "day").days % 3]!;
	}
}
