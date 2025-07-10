import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 2, 10), end = skyDate(2_025, 2, 24);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 4,
	});
}

export default new Event({
	id: EventId.DaysOfLove2025,
	start: skyDate(2_025, 2, 10),
	end: skyDate(2_025, 2, 24),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 2, 10),
				end: skyDate(2_025, 2, 23),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.DaysOfLoveVioletCrystal,
			cost: { eventTickets: 14 },
		},
		{
			cosmetic: Cosmetic.DaysOfLoveBraids,
			cost: { eventTickets: 35 },
		},
		{
			cosmetic: Cosmetic.DaysOfLovePurpleDye,
			cost: { eventTickets: 10 },
		},
		{
			cosmetic: Cosmetic.DaysOfLoveAmethystAccessory,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.DaysOfLoveAmethystTippedTails,
			cost: { money: 6.99 },
		},
	],
	patchNotesURL: String(new URL("p0280", LINK_REDIRECTOR_URL)),
});
