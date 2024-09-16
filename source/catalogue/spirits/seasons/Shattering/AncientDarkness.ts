import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
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
					bit: 1 << 0,
					cost: { seasonalCandles: 27 },
					emoji: hairAccessoryEmoji,
				},
				{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
				{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 16 }, emoji: blessing3 },
				{ name: "Mask", bit: 1 << 3, emoji: maskEmoji },
				{ name: "Music sheet", bit: 1 << 4, cost: { seasonalCandles: 35 }, emoji: musicSheet },
				{ name: "Blessing 3", bit: 1 << 5, emoji: blessing3 },
				{ name: "Blessing 4", bit: 1 << 6, cost: { seasonalCandles: 16 }, emoji: blessing3 },
				{ name: "Cape", bit: 1 << 7, emoji: capeEmoji },
				{
					name: "Seasonal heart",
					bit: 1 << 8,
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
					cost: { candles: 47 },
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
					bit: 1 << 0,
					cost: { seasonalCandles: 35 },
					emoji: necklaceEmoji,
				},
				{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
				{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 16 }, emoji: blessing3 },
				{ name: "Dark horn", bit: 1 << 3, emoji: heldProp },
				{ name: "Hair", bit: 1 << 4, cost: { seasonalCandles: 42 }, emoji: hairEmoji },
				{ name: "Blessing 3", bit: 1 << 5, emoji: blessing3 },
				{
					name: "Seasonal heart",
					bit: 1 << 6,
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
