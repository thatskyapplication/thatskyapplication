import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2022,
	name: "days-of-love",
	family: EventFamilyId.DaysOfLove,
	start: skyDate(2_022, 2, 7),
	end: skyDate(2_022, 2, 23),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfLoveFlowerCrown,
			cost: { hearts: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfLoveGondola,
			cost: { money: 19.99 },
		},
	],
});
