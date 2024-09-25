import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFeast2019,
	start: skyDate(2_019, 12, 22),
	end: skyDate(2_020, 1, 2),
	offer: [
		{
			name: "Days of Feast Pack",
			cosmetic: Cosmetic.DaysOfFeastHat,
			cost: { money: 6.99 },
			emoji: HAIR_EMOJIS.Hair48,
		},
	],
});
