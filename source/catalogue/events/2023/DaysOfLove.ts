import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2023,
	start: skyDate(2_023, 2, 13),
	end: skyDate(2_023, 2, 26),
	offer: [
		{
			name: "Day of Love Flowery Archway",
			bit: 1 << 0,
			cost: { candles: 100 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp31,
		},
		{
			name: "Day of Love Classy Cravat",
			bit: 1 << 1,
			cost: { money: 4.99 },
			emoji: NECKLACE_EMOJIS.Necklace28,
		},
		{
			name: "Day of Love Serendipitous Sceptor",
			bit: 1 << 2,
			cost: { money: 14.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp33,
		},
	],
});
