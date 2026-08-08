import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSummerLights2020,
	name: "days-of-summer-lights",
	family: EventFamilyId.DaysOfSummerLights,
	start: skyDate(2_020, 9, 8),
	end: skyDate(2_020, 9, 21),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfSummerLightsLantern,
			cost: { money: 19.99 },
		},
	],
});
