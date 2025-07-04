import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2020,
	start: skyDate(2_020, 2, 12, 12),
	end: skyDate(2_020, 2, 19, 12),
	offer: [
		{
			name: "Days of Love Pack",
			cosmetic: Cosmetic.DaysOfLoveSwing,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p082", LINK_REDIRECTOR_URL)),
});
