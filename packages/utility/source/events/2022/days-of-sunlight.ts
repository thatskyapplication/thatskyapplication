import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSunlight2022,
	start: skyDate(2_022, 8, 22),
	end: skyDate(2_022, 9, 12),
	offer: [
		{
			cosmetic: Cosmetic.CampfireTent,
			cost: { candles: 90 },
		},
		{
			cosmetic: Cosmetic.JellyShoulderBuddy,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.CampfireSnackKit,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0185", LINK_REDIRECTOR_URL)),
});
