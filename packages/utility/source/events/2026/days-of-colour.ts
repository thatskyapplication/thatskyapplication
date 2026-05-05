import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 5, 29), end = skyDate(2026, 6, 19);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfColour2026,
	name: "days-of-colour",
	start: skyDate(2026, 5, 29),
	end: skyDate(2026, 6, 19),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 5, 29),
				end: skyDate(2026, 6, 18),
			},
		],
	},
});
