import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.BabyManta;

export default new SeasonalSpirit({
	id: SpiritId.LightWhisperer,
	seasonId: SeasonId.Flight,
	call,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.CallBabyManta },
			{
				cosmetic: Cosmetic.LightWhispererBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{
				cosmetic: Cosmetic.LightWhispererHairAccessory,
			},
			{
				cosmetic: Cosmetic.LightWhispererHair,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.LightWhispererBlessing2 },
			{
				cosmetic: Cosmetic.LightWhispererTrailSpell1,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.LightWhispererCape },
			{
				cosmetic: Cosmetic.LightWhispererOutfit,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.LightWhispererTrailSpell2 },
			{
				cosmetic: Cosmetic.LightWhispererSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.CallBabyManta },
			{
				cosmetic: Cosmetic.LightWhispererBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LightWhispererHairAccessory,
				cost: { candles: 45 },
			},
			{
				cosmetic: Cosmetic.LightWhispererSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.LightWhispererWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.LightWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LightWhispererHair,
				cost: { candles: 50 },
			},
			{
				cosmetic: Cosmetic.LightWhispererOutfit,
				cost: { candles: 65 },
			},
			{
				cosmetic: Cosmetic.LightWhispererCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 2, 29), end: skyDate(2024, 3, 4) }],
	},
});
