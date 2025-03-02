import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.DaysOfMischief2020,
	start: skyDate(2_020, 10, 22),
	end: skyDate(2_020, 11, 5),
	offer: [
		{
			name: "Mischief Web Cape",
			cosmetic: Cosmetic.MischiefWebCape,
			cost: { money: 14.99 },
		},
		{
			name: "Mischief Witch Hat",
			cosmetic: Cosmetic.MischiefWitchHat,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: String(new URL("p0110", LINK_REDIRECTOR_URL)),
});
