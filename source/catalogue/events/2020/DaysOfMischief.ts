import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMischief2020,
	start: skyDate(2_020, 10, 22),
	end: skyDate(2_020, 11, 4),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Mischief Web Cape", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape37 })
		.set(1 << 1, { name: "Mischief Witch Hat", cost: { money: 9.99 }, emoji: HAIR_EMOJIS.Hair69 }),
});
