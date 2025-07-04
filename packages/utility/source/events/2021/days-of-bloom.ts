import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfBloom2021,
	start: skyDate(2_021, 3, 22),
	end: skyDate(2_021, 4, 5),
	offer: [
		{
			name: "Bloom Hair",
			cosmetic: Cosmetic.BloomHair,
			cost: { hearts: 20 },
		},
		{
			name: "Bloom Cape",
			cosmetic: Cosmetic.BloomCape,
			cost: { candles: 70 },
		},
		{
			name: "Pink Bloom Teaset",
			cosmetic: Cosmetic.PinkBloomTeaset,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0130", LINK_REDIRECTOR_URL)),
});
