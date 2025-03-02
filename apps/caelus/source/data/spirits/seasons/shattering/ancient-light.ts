import { Cosmetic, SeasonId, SeasonalSpirit, SpiritId } from "@thatskyapplication/utility";

export default [
	new SeasonalSpirit({
		id: SpiritId.AncientLight1,
		seasonId: SeasonId.Shattering,
		offer: {
			seasonal: [
				{
					name: "Hair",
					cosmetic: Cosmetic.AncientLightJellyfishHair,
					cost: { seasonalCandles: 35 },
				},
				{ name: "Blessing 1", cosmetic: Cosmetic.AncientLightJellyfishBlessing1 },
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientLightJellyfishBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{
					name: "Hair accessory",
					cosmetic: Cosmetic.AncientLightJellyfishHairAccessory,
				},
				{
					name: "Cape",
					cosmetic: Cosmetic.AncientLightJellyfishCape,
					cost: { seasonalCandles: 42 },
				},
				{ name: "Blessing 3", cosmetic: Cosmetic.AncientLightJellyfishBlessing3 },
				{
					name: "Seasonal heart",
					cosmetic: Cosmetic.AncientLightJellyfishSeasonalHeart,
					cost: { seasonalCandles: 3 },
				},
			],
			current: [
				{
					name: "Blessing 1",
					cosmetic: Cosmetic.AncientLightJellyfishBlessing1,
					cost: { candles: 5 },
				},
				{
					name: "Hair",
					cosmetic: Cosmetic.AncientLightJellyfishHair,
					cost: { candles: 45 },
				},
				{
					name: "Heart",
					cosmetic: Cosmetic.AncientLightJellyfishSeasonalHeart,
					cost: { candles: 3 },
				},
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientLightJellyfishBlessing2,
					cost: { candles: 5 },
				},
				{
					name: "Wing buff",
					cosmetic: Cosmetic.AncientLightJellyfishWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					name: "Blessing 3",
					cosmetic: Cosmetic.AncientLightJellyfishBlessing3,
					cost: { candles: 5 },
				},
				{
					name: "Hair accessory",
					cosmetic: Cosmetic.AncientLightJellyfishHairAccessory,
					cost: { candles: 50 },
				},
				{
					name: "Cape",
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
					name: "Music sheet",
					cosmetic: Cosmetic.AncientLightMantaMusicSheet,
					cost: { seasonalCandles: 27 },
				},
				{ name: "Blessing 1", cosmetic: Cosmetic.AncientLightMantaBlessing1 },
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientLightMantaBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{ name: "Hair", cosmetic: Cosmetic.AncientLightMantaHair },
				{
					name: "Cape",
					cosmetic: Cosmetic.AncientLightMantaCape,
					cost: { seasonalCandles: 35 },
				},
				{ name: "Blessing 3", cosmetic: Cosmetic.AncientLightMantaBlessing3 },
				{
					name: "Blessing 4",
					cosmetic: Cosmetic.AncientLightMantaBlessing4,
					cost: { seasonalCandles: 16 },
				},
				{ name: "Outfit", cosmetic: Cosmetic.AncientLightMantaOutfit },
				{
					name: "Seasonal heart",
					cosmetic: Cosmetic.AncientLightMantaSeasonalHeart,
					cost: { seasonalCandles: 3 },
				},
			],
			current: [
				{
					name: "Blessing 1",
					cosmetic: Cosmetic.AncientLightMantaBlessing1,
					cost: { candles: 5 },
				},
				{
					name: "Music sheet",
					cosmetic: Cosmetic.AncientLightMantaMusicSheet,
					cost: { candles: 15 },
				},
				{
					name: "Heart",
					cosmetic: Cosmetic.AncientLightMantaSeasonalHeart,
					cost: { candles: 3 },
				},
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientLightMantaBlessing2,
					cost: { candles: 5 },
				},
				{
					name: "Hair",
					cosmetic: Cosmetic.AncientLightMantaHair,
					cost: { candles: 50 },
				},
				{
					name: "Wing buff",
					cosmetic: Cosmetic.AncientLightMantaWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					name: "Blessing 3",
					cosmetic: Cosmetic.AncientLightMantaBlessing3,
					cost: { candles: 5 },
				},
				{
					name: "Outfit",
					cosmetic: Cosmetic.AncientLightMantaOutfit,
					cost: { candles: 75 },
				},
				{
					name: "Cape",
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
