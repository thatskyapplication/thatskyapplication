import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMischief2022,
	start: skyDate(2_022, 10, 24),
	end: skyDate(2_022, 11, 14),
	offer: [
		{
			cosmetic: Cosmetic.MischiefTuftedHair,
			cost: { candles: 44 },
		},
		{
			cosmetic: Cosmetic.FelineFamiliarProp,
			cost: { money: 9.99 },
		},
		{
			cosmetic: [Cosmetic.CatCostumeMask, Cosmetic.CatCostumeCape],
			cosmeticDisplay: Cosmetic.CatCostumeCape,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0190"),
});
