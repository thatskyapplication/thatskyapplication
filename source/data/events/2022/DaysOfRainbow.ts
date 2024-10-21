import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfRainbow2022,
	start: skyDate(2_022, 6, 30),
	end: skyDate(2_022, 7, 14),
	offer: [
		{
			name: "Rainbow Trousers",
			cosmetic: Cosmetic.RainbowTrousers,
			cost: { candles: 95 },
			emoji: OUTFIT_EMOJIS.Outfit33,
		},
		{
			name: "Rainbow Earring",
			cosmetic: Cosmetic.RainbowEarring,
			cost: { money: 2.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory16,
		},
		{
			name: "Rainbow Headphones",
			cosmetic: Cosmetic.RainbowHeadphones,
			cost: { money: 9.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory17,
		},
		{
			name: "Double Rainbow Pack",
			cosmetic: Cosmetic.RainbowDoubleFlower,
			cost: { money: 9.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory21,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/909",
});
