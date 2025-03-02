import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.DaysOfNature2021,
	start: skyDate(2_021, 4, 19),
	end: skyDate(2_021, 5, 3),
	offer: [
		{
			name: "Ocean Necklace",
			cosmetic: Cosmetic.OceanNecklace,
			cost: { money: 1.99 },
		},
		{
			name: "Ocean Cape",
			cosmetic: Cosmetic.OceanCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("0133", LINK_REDIRECTOR_URL)),
});
