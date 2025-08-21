import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { CDN_URL, patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_023, 10, 23), end = skyDate(2_023, 11, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 6,
		infographicURL: String(
			new URL(`events/${EventId.DaysOfMischief2023}/event_tickets.webp`, CDN_URL),
		),
	});
}

export default new Event({
	id: EventId.DaysOfMischief2023,
	start: skyDate(2_023, 10, 23),
	end: skyDate(2_023, 11, 13),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.MischiefCrabkinAccessory,
			cost: { eventTickets: 24 },
		},
		{
			cosmetic: Cosmetic.MischiefGothBoots,
			cost: { eventTickets: 16 },
		},
		{
			cosmetic: Cosmetic.MischiefGothGarment,
			cost: { eventTickets: 41 },
		},
		{
			cosmetic: Cosmetic.MischiefGossamerCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.MischiefCrabulaCloak,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.MischiefCrabulaMask,
			cost: { money: 2.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0230"),
});
