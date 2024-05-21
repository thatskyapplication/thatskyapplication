import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HELD_PROPS_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS, NECKLACE_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2023,
	start: skyDate(2_023, 2, 13),
	end: skyDate(2_023, 2, 26),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, {
			name: "Day of Love Flowery Archway",
			cost: { candles: 100 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp31,
		})
		.set(1 << 1, { name: "Day of Love Classy Cravat", cost: { money: 4.99 }, emoji: NECKLACE_EMOJIS.Necklace28 })
		.set(1 << 2, {
			name: "Day of Love Serendipitous Sceptor",
			cost: { money: 14.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp33,
		}),
});
