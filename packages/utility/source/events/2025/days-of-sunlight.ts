import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 9, 1), end = skyDate(2_025, 9, 22);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfSunlight2025,
	start: skyDate(2_025, 9, 1),
	end: skyDate(2_025, 9, 22),
	eventTickets: {
		amount: eventTicketAmount,
		// Need more information on bonus event tickets.
	},
	offer: [
		{
			cosmetic: Cosmetic.SunlightShawl,
			cost: { eventTickets: 22 },
		},
		{
			cosmetic: Cosmetic.SunlightWaveProjector,
			cost: { eventTickets: 45 },
		},
		{
			cosmetic: [Cosmetic.SunlightBonnetDress, Cosmetic.SunlightBonnetJellyfishHat],
			cosmeticDisplay: Cosmetic.SunlightBonnetDress,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0305"),
});
