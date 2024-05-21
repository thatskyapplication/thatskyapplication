import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS, HELD_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMusic2023,
	start: skyDate(2_023, 7, 3),
	end: skyDate(2_023, 7, 16),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Triumph Saxophone", cost: { eventCurrency: 102 }, emoji: HELD_PROPS_EMOJIS.HeldProp36 })
		.set(1 << 1, { name: "Marching Band Hat", cost: { eventCurrency: 43 }, emoji: HAIR_EMOJIS.Hair126 })
		.set(1 << 2, { name: "Triumph Violin", cost: { money: 19.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp35 }),
});
