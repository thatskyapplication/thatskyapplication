import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.SkyAnniversary2020,
	start: skyDate(2_020, 7, 13),
	end: skyDate(2_020, 7, 19),
	offer: [
		{
			name: "Hair accessory",
			bit: 1 << 0,
			cost: { hearts: 3 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory03,
		},
	],
});
