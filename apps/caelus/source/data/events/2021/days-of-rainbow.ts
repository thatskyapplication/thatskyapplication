import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfRainbow2021,
	start: skyDate(2_021, 6, 14),
	end: skyDate(2_021, 6, 28),
	offer: [
		{
			name: "Rainbow braid",
			cosmetic: Cosmetic.RainbowBraid,
			cost: { hearts: 20 },
		},
		{
			name: "Rainbow cape",
			cosmetic: Cosmetic.RainbowCape,
			cost: { candles: 175 },
		},
		{
			name: "Rainbow Hat",
			cosmetic: Cosmetic.RainbowHat,
			cost: { money: 9.99 },
		},
		{
			name: "Rainbow Pack",
			cosmetic: Cosmetic.RainbowFlower,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("0134", LINK_REDIRECTOR_URL)),
});
