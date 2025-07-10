import { CDN_URL } from "../../cdn.js";
import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 2, 12), end = skyDate(2_024, 2, 26);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(new URL(`events/${EventId.DaysOfLove2024}/event_tickets.webp`, CDN_URL)),
	});
}

export default new Event({
	id: EventId.DaysOfLove2024,
	start: skyDate(2_024, 2, 12),
	end: skyDate(2_024, 2, 26),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.LoveHeartPlushie,
			cost: { eventTickets: 14 },
		},
		{
			cosmetic: Cosmetic.LoveHeartBeret,
			cost: { eventTickets: 27 },
		},
		{
			cosmetic: Cosmetic.DaysofLoveMusicSheet,
			cost: { eventTickets: 7 },
		},
		{
			cosmetic: Cosmetic.DaysofLoveMeteorMantle,
			cost: { money: 17.99 },
		},
	],
	patchNotesURL: String(new URL("p0240", LINK_REDIRECTOR_URL)),
});
