import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFeast2021,
	start: skyDate(2_021, 12, 20),
	end: skyDate(2_022, 1, 9),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Ode to Joy music sheet", cost: { candles: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
		.set(1 << 1, { name: "Prop", cost: { candles: 10 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp10 })
		.set(1 << 2, { name: "Neck accessory", cost: { candles: 50 }, emoji: NECKLACE_EMOJIS.Necklace17 })
		.set(1 << 3, { name: "Hair", cost: { hearts: 20 }, emoji: HAIR_EMOJIS.Hair97 })
		.set(1 << 4, { name: "Winter Ancestor Cape", cost: { money: 9.99 }, emoji: CAPE_EMOJIS.Cape68 })
		.set(1 << 5, {
			name: "Snowflake Hair Accessory",
			cost: { money: 1.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory14,
		})
		.set(1 << 6, {
			name: "Winter Feast Snowglobe",
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp11,
		}),
});
