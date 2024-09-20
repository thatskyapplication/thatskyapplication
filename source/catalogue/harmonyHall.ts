import { Cosmetic, resolveAllCosmetics, resolveOffer } from "../Utility/catalogue.js";
import { HELD_PROPS_EMOJIS, MISCELLANEOUS_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer([
	{
		name: "Music sheet 1",
		cosmetic: Cosmetic.HarmonyHallMusicSheet1,
		cost: { candles: 10 },
		emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
	},
	{
		name: "Music sheet 2",
		cosmetic: Cosmetic.HarmonyHallMusicSheet2,
		cost: { candles: 10 },
		emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
	},
	{
		name: "Music sheet 3",
		cosmetic: Cosmetic.HarmonyHallMusicSheet3,
		cost: { candles: 10 },
		emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
	},
	{
		name: "Music sheet 4",
		cosmetic: Cosmetic.HarmonyHallMusicSheet4,
		cost: { candles: 10 },
		emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
	},
	{
		name: "Fledgling Harp",
		cosmetic: Cosmetic.FledglingHarp,
		cost: { money: 4.99 },
		emoji: HELD_PROPS_EMOJIS.HeldProp26,
	},
	{
		name: "Rhythm Guitar",
		cosmetic: Cosmetic.RhythmGuitar,
		cost: { money: 14.99 },
		emoji: HELD_PROPS_EMOJIS.HeldProp27,
	},
	{
		name: "Triumph Handpan",
		cosmetic: Cosmetic.TriumphHandpan,
		cost: { money: 19.99 },
		emoji: HELD_PROPS_EMOJIS.HeldProp28,
	},
	{
		name: "Music sheet 5",
		cosmetic: Cosmetic.DaysOfMusicMusicSheet,
		cost: { candles: 5 },
		emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
	},
	{
		name: "Triumph Violin",
		cosmetic: Cosmetic.TriumphViolin,
		cost: { money: 19.99 },
		emoji: HELD_PROPS_EMOJIS.HeldProp35,
	},
]);

export const HARMONY_HALL = { items, allCosmetics: resolveAllCosmetics(items) } as const;
