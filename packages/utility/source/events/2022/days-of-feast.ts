import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFeast2022,
	start: skyDate(2_022, 12, 19),
	end: skyDate(2_023, 1, 9),
	offer: [
		{
			cosmetic: Cosmetic.FeastGoggles,
			cost: { candles: 50 },
		},
		{
			cosmetic: Cosmetic.SnowkidProp,
			cost: { candles: 120 },
		},
		{
			cosmetic: Cosmetic.TournamentSkyballSet,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.CosyHermitCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0195"),
});
