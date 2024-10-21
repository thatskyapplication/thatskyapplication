import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	id: EventId.DaysOfMischief2020,
	start: skyDate(2_020, 10, 22),
	end: skyDate(2_020, 11, 5),
	offer: [
		{
			name: "Mischief Web Cape",
			cosmetic: Cosmetic.MischiefWebCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape37,
		},
		{
			name: "Mischief Witch Hat",
			cosmetic: Cosmetic.MischiefWitchHat,
			cost: { money: 9.99 },
			emoji: HAIR_EMOJIS.Hair69,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/718",
});
