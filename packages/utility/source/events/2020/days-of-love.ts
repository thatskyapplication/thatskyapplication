import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2020,
	name: "days-of-love",
	family: EventFamilyId.DaysOfLove,
	start: skyDate(2_020, 2, 12, 12),
	end: skyDate(2_020, 2, 19, 12),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfLoveSwing,
			cost: { money: 19.99 },
		},
	],
});
