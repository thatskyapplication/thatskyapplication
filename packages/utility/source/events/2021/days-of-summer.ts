import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSummer2021,
	start: skyDate(2_021, 8, 12),
	end: skyDate(2_021, 8, 26),
	offer: [
		{
			cosmetic: Cosmetic.DoubleDeckChairs,
			cost: { hearts: 16 },
		},
		{
			cosmetic: Cosmetic.SummerHat,
			cost: { candles: 44 },
		},
		{
			cosmetic: Cosmetic.SummerUmbrella,
			cost: { money: 19.99 },
		},
		{
			cosmetic: Cosmetic.SummerShellHairPin,
			cost: { money: 0.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0145"),
});
