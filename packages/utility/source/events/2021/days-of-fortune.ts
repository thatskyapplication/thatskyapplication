import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFortune2021,
	start: skyDate(2_021, 2, 8, 12),
	end: skyDate(2_021, 3, 1, 12),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfFortuneMask,
			cost: { candles: 54 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneHeaddress,
			cost: { candles: 66 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneOrange,
			cost: { money: 0.99 },
		},
		{
			cosmetic: [Cosmetic.DaysOfFortuneCape, Cosmetic.FortuneBlushingMask, Cosmetic.FortuneBunHair],
			cosmeticDisplay: Cosmetic.DaysOfFortuneCape,
			cost: { money: 24.99 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneWoolHat,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0123"),
});
