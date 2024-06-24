import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { MASK_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2021,
	start: skyDate(2_021, 2, 12, 12),
	end: skyDate(2_021, 2, 21, 12),
	offer: [
		{ name: "Mask", bit: 1 << 0, cost: { hearts: 15 }, emoji: MASK_EMOJIS.Mask43 },
		{
			name: "Days of Love Seesaw Pack",
			bit: 1 << 1,
			cost: { candles: 66 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp02,
		},
	],
});
