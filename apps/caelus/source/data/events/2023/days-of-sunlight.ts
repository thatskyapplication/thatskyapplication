import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CAPE_EMOJIS, SHOE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../utility/emojis.js";

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
			emoji: CAPE_EMOJIS.Cape108,
		},
		{
			name: "Sunlight Yellow Beach Towel Cape",
			cosmetic: Cosmetic.SunlightYellowBeachTowelCape,
			cost: { eventTickets: 18 },
			emoji: CAPE_EMOJIS.Cape109,
		},
		{
			name: "Sunlight Blue Beach Towel Cape",
			cosmetic: Cosmetic.SunlightBlueBeachTowelCape,
			cost: { eventTickets: 23 },
			emoji: CAPE_EMOJIS.Cape110,
		},
		{
			name: "Sunlight Chunky Sandals",
			cosmetic: Cosmetic.SunlightChunkySandals,
			cost: { money: 9.99 },
			emoji: SHOE_EMOJIS.Shoe06,
		},
		{
			name: "Sunlight Surfboard",
			cosmetic: Cosmetic.SunlightSurfboard,
			cost: { money: 14.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp32,
		},
	],
	patchNotesURL: String(new URL("p0225", LINK_REDIRECTOR_URL)),
});
