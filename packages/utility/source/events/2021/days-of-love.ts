import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2021,
	name: "days-of-love",
	family: EventFamilyId.DaysOfLove,
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
});
