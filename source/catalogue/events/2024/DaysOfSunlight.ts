import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 8, 26), end = skyDate(2_024, 9, 8);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 6,
	});
}

export default new Event({
	nameUnique: EventNameUnique.DaysOfSunlight2024,
	start: skyDate(2_024, 8, 26),
	end: skyDate(2_024, 9, 8),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Sunlight Manta Float",
			bit: 1 << 0,
			cost: { eventCurrency: 20 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp71,
		},
		{
			name: "Sunlight Beach Shorts",
			bit: 1 << 1,
			cost: { eventCurrency: 30 },
			emoji: OUTFIT_EMOJIS.Outfit65,
		},
		{
			name: "Sunlight Helios Hoops",
			bit: 1 << 2,
			cost: { money: 2.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory37,
		},
		{
			name: "Sunlight Woven Wrap",
			bit: 1 << 3,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape135,
		},
	],
});
