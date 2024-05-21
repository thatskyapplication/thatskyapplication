import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS, HAIR_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfRainbow2021,
	start: skyDate(2_021, 6, 14),
	end: skyDate(2_021, 6, 27),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Rainbow braid", cost: { hearts: 20 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory13 })
		.set(1 << 1, { name: "Rainbow cape", cost: { candles: 175 }, emoji: CAPE_EMOJIS.Cape56 })
		.set(1 << 2, { name: "Rainbow Pack", cost: { money: 19.99 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory05 })
		.set(1 << 3, { name: "Rainbow Hat", cost: { money: 9.99 }, emoji: HAIR_EMOJIS.Hair83 }),
});
