import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Wise;

export default new SeasonalSpirit({
	id: SpiritId.WiseGrandparent,
	seasonId: SeasonId.Belonging,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.StanceWise },
			{
				cosmetic: Cosmetic.WiseGrandparentBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.WiseGrandparentMusicSheet },
			{
				cosmetic: Cosmetic.WiseGrandparentBlessing2,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.WiseGrandparentBlessing3 },
			{
				cosmetic: Cosmetic.WiseGrandparentMask,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.WiseGrandparentBlessing4 },
			{
				cosmetic: Cosmetic.WiseGrandparentBlessing5,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.WiseGrandparentCape },
			{
				cosmetic: Cosmetic.WiseGrandparentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.StanceWise },
			{
				cosmetic: Cosmetic.WiseGrandparentMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.WiseGrandparentSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.WiseGrandparentBlessing1,
				cost: { candles: 5 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.WiseGrandparentWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.WiseGrandparentBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.WiseGrandparentCape,
				cost: { candles: 70 },
			},
			{
				cosmetic: Cosmetic.WiseGrandparentProp,
				cost: { candles: 10 },
			},
			{
				cosmetic: Cosmetic.WiseGrandparentMask,
				cost: { candles: 48 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 8, 6), end: skyDate(2020, 8, 10) },
			{ start: skyDate(2021, 11, 11), end: skyDate(2021, 11, 15) },
			{ start: skyDate(2023, 11, 9), end: skyDate(2023, 11, 13) },
		],
	},
});
