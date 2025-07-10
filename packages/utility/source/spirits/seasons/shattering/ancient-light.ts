import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default [
	new SeasonalSpirit({
		id: SpiritId.AncientLight1,
		seasonId: SeasonId.Shattering,
		offer: {
			seasonal: [
				{
					cosmetic: Cosmetic.AncientLightJellyfishHair,
					cost: { seasonalCandles: 35 },
				},
				{ cosmetic: Cosmetic.AncientLightJellyfishBlessing1 },
				{
					cosmetic: Cosmetic.AncientLightJellyfishBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{
					cosmetic: Cosmetic.AncientLightJellyfishHairAccessory,
				},
				{
					cosmetic: Cosmetic.AncientLightJellyfishCape,
					cost: { seasonalCandles: 42 },
				},
				{ cosmetic: Cosmetic.AncientLightJellyfishBlessing3 },
				{
					cosmetic: Cosmetic.AncientLightJellyfishSeasonalHeart,
					cost: { seasonalCandles: 3 },
				},
			],
			current: [
				{
					cosmetic: Cosmetic.AncientLightJellyfishBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientLightJellyfishHair,
					cost: { candles: 45 },
				},
				{
					cosmetic: Cosmetic.AncientLightJellyfishSeasonalHeart,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.AncientLightJellyfishBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientLightJellyfishWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					cosmetic: Cosmetic.AncientLightJellyfishBlessing3,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientLightJellyfishHairAccessory,
					cost: { candles: 50 },
				},
				{
					cosmetic: Cosmetic.AncientLightJellyfishCape,
					cost: { candles: 80 },
				},
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
				{
					cosmetic: Cosmetic.AncientLightMantaMusicSheet,
					cost: { seasonalCandles: 27 },
				},
				{ cosmetic: Cosmetic.AncientLightMantaBlessing1 },
				{
					cosmetic: Cosmetic.AncientLightMantaBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.AncientLightMantaHair },
				{
					cosmetic: Cosmetic.AncientLightMantaCape,
					cost: { seasonalCandles: 35 },
				},
				{ cosmetic: Cosmetic.AncientLightMantaBlessing3 },
				{
					cosmetic: Cosmetic.AncientLightMantaBlessing4,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.AncientLightMantaOutfit },
				{
					cosmetic: Cosmetic.AncientLightMantaSeasonalHeart,
					cost: { seasonalCandles: 3 },
				},
			],
			current: [
				{
					cosmetic: Cosmetic.AncientLightMantaBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientLightMantaMusicSheet,
					cost: { candles: 15 },
				},
				{
					cosmetic: Cosmetic.AncientLightMantaSeasonalHeart,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.AncientLightMantaBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientLightMantaHair,
					cost: { candles: 50 },
				},
				{
					cosmetic: Cosmetic.AncientLightMantaWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					cosmetic: Cosmetic.AncientLightMantaBlessing3,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.AncientLightMantaOutfit,
					cost: { candles: 75 },
				},
				{
					cosmetic: Cosmetic.AncientLightMantaCape,
					cost: { candles: 80 },
				},
			],
		},
		visits: {
			returning: [6],
		},
	}),
] as const;
