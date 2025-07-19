import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.Crab;

export default new SeasonalSpirit({
	id: SpiritId.CrabWhisperer,
	seasonId: SeasonId.Lightseekers,
	call,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.CallCrab },
			{
				cosmetic: Cosmetic.CrabWhispererMask,
				cost: { seasonalCandles: 12 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.CrabWhispererBlessing1,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.CrabWhispererBlessing2,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.CrabWhispererMusicSheet },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.CrabWhispererBlessing3,
				cost: { seasonalCandles: 16 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
				cosmetic: Cosmetic.CrabWhispererBlessing4,
			},
			{
				cosmetic: Cosmetic.CrabWhispererHair,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.CrabWhispererCape },
		],
		current: [
			{ cosmetic: Cosmetic.CallCrab },
			{
				cosmetic: Cosmetic.CrabWhispererPipe,
				cost: { candles: 20 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.CrabWhispererBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.CrabWhispererMask,
				cost: { candles: 30 },
			},
			{
				translation: CosmeticCommon.Heart,
				cosmetic: Cosmetic.CrabWhispererHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.CrabWhispererWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.CrabWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				translation: CosmeticCommon.MusicSheet,
				cosmetic: Cosmetic.CrabWhispererMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.CrabWhispererHair,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.CrabWhispererCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 4, 9), end: skyDate(2020, 4, 13) },
			{ start: skyDate(2021, 9, 1), end: skyDate(2021, 9, 5) },
		],
		returning: [4],
	},
});
