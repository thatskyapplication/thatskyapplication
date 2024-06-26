import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	OUTFIT_EMOJIS,
	SHOE_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfStyle2023,
	start: skyDate(2_023, 10, 2),
	end: skyDate(2_023, 10, 15),
	eventCurrencyPerDay: 5,
	offer: [
		{
			name: "Style Top Hat",
			bit: 1 << 0,
			cost: { eventCurrency: 10 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory29,
		},
		{
			name: "Style Runway Mask",
			bit: 1 << 1,
			cost: { eventCurrency: 8 },
			emoji: MASK_EMOJIS.Mask83,
		},
		{
			name: "Style Star Sunglasses",
			bit: 1 << 2,
			cost: { eventCurrency: 14 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory30,
		},
		{
			name: "Style Silk Ballet Slippers",
			bit: 1 << 3,
			cost: { eventCurrency: 18 },
			emoji: SHOE_EMOJIS.Shoe07,
		},
		{
			name: "Style Flame Sunglasses",
			bit: 1 << 4,
			cost: { money: 2.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory31,
		},
		{
			name: "Style Heart Sunglasses",
			bit: 1 << 5,
			cost: { money: 4.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory32,
		},
		{ name: "Style Bunny Slippers", bit: 1 << 6, cost: { money: 6.99 }, emoji: SHOE_EMOJIS.Shoe08 },
		{
			name: "Style Wide-Leg Jeans",
			bit: 1 << 7,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit50,
		},
	],
});
