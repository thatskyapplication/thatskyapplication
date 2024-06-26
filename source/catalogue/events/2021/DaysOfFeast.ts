import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
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
	offer: [
		{
			name: "Ode to Joy music sheet",
			bit: 1 << 0,
			cost: { candles: 10 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Prop",
			bit: 1 << 1,
			cost: { candles: 10 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp10,
		},
		{
			name: "Neck accessory",
			bit: 1 << 2,
			cost: { candles: 50 },
			emoji: NECKLACE_EMOJIS.Necklace17,
		},
		{ name: "Hair", bit: 1 << 3, cost: { hearts: 20 }, emoji: HAIR_EMOJIS.Hair97 },
		{ name: "Winter Ancestor Cape", bit: 1 << 4, cost: { money: 9.99 }, emoji: CAPE_EMOJIS.Cape68 },
		{
			name: "Snowflake Hair Accessory",
			bit: 1 << 5,
			cost: { money: 1.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory14,
		},
		{
			name: "Winter Feast Snowglobe",
			bit: 1 << 6,
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp11,
		},
	],
});
