import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 2, 12), end = skyDate(2_024, 2, 25);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(new URL("events/2024/days_of_love/event_currency.webp", CDN_URL)),
	});
}

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2024,
	start: skyDate(2_024, 2, 12),
	end: skyDate(2_024, 2, 25),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Prop",
			bit: 1 << 0,
			cost: { eventCurrency: 14 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp35,
		},
		{
			name: "Hair accessory",
			bit: 1 << 1,
			cost: { eventCurrency: 27 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory37,
		},
		{
			name: "Music sheet",
			bit: 1 << 2,
			cost: { eventCurrency: 7 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Days of Love Meteor Mantle",
			bit: 1 << 3,
			cost: { money: 17.99 },
			emoji: CAPE_EMOJIS.Cape127,
		},
	],
});
