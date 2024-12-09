import { URL } from "node:url";
import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfBloom2023,
	start: skyDate(2_023, 3, 20),
	end: skyDate(2_023, 4, 10),
	offer: [
		{
			name: "Red Bloom Cape",
			cosmetic: Cosmetic.RedBloomCape,
			cost: { candles: 110 },
			emoji: CAPE_EMOJIS.Cape101,
		},
		{
			name: "Bloom Butterfly Fountain",
			cosmetic: Cosmetic.BloomButterflyFountain,
			cost: { candles: 80 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp25,
		},
		{
			name: "Bloom Gardening Tunic",
			cosmetic: Cosmetic.BloomGardeningTunic,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit44,
		},
		{
			name: "Bloom Picnic Basket",
			cosmetic: Cosmetic.BloomPicnicBasket,
			cost: { money: 19.99 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp32,
		},
	],
	patchNotesURL: String(new URL("p0205", LINK_REDIRECTOR_URL)),
});
