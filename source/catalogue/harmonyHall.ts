import { resolveOffer } from "../Utility/catalogue.js";
import { HELD_PROPS_EMOJIS, MISCELLANEOUS_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer([
	{ name: "Music sheet 1", bit: 1 << 0, cost: { candles: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet },
	{ name: "Music sheet 2", bit: 1 << 1, cost: { candles: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet },
	{ name: "Music sheet 3", bit: 1 << 2, cost: { candles: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet },
	{ name: "Music sheet 4", bit: 1 << 3, cost: { candles: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet },
	{ name: "Fledgling Harp", bit: 1 << 4, cost: { money: 4.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp26 },
	{ name: "Rhythm Guitar", bit: 1 << 5, cost: { money: 14.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp27 },
	{ name: "Triumph Handpan", bit: 1 << 6, cost: { money: 19.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp28 },
	{ name: "Music sheet 5", bit: 1 << 7, cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet },
	{ name: "Triumph Violin", bit: 1 << 8, cost: { money: 19.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp35 },
]);

export const HARMONY_HALL = { items, maximumItemsBit: items.reduce((bits, { bit }) => bit | bits, 0) } as const;
