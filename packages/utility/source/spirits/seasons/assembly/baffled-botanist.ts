import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Facepalm;

export default new SeasonalSpirit({
	id: SpiritId.BaffledBotanist,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteFacepalm1 },
				{ cosmetic: Cosmetic.EmoteFacepalm2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BaffledBotanistBlessing1,
					cost: { seasonalCandles: 10 },
				},
				{ cosmetic: Cosmetic.BaffledBotanistHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteFacepalm3,
					cost: { seasonalCandles: 12 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteFacepalm4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.BaffledBotanistMask,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BaffledBotanistBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.BaffledBotanistBlessing3,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.BaffledBotanistProp, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.BaffledBotanistSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteFacepalm1 },
				{
					cosmetic: Cosmetic.EmoteFacepalm2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BaffledBotanistBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.BaffledBotanistMask,
					cost: { candles: 24 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.BaffledBotanistSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BaffledBotanistWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteFacepalm3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteFacepalm4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					cosmetic: Cosmetic.BaffledBotanistHair,
					cost: { candles: 45 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BaffledBotanistBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.BaffledBotanistProp,
					cost: { candles: 45 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2023, 1, 5), end: skyDate(2023, 1, 9) },
			{ start: skyDate(2024, 9, 26), end: skyDate(2024, 9, 30) },
		],
		returning: [1],
	},
});
