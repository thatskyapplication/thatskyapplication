import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfRainbow2021,
	start: skyDate(2_021, 6, 14),
	end: skyDate(2_021, 6, 28),
	offer: [
		{
			cosmetic: Cosmetic.RainbowBraid,
			cost: { hearts: 20 },
		},
		{
			cosmetic: Cosmetic.RainbowCape,
			cost: { candles: 175 },
		},
		{
			cosmetic: Cosmetic.RainbowHat,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.RainbowFlower,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("0134", LINK_REDIRECTOR_URL)),
});
