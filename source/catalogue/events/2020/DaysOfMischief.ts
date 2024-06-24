import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMischief2020,
	start: skyDate(2_020, 10, 22),
	end: skyDate(2_020, 11, 4),
	offer: [
		{ name: "Mischief Web Cape", bit: 1 << 0, cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape37 },
		{ name: "Mischief Witch Hat", bit: 1 << 1, cost: { money: 9.99 }, emoji: HAIR_EMOJIS.Hair69 },
	],
});
