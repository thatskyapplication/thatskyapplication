import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_ACCESSORY_EMOJIS, NECKLACE_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfNature2022,
	start: skyDate(2_022, 4, 18),
	end: skyDate(2_022, 5, 1),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, {
				name: "Nature Coral Crown Accessory",
				cost: { hearts: 20 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory19,
			})
			.set(1 << 1, { name: "Nature Turtle Cape", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape81 })
			.set(1 << 2, { name: "Nature Turtle Pack", cost: { money: 19.99 }, emoji: NECKLACE_EMOJIS.Necklace20 }),
	},
});
