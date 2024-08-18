import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.DeepBreath;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask32;
const hairEmoji = HAIR_EMOJIS.Hair65;
const capeEmoji = CAPE_EMOJIS.Cape35;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp20;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfWater,
	season: SeasonName.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDeepBreath1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteDeepBreath2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfWaterBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.ProphetOfWaterHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDeepBreath3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteDeepBreath4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfWaterBlessing2,
				cost: { seasonalCandles: 21 },
				emoji: blessing2,
			},
			{ name: "Cape", cosmetic: Cosmetic.ProphetOfWaterCape, emoji: capeEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfWaterMask,
				cost: { seasonalCandles: 27 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.ProphetOfWaterBlessing3, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ProphetOfWaterSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.ProphecyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDeepBreath1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteDeepBreath2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{ name: "Prop", cost: { candles: 15 }, emoji: placeablePropEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfWaterBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfWaterHair,
				cost: { candles: 44 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProphetOfWaterSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDeepBreath3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteDeepBreath4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfWaterMask,
				cost: { candles: 54 },
				emoji: maskEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfWaterBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfWaterCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(41, skyDate(2_021, 8, 5))
			.set(74, skyDate(2_022, 11, 10)),
		returning: [2],
	},
});
