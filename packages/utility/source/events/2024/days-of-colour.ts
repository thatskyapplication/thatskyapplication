import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
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
			cosmetic: Cosmetic.DarkRainbowMask,
			cost: { eventTickets: 32 },
		},
		{
			cosmetic: Cosmetic.ColourGlamCut,
			cost: { eventTickets: 18 },
		},
		{
			cosmetic: Cosmetic.DarkRainbowLoafers,
			cost: { money: 19.99 },
		},
		{
			cosmetic: Cosmetic.ColourBubbleMachine,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0255"),
});
