import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.WorkshopShowAndTell2025,
	start: skyDate(2_025, 6, 23),
	end: skyDate(2_025, 7, 7),
	offer: [
		{
			name: "Dressing table",
			cosmetic: Cosmetic.WorkshopShowAndTellProp1,
			cost: { hearts: 9 },
		},
		{
			name: "Blue stool",
			cosmetic: Cosmetic.WorkshopShowAndTellProp2,
			cost: { ascendedCandles: 10 },
		},
		{
			name: "Floor curtain",
			cosmetic: Cosmetic.WorkshopShowAndTellProp3,
			cost: { candles: 20 },
		},
		{
			name: "Flower vase",
			cosmetic: Cosmetic.WorkshopShowAndTellProp4,
			cost: { candles: 10 },
		},
		{
			name: "Left curtain",
			cosmetic: Cosmetic.WorkshopShowAndTellProp5,
			cost: { hearts: 3 },
		},
		{
			name: "Small crescent rug",
			cosmetic: Cosmetic.WorkshopShowAndTellProp6,
			cost: { candles: 15 },
		},
		{
			name: "Decorative stick jar",
			cosmetic: Cosmetic.WorkshopShowAndTellProp7,
			cost: { hearts: 1 },
		},
	],
	patchNotesURL: String(new URL("p0295", LINK_REDIRECTOR_URL)),
});
