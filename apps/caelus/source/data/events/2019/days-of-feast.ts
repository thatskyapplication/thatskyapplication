import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfFeast2019,
	start: skyDate(2_019, 12, 22),
	end: skyDate(2_020, 1, 3),
	offer: [
		{
			name: "Days of Feast Pack",
			cosmetic: Cosmetic.DaysOfFeastHat,
			cost: { money: 6.99 },
		},
	],
	patchNotesURL: "https://sky-children-of-the-light.fandom.com/wiki/Update:Live_0.7.5_(144142)",
});
