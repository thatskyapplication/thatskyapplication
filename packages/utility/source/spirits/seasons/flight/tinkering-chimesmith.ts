import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Tinker;

export default new SeasonalSpirit({
	id: SpiritId.TinkeringChimesmith,
	seasonId: SeasonId.Flight,
	stance,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.StanceTinker },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.TinkeringChimesmithBlessing1,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.TinkeringChimesmithOutfit },
			{
				cosmetic: Cosmetic.TinkeringChimesmithHairAccessory,
				cost: { seasonalCandles: 22 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.TinkeringChimesmithBlessing2,
			},
			{
				cosmetic: Cosmetic.TinkeringChimesmithTrailSpell1,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.TinkeringChimesmithKalimba },
			{
				cosmetic: Cosmetic.TinkeringChimesmithHair,
				cost: { seasonalCandles: 28 },
			},
			{
				cosmetic: Cosmetic.TinkeringChimesmithTrailSpell2,
			},
			{
				cosmetic: Cosmetic.TinkeringChimesmithSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.StanceTinker },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.TinkeringChimesmithBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.TinkeringChimesmithHair,
				cost: { candles: 45 },
			},
			{
				cosmetic: Cosmetic.TinkeringChimesmithSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.TinkeringChimesmithWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.TinkeringChimesmithBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.TinkeringChimesmithHairAccessory,
				cost: { candles: 35 },
			},
			{
				cosmetic: Cosmetic.TinkeringChimesmithOutfit,
				cost: { candles: 70 },
			},
			{
				cosmetic: Cosmetic.TinkeringChimesmithKalimba,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 5, 11), end: skyDate(2023, 5, 15) }],
	},
});
