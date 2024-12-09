import { URL } from "node:url";
import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import { MASK_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfLove2021,
	start: skyDate(2_021, 2, 12, 12),
	end: skyDate(2_021, 2, 21, 12),
	offer: [
		{
			name: "Mask",
			cosmetic: Cosmetic.DaysOfLoveMask,
			cost: { hearts: 15 },
			emoji: MASK_EMOJIS.Mask43,
		},
		{
			name: "Days of Love Seesaw Pack",
			cosmetic: Cosmetic.DaysOfLoveSeesaw,
			cost: { candles: 66 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp02,
		},
	],
	patchNotesURL: String(new URL("0123", LINK_REDIRECTOR_URL)),
});
