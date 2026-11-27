import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 11, 27), end = skyDate(2026, 12, 11);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
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
		pool: [
			{
				// 1 bonus event ticket seen in Bird Nest.
				amount: 1,
				start: skyDate(2026, 11, 27),
				end: skyDate(2026, 12, 10),
			},
		],
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
