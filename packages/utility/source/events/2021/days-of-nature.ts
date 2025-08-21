import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfNature2021,
	start: skyDate(2_021, 4, 19),
	end: skyDate(2_021, 5, 3),
	offer: [
		{
			cosmetic: Cosmetic.OceanNecklace,
			cost: { money: 1.99 },
		},
		{
			cosmetic: Cosmetic.OceanCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0133"),
});
