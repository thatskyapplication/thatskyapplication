import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
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
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Style Top Hat", cost: { eventCurrency: 10 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory29 })
		.set(1 << 1, { name: "Style Runway Mask", cost: { eventCurrency: 8 }, emoji: MASK_EMOJIS.Mask83 })
		.set(1 << 2, {
			name: "Style Star Sunglasses",
			cost: { eventCurrency: 14 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory30,
		})
		.set(1 << 3, { name: "Style Silk Ballet Slippers", cost: { eventCurrency: 18 }, emoji: SHOE_EMOJIS.Shoe07 })
		.set(1 << 4, {
			name: "Style Flame Sunglasses",
			cost: { money: 2.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory31,
		})
		.set(1 << 5, {
			name: "Style Heart Sunglasses",
			cost: { money: 4.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory32,
		})
		.set(1 << 6, { name: "Style Bunny Slippers", cost: { money: 6.99 }, emoji: SHOE_EMOJIS.Shoe08 })
		.set(1 << 7, { name: "Style Wide-Leg Jeans", cost: { money: 9.99 }, emoji: OUTFIT_EMOJIS.Outfit50 }),
});
