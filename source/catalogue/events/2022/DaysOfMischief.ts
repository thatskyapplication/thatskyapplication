import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMischief2022,
	start: skyDate(2_022, 10, 24),
	end: skyDate(2_022, 11, 13),
	offer: [
		{
			name: "Mischief Tufted Hair",
			cosmetic: Cosmetic.MischiefTuftedHair,
			cost: { candles: 44 },
			emoji: HAIR_EMOJIS.Hair117,
		},
		{
			name: "Feline Familiar Prop",
			cosmetic: Cosmetic.FelineFamiliarProp,
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp19,
		},
		{
			name: "Cat Costume Pack",
			cosmetic: [Cosmetic.CatCostumeMask, Cosmetic.CatCostumeCape],
			cost: { money: 19.99 },
			emoji: CAPE_EMOJIS.Cape93,
		},
	],
});
