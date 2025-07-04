import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2024, 5, 27), end = skyDate(2024, 6, 17);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 4 });
}

export default new Event({
	id: EventId.DaysOfNature2024,
	start: skyDate(2_024, 5, 27),
	end: skyDate(2_024, 6, 17),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Ocean Mask",
			cosmetic: Cosmetic.OceanMask,
			cost: { eventTickets: 16 },
		},
		{
			name: "Ocean Blue Scarf",
			cosmetic: Cosmetic.OceanBlueScarf,
			cost: { eventTickets: 40 },
		},
		{
			name: "Nature Wave Pack",
			cosmetic: Cosmetic.NatureWaveCape,
			cost: { money: 19.99 },
		},
		{
			name: "Nature Wave-Touched Hair",
			cosmetic: Cosmetic.NatureWaveTouchedHair,
			cost: { money: 6.99 },
		},
	],
	patchNotesURL: String(new URL("p0255", LINK_REDIRECTOR_URL)),
});
