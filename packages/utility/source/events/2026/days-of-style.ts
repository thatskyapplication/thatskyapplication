import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import {
	Event,
	type EventTicketsAmountData,
	type EventTicketsPoolData,
} from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];
const eventTicketPool: EventTicketsPoolData[] = [];

for (
	let start = skyDate(2026, 11, 27), end = skyDate(2026, 12, 11);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});

	// 1 bonus event ticket seen in Bird Nest.
	// 1 bonus event ticket seen in Forest Cavern.
	// Assuming 1 each day until the last day, where it will be 2, totalling 15.
	eventTicketPool.push({
		amount: start.equals(skyDate(2026, 12, 10)) ? 2 : 1,
		start,
		end: skyDate(2026, 12, 10),
	});
}

export default new Event({
	id: EventId.DaysOfStyle2026,
	name: "days-of-style",
	family: EventFamilyId.DaysOfStyle,
	start: skyDate(2026, 11, 27),
	end: skyDate(2026, 12, 11),
	eventTickets: {
		amount: eventTicketAmount,
		pool: eventTicketPool,
	},
	offer: [
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.DaysOfStyle2026Hair,
			cost: { eventTickets: 29 },
		},
		{
			translation: CosmeticCommon.FaceAccessory,
			cosmetic: Cosmetic.DaysOfStyle2026FaceAccessory,
			cost: { eventTickets: 23 },
		},
		{
			cosmetic: Cosmetic.StyleFluffyCoat,
			cost: { money: 12.99 },
		},
		{
			cosmetic: Cosmetic.StyleButterflyClips,
			cost: { money: 4.99 },
		},
	],
});
