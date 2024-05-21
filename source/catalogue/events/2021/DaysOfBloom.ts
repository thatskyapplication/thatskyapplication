import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfBloom2021,
	start: skyDate(2_021, 3, 22),
	end: skyDate(2_021, 4, 4),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Hair", cost: { hearts: 20 }, emoji: HAIR_EMOJIS.Hair76 })
		.set(1 << 1, { name: "Cape", cost: { candles: 70 }, emoji: CAPE_EMOJIS.Cape51 })
		.set(1 << 2, {
			name: "Pink Bloom Teaset",
			cost: { money: 19.99 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp04,
		}),
});
