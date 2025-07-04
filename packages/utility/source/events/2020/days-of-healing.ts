import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfHealing2020,
	start: skyDate(2_020, 5, 18, 12),
	end: skyDate(2_020, 6, 22, 12),
	offer: [
		{
			name: "Healing Pack",
			cosmetic: Cosmetic.HealingHairAccessory,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p092", LINK_REDIRECTOR_URL)),
});
