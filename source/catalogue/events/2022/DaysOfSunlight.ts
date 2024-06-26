import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	LARGE_PLACEABLE_PROPS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSunlight2022,
	start: skyDate(2_022, 8, 22),
	end: skyDate(2_022, 9, 11),
	offer: [
		{
			name: "Campfire Tent",
			bit: 1 << 0,
			cost: { candles: 90 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp25,
		},
		{
			name: "Jelly Shoulder Buddy",
			bit: 1 << 1,
			cost: { money: 2.99 },
			emoji: NECKLACE_EMOJIS.Necklace23,
		},
		{
			name: "Campfire Snack Kit",
			bit: 1 << 2,
			cost: { money: 19.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp18,
		},
	],
});
