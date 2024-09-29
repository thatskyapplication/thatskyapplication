import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.SkyAnniversary2022,
	start: skyDate(2_022, 7, 18),
	end: skyDate(2_022, 8, 4),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory3,
			cost: { hearts: 3 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory24,
		},
		{
			name: "Happy Birthday Music Sheet",
			cosmetic: Cosmetic.HappyBirthdayMusicSheet,
			cost: { hearts: 10 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Balloon",
			cosmetic: Cosmetic.Balloon,
			cost: { candles: 30 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp16,
		},
		{
			name: "Light fence",
			cosmetic: Cosmetic.LightFence,
			cost: { candles: 20 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp26,
		},
		{
			name: "Confetti launcher",
			cosmetic: Cosmetic.ConfettiLauncher,
			cost: { hearts: 20 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp17,
		},
	],
});
