import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	id: EventId.DaysOfRainbow2021,
	start: skyDate(2_021, 6, 14),
	end: skyDate(2_021, 6, 28),
	offer: [
		{
			name: "Rainbow braid",
			cosmetic: Cosmetic.RainbowBraid,
			cost: { hearts: 20 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory13,
		},
		{
			name: "Rainbow cape",
			cosmetic: Cosmetic.RainbowCape,
			cost: { candles: 175 },
			emoji: CAPE_EMOJIS.Cape56,
		},
		{
			name: "Rainbow Hat",
			cosmetic: Cosmetic.RainbowHat,
			cost: { money: 9.99 },
			emoji: HAIR_EMOJIS.Hair83,
		},
		{
			name: "Rainbow Pack",
			cosmetic: Cosmetic.RainbowFlower,
			cost: { money: 19.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory05,
		},
	],
});
