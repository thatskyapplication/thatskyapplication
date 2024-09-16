import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit34;
const hairEmoji1 = HAIR_EMOJIS.Hair109;
const hairEmoji2 = HAIR_EMOJIS.Hair110;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory23;
const capeEmoji1 = CAPE_EMOJIS.Cape85;
const capeEmoji2 = CAPE_EMOJIS.Cape86;

export default [
	new SeasonalSpirit({
		name: SpiritName.AncientLight1,
		season: SeasonName.Shattering,
		offer: {
			seasonal: [
				{ name: "Hair", bit: 1 << 0, cost: { seasonalCandles: 35 }, emoji: hairEmoji2 },
				{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
				{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 16 }, emoji: blessing3 },
				{ name: "Hair accessory", bit: 1 << 3, emoji: hairAccessoryEmoji },
				{ name: "Cape", bit: 1 << 4, cost: { seasonalCandles: 42 }, emoji: capeEmoji1 },
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
				{ name: "Hair", bit: 1 << 0, cost: { candles: 45 }, emoji: hairEmoji2 },
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
				{ name: "Hair accessory", bit: 1 << 3, cost: { candles: 50 }, emoji: hairAccessoryEmoji },
				{ name: "Cape", bit: 1 << 4, cost: { candles: 80 }, emoji: capeEmoji1 },
			],
		},
		visits: {
			returning: [6],
		},
	}),
	new SeasonalSpirit({
		name: SpiritName.AncientLight2,
		season: SeasonName.Shattering,
		offer: {
			seasonal: [
				{ name: "Music sheet", bit: 1 << 0, cost: { seasonalCandles: 27 }, emoji: musicSheet },
				{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
				{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 16 }, emoji: blessing3 },
				{ name: "Hair", bit: 1 << 3, emoji: hairEmoji1 },
				{ name: "Cape", bit: 1 << 4, cost: { seasonalCandles: 35 }, emoji: capeEmoji2 },
				{ name: "Blessing 3", bit: 1 << 5, emoji: blessing3 },
				{ name: "Blessing 4", bit: 1 << 6, cost: { seasonalCandles: 16 }, emoji: blessing3 },
				{ name: "Outfit", bit: 1 << 7, emoji: outfitEmoji },
				{
					name: "Seasonal heart",
					bit: 1 << 8,
					cost: { seasonalCandles: 3 },
					emoji: SEASON_EMOJIS.ShatteringHeart,
				},
			],
			current: [
				{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing3 },
				{ name: "Music sheet", bit: 1 << 0, cost: { candles: 15 }, emoji: musicSheet },
				{
					name: "Heart",
					bit: 1 << 8,
					cost: { candles: 3 },
					emoji: MISCELLANEOUS_EMOJIS.Heart,
				},
				{ name: "Blessing 2", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing3 },
				{ name: "Hair", bit: 1 << 3, cost: { candles: 50 }, emoji: hairEmoji1 },
				{
					name: "Wing buff",
					bit: 1 << 9,
					cost: { ascendedCandles: 2 },
					emoji: MISCELLANEOUS_EMOJIS.WingBuff,
				},
				{ name: "Blessing 3", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing3 },
				{ name: "Outfit", bit: 1 << 7, cost: { candles: 75 }, emoji: outfitEmoji },
				{ name: "Cape", bit: 1 << 4, cost: { candles: 80 }, emoji: capeEmoji2 },
			],
		},
		visits: {
			returning: [6],
		},
	}),
] as const;
