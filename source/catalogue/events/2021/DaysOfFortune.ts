import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFortune2021,
	start: skyDate(2_021, 2, 8, 12),
	end: skyDate(2_021, 3, 1, 12),
	offer: [
		{ name: "Mask", bit: 1 << 0, cost: { candles: 54 }, emoji: MASK_EMOJIS.Mask42 },
		{ name: "Hair", bit: 1 << 1, cost: { candles: 66 }, emoji: HAIR_EMOJIS.Hair75 },
		{
			name: "Days of Fortune Pack",
			bit: 1 << 2,
			cost: { money: 24.99 },
			emoji: CAPE_EMOJIS.Cape49,
		},
		{
			name: "Days of Fortune Wool Hat",
			bit: 1 << 3,
			cost: { money: 9.99 },
			emoji: HAIR_EMOJIS.Hair74,
		},
		{
			name: "Days of Fortune Orange",
			bit: 1 << 4,
			cost: { money: 0.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory04,
		},
	],
});
