import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.SkyAnniversary2020,
	start: skyDate(2_020, 7, 13),
	end: skyDate(2_020, 7, 20),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory1,
			cost: { hearts: 3 },
		},
	],
	patchNotesURL: String(new URL("p0100", LINK_REDIRECTOR_URL)),
});
