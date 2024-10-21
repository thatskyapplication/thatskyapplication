import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility2/emojis.js";

export default new Event({
	id: EventId.DaysOfBloom2021,
	start: skyDate(2_021, 3, 22),
	end: skyDate(2_021, 4, 5),
	offer: [
		{
			name: "Bloom Hair",
			cosmetic: Cosmetic.BloomHair,
			cost: { hearts: 20 },
			emoji: HAIR_EMOJIS.Hair76,
		},
		{
			name: "Bloom Cape",
			cosmetic: Cosmetic.BloomCape,
			cost: { candles: 70 },
			emoji: CAPE_EMOJIS.Cape51,
		},
		{
			name: "Pink Bloom Teaset",
			cosmetic: Cosmetic.PinkBloomTeaset,
			cost: { money: 19.99 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp04,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/771",
});
