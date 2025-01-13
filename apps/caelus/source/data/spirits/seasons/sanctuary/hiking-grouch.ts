import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Grumpy;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask31;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace07;
const hairEmoji = HAIR_EMOJIS.Hair63;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp13;

export default new SeasonalSpirit({
	name: SpiritName.HikingGrouch,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrumpy1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGrumpy2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HikingGrouchBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.HikingGrouchMask, emoji: maskEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrumpy3,
				cost: { seasonalCandles: 14 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGrumpy4, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.HikingGrouchHair,
				cost: { seasonalCandles: 16 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.HikingGrouchBlessing2, emoji: blessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.HikingGrouchBlessing3,
				cost: { seasonalCandles: 18 },
				emoji: blessing2,
			},
			{ name: "Bow tie", cosmetic: Cosmetic.HikingGrouchBowTie, emoji: necklaceEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.HikingGrouchSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.SanctuaryHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrumpy1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteGrumpy2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Double Deck Chairs",
				cosmetic: Cosmetic.DoubleDeckChairs,
				cost: { hearts: 16 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HikingGrouchBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.HikingGrouchMask,
				cost: { candles: 34 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.HikingGrouchSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.HikingGrouchWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrumpy3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteGrumpy4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.HikingGrouchHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HikingGrouchBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Bow tie",
				cosmetic: Cosmetic.HikingGrouchBowTie,
				cost: { candles: 50 },
				emoji: necklaceEmoji,
			},
		],
	},
	visits: {
		travelling: [55],
		returning: [4],
	},
});
