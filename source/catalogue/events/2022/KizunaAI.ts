import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.KizunaAI2022,
	start: skyDate(2_022, 2, 25),
	end: skyDate(2_022, 3, 10),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>().set(1 << 0, {
			name: "Kizuna AI Pack",
			cost: { money: 19.99 },
			emoji: HAIR_EMOJIS.Hair102,
		}),
	},
});
