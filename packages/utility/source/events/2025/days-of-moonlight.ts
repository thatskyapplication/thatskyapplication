import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 9, 29), end = skyDate(2_025, 10, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfMoonlight2025,
	start: skyDate(2_025, 9, 29),
	end: skyDate(2_025, 10, 13),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 9, 29),
				end: skyDate(2_025, 10, 12),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.MoonlightBasin,
			cost: { candles: 75 },
		},
		{
			cosmetic: Cosmetic.MoonlightBanner,
			cost: { eventTickets: 18 },
		},
		{
			cosmetic: Cosmetic.MoonlightTuftedTail,
			cost: { eventTickets: 42 },
		},
		{
			cosmetic: Cosmetic.MoonlightGarlandCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0305"),
});
