import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SkyAnniversary2020,
	name: "sky-anniversary",
	family: EventFamilyId.SkyAnniversary,
	start: skyDate(2_020, 7, 13),
	end: skyDate(2_020, 7, 20),
	offer: [
		{
			translation: CosmeticCommon.HairAccessory,
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory1,
			cost: { hearts: 3 },
		},
	],
});
