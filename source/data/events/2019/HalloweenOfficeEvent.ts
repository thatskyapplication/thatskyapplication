import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.HalloweenOfficeEvent2019,
	start: skyDate(2_019, 10, 27),
	end: skyDate(2_019, 11, 1),
	offer: [
		{
			name: "Spooky Bat Cape",
			cosmetic: Cosmetic.SpookyBatCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape19,
		},
		{
			name: "Hungry Pumpkin Hat",
			cosmetic: Cosmetic.HungryPumpkinHat,
			cost: { money: 9.99 },
			emoji: HAIR_EMOJIS.Hair45,
		},
	],
	patchNotesURL: "https://sky-children-of-the-light.fandom.com/wiki/Update:Live_0.6.5_(142170)",
});
