import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
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
			name: "Moonlight Blossom Accessory",
			cosmetic: Cosmetic.MoonlightBlossomAccessory,
			cost: { eventTickets: 17 },
		},
		{
			name: "Moonlight Lantern Decoration",
			cosmetic: Cosmetic.MoonlightLanternDecoration,
			cost: { eventTickets: 32 },
		},
		{
			name: "Moonlight Earrings",
			cosmetic: Cosmetic.MoonlightEarrings,
			cost: { money: 2.99 },
		},
		{
			name: "Moonlight Frock and Updo",
			cosmetic: [Cosmetic.MoonlightFrock, Cosmetic.MoonlightUpdo],
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0265", LINK_REDIRECTOR_URL)),
});
