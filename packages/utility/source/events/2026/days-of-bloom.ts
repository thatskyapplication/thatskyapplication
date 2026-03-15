import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 3, 13), end = skyDate(2026, 4, 3);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfBloom2026,
	name: "days-of-bloom",
	start: skyDate(2026, 3, 13),
	end: skyDate(2026, 4, 3),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 3, 13),
				end: skyDate(2026, 4, 2),
			},
		],
	},
});
