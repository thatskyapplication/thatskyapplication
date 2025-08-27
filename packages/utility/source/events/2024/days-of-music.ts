import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 11, 25), end = skyDate(2_024, 12, 12);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 4,
	});
}

export default new Event({
	id: EventId.DaysOfMusic2024,
	start: skyDate(2_024, 11, 25),
	end: skyDate(2_024, 12, 12),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_024, 11, 25),
				end: skyDate(2_024, 12, 11),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.MarchingBandCape,
			cost: { eventTickets: 50 },
		},
		{
			cosmetic: Cosmetic.MusicMarchingUniform,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.JamStation,
			cost: { candles: 250 },
		},
		{
			cosmetic: Cosmetic.FledglingUprightPiano,
			cost: { money: 4.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0275"),
});
