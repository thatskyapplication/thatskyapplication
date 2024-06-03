import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_ACCESSORY_EMOJIS, HAIR_EMOJIS, MASK_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFortune2021,
	start: skyDate(2_021, 2, 8, 12),
	end: skyDate(2_021, 3, 1, 12),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Mask", cost: { candles: 54 }, emoji: MASK_EMOJIS.Mask42 })
		.set(1 << 1, { name: "Hair", cost: { candles: 66 }, emoji: HAIR_EMOJIS.Hair75 })
		.set(1 << 2, { name: "Days of Fortune Pack", cost: { money: 24.99 }, emoji: CAPE_EMOJIS.Cape49 })
		.set(1 << 3, { name: "Days of Fortune Wool Hat", cost: { money: 9.99 }, emoji: HAIR_EMOJIS.Hair74 })
		.set(1 << 4, {
			name: "Days of Fortune Orange",
			cost: { money: 0.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory04,
		}),
});
