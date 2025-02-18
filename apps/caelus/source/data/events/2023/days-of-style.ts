import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	OUTFIT_EMOJIS,
	SHOE_EMOJIS,
} from "../../../utility/emojis.js";

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
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory29,
		},
		{
			name: "Style Runway Mask",
			cosmetic: Cosmetic.StyleRunwayMask,
			cost: { eventTickets: 8 },
			emoji: MASK_EMOJIS.Mask83,
		},
		{
			name: "Style Star Sunglasses",
			cosmetic: Cosmetic.StyleStarSunglasses,
			cost: { eventTickets: 14 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory30,
		},
		{
			name: "Style Silk Ballet Slippers",
			cosmetic: Cosmetic.StyleSilkBalletSlippers,
			cost: { eventTickets: 18 },
			emoji: SHOE_EMOJIS.Shoe07,
		},
		{
			name: "Style Flame Sunglasses",
			cosmetic: Cosmetic.StyleFlameSunglasses,
			cost: { money: 2.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory31,
		},
		{
			name: "Style Heart Sunglasses",
			cosmetic: Cosmetic.StyleHeartSunglasses,
			cost: { money: 4.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory32,
		},
		{
			name: "Style Bunny Slippers",
			cosmetic: Cosmetic.StyleBunnySlippers,
			cost: { money: 6.99 },
			emoji: SHOE_EMOJIS.Shoe08,
		},
		{
			name: "Style Wide-Leg Jeans",
			cosmetic: Cosmetic.StyleWideLegJeans,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit50,
		},
	],

	patchNotesURL: String(new URL("p0225", LINK_REDIRECTOR_URL)),
});
