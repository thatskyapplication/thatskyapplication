import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfColour2023,
	name: "days-of-colour",
	family: EventFamily.DaysOfColour,
	start: skyDate(2_023, 6, 1),
	end: skyDate(2_023, 6, 15),
	offer: [
		{
			cosmetic: Cosmetic.DarkRainbowCape,
			cost: { eventTickets: 104 },
		},
		{
			cosmetic: Cosmetic.DarkRainbowEarrings,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.DarkRainbowTunic,
			cost: { money: 14.99 },
		},
	],
});
