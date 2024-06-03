import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	OUTFIT_EMOJIS,
	SHOE_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMischief2023,
	start: skyDate(2_023, 10, 23),
	end: skyDate(2_023, 11, 12),
	eventCurrencyInfographicURL: true,
	eventCurrencyPerDay: 6,
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, {
			name: "Hair accessory",
			cost: { eventCurrency: 24 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory32,
		})
		.set(1 << 1, { name: "Shoes", cost: { eventCurrency: 16 }, emoji: SHOE_EMOJIS.Shoe12 })
		.set(1 << 2, { name: "Outfit", cost: { eventCurrency: 41 }, emoji: OUTFIT_EMOJIS.Outfit52 })
		.set(1 << 3, { name: "Mischief Gossamer Cape", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape116 })
		.set(1 << 4, { name: "Mischief Crabula Cloak", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape117 })
		.set(1 << 5, { name: "Mischief Crabula Mask", cost: { money: 2.99 }, emoji: MASK_EMOJIS.Mask84 }),
});
