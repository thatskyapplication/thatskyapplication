import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSummerLights2020,
	start: skyDate(2_020, 9, 8),
	end: skyDate(2_020, 9, 21),
	offer: [
		{
			name: "Days of Summer Lights Pack",
			cosmetic: Cosmetic.DaysOfSummerLightsLantern,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0105", LINK_REDIRECTOR_URL)),
});
