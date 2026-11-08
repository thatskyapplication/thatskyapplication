import type { Cosmetic } from "../cosmetics.js";
import { isDuring } from "../dates.js";
import { CDN_URL } from "../routes.js";
import type { EventFamilyIds, EventIds } from "../utility/event.js";
import { resolveAllCosmeticsFromItems, resolveOfferFromItems } from "../utility/functions.js";
import type { ItemRawWithoutChildren, ItemWithoutChildren } from "../utility/spirits.js";

/**
 * Data to create an event.
 */
interface EventData {
	/**
	 * The id of the event.
	 */
	id: EventIds;
	/**
	 * The translation key of the event's name without the "event-names." prefix.
	 */
	name: string;
	/**
	 * Groups the event into a family.
	 */
	family: EventFamilyIds;
	/**
	 * The start date of the event.
	 */
	start: Temporal.ZonedDateTime;
	/**
	 * The end date of the event.
	 *
	 * @remarks The end date is exclusive.
	 */
	end: Temporal.ZonedDateTime;
	/**
	 * Whether the end date is unconfirmed.
	 */
	endUnconfirmed?: boolean;
	/**
	 * Data related to event tickets.
	 */
	eventTickets?: EventTicketsData;
	/**
	 * What the event offers.
	 */
	offer?: readonly ItemRawWithoutChildren[];
	/**
	 * Whether this event has an infographic URL regarding the items it offers.
	 */
	offerInfographicURL?: boolean;
}

interface EventTicketsData {
	amount?: readonly EventTicketsAmountData[];
	pool?: readonly EventTicketsPoolData[];
	end?: Temporal.ZonedDateTime;
}

export interface EventTicketsAmountData {
	date: Temporal.ZonedDateTime;
	amount: number;
	infographicURL?: string;
}

interface EventTicketsPoolData {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
	amount: number;
}

interface EventTickets {
	amount: readonly EventTicketsAmount[];
	pool?: readonly EventTicketsPool[];
	end: Temporal.ZonedDateTime;
}

interface EventTicketsAmount {
	date: Temporal.ZonedDateTime;
	amount: number;
	infographicURL: string | null;
}

interface EventTicketsPool {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
	amount: number;
}

export class Event {
	public readonly id: EventIds;

	public readonly name: `event-names.${string}`;

	public readonly family: EventFamilyIds;

	public readonly start: Temporal.ZonedDateTime;

	public readonly end: Temporal.ZonedDateTime;

	public readonly endUnconfirmed: boolean;

	public readonly eventTickets: EventTickets | null;

	public readonly offer: readonly ItemWithoutChildren[];

	public readonly allCosmetics: readonly Cosmetic[];

	public readonly offerInfographicURL: string | null;

	public constructor(data: EventData) {
		this.id = data.id;
		this.name = `event-names.${data.name}`;
		this.family = data.family;
		this.start = data.start;
		this.end = data.end;
		this.endUnconfirmed = data.endUnconfirmed ?? false;

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
	}

	public remainingEventTickets(date: Temporal.ZonedDateTime) {
		const today = date.startOfDay();

		return {
			dailyEventTicketsLeft:
				this.eventTickets?.amount.reduce(
					(total, { amount, date: eventTicketsDate }) =>
						Temporal.ZonedDateTime.compare(eventTicketsDate, today) >= 0 ? total + amount : total,
					0,
				) ?? 0,
			poolEventTicketsLeft:
				this.eventTickets?.pool?.reduce(
					(total, { amount, end, start }) => (isDuring(start, end, today) ? total + amount : total),
					0,
				) ?? null,
		};
	}

	public resolveInfographicURL(date: Temporal.ZonedDateTime): string | null {
		return (
			this.eventTickets?.amount.find((amount) =>
				date.toPlainDate().equals(amount.date.toPlainDate()),
			)?.infographicURL ?? null
		);
	}
}
