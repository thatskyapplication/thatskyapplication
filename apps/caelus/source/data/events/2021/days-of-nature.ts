import { URL } from "node:url";
import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import { CAPE_EMOJIS, NECKLACE_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfNature2021,
	start: skyDate(2_021, 4, 19),
	end: skyDate(2_021, 5, 3),
	offer: [
		{
			name: "Ocean Necklace",
			cosmetic: Cosmetic.OceanNecklace,
			cost: { money: 1.99 },
			emoji: NECKLACE_EMOJIS.Necklace12,
		},
		{
			name: "Ocean Cape",
			cosmetic: Cosmetic.OceanCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape54,
		},
	],
	patchNotesURL: String(new URL("0133", LINK_REDIRECTOR_URL)),
});
