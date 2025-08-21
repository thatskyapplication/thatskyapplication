import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 9, 30), end = skyDate(2_024, 10, 14);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfStyle2024,
	start: skyDate(2_024, 9, 30),
	end: skyDate(2_024, 10, 14),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.StyleDarknessFascinator,
			cost: { eventTickets: 15 },
		},
		{
			cosmetic: Cosmetic.StyleDazzlingDress,
			cost: { eventTickets: 34 },
		},
		{
			cosmetic: [
				Cosmetic.StyleDapperSuit,
				Cosmetic.StyleDapperMonocle,
				Cosmetic.StyleDapperNecktie,
			],
			cosmeticDisplay: Cosmetic.StyleDapperSuit,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0265"),
});
