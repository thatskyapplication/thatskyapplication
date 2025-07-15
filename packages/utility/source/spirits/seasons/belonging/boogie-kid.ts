import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.BoogieDance;

export default new SeasonalSpirit({
	id: SpiritId.BoogieKid,
	seasonId: SeasonId.Belonging,
	emote,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteBoogieDance1 },
			{ cosmetic: Cosmetic.EmoteBoogieDance2 },
			{
				cosmetic: Cosmetic.BoogieKidBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.BoogieKidBlessing2 },
			{
				cosmetic: Cosmetic.EmoteBoogieDance3,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.EmoteBoogieDance4 },
			{
				cosmetic: Cosmetic.BoogieKidMask,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.BoogieKidOutfit },
			{
				cosmetic: Cosmetic.BoogieKidSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteBoogieDance1 },
			{
				cosmetic: Cosmetic.EmoteBoogieDance2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.BoogieKidBlessing1,
				cost: { candles: 5 },
			},
			{ cosmetic: Cosmetic.BoogieKidMask, cost: { candles: 30 } },
			{
				cosmetic: Cosmetic.BoogieKidSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.BoogieKidWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteBoogieDance3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteBoogieDance4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.BoogieKidBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.BoogieKidOutfit,
				cost: { candles: 60 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 11, 12), end: skyDate(2020, 11, 16) },
			{ start: skyDate(2021, 7, 22), end: skyDate(2021, 7, 26) },
			{ start: skyDate(2023, 3, 2), end: skyDate(2023, 3, 6) },
			{ start: skyDate(2025, 6, 19), end: skyDate(2025, 6, 23) },
		],
	},
});
