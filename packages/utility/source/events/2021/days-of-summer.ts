import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSummer2021,
	start: skyDate(2_021, 8, 12),
	end: skyDate(2_021, 8, 26),
	offer: [
		{
			name: "Double Deck Chairs",
			cosmetic: Cosmetic.DoubleDeckChairs,
			cost: { hearts: 16 },
		},
		{
			name: "Summer Hat",
			cosmetic: Cosmetic.SummerHat,
			cost: { candles: 44 },
		},
		{
			name: "Summer Umbrella",
			cosmetic: Cosmetic.SummerUmbrella,
			cost: { money: 19.99 },
		},
		{
			name: "Summer Shell Hair Pin",
			cosmetic: Cosmetic.SummerShellHairPin,
			cost: { money: 0.99 },
		},
	],
	patchNotesURL: String(new URL("p0145", LINK_REDIRECTOR_URL)),
});
