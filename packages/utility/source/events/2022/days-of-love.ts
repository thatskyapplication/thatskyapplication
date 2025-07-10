import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2022,
	start: skyDate(2_022, 2, 7),
	end: skyDate(2_022, 2, 23),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfLoveFlowerCrown,
			cost: { hearts: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfLoveGondola,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0160", LINK_REDIRECTOR_URL)),
});
