import type { DateTime } from "luxon";
import { CDN_URL } from "../cdn.js";
import type { Cosmetic } from "../cosmetics.js";
import type { EventIds } from "../utility/event.js";
import { resolveAllCosmeticsFromItems, resolveOfferFromItems } from "../utility/functions.js";
import type { Item, ItemRaw } from "../utility/spirits.js";

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
	amount?: readonly EventTicketsAmountData[];
	pool?: readonly EventTicketsPoolData[];
	end?: DateTime;
}

export interface EventTicketsAmountData {
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

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly eventTickets: EventTickets | null;

	public readonly offer: readonly Item[];

	public readonly allCosmetics: readonly Cosmetic[];

	public readonly offerInfographicURL: string | null;

	public readonly patchNotesURL: string | null;

	public constructor(data: EventData) {
		this.id = data.id;
		this.start = data.start;
		this.end = data.end;

		this.eventTickets = data.eventTickets
			? {
					...data.eventTickets,
					amount:
						data.eventTickets.amount?.map((amount) => ({
							...amount,
							infographicURL: amount.infographicURL ?? null,
						})) ?? [],
					end: data.eventTickets.end ?? data.end,
				}
			: null;

		this.offer = data.offer ? resolveOfferFromItems(data.offer, { eventId: data.id }) : [];
		this.allCosmetics = resolveAllCosmeticsFromItems(this.offer);

		this.offerInfographicURL = data.offerInfographicURL
			? String(new URL(`events/${data.id}/offer.webp`, CDN_URL))
			: null;

		this.patchNotesURL = data.patchNotesURL ?? null;
	}

	public resolveInfographicURL(date: DateTime): string | null {
		return (
			this.eventTickets?.amount.find((amount) => date.startOf("day") === amount.date.startOf("day"))
				?.infographicURL ?? null
		);
	}
}
