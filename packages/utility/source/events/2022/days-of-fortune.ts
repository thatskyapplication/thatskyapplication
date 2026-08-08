import { Cosmetic, CosmeticPackName } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFortune2022,
	name: "days-of-fortune",
	family: EventFamily.DaysOfFortune,
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
			packName: CosmeticPackName.DaysOfFortuneFishPack,
			cost: { money: 19.99 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneFishAccessory,
			cost: { money: 1.99 },
		},
	],
});
