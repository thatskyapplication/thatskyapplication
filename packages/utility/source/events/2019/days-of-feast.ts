import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFeast2019,
	start: skyDate(2_019, 12, 22),
	end: skyDate(2_020, 1, 3),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfFeastHat,
			cost: { money: 6.99 },
		},
	],
	patchNotesURL: "https://sky-children-of-the-light.fandom.com/wiki/Update:Live_0.7.5_(144142)",
});
