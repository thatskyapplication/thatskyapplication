import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSummerLights2021,
	name: "days-of-summer-lights",
	family: EventFamilyId.DaysOfSummerLights,
	start: skyDate(2_021, 9, 20),
	end: skyDate(2_021, 10, 4),
	offer: [
		{
			cosmetic: Cosmetic.SummerLightsAccessory,
			cost: { money: 2.99 },
		},
	],
});
