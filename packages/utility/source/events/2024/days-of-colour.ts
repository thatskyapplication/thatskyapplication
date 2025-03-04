import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2024, 6, 24), end = skyDate(2_024, 7, 8);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfColour2024,
	start: skyDate(2_024, 6, 24),
	end: skyDate(2_024, 7, 8),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Dark Rainbow Mask",
			cosmetic: Cosmetic.DarkRainbowMask,
			cost: { eventTickets: 32 },
		},
		{
			name: "Colour Glam Cut",
			cosmetic: Cosmetic.ColourGlamCut,
			cost: { eventTickets: 18 },
		},
		{
			name: "Dark Rainbow Loafers",
			cosmetic: Cosmetic.DarkRainbowLoafers,
			cost: { money: 19.99 },
		},
		{
			name: "Colour Bubble Machine",
			cosmetic: Cosmetic.ColourBubbleMachine,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0255", LINK_REDIRECTOR_URL)),
});
