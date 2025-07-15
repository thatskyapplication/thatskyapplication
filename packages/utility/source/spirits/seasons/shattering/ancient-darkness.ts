import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default [
	new SeasonalSpirit({
		id: SpiritId.AncientDarkness1,
		seasonId: SeasonId.Shattering,
		offer: {
			seasonal: [
				{
					cosmetic: Cosmetic.AncientDarknessPlantHairAccessory,
					cost: { seasonalCandles: 27 },
				},
				{ cosmetic: Cosmetic.AncientDarknessPlantBlessing1 },
				{
					cosmetic: Cosmetic.AncientDarknessPlantBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.AncientDarknessPlantMask },
				{
					cosmetic: Cosmetic.AncientDarknessPlantMusicSheet,
					cost: { seasonalCandles: 35 },
				},
				{ cosmetic: Cosmetic.AncientDarknessPlantBlessing3 },
				{
					cosmetic: Cosmetic.AncientDarknessPlantBlessing4,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.AncientDarknessPlantCape },
				{
					cosmetic: Cosmetic.AncientDarknessPlantSeasonalHeart,
					cost: { seasonalCandles: 3 },
				},
			],
			current: [
				{
					cosmetic: Cosmetic.AncientDarknessPlantBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessPlantMusicSheet,
					cost: { candles: 15 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessPlantSeasonalHeart,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessPlantBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessPlantHairAccessory,
					cost: { candles: 45 },
				},
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.AncientDarknessPlantWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessPlantBlessing3,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessPlantMask,
					cost: { candles: 50 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessPlantCape,
					cost: { candles: 80 },
				},
			],
		},
		visits: {
			returning: [6],
		},
	}),
	new SeasonalSpirit({
		id: SpiritId.AncientDarkness2,
		seasonId: SeasonId.Shattering,
		offer: {
			seasonal: [
				{
					cosmetic: Cosmetic.AncientDarknessDragonNeckAccessory,
					cost: { seasonalCandles: 35 },
				},
				{ cosmetic: Cosmetic.AncientDarknessDragonBlessing1 },
				{
					cosmetic: Cosmetic.AncientDarknessDragonBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.AncientDarknessDragonDarkHorn },
				{
					cosmetic: Cosmetic.AncientDarknessDragonHair,
					cost: { seasonalCandles: 42 },
				},
				{ cosmetic: Cosmetic.AncientDarknessDragonBlessing3 },
				{
					cosmetic: Cosmetic.AncientDarknessDragonSeasonalHeart,
					cost: { seasonalCandles: 3 },
				},
			],
			current: [
				{
					cosmetic: Cosmetic.AncientDarknessDragonBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessDragonNeckAccessory,
					cost: { candles: 70 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessDragonSeasonalHeart,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessDragonBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.AncientDarknessDragonWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessDragonBlessing3,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessDragonHair,
					cost: { candles: 70 },
				},
				{
					cosmetic: Cosmetic.AncientDarknessDragonDarkHorn,
					cost: { candles: 50 },
				},
			],
		},
		visits: {
			returning: [6],
		},
	}),
] as const;
