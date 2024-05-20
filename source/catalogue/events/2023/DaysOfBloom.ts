import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfBloom2023,
	start: skyDate(2_023, 3, 20),
	end: skyDate(2_023, 4, 9),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Red Bloom Cape", cost: { candles: 110 }, emoji: CAPE_EMOJIS.Cape101 })
			.set(1 << 1, {
				name: "Bloom Butterfly Fountain",
				cost: { candles: 80 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp25,
			})
			.set(1 << 2, { name: "Bloom Gardening Tunic", cost: { money: 9.99 }, emoji: OUTFIT_EMOJIS.Outfit43 })
			.set(1 << 3, {
				name: "Bloom Picnic Basket",
				cost: { money: 19.99 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp32,
			}),
	},
});
