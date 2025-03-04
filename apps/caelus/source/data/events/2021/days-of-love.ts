import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfLove2021,
	start: skyDate(2_021, 2, 12, 12),
	end: skyDate(2_021, 2, 21, 12),
	offer: [
		{
			name: "Mask",
			cosmetic: Cosmetic.DaysOfLoveMask,
			cost: { hearts: 15 },
		},
		{
			name: "Days of Love Seesaw Pack",
			cosmetic: Cosmetic.DaysOfLoveSeesaw,
			cost: { candles: 66 },
		},
	],
	patchNotesURL: String(new URL("0123", LINK_REDIRECTOR_URL)),
});
