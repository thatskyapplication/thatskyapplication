import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
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
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, {
			name: "Campfire Tent",
			cost: { candles: 90 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp25,
		})
		.set(1 << 1, { name: "Jelly Shoulder Buddy", cost: { money: 2.99 }, emoji: NECKLACE_EMOJIS.Necklace23 })
		.set(1 << 2, {
			name: "Campfire Snack Kit",
			cost: { money: 19.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp18,
		}),
});
