import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, NECKLACE_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfNature2021,
	start: skyDate(2_021, 4, 19),
	end: skyDate(2_021, 5, 3),
	offer: [
		{
			name: "Ocean Necklace",
			cosmetic: Cosmetic.OceanNecklace,
			cost: { money: 1.99 },
			emoji: NECKLACE_EMOJIS.Necklace12,
		},
		{
			name: "Ocean Cape",
			cosmetic: Cosmetic.OceanCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape54,
		},
	],
});
