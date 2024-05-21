import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFeast2022,
	start: skyDate(2_022, 12, 19),
	end: skyDate(2_023, 1, 8),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Prop", cost: { candles: 120 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp27 })
		.set(1 << 1, { name: "Feast Goggles", cost: { candles: 50 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory22 })
		.set(1 << 2, { name: "Cosy Hermit Cape", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape97 }),
});
