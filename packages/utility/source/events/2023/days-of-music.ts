import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMusic2023,
	start: skyDate(2_023, 7, 3),
	end: skyDate(2_023, 7, 17),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfMusicMusicSheet,
			cost: { candles: 5 },
		},
		{
			cosmetic: Cosmetic.TriumphSaxophone,
			cost: { eventTickets: 102 },
		},
		{
			cosmetic: Cosmetic.MarchingBandHat,
			cost: { eventTickets: 43 },
		},
		{
			cosmetic: Cosmetic.TriumphViolin,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0215"),
});
