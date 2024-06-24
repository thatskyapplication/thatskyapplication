import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.KizunaAI2022,
	start: skyDate(2_022, 2, 25),
	end: skyDate(2_022, 3, 10),
	offer: [{ name: "Kizuna AI Pack", bit: 1 << 0, cost: { money: 19.99 }, emoji: HAIR_EMOJIS.Hair102 }],
});
