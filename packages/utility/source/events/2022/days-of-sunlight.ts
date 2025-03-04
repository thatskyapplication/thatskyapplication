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
			name: "Campfire Tent",
			cosmetic: Cosmetic.CampfireTent,
			cost: { candles: 90 },
		},
		{
			name: "Jelly Shoulder Buddy",
			cosmetic: Cosmetic.JellyShoulderBuddy,
			cost: { money: 2.99 },
		},
		{
			name: "Campfire Snack Kit",
			cosmetic: Cosmetic.CampfireSnackKit,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0185", LINK_REDIRECTOR_URL)),
});
