import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask65;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace22;
const hairEmoji = HAIR_EMOJIS.Hair108;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory22;
const capeEmoji = CAPE_EMOJIS.Cape83;
const heldProp = HELD_PROPS_EMOJIS.HeldProp29;

export default [
	new SeasonalSpirit({
		name: SpiritName.AncientDarkness1,
		season: SeasonName.Shattering,
		offer: {
			seasonal: [
				{
					name: "Hair accessory",
					cosmetic: Cosmetic.AncientDarknessPlantHairAccessory,
					cost: { seasonalCandles: 27 },
					emoji: hairAccessoryEmoji,
				},
				{ name: "Blessing 1", cosmetic: Cosmetic.AncientDarknessPlantBlessing1, emoji: blessing3 },
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientDarknessPlantBlessing2,
					cost: { seasonalCandles: 16 },
					emoji: blessing3,
				},
				{ name: "Mask", cosmetic: Cosmetic.AncientDarknessPlantMask, emoji: maskEmoji },
				{
					name: "Music sheet",
					cosmetic: Cosmetic.AncientDarknessPlantMusicSheet,
					cost: { seasonalCandles: 35 },
					emoji: musicSheet,
				},
				{ name: "Blessing 3", cosmetic: Cosmetic.AncientDarknessPlantBlessing3, emoji: blessing3 },
				{
					name: "Blessing 4",
					cosmetic: Cosmetic.AncientDarknessPlantBlessing4,
					cost: { seasonalCandles: 16 },
					emoji: blessing3,
				},
				{ name: "Cape", cosmetic: Cosmetic.AncientDarknessPlantCape, emoji: capeEmoji },
				{
					name: "Seasonal heart",
					cosmetic: Cosmetic.AncientDarknessPlantSeasonalHeart,
					cost: { seasonalCandles: 3 },
					emoji: SEASON_EMOJIS.ShatteringHeart,
				},
			],
			current: [
				{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing3 },
				{ name: "Music sheet", bit: 1 << 4, cost: { candles: 15 }, emoji: musicSheet },
				{
					name: "Heart",
					bit: 1 << 8,
					cost: { candles: 3 },
					emoji: MISCELLANEOUS_EMOJIS.Heart,
				},
				{ name: "Blessing 2", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing3 },
				{
					name: "Hair accessory",
					bit: 1 << 0,
					cost: { candles: 45 },
					emoji: hairAccessoryEmoji,
				},
				{
					name: "Wing buff",
					bit: 1 << 9,
					cost: { ascendedCandles: 2 },
					emoji: MISCELLANEOUS_EMOJIS.WingBuff,
				},
				{ name: "Blessing 3", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing3 },
				{ name: "Mask", bit: 1 << 3, cost: { candles: 50 }, emoji: maskEmoji },
				{ name: "Cape", bit: 1 << 7, cost: { candles: 80 }, emoji: capeEmoji },
			],
		},
		visits: {
			returning: [6],
		},
	}),
	new SeasonalSpirit({
		name: SpiritName.AncientDarkness2,
		season: SeasonName.Shattering,
		offer: {
			seasonal: [
				{
					name: "Neck accessory",
					cosmetic: Cosmetic.AncientDarknessDragonNeckAccessory,
					cost: { seasonalCandles: 35 },
					emoji: necklaceEmoji,
				},
				{ name: "Blessing 1", cosmetic: Cosmetic.AncientDarknessDragonBlessing1, emoji: blessing3 },
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientDarknessDragonBlessing2,
					cost: { seasonalCandles: 16 },
					emoji: blessing3,
				},
				{ name: "Dark horn", cosmetic: Cosmetic.AncientDarknessDragonDarkHorn, emoji: heldProp },
				{
					name: "Hair",
					cosmetic: Cosmetic.AncientDarknessDragonHair,
					cost: { seasonalCandles: 42 },
					emoji: hairEmoji,
				},
				{ name: "Blessing 3", cosmetic: Cosmetic.AncientDarknessDragonBlessing3, emoji: blessing3 },
				{
					name: "Seasonal heart",
					cosmetic: Cosmetic.AncientDarknessDragonSeasonalHeart,
					cost: { seasonalCandles: 3 },
					emoji: SEASON_EMOJIS.ShatteringHeart,
				},
			],
			current: [
				{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing3 },
				{
					name: "Neck accessory",
					bit: 1 << 0,
					cost: { candles: 70 },
					emoji: necklaceEmoji,
				},
				{
					name: "Heart",
					bit: 1 << 6,
					cost: { candles: 3 },
					emoji: MISCELLANEOUS_EMOJIS.Heart,
				},
				{ name: "Blessing 2", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing3 },
				{
					name: "Wing buff",
					bit: 1 << 7,
					cost: { ascendedCandles: 2 },
					emoji: MISCELLANEOUS_EMOJIS.WingBuff,
				},
				{ name: "Blessing 3", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing3 },
				{ name: "Hair", bit: 1 << 4, cost: { candles: 70 }, emoji: hairEmoji },
				{ name: "Dark horn", bit: 1 << 3, cost: { candles: 50 }, emoji: heldProp },
			],
		},
		visits: {
			returning: [6],
		},
	}),
] as const;
