import { URL } from "node:url";
import { Cosmetic, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../utility/emojis.js";

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
	patchNotesURL: String(new URL("p0130", LINK_REDIRECTOR_URL)),
});
