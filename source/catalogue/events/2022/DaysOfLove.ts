import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2022,
	start: skyDate(2_022, 2, 7),
	end: skyDate(2_022, 2, 22),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, {
				name: "Days of Love Flower Crown",
				cost: { hearts: 15 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory17,
			})
			.set(1 << 1, {
				name: "Days of Love Gondola Pack",
				cost: { money: 19.99 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp14,
			}),
	},
});
