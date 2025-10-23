import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default [
	new SeasonalSpirit({
		id: SpiritId.AncientLight1,
		seasonId: SeasonId.Shattering,
		offer: {
			seasonal: [
				[
					{
						cosmetic: Cosmetic.AncientLightJellyfishHair,
						cost: { seasonalCandles: 35 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.AncientLightJellyfishBlessing1,
						seasonPass: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.AncientLightJellyfishBlessing2,
						cost: { seasonalCandles: 16 },
					},
					{
						cosmetic: Cosmetic.AncientLightJellyfishHairAccessory,
						seasonPass: true,
					},
				],
				[
					{
						cosmetic: Cosmetic.AncientLightJellyfishCape,
						cost: { seasonalCandles: 42 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
						cosmetic: Cosmetic.AncientLightJellyfishBlessing3,
						seasonPass: true,
					},
				],
				[
					{
						cosmetic: Cosmetic.AncientLightJellyfishSeasonalHeart,
						cost: { seasonalCandles: 3 },
						seasonPass: true,
					},
				],
			],
			current: [
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.AncientLightJellyfishBlessing1,
						cost: { candles: 5 },
					},
					{
						cosmetic: Cosmetic.AncientLightJellyfishHair,
						cost: { candles: 45 },
					},
					{
						translation: CosmeticCommon.Heart,
						cosmetic: Cosmetic.AncientLightJellyfishSeasonalHeart,
						cost: { candles: 3 },
						regularHeart: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.AncientLightJellyfishBlessing2,
						cost: { candles: 5 },
					},
				],
				[
					{
						translation: CosmeticCommon.WingBuff,
						cosmetic: Cosmetic.AncientLightJellyfishWingBuff,
						cost: { ascendedCandles: 2 },
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
						cosmetic: Cosmetic.AncientLightJellyfishBlessing3,
						cost: { candles: 5 },
					},
					{
						cosmetic: Cosmetic.AncientLightJellyfishHairAccessory,
						cost: { candles: 50 },
					},
				],
				[
					{
						cosmetic: Cosmetic.AncientLightJellyfishCape,
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
		id: SpiritId.AncientLight2,
		seasonId: SeasonId.Shattering,
		offer: {
			seasonal: [
				[
					{
						translation: CosmeticCommon.MusicSheet,
						cosmetic: Cosmetic.AncientLightMantaMusicSheet,
						cost: { seasonalCandles: 27 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.AncientLightMantaBlessing1,
						seasonPass: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.AncientLightMantaBlessing2,
						cost: { seasonalCandles: 16 },
					},
					{ cosmetic: Cosmetic.AncientLightMantaHair, seasonPass: true },
				],
				[
					{
						cosmetic: Cosmetic.AncientLightMantaCape,
						cost: { seasonalCandles: 35 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
						cosmetic: Cosmetic.AncientLightMantaBlessing3,
						seasonPass: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
						cosmetic: Cosmetic.AncientLightMantaBlessing4,
						cost: { seasonalCandles: 16 },
					},
					{
						translation: CosmeticCommon.Outfit,
						cosmetic: Cosmetic.AncientLightMantaOutfit,
						seasonPass: true,
					},
				],
				[
					{
						cosmetic: Cosmetic.AncientLightMantaSeasonalHeart,
						cost: { seasonalCandles: 3 },
						seasonPass: true,
					},
				],
			],
			current: [
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.AncientLightMantaBlessing1,
						cost: { candles: 5 },
					},
					{
						translation: CosmeticCommon.MusicSheet,
						cosmetic: Cosmetic.AncientLightMantaMusicSheet,
						cost: { candles: 15 },
					},
					{
						translation: CosmeticCommon.Heart,
						cosmetic: Cosmetic.AncientLightMantaSeasonalHeart,
						cost: { candles: 3 },
						regularHeart: true,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.AncientLightMantaBlessing2,
						cost: { candles: 5 },
					},
					{
						cosmetic: Cosmetic.AncientLightMantaHair,
						cost: { candles: 50 },
					},
				],
				[
					{
						translation: CosmeticCommon.WingBuff,
						cosmetic: Cosmetic.AncientLightMantaWingBuff,
						cost: { ascendedCandles: 2 },
					},
				],
				[
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
						cosmetic: Cosmetic.AncientLightMantaBlessing3,
						cost: { candles: 5 },
					},
					{
						translation: CosmeticCommon.Outfit,
						cosmetic: Cosmetic.AncientLightMantaOutfit,
						cost: { candles: 75 },
					},
				],
				[
					{
						cosmetic: Cosmetic.AncientLightMantaCape,
						cost: { candles: 80 },
					},
				],
			],
		},
		visits: {
			returning: [6],
		},
	}),
] as const;
