import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMischief2020,
	start: skyDate(2_020, 10, 22),
	end: skyDate(2_020, 11, 5),
	offer: [
		{
			cosmetic: Cosmetic.MischiefWebCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.MischiefWitchHat,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0110"),
});
