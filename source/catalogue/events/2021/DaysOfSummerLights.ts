import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSummerLights2021,
	start: skyDate(2_021, 9, 20),
	end: skyDate(2_021, 10, 3),
	offer: [
		{
			name: "Days of Summer Lights Accessory",
			bit: 1 << 0,
			cost: { money: 2.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory09,
		},
	],
});
