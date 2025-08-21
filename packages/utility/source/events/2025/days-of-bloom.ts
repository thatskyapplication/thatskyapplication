import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 3, 24), end = skyDate(2_025, 4, 14);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfBloom2025,
	start: skyDate(2_025, 3, 24),
	end: skyDate(2_025, 4, 14),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 3, 24),
				end: skyDate(2_025, 4, 13),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.BloomRoseJar,
			cost: { eventTickets: 16 },
		},
		{
			cosmetic: Cosmetic.BloomRoseBraidedHair,
			cost: { eventTickets: 28 },
		},
		{
			cosmetic: Cosmetic.BloomRosePetalMask,
			cost: { eventTickets: 36 },
		},
		{
			cosmetic: Cosmetic.BloomRoseEmbroideredCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0285"),
});
