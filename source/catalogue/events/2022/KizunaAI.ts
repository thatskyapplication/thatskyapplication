import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	id: EventId.KizunaAI2022,
	start: skyDate(2_022, 2, 25),
	end: skyDate(2_022, 3, 11),
	offer: [
		{
			name: "Kizuna AI Pack",
			cosmetic: [Cosmetic.KizunaAIHair, Cosmetic.KizunaAIBow, Cosmetic.KizunaAICape],
			cost: { money: 19.99 },
			emoji: HAIR_EMOJIS.Hair102,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/879",
});
