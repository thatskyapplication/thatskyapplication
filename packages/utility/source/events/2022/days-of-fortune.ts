import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFortune2022,
	start: skyDate(2_022, 1, 24),
	end: skyDate(2_022, 2, 7),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfFortuneTigerMask,
			cost: { candles: 58 },
		},
		{
			cosmetic: [Cosmetic.DaysOfFortuneFishCape, Cosmetic.DaysOfFortuneFishHood],
			cosmeticDisplay: Cosmetic.DaysOfFortuneFishCape,
			cost: { money: 19.99 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneFishAccessory,
			cost: { money: 1.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0160"),
});
