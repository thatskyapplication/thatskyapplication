import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfNature2020,
	start: skyDate(2_020, 4, 20, 12),
	end: skyDate(2_020, 4, 27, 12),
	offer: [
		{
			name: "Earth Cape",
			cosmetic: Cosmetic.EarthCape,
			cost: { money: 4.99 },
			emoji: CAPE_EMOJIS.Cape29,
		},
	],
});
