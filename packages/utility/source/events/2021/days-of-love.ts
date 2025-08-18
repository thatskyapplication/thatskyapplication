import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2021,
	start: skyDate(2_021, 2, 12, 12),
	end: skyDate(2_021, 2, 21, 12),
	offer: [
		{
			translation: CosmeticCommon.Mask,
			cosmetic: Cosmetic.DaysOfLoveMask,
			cost: { hearts: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfLoveSeesaw,
			cost: { candles: 66 },
		},
	],
	patchNotesURL: String(new URL("0123", LINK_REDIRECTOR_URL)),
});
