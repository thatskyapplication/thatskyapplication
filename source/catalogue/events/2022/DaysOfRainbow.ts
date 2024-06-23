import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_ACCESSORY_EMOJIS, OUTFIT_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfRainbow2022,
	start: skyDate(2_022, 6, 30),
	end: skyDate(2_022, 7, 13),
	offer: [
		{ name: "Rainbow Trousers", bit: 1 << 0, cost: { candles: 95 }, emoji: OUTFIT_EMOJIS.Outfit33 },
		{ name: "Rainbow Earring", bit: 1 << 1, cost: { money: 2.99 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory16 },
		{ name: "Rainbow Headphones", bit: 1 << 2, cost: { money: 9.99 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory17 },
		{ name: "Double Rainbow Pack", bit: 1 << 3, cost: { money: 9.99 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory21 },
	],
});
