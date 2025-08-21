import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfNature2022,
	start: skyDate(2_022, 4, 18),
	end: skyDate(2_022, 5, 2),
	offer: [
		{
			cosmetic: Cosmetic.NatureCoralCrown,
			cost: { hearts: 20 },
		},
		{
			cosmetic: Cosmetic.NatureTurtleCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.NatureShoulderTurtle,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0170"),
});
