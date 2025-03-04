import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfNature2023,
	start: skyDate(2_023, 4, 20),
	end: skyDate(2_023, 5, 8),
	offer: [
		{
			name: "Nature School Cape",
			cosmetic: Cosmetic.NatureSchoolCape,
			cost: { candles: 180 },
		},
		{
			name: "Nature Glasses Pack",
			cosmetic: Cosmetic.NatureGlasses,
			cost: { money: 19.99 },
		},
		{
			name: "Nature Sonorous Seashell",
			cosmetic: Cosmetic.NatureSonorousSeashell,
			cost: { money: 4.99 },
		},
	],
	patchNotesURL: String(new URL("p0210", LINK_REDIRECTOR_URL)),
});
