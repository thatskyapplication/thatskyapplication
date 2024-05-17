import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HELD_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSummerLights2020,
	start: skyDate(2_020, 9, 8),
	end: skyDate(2_020, 9, 20),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>().set(1 << 0, {
			name: "Days of Summer Lights Pack",
			cost: { money: 19.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp18,
		}),
	},
});
