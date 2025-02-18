import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

export default new Event({
	id: EventId.SkyAnniversary2022,
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
	patchNotesURL: String(new URL("p0180", LINK_REDIRECTOR_URL)),
});
