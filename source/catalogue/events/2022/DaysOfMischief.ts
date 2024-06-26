import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMischief2022,
	start: skyDate(2_022, 10, 24),
	end: skyDate(2_022, 11, 13),
	offer: [
		{
			name: "Mischief Tufted Hair",
			bit: 1 << 0,
			cost: { candles: 44 },
			emoji: HAIR_EMOJIS.Hair117,
		},
		{
			name: "Feline Familiar Prop",
			bit: 1 << 1,
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp19,
		},
		{ name: "Cat Costume Pack", bit: 1 << 2, cost: { money: 19.99 }, emoji: CAPE_EMOJIS.Cape93 },
	],
});
