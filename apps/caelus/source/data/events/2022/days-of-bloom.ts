import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.DaysOfBloom2022,
	start: skyDate(2_022, 3, 28),
	end: skyDate(2_022, 4, 11),
	offer: [
		{
			name: "Purple Bloom Cape",
			cosmetic: Cosmetic.PurpleBloomCape,
			cost: { candles: 105 },
		},
		{
			name: "Purple Bloom Teaset",
			cosmetic: Cosmetic.PurpleBloomTeaset,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0165", LINK_REDIRECTOR_URL)),
});
