import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { CDN_URL, patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2024, 1, 29), end = skyDate(2024, 2, 15);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(
			new URL(`events/${EventId.DaysOfFortune2024}/event_tickets.webp`, CDN_URL),
		),
	});
}

export default new Event({
	id: EventId.DaysOfFortune2024,
	start: skyDate(2_024, 1, 29),
	end: skyDate(2_024, 2, 15),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.FortuneDragonMask,
			cost: { eventTickets: 14 },
		},
		{
			cosmetic: Cosmetic.FortuneDrum,
			cost: { eventTickets: 34 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneDragonVestment,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneDragonStole,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneDragonBangles,
			cost: { money: 1.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0240"),
});
