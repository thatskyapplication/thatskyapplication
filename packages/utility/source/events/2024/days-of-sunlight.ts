import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 8, 26), end = skyDate(2_024, 9, 13);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 6,
	});
}

export default new Event({
	id: EventId.DaysOfSunlight2024,
	name: "days-of-sunlight",
	family: EventFamily.DaysOfSunlight,
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
});
