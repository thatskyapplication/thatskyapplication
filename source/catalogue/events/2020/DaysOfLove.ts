import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2020,
	start: skyDate(2_020, 2, 12, 12),
	end: skyDate(2_020, 2, 19, 12),
	offer: [
		{
			name: "Days of Love Pack",
			cosmetic: Cosmetic.DaysOfLoveSwing,
			cost: { money: 19.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp01,
		},
	],
});
