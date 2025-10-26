import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Boo;

export default new SeasonalSpirit({
	id: SpiritId.ScarecrowFarmer,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteBoo1 },
				{ cosmetic: Cosmetic.EmoteBoo2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ScarecrowFarmerBlessing1,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ScarecrowFarmerMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBoo3,
					cost: { seasonalCandles: 10 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBoo4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ScarecrowFarmerHair,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ScarecrowFarmerBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ScarecrowFarmerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBoo1 },
				{ cosmetic: Cosmetic.EmoteBoo2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ScarecrowFarmerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ScarecrowFarmerMask,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ScarecrowFarmerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ScarecrowFarmerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteBoo3, cost: { hearts: 3 }, level: 3 },
				{
					cosmetic: Cosmetic.EmoteBoo4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ScarecrowFarmerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ScarecrowFarmerHair,
					cost: { candles: 34 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2022, 3, 31), end: skyDate(2022, 4, 4) },
			{ start: skyDate(2024, 7, 18), end: skyDate(2024, 7, 22) },
		],
	},
});
