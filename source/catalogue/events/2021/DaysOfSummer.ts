import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS, HELD_PROPS_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSummer2021,
	start: skyDate(2_021, 8, 12),
	end: skyDate(2_021, 8, 25),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Prop", cost: { hearts: 16 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp13 })
			.set(1 << 1, { name: "Hair accessory", cost: { candles: 44 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory07 })
			.set(1 << 2, { name: "Days of Summer Umbrella", cost: { money: 19.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp23 })
			.set(1 << 3, {
				name: "Days of Summer Shell Hair Pin",
				cost: { money: 0.99 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory08,
			}),
	},
});
