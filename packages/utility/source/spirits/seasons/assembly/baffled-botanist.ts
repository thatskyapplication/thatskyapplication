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
			{ cosmetic: Cosmetic.EmoteFacepalm1 },
			{ cosmetic: Cosmetic.EmoteFacepalm2 },
			{
				cosmetic: Cosmetic.BaffledBotanistBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.BaffledBotanistHair },
			{
				cosmetic: Cosmetic.EmoteFacepalm3,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.EmoteFacepalm4 },
			{
				cosmetic: Cosmetic.BaffledBotanistMask,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.BaffledBotanistBlessing2 },
			{
				cosmetic: Cosmetic.BaffledBotanistBlessing3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.BaffledBotanistProp },
			{
				cosmetic: Cosmetic.BaffledBotanistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteFacepalm1 },
			{
				cosmetic: Cosmetic.EmoteFacepalm2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.BaffledBotanistBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.BaffledBotanistMask,
				cost: { candles: 24 },
			},
			{
				cosmetic: Cosmetic.BaffledBotanistSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.BaffledBotanistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteFacepalm3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteFacepalm4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.BaffledBotanistHair,
				cost: { candles: 45 },
			},
			{
				cosmetic: Cosmetic.BaffledBotanistBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.BaffledBotanistProp,
				cost: { candles: 45 },
			},
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
