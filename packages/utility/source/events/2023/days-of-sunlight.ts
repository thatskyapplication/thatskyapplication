import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_023, 9, 11), end = skyDate(2_023, 9, 25);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 6 });
}

export default new Event({
	id: EventId.DaysOfSunlight2023,
	start: skyDate(2_023, 9, 11),
	end: skyDate(2_023, 9, 25),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.SunlightPinkBeachTowelCape,
			cost: { eventTickets: 16 },
		},
		{
			cosmetic: Cosmetic.SunlightYellowBeachTowelCape,
			cost: { eventTickets: 18 },
		},
		{
			cosmetic: Cosmetic.SunlightBlueBeachTowelCape,
			cost: { eventTickets: 23 },
		},
		{
			cosmetic: Cosmetic.SunlightChunkySandals,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.SunlightSurfboard,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0225"),
});
