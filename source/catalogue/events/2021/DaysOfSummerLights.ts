import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSummerLights2021,
	start: skyDate(2_021, 9, 20),
	end: skyDate(2_021, 10, 4),
	offer: [
		{
			name: "Days of Summer Lights Accessory",
			cosmetic: Cosmetic.SummerLightsAccessory,
			cost: { money: 2.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory09,
		},
	],
});
