import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfLove2022,
	start: skyDate(2_022, 2, 7),
	end: skyDate(2_022, 2, 23),
	offer: [
		{
			name: "Days of Love Flower Crown",
			cosmetic: Cosmetic.DaysOfLoveFlowerCrown,
			cost: { hearts: 15 },
		},
		{
			name: "Days of Love Gondola Pack",
			cosmetic: Cosmetic.DaysOfLoveGondola,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0160", LINK_REDIRECTOR_URL)),
});
