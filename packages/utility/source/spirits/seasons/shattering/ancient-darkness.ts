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
				[
					{
						cosmetic: Cosmetic.AncientDarknessPlantHairAccessory,
						cost: { seasonalCandles: 27 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.AncientDarknessPlantBlessing1,
						seasonPass: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.AncientDarknessPlantBlessing2,
						cost: { seasonalCandles: 16 },
					},
					{
						translation: CosmeticCommon.Mask,
						cosmetic: Cosmetic.AncientDarknessPlantMask,
						seasonPass: true,
					},
				],
				[
					{
						translation: CosmeticCommon.MusicSheet,
						cosmetic: Cosmetic.AncientDarknessPlantMusicSheet,
						cost: { seasonalCandles: 35 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
						cosmetic: Cosmetic.AncientDarknessPlantBlessing3,
						seasonPass: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
						cosmetic: Cosmetic.AncientDarknessPlantBlessing4,
						cost: { seasonalCandles: 16 },
					},
					{ cosmetic: Cosmetic.AncientDarknessPlantCape, seasonPass: true },
				],
				[
					{
						cosmetic: Cosmetic.AncientDarknessPlantSeasonalHeart,
						cost: { seasonalCandles: 3 },
						seasonPass: true,
					},
				],
			],
			current: [
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.AncientDarknessPlantBlessing1,
						cost: { candles: 5 },
					},
					{
						translation: CosmeticCommon.MusicSheet,
						cosmetic: Cosmetic.AncientDarknessPlantMusicSheet,
						cost: { candles: 15 },
					},
					{
						translation: CosmeticCommon.Heart,
						cosmetic: Cosmetic.AncientDarknessPlantSeasonalHeart,
						cost: { candles: 3 },
						regularHeart: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.AncientDarknessPlantBlessing2,
						cost: { candles: 5 },
					},
					{
						cosmetic: Cosmetic.AncientDarknessPlantHairAccessory,
						cost: { candles: 45 },
					},
				],
				[
					{
						translation: CosmeticCommon.WingBuff,
						cosmetic: Cosmetic.AncientDarknessPlantWingBuff,
						cost: { ascendedCandles: 2 },
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
						cosmetic: Cosmetic.AncientDarknessPlantBlessing3,
						cost: { candles: 5 },
					},
					{
						translation: CosmeticCommon.Mask,
						cosmetic: Cosmetic.AncientDarknessPlantMask,
						cost: { candles: 50 },
					},
				],
				[
					{
						cosmetic: Cosmetic.AncientDarknessPlantCape,
						cost: { candles: 80 },
					},
				],
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
				[
					{
						cosmetic: Cosmetic.AncientDarknessDragonNeckAccessory,
						cost: { seasonalCandles: 35 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.AncientDarknessDragonBlessing1,
						seasonPass: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.AncientDarknessDragonBlessing2,
						cost: { seasonalCandles: 16 },
					},
					{ cosmetic: Cosmetic.AncientDarknessDragonDarkHorn, seasonPass: true },
				],
				[
					{
						cosmetic: Cosmetic.AncientDarknessDragonHair,
						cost: { seasonalCandles: 42 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
						cosmetic: Cosmetic.AncientDarknessDragonBlessing3,
						seasonPass: true,
					},
				],
				[
					{
						cosmetic: Cosmetic.AncientDarknessDragonSeasonalHeart,
						cost: { seasonalCandles: 3 },
						seasonPass: true,
					},
				],
			],
			current: [
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.AncientDarknessDragonBlessing1,
						cost: { candles: 5 },
					},
					{
						cosmetic: Cosmetic.AncientDarknessDragonNeckAccessory,
						cost: { candles: 70 },
					},
					{
						translation: CosmeticCommon.Heart,
						cosmetic: Cosmetic.AncientDarknessDragonSeasonalHeart,
						cost: { candles: 3 },
						regularHeart: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.AncientDarknessDragonBlessing2,
						cost: { candles: 5 },
					},
				],
				[
					{
						translation: CosmeticCommon.WingBuff,
						cosmetic: Cosmetic.AncientDarknessDragonWingBuff,
						cost: { ascendedCandles: 2 },
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
						cosmetic: Cosmetic.AncientDarknessDragonBlessing3,
						cost: { candles: 5 },
					},
					{
						cosmetic: Cosmetic.AncientDarknessDragonHair,
						cost: { candles: 70 },
					},
				],
				[
					{
						cosmetic: Cosmetic.AncientDarknessDragonDarkHorn,
						cost: { candles: 50 },
					},
				],
			],
		},
		visits: {
			returning: [6],
		},
	}),
] as const;
