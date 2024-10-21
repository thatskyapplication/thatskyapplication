import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility2/Constants.js";
import { Cosmetic, EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility2/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 2, 12), end = skyDate(2_024, 2, 26);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(new URL("events/2024/days_of_love/event_currency.webp", CDN_URL)),
	});
}

export default new Event({
	id: EventId.DaysOfLove2024,
	start: skyDate(2_024, 2, 12),
	end: skyDate(2_024, 2, 26),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Love Heart Plushie",
			cosmetic: Cosmetic.LoveHeartPlushie,
			cost: { eventCurrency: 14 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp35,
		},
		{
			name: "Love Heart Beret",
			cosmetic: Cosmetic.LoveHeartBeret,
			cost: { eventCurrency: 27 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory37,
		},
		{
			name: "Days of Love music sheet",
			cosmetic: Cosmetic.DaysofLoveMusicSheet,
			cost: { eventCurrency: 7 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Days of Love Meteor Mantle",
			cosmetic: Cosmetic.DaysofLoveMeteorMantle,
			cost: { money: 17.99 },
			emoji: CAPE_EMOJIS.Cape127,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1264",
});
