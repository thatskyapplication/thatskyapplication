import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { HAIR_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfFeast2019,
	start: skyDate(2_019, 12, 22),
	end: skyDate(2_020, 1, 3),
	offer: [
		{
			name: "Days of Feast Pack",
			cosmetic: Cosmetic.DaysOfFeastHat,
			cost: { money: 6.99 },
			emoji: HAIR_EMOJIS.Hair48,
		},
	],
	patchNotesURL: "https://sky-children-of-the-light.fandom.com/wiki/Update:Live_0.7.5_(144142)",
});
