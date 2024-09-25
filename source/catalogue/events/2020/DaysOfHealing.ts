import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfHealing2020,
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
});
