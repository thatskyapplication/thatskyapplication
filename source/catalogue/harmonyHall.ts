import { Collection } from "discord.js";
import { type ItemRaw, resolveOffer } from "../Utility/catalogue.js";
import { HELD_PROPS_EMOJIS, MISCELLANEOUS_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer(
	new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Music sheet 1", cost: { candles: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
		.set(1 << 1, { name: "Music sheet 2", cost: { candles: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
		.set(1 << 2, { name: "Music sheet 3", cost: { candles: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
		.set(1 << 3, { name: "Music sheet 4", cost: { candles: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
		.set(1 << 4, { name: "Fledgling Harp", cost: { money: 4.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp26 })
		.set(1 << 5, { name: "Rhythm Guitar", cost: { money: 14.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp27 })
		.set(1 << 6, { name: "Triumph Handpan", cost: { money: 19.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp28 })
		.set(1 << 7, { name: "Music sheet 5", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
		.set(1 << 8, { name: "Triumph Violin", cost: { money: 19.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp35 }),
);

export const HARMONY_HALL = { items, maximumItemsBit: items.reduce((bits, { bit }) => bit | bits, 0) } as const;
