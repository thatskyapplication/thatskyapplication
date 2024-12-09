import { URL } from "node:url";
import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import { CAPE_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfNature2020,
	start: skyDate(2_020, 4, 20, 12),
	end: skyDate(2_020, 4, 27, 12),
	offer: [
		{
			name: "Earth Cape",
			cosmetic: Cosmetic.EarthCape,
			cost: { money: 4.99 },
			emoji: CAPE_EMOJIS.Cape29,
		},
	],
	patchNotesURL: String(new URL("p090", LINK_REDIRECTOR_URL)),
});
