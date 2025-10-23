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
			[
				{ cosmetic: Cosmetic.EmoteBoogieDance1 },
				{ cosmetic: Cosmetic.EmoteBoogieDance2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BoogieKidBlessing1,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BoogieKidBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBoogieDance3,
					cost: { seasonalCandles: 10 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBoogieDance4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.BoogieKidMask,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.BoogieKidOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.BoogieKidSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBoogieDance1 },
				{
					cosmetic: Cosmetic.EmoteBoogieDance2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BoogieKidBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.BoogieKidMask,
					cost: { candles: 30 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.BoogieKidSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BoogieKidWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBoogieDance3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteBoogieDance4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BoogieKidBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.BoogieKidOutfit,
					cost: { candles: 60 },
				},
			],
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
