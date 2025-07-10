import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.HalloweenOfficeEvent2019,
	start: skyDate(2_019, 10, 27),
	end: skyDate(2_019, 11, 1),
	offer: [
		{
			cosmetic: Cosmetic.SpookyBatCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.HungryPumpkinHat,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: "https://sky-children-of-the-light.fandom.com/wiki/Update:Live_0.6.5_(142170)",
});
