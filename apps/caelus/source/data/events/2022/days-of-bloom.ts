import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import { CAPE_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../utility/emojis.js";

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
	patchNotesURL: String(new URL("p0165", LINK_REDIRECTOR_URL)),
});
