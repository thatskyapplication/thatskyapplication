import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_ACCESSORY_EMOJIS, OUTFIT_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfRainbow2022,
	start: skyDate(2_022, 6, 30),
	end: skyDate(2_022, 7, 13),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Rainbow Trousers", cost: { candles: 95 }, emoji: OUTFIT_EMOJIS.Outfit33 })
		.set(1 << 1, { name: "Rainbow Earring", cost: { money: 2.99 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory16 })
		.set(1 << 2, { name: "Rainbow Headphones", cost: { money: 9.99 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory17 })
		.set(1 << 3, {
			name: "Double Rainbow Pack",
			cost: { money: 9.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory21,
		}),
});
