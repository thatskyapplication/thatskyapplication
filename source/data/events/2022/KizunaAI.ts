import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { HAIR_EMOJIS } from "../../../utility/emojis.js";

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
