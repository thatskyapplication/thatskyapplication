import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS, OUTFIT_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfColour2023,
	start: skyDate(2_023, 6, 1),
	end: skyDate(2_023, 6, 15),
	offer: [
		{
			name: "Dark Rainbow Cape",
			cosmetic: Cosmetic.DarkRainbowCape,
			cost: { eventTickets: 104 },
			emoji: CAPE_EMOJIS.Cape106,
		},
		{
			name: "Dark Rainbow Pack",
			cosmetic: Cosmetic.DarkRainbowEarrings,
			cost: { money: 9.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory26,
		},
		{
			name: "Dark Rainbow Tunic",
			cosmetic: Cosmetic.DarkRainbowTunic,
			cost: { money: 14.99 },
			emoji: OUTFIT_EMOJIS.Outfit47,
		},
	],
	patchNotesURL: String(new URL("p0215", LINK_REDIRECTOR_URL)),
});
