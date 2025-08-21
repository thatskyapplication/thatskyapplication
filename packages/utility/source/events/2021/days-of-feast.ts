import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFeast2021,
	start: skyDate(2_021, 12, 20),
	end: skyDate(2_022, 1, 10),
	offer: [
		{
			cosmetic: Cosmetic.OdeToJoyMusicSheet,
			cost: { candles: 10 },
		},
		{
			cosmetic: Cosmetic.WinterFeastPillow,
			cost: { candles: 10 },
		},
		{
			cosmetic: Cosmetic.WinterFeastScarf,
			cost: { candles: 50 },
		},
		{
			cosmetic: Cosmetic.WinterFeastHat,
			cost: { hearts: 20 },
		},
		{
			cosmetic: Cosmetic.SnowflakeHairAccessory,
			cost: { money: 1.99 },
		},
		{
			cosmetic: Cosmetic.WinterAncestorCape,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.WinterFeastSnowGlobe,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0155"),
});
