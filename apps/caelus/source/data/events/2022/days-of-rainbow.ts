import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.DaysOfRainbow2022,
	start: skyDate(2_022, 6, 30),
	end: skyDate(2_022, 7, 14),
	offer: [
		{
			name: "Rainbow Trousers",
			cosmetic: Cosmetic.RainbowTrousers,
			cost: { candles: 95 },
		},
		{
			name: "Rainbow Earring",
			cosmetic: Cosmetic.RainbowEarring,
			cost: { money: 2.99 },
		},
		{
			name: "Rainbow Headphones",
			cosmetic: Cosmetic.RainbowHeadphones,
			cost: { money: 9.99 },
		},
		{
			name: "Double Rainbow Pack",
			cosmetic: Cosmetic.RainbowDoubleFlower,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: String(new URL("p0180", LINK_REDIRECTOR_URL)),
});
