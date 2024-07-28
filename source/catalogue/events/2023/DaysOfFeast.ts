import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	SHOE_EMOJIS,
} from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_023, 12, 18), end = skyDate(2_024, 1, 7);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(new URL("events/2023/days_of_feast/event_currency.webp", CDN_URL)),
	});
}

export default new Event({
	nameUnique: EventNameUnique.DaysOfFeast2023,
	start: skyDate(2_023, 12, 18),
	end: skyDate(2_024, 1, 7),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{ name: "Prop", bit: 1 << 0, cost: { eventCurrency: 44 }, emoji: HELD_PROPS_EMOJIS.HeldProp40 },
		{
			name: "Hair accessory",
			bit: 1 << 1,
			cost: { eventCurrency: 19 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory34,
		},
		{ name: "Cosy Hermit Boots", bit: 1 << 2, cost: { money: 6.99 }, emoji: SHOE_EMOJIS.Shoe13 },
		{
			name: "Winter Quilted Cape",
			bit: 1 << 3,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape120,
		},
	],
});
