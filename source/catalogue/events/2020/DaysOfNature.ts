import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfNature2020,
	start: skyDate(2_020, 4, 20, 12),
	end: skyDate(2_020, 4, 27, 12),
	offer: new Collection<number, ItemRaw>().set(1 << 0, {
		name: "Earth Cape",
		cost: { money: 4.99 },
		emoji: CAPE_EMOJIS.Cape29,
	}),
});
