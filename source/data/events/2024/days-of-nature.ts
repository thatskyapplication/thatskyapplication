import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MASK_EMOJIS, NECKLACE_EMOJIS } from "../../../utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2024, 5, 27), end = skyDate(2024, 6, 17);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({ date: start, amount: 4 });
}

export default new Event({
	id: EventId.DaysOfNature2024,
	start: skyDate(2_024, 5, 27),
	end: skyDate(2_024, 6, 17),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Ocean Mask",
			cosmetic: Cosmetic.OceanMask,
			cost: { eventCurrency: 16 },
			emoji: MASK_EMOJIS.Mask91,
		},
		{
			name: "Ocean Blue Scarf",
			cosmetic: Cosmetic.OceanBlueScarf,
			cost: { eventCurrency: 40 },
			emoji: NECKLACE_EMOJIS.Necklace36,
		},
		{
			name: "Nature Wave Pack",
			cosmetic: Cosmetic.NatureWaveCape,
			cost: { money: 19.99 },
			emoji: CAPE_EMOJIS.Cape131,
		},
		{
			name: "Nature Wave-Touched Hair",
			cosmetic: Cosmetic.NatureWaveTouchedHair,
			cost: { money: 6.99 },
			emoji: HAIR_EMOJIS.Hair144,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1323",
});
