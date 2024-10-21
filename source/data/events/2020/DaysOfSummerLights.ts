import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { HELD_PROPS_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfSummerLights2020,
	start: skyDate(2_020, 9, 8),
	end: skyDate(2_020, 9, 21),
	offer: [
		{
			name: "Days of Summer Lights Pack",
			cosmetic: Cosmetic.DaysOfSummerLightsLantern,
			cost: { money: 19.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp18,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/712",
});
