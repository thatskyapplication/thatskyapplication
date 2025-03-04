import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.DeepBreath;

export default new SeasonalSpirit({
	id: SpiritId.ProphetOfWater,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDeepBreath1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteDeepBreath2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfWaterBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Hair", cosmetic: Cosmetic.ProphetOfWaterHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDeepBreath3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteDeepBreath4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfWaterBlessing2,
				cost: { seasonalCandles: 21 },
			},
			{ name: "Cape", cosmetic: Cosmetic.ProphetOfWaterCape },
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfWaterMask,
				cost: { seasonalCandles: 27 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.ProphetOfWaterBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ProphetOfWaterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDeepBreath1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteDeepBreath2,
				cost: { hearts: 4 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ProphetOfWaterProp,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfWaterBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfWaterHair,
				cost: { candles: 44 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProphetOfWaterSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ProphetOfWaterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDeepBreath3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteDeepBreath4,
				cost: { hearts: 6 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfWaterMask,
				cost: { candles: 54 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfWaterBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfWaterCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [41, 74, 130],
		returning: [2],
	},
});
