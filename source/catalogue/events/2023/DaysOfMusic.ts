import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS, HELD_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMusic2023,
	start: skyDate(2_023, 7, 3),
	end: skyDate(2_023, 7, 16),
	offer: [
		{ name: "Triumph Saxophone", bit: 1 << 0, cost: { eventCurrency: 102 }, emoji: HELD_PROPS_EMOJIS.HeldProp36 },
		{ name: "Marching Band Hat", bit: 1 << 1, cost: { eventCurrency: 43 }, emoji: HAIR_EMOJIS.Hair126 },
	],
});
