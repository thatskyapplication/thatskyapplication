import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.AURORAEncoreConcerts2023,
	start: skyDate(2_023, 8, 23),
	end: skyDate(2_023, 9, 4),
	offer: [
		{
			cosmetic: Cosmetic.EmoteCureForMe1,
			cost: { eventTickets: 12 },
		},
		{
			cosmetic: Cosmetic.EmoteCureForMe2,
			cost: { eventTickets: 33 },
		},
		{
			cosmetic: Cosmetic.MusicalVoyageSneakers,
			cost: { money: 6.99 },
		},
	],
	patchNotesURL: String(new URL("p0225", LINK_REDIRECTOR_URL)),
});
