import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2020,
	start: skyDate(2_020, 2, 12, 12),
	end: skyDate(2_020, 2, 19, 12),
	offer: new Collection<number, ItemRaw>().set(1 << 0, {
		name: "Days of Love Pack",
		cost: { money: 19.99 },
		emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp01,
	}),
});
