import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS, OUTFIT_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfColour2023,
	start: skyDate(2_023, 6, 1),
	end: skyDate(2_023, 6, 14),
	offer: [
		{
			name: "Dark Rainbow Cape",
			cosmetic: Cosmetic.DarkRainbowCape,
			cost: { eventCurrency: 104 },
			emoji: CAPE_EMOJIS.Cape106,
		},
		{
			name: "Dark Rainbow Pack",
			cosmetic: Cosmetic.DarkRainbowEarrings,
			cost: { money: 9.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory26,
		},
		{
			name: "Dark Rainbow Tunic",
			cosmetic: Cosmetic.DarkRainbowTunic,
			cost: { money: 14.99 },
			emoji: OUTFIT_EMOJIS.Outfit47,
		},
	],
});
