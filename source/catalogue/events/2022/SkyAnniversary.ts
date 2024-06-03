import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.SkyAnniversary2022,
	start: skyDate(2_022, 7, 18),
	end: skyDate(2_022, 8, 3),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Hair accessory", cost: { hearts: 3 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory24 })
		.set(1 << 1, { name: "Happy Birthday Music Sheet", cost: { hearts: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
		.set(1 << 2, { name: "Prop 1", cost: { candles: 30 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp16 })
		.set(1 << 3, { name: "Prop 2", cost: { candles: 20 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp26 })
		.set(1 << 4, { name: "Prop 3", cost: { hearts: 20 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp17 }),
});
