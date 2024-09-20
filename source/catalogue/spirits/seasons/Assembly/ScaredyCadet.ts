import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Eww;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask50;
const hairEmoji = HAIR_EMOJIS.Hair82;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp07;

export default new SeasonalSpirit({
	name: SpiritName.ScaredyCadet,
	season: SeasonName.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteEww1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteEww2, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.ScaredyCadetMask,
				cost: { seasonalCandles: 5 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.ScaredyCadetBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteEww3,
				cost: { seasonalCandles: 10 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteEww4, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ScaredyCadetMusicSheet,
				cost: { seasonalCandles: 15 },
				emoji: musicSheet,
			},
			{ name: "Hair", cosmetic: Cosmetic.ScaredyCadetHair, emoji: hairEmoji },
			{
				name: "Hammock",
				cosmetic: Cosmetic.ScaredyCadetHammock,
				cost: { seasonalCandles: 20 },
				emoji: placeablePropEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ScaredyCadetBlessing2, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ScaredyCadetSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AssemblyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteEww1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteEww2, cost: { hearts: 4 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ScaredyCadetBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ScaredyCadetMask,
				cost: { candles: 24 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ScaredyCadetSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ScaredyCadetWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteEww3, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteEww4, cost: { hearts: 6 }, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ScaredyCadetMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ScaredyCadetBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ScaredyCadetHair,
				cost: { candles: 45 },
				emoji: hairEmoji,
			},
			{
				name: "Hammock",
				cosmetic: Cosmetic.ScaredyCadetHammock,
				cost: { candles: 55 },
				emoji: placeablePropEmoji,
			},
		],
	},
	keywords: ["hammock"],
	visits: {
		returning: [1],
	},
});
