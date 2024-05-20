import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMischief2022,
	start: skyDate(2_022, 10, 24),
	end: skyDate(2_022, 11, 13),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Mischief Tufted Hair", cost: { candles: 44 }, emoji: HAIR_EMOJIS.Hair117 })
			.set(1 << 1, {
				name: "Feline Familiar Prop",
				cost: { money: 9.99 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp19,
			})
			.set(1 << 2, { name: "Cat Costume Pack", cost: { money: 19.99 }, emoji: CAPE_EMOJIS.Cape93 }),
	},
});
