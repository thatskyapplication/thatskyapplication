import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Nod;

export default new SeasonalSpirit({
	id: SpiritId.NoddingMuralist,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteNod1 },
				{ cosmetic: Cosmetic.EmoteNod2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.NoddingMuralistMask,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.NoddingMuralistBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteNod3,
					cost: { seasonalCandles: 8 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteNod4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.NoddingMuralistBlessing2,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.NoddingMuralistHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.NoddingMuralistSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteNod1 },
				{ cosmetic: Cosmetic.EmoteNod2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.NoddingMuralistBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.NoddingMuralistMask,
					cost: { candles: 30 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.NoddingMuralistSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.NoddingMuralistWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteNod3, cost: { hearts: 3 }, level: 3 },
				{
					cosmetic: Cosmetic.EmoteNod4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.NoddingMuralistBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.NoddingMuralistHair,
					cost: { candles: 34 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 1, 7), end: skyDate(2021, 1, 11) },
			{ start: skyDate(2022, 10, 27), end: skyDate(2022, 10, 31) },
		],
		returning: [5],
	},
});
