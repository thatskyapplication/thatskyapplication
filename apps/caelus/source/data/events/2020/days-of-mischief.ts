import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfMischief2020,
	start: skyDate(2_020, 10, 22),
	end: skyDate(2_020, 11, 5),
	offer: [
		{
			name: "Mischief Web Cape",
			cosmetic: Cosmetic.MischiefWebCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape37,
		},
		{
			name: "Mischief Witch Hat",
			cosmetic: Cosmetic.MischiefWitchHat,
			cost: { money: 9.99 },
			emoji: HAIR_EMOJIS.Hair69,
		},
	],
	patchNotesURL: String(new URL("p0110", LINK_REDIRECTOR_URL)),
});
