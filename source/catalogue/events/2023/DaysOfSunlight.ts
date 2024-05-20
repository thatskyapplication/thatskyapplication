import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, SHOE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSunlight2023,
	start: skyDate(2_023, 9, 11),
	end: skyDate(2_023, 9, 24),
	url: null,
	eventCurrencyPerDay: 6,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Sunlight Pink Beach Towel Cape", cost: { eventCurrency: 16 }, emoji: CAPE_EMOJIS.Cape108 })
			.set(1 << 1, {
				name: "Sunlight Yellow Beach Towel Cape",
				cost: { eventCurrency: 18 },
				emoji: CAPE_EMOJIS.Cape109,
			})
			.set(1 << 2, { name: "Sunlight Blue Beach Towel Cape", cost: { eventCurrency: 23 }, emoji: CAPE_EMOJIS.Cape110 })
			.set(1 << 3, { name: "Sunlight Chunky Sandals", cost: { money: 9.99 }, emoji: SHOE_EMOJIS.Shoe06 })
			.set(1 << 4, {
				name: "Sunlight Surfboard",
				cost: { money: 14.99 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp32,
			}),
	},
});
