import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfNature2020,
	start: skyDate(2_020, 4, 20, 12),
	end: skyDate(2_020, 4, 27, 12),
	offer: [
		{
			name: "Earth Cape",
			cosmetic: Cosmetic.EarthCape,
			cost: { money: 4.99 },
		},
	],
	patchNotesURL: String(new URL("p090", LINK_REDIRECTOR_URL)),
});
