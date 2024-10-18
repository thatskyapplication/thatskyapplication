import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 8, 26), end = skyDate(2_024, 9, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 6,
	});
}

export default new Event({
	id: EventId.DaysOfSunlight2024,
	start: skyDate(2_024, 8, 26),
	end: skyDate(2_024, 9, 13),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Sunlight Manta Float",
			cosmetic: Cosmetic.SunlightMantaFloat,
			cost: { eventCurrency: 20 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp71,
		},
		{
			name: "Sunlight Beach Shorts",
			cosmetic: Cosmetic.SunlightBeachShorts,
			cost: { eventCurrency: 30 },
			emoji: OUTFIT_EMOJIS.Outfit65,
		},
		{
			name: "Sunlight Helios Hoops",
			cosmetic: Cosmetic.SunlightHeliosHoops,
			cost: { money: 2.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory37,
		},
		{
			name: "Sunlight Woven Wrap",
			cosmetic: Cosmetic.SunlightWovenWrap,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape135,
		},
	],
});
