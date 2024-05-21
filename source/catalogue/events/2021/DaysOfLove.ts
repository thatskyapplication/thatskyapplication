import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { MASK_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2021,
	start: skyDate(2_021, 2, 12, 12),
	end: skyDate(2_021, 2, 21, 12),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Mask", cost: { hearts: 15 }, emoji: MASK_EMOJIS.Mask43 })
		.set(1 << 1, {
			name: "Days of Love Seesaw Pack",
			cost: { candles: 66 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp02,
		}),
});
