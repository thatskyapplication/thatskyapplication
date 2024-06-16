import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMischief2021,
	start: skyDate(2_021, 10, 18),
	end: skyDate(2_021, 11, 7),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Hair", cost: { candles: 66 }, emoji: HAIR_EMOJIS.Hair95 })
		.set(1 << 1, { name: "Cape", cost: { candles: 99 }, emoji: CAPE_EMOJIS.Cape67 })
		.set(1 << 2, { name: "Prop", cost: { hearts: 33 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp19 })
		.set(1 << 3, { name: "Mischief Witch Jumper", cost: { money: 9.99 }, emoji: OUTFIT_EMOJIS.Outfit28 })
		.set(1 << 4, { name: "Mischief Spider Hair", cost: { money: 4.99 }, emoji: HAIR_EMOJIS.Hair96 })
		.set(1 << 5, {
			name: "Mischief Pumpkin Prop",
			cost: { money: 1.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp08,
		}),
});
