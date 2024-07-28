import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	OUTFIT_EMOJIS,
	SHOE_EMOJIS,
} from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_023, 10, 23), end = skyDate(2_023, 11, 12);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 6,
		infographicURL: String(new URL("events/2023/days_of_mischief/event_currency.webp", CDN_URL)),
	});
}

export default new Event({
	nameUnique: EventNameUnique.DaysOfMischief2023,
	start: skyDate(2_023, 10, 23),
	end: skyDate(2_023, 11, 12),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Hair accessory",
			bit: 1 << 0,
			cost: { eventCurrency: 24 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory32,
		},
		{ name: "Shoes", bit: 1 << 1, cost: { eventCurrency: 16 }, emoji: SHOE_EMOJIS.Shoe12 },
		{ name: "Outfit", bit: 1 << 2, cost: { eventCurrency: 41 }, emoji: OUTFIT_EMOJIS.Outfit52 },
		{
			name: "Mischief Gossamer Cape",
			bit: 1 << 3,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape116,
		},
		{
			name: "Mischief Crabula Cloak",
			bit: 1 << 4,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape117,
		},
		{
			name: "Mischief Crabula Mask",
			bit: 1 << 5,
			cost: { money: 2.99 },
			emoji: MASK_EMOJIS.Mask84,
		},
	],
});
