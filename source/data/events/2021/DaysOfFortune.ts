import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
} from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfFortune2021,
	start: skyDate(2_021, 2, 8, 12),
	end: skyDate(2_021, 3, 1, 12),
	offer: [
		{
			name: "Days of Fortune mask",
			cosmetic: Cosmetic.DaysOfFortuneMask,
			cost: { candles: 54 },
			emoji: MASK_EMOJIS.Mask42,
		},
		{
			name: "Days of Fortune headdress",
			cosmetic: Cosmetic.DaysOfFortuneHeaddress,
			cost: { candles: 66 },
			emoji: HAIR_EMOJIS.Hair75,
		},
		{
			name: "Days of Fortune Orange",
			cosmetic: Cosmetic.DaysOfFortuneOrange,
			cost: { money: 0.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory04,
		},
		{
			name: "Days of Fortune Pack",
			cosmetic: [Cosmetic.DaysOfFortuneCape, Cosmetic.FortuneBlushingMask, Cosmetic.FortuneBunHair],
			cost: { money: 24.99 },
			emoji: CAPE_EMOJIS.Cape49,
		},
		{
			name: "Days of Fortune Wool Hat",
			cosmetic: Cosmetic.DaysOfFortuneWoolHat,
			cost: { money: 9.99 },
			emoji: HAIR_EMOJIS.Hair74,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/761",
});
