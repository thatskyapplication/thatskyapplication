import { Cosmetic } from "../../../cosmetics.js";
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
					name: "Hair accessory",
					cosmetic: Cosmetic.AncientDarknessPlantHairAccessory,
					cost: { seasonalCandles: 27 },
				},
				{ name: "Blessing 1", cosmetic: Cosmetic.AncientDarknessPlantBlessing1 },
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientDarknessPlantBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{ name: "Mask", cosmetic: Cosmetic.AncientDarknessPlantMask },
				{
					name: "Music sheet",
					cosmetic: Cosmetic.AncientDarknessPlantMusicSheet,
					cost: { seasonalCandles: 35 },
				},
				{ name: "Blessing 3", cosmetic: Cosmetic.AncientDarknessPlantBlessing3 },
				{
					name: "Blessing 4",
					cosmetic: Cosmetic.AncientDarknessPlantBlessing4,
					cost: { seasonalCandles: 16 },
				},
				{ name: "Cape", cosmetic: Cosmetic.AncientDarknessPlantCape },
				{
					name: "Seasonal heart",
					cosmetic: Cosmetic.AncientDarknessPlantSeasonalHeart,
					cost: { seasonalCandles: 3 },
				},
			],
			current: [
				{
					name: "Blessing 1",
					cosmetic: Cosmetic.AncientDarknessPlantBlessing1,
					cost: { candles: 5 },
				},
				{
					name: "Music sheet",
					cosmetic: Cosmetic.AncientDarknessPlantMusicSheet,
					cost: { candles: 15 },
				},
				{
					name: "Heart",
					cosmetic: Cosmetic.AncientDarknessPlantSeasonalHeart,
					cost: { candles: 3 },
				},
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientDarknessPlantBlessing2,
					cost: { candles: 5 },
				},
				{
					name: "Hair accessory",
					cosmetic: Cosmetic.AncientDarknessPlantHairAccessory,
					cost: { candles: 45 },
				},
				{
					name: "Wing buff",
					cosmetic: Cosmetic.AncientDarknessPlantWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					name: "Blessing 3",
					cosmetic: Cosmetic.AncientDarknessPlantBlessing3,
					cost: { candles: 5 },
				},
				{
					name: "Mask",
					cosmetic: Cosmetic.AncientDarknessPlantMask,
					cost: { candles: 50 },
				},
				{
					name: "Cape",
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
					name: "Neck accessory",
					cosmetic: Cosmetic.AncientDarknessDragonNeckAccessory,
					cost: { seasonalCandles: 35 },
				},
				{ name: "Blessing 1", cosmetic: Cosmetic.AncientDarknessDragonBlessing1 },
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientDarknessDragonBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{ name: "Dark horn", cosmetic: Cosmetic.AncientDarknessDragonDarkHorn },
				{
					name: "Hair",
					cosmetic: Cosmetic.AncientDarknessDragonHair,
					cost: { seasonalCandles: 42 },
				},
				{ name: "Blessing 3", cosmetic: Cosmetic.AncientDarknessDragonBlessing3 },
				{
					name: "Seasonal heart",
					cosmetic: Cosmetic.AncientDarknessDragonSeasonalHeart,
					cost: { seasonalCandles: 3 },
				},
			],
			current: [
				{
					name: "Blessing 1",
					cosmetic: Cosmetic.AncientDarknessDragonBlessing1,
					cost: { candles: 5 },
				},
				{
					name: "Neck accessory",
					cosmetic: Cosmetic.AncientDarknessDragonNeckAccessory,
					cost: { candles: 70 },
				},
				{
					name: "Heart",
					cosmetic: Cosmetic.AncientDarknessDragonSeasonalHeart,
					cost: { candles: 3 },
				},
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientDarknessDragonBlessing2,
					cost: { candles: 5 },
				},
				{
					name: "Wing buff",
					cosmetic: Cosmetic.AncientDarknessDragonWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					name: "Blessing 3",
					cosmetic: Cosmetic.AncientDarknessDragonBlessing3,
					cost: { candles: 5 },
				},
				{
					name: "Hair",
					cosmetic: Cosmetic.AncientDarknessDragonHair,
					cost: { candles: 70 },
				},
				{
					name: "Dark horn",
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
