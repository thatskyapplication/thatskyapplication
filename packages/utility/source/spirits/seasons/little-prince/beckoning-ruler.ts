import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Beckon;

export default new SeasonalSpirit({
	id: SpiritId.BeckoningRuler,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteBeckon1 },
				{ cosmetic: Cosmetic.EmoteBeckon2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BeckoningRulerBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.BeckoningRulerHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBeckon3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBeckon4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.BeckoningRulerFrogMask,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BeckoningRulerBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.BeckoningRulerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBeckon1 },
				{
					cosmetic: Cosmetic.EmoteBeckon2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.BeckoningRulerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BeckoningRulerBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.BeckoningRulerFrogMask,
					cost: { candles: 42 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BeckoningRulerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBeckon3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteBeckon4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BeckoningRulerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.BeckoningRulerHair,
					cost: { candles: 48 },
				},
			],
		],
	},
	keywords: ["frog", "frog mask"],
	visits: {
		travelling: [
			{ start: skyDate(2022, 9, 29), end: skyDate(2022, 10, 3) },
			{ start: skyDate(2024, 7, 4), end: skyDate(2024, 7, 8) },
		],
		returning: [8],
	},
});
