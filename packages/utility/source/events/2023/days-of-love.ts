import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2023,
	start: skyDate(2_023, 2, 13),
	end: skyDate(2_023, 2, 27),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfLoveFloweryArchway,
			cost: { candles: 100 },
		},
		{
			cosmetic: Cosmetic.DaysOfLoveClassyCravat,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.DaysOfLoveSerendipitousSceptre,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0200", LINK_REDIRECTOR_URL)),
});
