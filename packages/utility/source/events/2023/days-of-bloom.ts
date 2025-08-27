import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfBloom2023,
	start: skyDate(2_023, 3, 20),
	end: skyDate(2_023, 4, 10),
	offer: [
		{
			cosmetic: Cosmetic.RedBloomCape,
			cost: { candles: 110 },
		},
		{
			cosmetic: Cosmetic.BloomButterflyFountain,
			cost: { candles: 80 },
		},
		{
			cosmetic: Cosmetic.BloomGardeningTunic,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.BloomPicnicBasket,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0205"),
});
