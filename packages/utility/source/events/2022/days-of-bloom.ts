import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfBloom2022,
	start: skyDate(2_022, 3, 28),
	end: skyDate(2_022, 4, 11),
	offer: [
		{
			cosmetic: Cosmetic.PurpleBloomCape,
			cost: { candles: 105 },
		},
		{
			cosmetic: Cosmetic.PurpleBloomTeaset,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0165", LINK_REDIRECTOR_URL)),
});
