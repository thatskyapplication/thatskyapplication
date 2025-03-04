import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_023, 9, 11), end = skyDate(2_023, 9, 25);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 6 });
}

export default new Event({
	id: EventId.DaysOfSunlight2023,
	start: skyDate(2_023, 9, 11),
	end: skyDate(2_023, 9, 25),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Sunlight Pink Beach Towel Cape",
			cosmetic: Cosmetic.SunlightPinkBeachTowelCape,
			cost: { eventTickets: 16 },
		},
		{
			name: "Sunlight Yellow Beach Towel Cape",
			cosmetic: Cosmetic.SunlightYellowBeachTowelCape,
			cost: { eventTickets: 18 },
		},
		{
			name: "Sunlight Blue Beach Towel Cape",
			cosmetic: Cosmetic.SunlightBlueBeachTowelCape,
			cost: { eventTickets: 23 },
		},
		{
			name: "Sunlight Chunky Sandals",
			cosmetic: Cosmetic.SunlightChunkySandals,
			cost: { money: 9.99 },
		},
		{
			name: "Sunlight Surfboard",
			cosmetic: Cosmetic.SunlightSurfboard,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0225", LINK_REDIRECTOR_URL)),
});
