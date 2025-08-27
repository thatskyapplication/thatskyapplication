import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.WorkshopShowAndTell2025,
	start: skyDate(2_025, 6, 23),
	end: skyDate(2_025, 7, 7),
	offer: [
		{
			cosmetic: Cosmetic.WorkshopShowAndTellProp1,
			cost: { hearts: 9 },
		},
		{
			cosmetic: Cosmetic.WorkshopShowAndTellProp2,
			cost: { ascendedCandles: 10 },
		},
		{
			cosmetic: Cosmetic.WorkshopShowAndTellProp3,
			cost: { candles: 20 },
		},
		{
			cosmetic: Cosmetic.WorkshopShowAndTellProp4,
			cost: { candles: 10 },
		},
		{
			cosmetic: Cosmetic.WorkshopShowAndTellProp5,
			cost: { hearts: 3 },
		},
		{
			cosmetic: Cosmetic.WorkshopShowAndTellProp6,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.WorkshopShowAndTellProp7,
			cost: { hearts: 1 },
		},
	],
	patchNotesURL: patchNotesRoute("0295"),
});
