import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSunlight2022,
	name: "days-of-sunlight",
	family: EventFamily.DaysOfSunlight,
	start: skyDate(2_022, 8, 22),
	end: skyDate(2_022, 9, 12),
	offer: [
		{
			cosmetic: Cosmetic.CampfireTent,
			cost: { candles: 90 },
		},
		{
			cosmetic: Cosmetic.JellyShoulderBuddy,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.CampfireSnackKit,
			cost: { money: 19.99 },
		},
	],
});
