import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 8, 28), end = skyDate(2026, 9, 11);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.SummerCamping2026,
	name: "summer-camping",
	family: EventFamilyId.SummerCamping,
	start: skyDate(2026, 8, 28),
	end: skyDate(2026, 9, 11),
	eventTickets: {
		amount: eventTicketAmount,
	},
});
