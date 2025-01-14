import { RealmName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Balance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask34;
const hairEmoji = HAIR_EMOJIS.Hair67;
const capeEmoji = CAPE_EMOJIS.Cape34;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp15;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfAir,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBalance1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBalance2, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfAirHair,
				cost: { seasonalCandles: 13 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.ProphetOfAirBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBalance3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBalance4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfAirBlessing2,
				cost: { seasonalCandles: 23 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.ProphetOfAirMask, emoji: maskEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfAirCape,
				cost: { seasonalCandles: 29 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.ProphetOfAirBlessing3, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ProphetOfAirSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.ProphecyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBalance1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBalance2,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ProphetOfAirProp,
				cost: { candles: 15 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfAirBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfAirHair,
				cost: { candles: 44 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProphetOfAirSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ProphetOfAirWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBalance3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBalance4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfAirMask,
				cost: { candles: 54 },
				emoji: maskEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfAirBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfAirCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [61],
		returning: [2],
	},
});
