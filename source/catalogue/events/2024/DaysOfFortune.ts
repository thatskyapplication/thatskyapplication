import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFortune2024,
	start: skyDate(2_024, 1, 29),
	end: skyDate(2_024, 2, 14),
	eventCurrencyInfographicURL: true,
	eventCurrencyPerDay: 5,
	offer: [
		{ name: "Mask", bit: 1 << 0, cost: { eventCurrency: 14 }, emoji: MASK_EMOJIS.Mask90 },
		{ name: "Prop", bit: 1 << 1, cost: { eventCurrency: 34 }, emoji: HELD_PROPS_EMOJIS.HeldProp41 },
		{
			name: "Days of Fortune Dragon Vestment",
			bit: 1 << 2,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit57,
		},
		{
			name: "Days of Fortune Dragon Stole",
			bit: 1 << 3,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape126,
		},
		{
			name: "Days of Fortune Dragon Bangles",
			bit: 1 << 4,
			cost: { money: 1.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory35,
		},
	],
});
