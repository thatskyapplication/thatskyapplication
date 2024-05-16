import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.HalloweenOfficeEvent2019,
	start: skyDate(2_019, 10, 27),
	end: skyDate(2_019, 10, 31),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Spooky Bat Cape", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape19 })
			.set(1 << 1, { name: "Hungry Pumpkin Hat", cost: { money: 9.99 }, emoji: HAIR_EMOJIS.Hair45 }),
	},
});
