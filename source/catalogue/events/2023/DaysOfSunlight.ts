import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, SHOE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_023, 9, 11), end = skyDate(2_023, 9, 24);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({ date: start, amount: 6 });
}

export default new Event({
	nameUnique: EventNameUnique.DaysOfSunlight2023,
	start: skyDate(2_023, 9, 11),
	end: skyDate(2_023, 9, 24),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Sunlight Pink Beach Towel Cape",
			cosmetic: Cosmetic.SunlightPinkBeachTowelCape,
			cost: { eventCurrency: 16 },
			emoji: CAPE_EMOJIS.Cape108,
		},
		{
			name: "Sunlight Yellow Beach Towel Cape",
			cosmetic: Cosmetic.SunlightYellowBeachTowelCape,
			cost: { eventCurrency: 18 },
			emoji: CAPE_EMOJIS.Cape109,
		},
		{
			name: "Sunlight Blue Beach Towel Cape",
			cosmetic: Cosmetic.SunlightBlueBeachTowelCape,
			cost: { eventCurrency: 23 },
			emoji: CAPE_EMOJIS.Cape110,
		},
		{
			name: "Sunlight Chunky Sandals",
			cosmetic: Cosmetic.SunlightChunkySandals,
			cost: { money: 9.99 },
			emoji: SHOE_EMOJIS.Shoe06,
		},
		{
			name: "Sunlight Surfboard",
			cosmetic: Cosmetic.SunlightSurfboard,
			cost: { money: 14.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp32,
		},
	],
});
