import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfNature2023,
	start: skyDate(2_023, 4, 20),
	end: skyDate(2_023, 5, 8),
	offer: [
		{
			cosmetic: Cosmetic.NatureSchoolCape,
			cost: { candles: 180 },
		},
		{
			cosmetic: Cosmetic.NatureGlasses,
			cost: { money: 19.99 },
		},
		{
			cosmetic: Cosmetic.NatureSonorousSeashell,
			cost: { money: 4.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0210"),
});
