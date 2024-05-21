import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfNature2023,
	start: skyDate(2_023, 4, 20),
	end: skyDate(2_023, 5, 7),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Nature School Cape", cost: { candles: 180 }, emoji: CAPE_EMOJIS.Cape105 })
		.set(1 << 1, {
			name: "Nature Glasses Pack",
			cost: { money: 19.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory25,
		})
		.set(1 << 2, {
			name: "Nature Sonorous Seashell",
			cost: { money: 4.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp27,
		}),
});
