import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.SkyAnniversary2020,
	start: skyDate(2_020, 7, 13),
	end: skyDate(2_020, 7, 20),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory1,
			cost: { hearts: 3 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory03,
		},
	],
	patchNotesURL: String(new URL("p0100", LINK_REDIRECTOR_URL)),
});
