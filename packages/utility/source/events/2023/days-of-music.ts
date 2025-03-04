import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMusic2023,
	start: skyDate(2_023, 7, 3),
	end: skyDate(2_023, 7, 17),
	offer: [
		{
			name: "Music sheet",
			cosmetic: Cosmetic.DaysOfMusicMusicSheet,
			cost: { candles: 5 },
		},
		{
			name: "Triumph Saxophone",
			cosmetic: Cosmetic.TriumphSaxophone,
			cost: { eventTickets: 102 },
		},
		{
			name: "Marching Band Hat",
			cosmetic: Cosmetic.MarchingBandHat,
			cost: { eventTickets: 43 },
		},
		{
			name: "Triumph Violin",
			cosmetic: Cosmetic.TriumphViolin,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0215", LINK_REDIRECTOR_URL)),
});
