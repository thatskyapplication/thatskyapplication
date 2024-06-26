import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfRainbow2021,
	start: skyDate(2_021, 6, 14),
	end: skyDate(2_021, 6, 27),
	offer: [
		{
			name: "Rainbow braid",
			bit: 1 << 0,
			cost: { hearts: 20 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory13,
		},
		{ name: "Rainbow cape", bit: 1 << 1, cost: { candles: 175 }, emoji: CAPE_EMOJIS.Cape56 },
		{
			name: "Rainbow Pack",
			bit: 1 << 2,
			cost: { money: 19.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory05,
		},
		{ name: "Rainbow Hat", bit: 1 << 3, cost: { money: 9.99 }, emoji: HAIR_EMOJIS.Hair83 },
	],
});
