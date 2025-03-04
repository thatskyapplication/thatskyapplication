import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfLove2023,
	start: skyDate(2_023, 2, 13),
	end: skyDate(2_023, 2, 27),
	offer: [
		{
			name: "Days of Love Flowery Archway",
			cosmetic: Cosmetic.DaysOfLoveFloweryArchway,
			cost: { candles: 100 },
		},
		{
			name: "Days of Love Classy Cravat",
			cosmetic: Cosmetic.DaysOfLoveClassyCravat,
			cost: { money: 4.99 },
		},
		{
			name: "Days of Love Serendipitous Sceptre",
			cosmetic: Cosmetic.DaysOfLoveSerendipitousSceptre,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0200", LINK_REDIRECTOR_URL)),
});
