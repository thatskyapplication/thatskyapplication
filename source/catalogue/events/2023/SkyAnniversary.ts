import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.SkyAnniversary2023,
	start: skyDate(2_023, 7, 17),
	end: skyDate(2_023, 7, 30),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Hair accessory", cost: { eventCurrency: 8 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory28 })
			.set(1 << 1, {
				name: "Anniversary Sonorous Seashell",
				cost: { eventCurrency: 46 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp29,
			})
			.set(1 << 2, {
				name: "Anniversary Party Lights",
				cost: { eventCurrency: 46 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp33,
			})
			.set(1 << 3, {
				name: "Anniversary Plush",
				cost: { money: 9.99 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp30,
			}),
	},
});
