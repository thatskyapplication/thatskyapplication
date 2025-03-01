import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.DustOff;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask33;
const hairEmoji = HAIR_EMOJIS.Hair66;
const capeEmoji = CAPE_EMOJIS.Cape36;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp13;

export default new SeasonalSpirit({
	id: SpiritId.ProphetOfEarth,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDustOff1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteDustOff2, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfEarthHair,
				cost: { seasonalCandles: 12 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.ProphetOfEarthBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDustOff3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteDustOff4, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProphetOfEarthMusicSheet,
				cost: { seasonalCandles: 21 },
				emoji: musicSheet,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ProphetOfEarthBlessing2, emoji: blessing2 },
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfEarthCape,
				cost: { seasonalCandles: 27 },
				emoji: capeEmoji,
			},
			{ name: "Mask", cosmetic: Cosmetic.ProphetOfEarthMask, emoji: maskEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ProphetOfEarthSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.ProphecyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDustOff1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteDustOff2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ProphetOfEarthProp,
				cost: { candles: 15 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfEarthBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfEarthHair,
				cost: { candles: 44 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProphetOfEarthSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ProphetOfEarthWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDustOff3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteDustOff4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProphetOfEarthMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfEarthBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfEarthCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfEarthMask,
				cost: { candles: 44 },
				emoji: maskEmoji,
			},
		],
	},
	visits: {
		travelling: [54, 121],
		travellingErrors: [3],
		returning: [2],
	},
});
