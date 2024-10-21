import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility2/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility2/spirits.js";

const emote = SpiritEmote.Marching;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask45;
const hairEmoji = HAIR_EMOJIS.Hair79;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp08;

export default new SeasonalSpirit({
	name: SpiritName.MarchingAdventurer,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteMarching1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteMarching2, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.MarchingAdventurerHair,
				cost: { seasonalCandles: 12 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.MarchingAdventurerBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteMarching3,
				cost: { seasonalCandles: 14 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteMarching4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MarchingAdventurerBlessing2,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.MarchingAdventurerMask, emoji: maskEmoji },
			{
				name: "Tiki torch",
				cosmetic: Cosmetic.MarchingAdventurerTikiTorch,
				cost: { seasonalCandles: 22 },
				emoji: placeablePropEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.MarchingAdventurerBlessing3, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MarchingAdventurerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AssemblyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteMarching1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteMarching2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MarchingAdventurerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.MarchingAdventurerMask,
				cost: { candles: 30 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MarchingAdventurerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MarchingAdventurerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteMarching3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteMarching4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.MarchingAdventurerHair,
				cost: { candles: 45 },
				emoji: hairEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MarchingAdventurerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Tiki torch",
				cosmetic: Cosmetic.MarchingAdventurerTikiTorch,
				cost: { candles: 55 },
				emoji: placeablePropEmoji,
			},
		],
	},
	visits: {
		returning: [1],
	},
});
