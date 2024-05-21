import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFeast2020,
	start: skyDate(2_020, 12, 21),
	end: skyDate(2_021, 1, 3),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Neck accessory", cost: { hearts: 15 }, emoji: NECKLACE_EMOJIS.Necklace09 })
		.set(1 << 1, { name: "Cape", cost: { candles: 65 }, emoji: CAPE_EMOJIS.Cape41 })
		.set(1 << 2, { name: "Prop", cost: { candles: 150 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp03 })
		.set(1 << 3, {
			name: "Days of Feast Horns",
			cost: { money: 14.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory11,
		})
		.set(1 << 4, { name: "Snowflake Cape", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape42 }),
});
