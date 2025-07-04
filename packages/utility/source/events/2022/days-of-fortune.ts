import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFortune2022,
	start: skyDate(2_022, 1, 24),
	end: skyDate(2_022, 2, 7),
	offer: [
		{
			name: "Days of Fortune Tiger Mask",
			cosmetic: Cosmetic.DaysOfFortuneTigerMask,
			cost: { candles: 58 },
		},
		{
			name: "Days of Fortune Fish Pack",
			cosmetic: [Cosmetic.DaysOfFortuneFishCape, Cosmetic.DaysOfFortuneFishHood],
			cosmeticDisplay: Cosmetic.DaysOfFortuneFishCape,
			cost: { money: 19.99 },
		},
		{
			name: "Days of Fortune Fish Accessory",
			cosmetic: Cosmetic.DaysOfFortuneFishAccessory,
			cost: { money: 1.99 },
		},
	],
	patchNotesURL: String(new URL("p0160", LINK_REDIRECTOR_URL)),
});
