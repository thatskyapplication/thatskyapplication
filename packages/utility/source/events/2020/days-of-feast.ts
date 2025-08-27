import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFeast2020,
	start: skyDate(2_020, 12, 21),
	end: skyDate(2_021, 1, 4),
	offer: [
		{
			cosmetic: Cosmetic.FeastNeckTie,
			cost: { hearts: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfFeastCape,
			cost: { candles: 65 },
		},
		{
			cosmetic: Cosmetic.DaysOfFeastTable,
			cost: { candles: 150 },
		},
		{
			cosmetic: Cosmetic.DaysOfFeastHorns,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.SnowflakeCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0120"),
});
