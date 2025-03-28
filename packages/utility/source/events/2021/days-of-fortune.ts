import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFortune2021,
	start: skyDate(2_021, 2, 8, 12),
	end: skyDate(2_021, 3, 1, 12),
	offer: [
		{
			name: "Days of Fortune mask",
			cosmetic: Cosmetic.DaysOfFortuneMask,
			cost: { candles: 54 },
		},
		{
			name: "Days of Fortune headdress",
			cosmetic: Cosmetic.DaysOfFortuneHeaddress,
			cost: { candles: 66 },
		},
		{
			name: "Days of Fortune Orange",
			cosmetic: Cosmetic.DaysOfFortuneOrange,
			cost: { money: 0.99 },
		},
		{
			name: "Days of Fortune Pack",
			cosmetic: [Cosmetic.DaysOfFortuneCape, Cosmetic.FortuneBlushingMask, Cosmetic.FortuneBunHair],
			cosmeticDisplay: Cosmetic.DaysOfFortuneCape,
			cost: { money: 24.99 },
		},
		{
			name: "Days of Fortune Wool Hat",
			cosmetic: Cosmetic.DaysOfFortuneWoolHat,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: String(new URL("p0123", LINK_REDIRECTOR_URL)),
});
