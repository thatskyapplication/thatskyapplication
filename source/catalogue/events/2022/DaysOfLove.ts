import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2022,
	start: skyDate(2_022, 2, 7),
	end: skyDate(2_022, 2, 22),
	offer: [
		{
			name: "Days of Love Flower Crown",
			cosmetic: Cosmetic.DaysOfLoveFlowerCrown,
			cost: { hearts: 15 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory17,
		},
		{
			name: "Days of Love Gondola Pack",
			cosmetic: Cosmetic.DaysOfLoveGondola,
			cost: { money: 19.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp14,
		},
	],
});
