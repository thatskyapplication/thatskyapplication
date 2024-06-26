import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HELD_PROPS_EMOJIS, MASK_EMOJIS, OUTFIT_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFortune2023,
	start: skyDate(2_023, 1, 20),
	end: skyDate(2_023, 2, 2),
	offer: [
		{ name: "Mask", bit: 1 << 0, cost: { candles: 62 }, emoji: MASK_EMOJIS.Mask75 },
		{
			name: "Days of Fortune Enchanted Umbrella",
			bit: 1 << 1,
			cost: { money: 14.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp32,
		},
		{
			name: "Days of Fortune Muralist's Smock",
			bit: 1 << 2,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit43,
		},
	],
});
