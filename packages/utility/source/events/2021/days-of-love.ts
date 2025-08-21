import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
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
	patchNotesURL: patchNotesRoute("0123"),
});
