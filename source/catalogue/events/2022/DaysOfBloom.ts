import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfBloom2022,
	start: skyDate(2_022, 3, 28),
	end: skyDate(2_022, 4, 10),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Purple Bloom Cape", cost: { candles: 105 }, emoji: CAPE_EMOJIS.Cape76 })
			.set(1 << 1, {
				name: "Purple Bloom Teaset",
				cost: { money: 19.99 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp23,
			}),
	},
});
