import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfColour2023,
	start: skyDate(2_023, 6, 1),
	end: skyDate(2_023, 6, 15),
	offer: [
		{
			name: "Dark Rainbow Cape",
			cosmetic: Cosmetic.DarkRainbowCape,
			cost: { eventTickets: 104 },
		},
		{
			name: "Dark Rainbow Pack",
			cosmetic: Cosmetic.DarkRainbowEarrings,
			cost: { money: 9.99 },
		},
		{
			name: "Dark Rainbow Tunic",
			cosmetic: Cosmetic.DarkRainbowTunic,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0215", LINK_REDIRECTOR_URL)),
});
