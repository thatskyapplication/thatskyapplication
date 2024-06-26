import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, NECKLACE_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfNature2021,
	start: skyDate(2_021, 4, 19),
	end: skyDate(2_021, 5, 2),
	offer: [
		{
			name: "Ocean Necklace",
			bit: 1 << 0,
			cost: { money: 1.99 },
			emoji: NECKLACE_EMOJIS.Necklace12,
		},
		{ name: "Ocean Cape", bit: 1 << 1, cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape54 },
	],
});
