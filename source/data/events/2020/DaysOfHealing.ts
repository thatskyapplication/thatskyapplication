import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfHealing2020,
	start: skyDate(2_020, 5, 18, 12),
	end: skyDate(2_020, 6, 22, 12),
	offer: [
		{
			name: "Healing Pack",
			cosmetic: Cosmetic.HealingHairAccessory,
			cost: { money: 19.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory01,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/664",
});
