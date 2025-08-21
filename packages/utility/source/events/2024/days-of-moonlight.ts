import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 9, 16), end = skyDate(2_024, 9, 30);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfMoonlight2024,
	start: skyDate(2_024, 9, 16),
	end: skyDate(2_024, 9, 30),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.MoonlightBlossomAccessory,
			cost: { eventTickets: 17 },
		},
		{
			cosmetic: Cosmetic.MoonlightLanternDecoration,
			cost: { eventTickets: 32 },
		},
		{
			cosmetic: Cosmetic.MoonlightEarrings,
			cost: { money: 2.99 },
		},
		{
			cosmetic: [Cosmetic.MoonlightFrock, Cosmetic.MoonlightUpdo],
			cosmeticDisplay: Cosmetic.MoonlightFrock,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0265"),
});
