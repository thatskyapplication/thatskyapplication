import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfSummerLights2021,
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
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/828",
});
