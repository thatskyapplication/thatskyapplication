import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 5, 26), end = skyDate(2_025, 6, 9);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfColour2025,
	start: skyDate(2_025, 5, 26),
	end: skyDate(2_025, 6, 9),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 5, 26),
				end: skyDate(2_025, 6, 8),
			},
		],
	},
	offer: [
		{
			name: "Rainbow Smock",
			cosmetic: Cosmetic.RainbowSmock,
			cost: { eventTickets: 42 }
		},
		{
			name: "Rainbow Head Wrap",
			cosmetic: Cosmetic.RainbowHeadWrap,
			cost: { eventTickets: 20 }
		},
		{
			name: "Rainbow Ribbon Shawl",
			cosmetic: Cosmetic.RainbowRibbonShawl,
			cost: { money: 14.99 },
		},
		{
			name: "Rainbow Face Paint Mask",
			cosmetic: Cosmetic.RainbowFacePaintMask,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0290", LINK_REDIRECTOR_URL)),
});
