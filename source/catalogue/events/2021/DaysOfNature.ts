import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, NECKLACE_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfNature2021,
	start: skyDate(2_021, 4, 19),
	end: skyDate(2_021, 5, 2),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Ocean Necklace", cost: { money: 1.99 }, emoji: NECKLACE_EMOJIS.Necklace12 })
		.set(1 << 1, { name: "Ocean Cape", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape54 }),
});
