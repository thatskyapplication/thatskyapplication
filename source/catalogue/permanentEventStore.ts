import { Collection } from "discord.js";
import { type ItemRaw, resolveOffer } from "../Utility/catalogue.js";
import { CAPE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer(
	new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Journey Pack", cost: { money: 24.99 }, emoji: CAPE_EMOJIS.Cape94 })
		.set(1 << 1, { name: "Moth Appreciation Pack", cost: { money: 9.99 }, emoji: CAPE_EMOJIS.Cape119 })
		.set(1 << 2, { name: "Sparrow Appreciation Pack", cost: { money: 9.99 }, emoji: CAPE_EMOJIS.Cape118 })
		.set(1 << 3, {
			name: "Course Creation Prop",
			cost: { candles: 150 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp33,
		})
		.set(1 << 4, {
			name: "Companion Cube",
			cost: { candles: 50 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp36,
		}),
);

export const PERMANENT_EVENT_STORE = { items, maximumItemsBit: items.reduce((bits, _, bit) => bit | bits, 0) };
