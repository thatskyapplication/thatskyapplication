import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_ACCESSORY_EMOJIS, MASK_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFortune2022,
	start: skyDate(2_022, 1, 24),
	end: skyDate(2_022, 2, 6),
	offer: [
		{ name: "Mask", bit: 1 << 0, cost: { candles: 58 }, emoji: MASK_EMOJIS.Mask58 },
		{ name: "Days of Fortune Fish Pack", bit: 1 << 1, cost: { money: 19.99 }, emoji: CAPE_EMOJIS.Cape74 },
		{
			name: "Days of Fortune Fish Accessory",
			bit: 1 << 2,
			cost: { money: 1.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory16,
		},
	],
});
