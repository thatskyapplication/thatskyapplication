import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_023, 10, 2), end = skyDate(2_023, 10, 16);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfStyle2023,
	start: skyDate(2_023, 10, 2),
	end: skyDate(2_023, 10, 16),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.StyleTopHat,
			cost: { eventTickets: 10 },
		},
		{
			cosmetic: Cosmetic.StyleRunwayMask,
			cost: { eventTickets: 8 },
		},
		{
			cosmetic: Cosmetic.StyleStarSunglasses,
			cost: { eventTickets: 14 },
		},
		{
			cosmetic: Cosmetic.StyleSilkBalletSlippers,
			cost: { eventTickets: 18 },
		},
		{
			cosmetic: Cosmetic.StyleFlameSunglasses,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.StyleHeartSunglasses,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.StyleBunnySlippers,
			cost: { money: 6.99 },
		},
		{
			cosmetic: Cosmetic.StyleWideLegJeans,
			cost: { money: 9.99 },
		},
	],

	patchNotesURL: String(new URL("p0225", LINK_REDIRECTOR_URL)),
});
