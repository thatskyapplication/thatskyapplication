import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2024, 1, 29), end = skyDate(2024, 2, 14);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(new URL("events/2024/days_of_fortune/event_currency.webp", CDN_URL)),
	});
}

export default new Event({
	nameUnique: EventNameUnique.DaysOfFortune2024,
	start: skyDate(2_024, 1, 29),
	end: skyDate(2_024, 2, 14),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Fortune Dragon Mask",
			cosmetic: Cosmetic.FortuneDragonMask,
			cost: { eventCurrency: 14 },
			emoji: MASK_EMOJIS.Mask90,
		},
		{
			name: "Fortune Drum",
			cosmetic: Cosmetic.FortuneDrum,
			cost: { eventCurrency: 34 },
			emoji: HELD_PROPS_EMOJIS.HeldProp41,
		},
		{
			name: "Days of Fortune Dragon Vestment",
			cosmetic: Cosmetic.DaysOfFortuneDragonVestment,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit57,
		},
		{
			name: "Days of Fortune Dragon Stole",
			cosmetic: Cosmetic.DaysOfFortuneDragonStole,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape126,
		},
		{
			name: "Days of Fortune Dragon Bangles",
			cosmetic: Cosmetic.DaysOfFortuneDragonBangles,
			cost: { money: 1.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory35,
		},
	],
});
