import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 8, 26), end = skyDate(2_024, 9, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 6,
	});
}

export default new Event({
	id: EventId.DaysOfSunlight2024,
	start: skyDate(2_024, 8, 26),
	end: skyDate(2_024, 9, 13),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.SunlightMantaFloat,
			cost: { eventTickets: 20 },
		},
		{
			cosmetic: Cosmetic.SunlightBeachShorts,
			cost: { eventTickets: 30 },
		},
		{
			cosmetic: Cosmetic.SunlightHeliosHoops,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.SunlightWovenWrap,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0265"),
});
