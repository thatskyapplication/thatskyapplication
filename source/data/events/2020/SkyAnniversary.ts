import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
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
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/692",
});
