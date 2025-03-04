import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfBloom2023,
	start: skyDate(2_023, 3, 20),
	end: skyDate(2_023, 4, 10),
	offer: [
		{
			name: "Red Bloom Cape",
			cosmetic: Cosmetic.RedBloomCape,
			cost: { candles: 110 },
		},
		{
			name: "Bloom Butterfly Fountain",
			cosmetic: Cosmetic.BloomButterflyFountain,
			cost: { candles: 80 },
		},
		{
			name: "Bloom Gardening Tunic",
			cosmetic: Cosmetic.BloomGardeningTunic,
			cost: { money: 9.99 },
		},
		{
			name: "Bloom Picnic Basket",
			cosmetic: Cosmetic.BloomPicnicBasket,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0205", LINK_REDIRECTOR_URL)),
});
