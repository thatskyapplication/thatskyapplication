import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.HalloweenOfficeEvent2019,
	start: skyDate(2_019, 10, 27),
	end: skyDate(2_019, 10, 31),
	offer: [
		{ name: "Spooky Bat Cape", bit: 1 << 0, cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape19 },
		{ name: "Hungry Pumpkin Hat", bit: 1 << 1, cost: { money: 9.99 }, emoji: HAIR_EMOJIS.Hair45 },
	],
});
