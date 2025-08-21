import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfRainbow2022,
	start: skyDate(2_022, 6, 30),
	end: skyDate(2_022, 7, 14),
	offer: [
		{
			cosmetic: Cosmetic.RainbowTrousers,
			cost: { candles: 95 },
		},
		{
			cosmetic: Cosmetic.RainbowEarring,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.RainbowHeadphones,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.RainbowDoubleFlower,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0180"),
});
