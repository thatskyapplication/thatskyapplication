import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HELD_PROPS_EMOJIS, MASK_EMOJIS, OUTFIT_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFortune2023,
	start: skyDate(2_023, 1, 20),
	end: skyDate(2_023, 2, 2),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Mask", cost: { candles: 62 }, emoji: MASK_EMOJIS.Mask75 })
			.set(1 << 1, {
				name: "Days of Fortune Enchanted Umbrella",
				cost: { money: 14.99 },
				emoji: HELD_PROPS_EMOJIS.HeldProp32,
			})
			.set(1 << 2, { name: "Days of Fortune Muralist's Smock", cost: { money: 9.99 }, emoji: OUTFIT_EMOJIS.Outfit42 }),
	},
});
