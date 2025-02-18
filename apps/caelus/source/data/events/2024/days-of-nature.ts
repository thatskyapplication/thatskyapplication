import { URL } from "node:url";
import { Cosmetic, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MASK_EMOJIS, NECKLACE_EMOJIS } from "../../../utility/emojis.js";

const eventTicketAmount = [];

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
			emoji: MASK_EMOJIS.Mask91,
		},
		{
			name: "Ocean Blue Scarf",
			cosmetic: Cosmetic.OceanBlueScarf,
			cost: { eventTickets: 40 },
			emoji: NECKLACE_EMOJIS.Necklace36,
		},
		{
			name: "Nature Wave Pack",
			cosmetic: Cosmetic.NatureWaveCape,
			cost: { money: 19.99 },
			emoji: CAPE_EMOJIS.Cape131,
		},
		{
			name: "Nature Wave-Touched Hair",
			cosmetic: Cosmetic.NatureWaveTouchedHair,
			cost: { money: 6.99 },
			emoji: HAIR_EMOJIS.Hair144,
		},
	],
	patchNotesURL: String(new URL("p0255", LINK_REDIRECTOR_URL)),
});
