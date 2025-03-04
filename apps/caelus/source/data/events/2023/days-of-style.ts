import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

const eventTicketAmount = [];

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
			name: "Style Top Hat",
			cosmetic: Cosmetic.StyleTopHat,
			cost: { eventTickets: 10 },
		},
		{
			name: "Style Runway Mask",
			cosmetic: Cosmetic.StyleRunwayMask,
			cost: { eventTickets: 8 },
		},
		{
			name: "Style Star Sunglasses",
			cosmetic: Cosmetic.StyleStarSunglasses,
			cost: { eventTickets: 14 },
		},
		{
			name: "Style Silk Ballet Slippers",
			cosmetic: Cosmetic.StyleSilkBalletSlippers,
			cost: { eventTickets: 18 },
		},
		{
			name: "Style Flame Sunglasses",
			cosmetic: Cosmetic.StyleFlameSunglasses,
			cost: { money: 2.99 },
		},
		{
			name: "Style Heart Sunglasses",
			cosmetic: Cosmetic.StyleHeartSunglasses,
			cost: { money: 4.99 },
		},
		{
			name: "Style Bunny Slippers",
			cosmetic: Cosmetic.StyleBunnySlippers,
			cost: { money: 6.99 },
		},
		{
			name: "Style Wide-Leg Jeans",
			cosmetic: Cosmetic.StyleWideLegJeans,
			cost: { money: 9.99 },
		},
	],

	patchNotesURL: String(new URL("p0225", LINK_REDIRECTOR_URL)),
});
