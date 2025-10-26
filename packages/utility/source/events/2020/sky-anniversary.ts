import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SkyAnniversary2020,
	start: skyDate(2_020, 7, 13),
	end: skyDate(2_020, 7, 20),
	offer: [
		{
			translation: CosmeticCommon.HairAccessory,
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory1,
			cost: { hearts: 3 },
		},
	],
	patchNotesURL: patchNotesRoute("0100"),
});
