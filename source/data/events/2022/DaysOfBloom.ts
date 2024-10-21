import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";
import { CAPE_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../Utility2/emojis.js";

export default new Event({
	id: EventId.DaysOfBloom2022,
	start: skyDate(2_022, 3, 28),
	end: skyDate(2_022, 4, 11),
	offer: [
		{
			name: "Purple Bloom Cape",
			cosmetic: Cosmetic.PurpleBloomCape,
			cost: { candles: 105 },
			emoji: CAPE_EMOJIS.Cape76,
		},
		{
			name: "Purple Bloom Teaset",
			cosmetic: Cosmetic.PurpleBloomTeaset,
			cost: { money: 19.99 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp23,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/879",
});
