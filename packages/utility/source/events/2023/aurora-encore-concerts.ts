import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.AURORAEncoreConcerts2023,
	name: "aurora-encore-concerts",
	family: EventFamilyId.AURORAEncoreConcerts,
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
});
