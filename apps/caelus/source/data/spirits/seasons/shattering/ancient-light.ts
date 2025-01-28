import { SeasonId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

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
		seasonId: SeasonId.Shattering,
		offer: {
			seasonal: [
				{
					name: "Hair",
					cosmetic: Cosmetic.AncientLightJellyfishHair,
					cost: { seasonalCandles: 35 },
					emoji: hairEmoji2,
				},
				{ name: "Blessing 1", cosmetic: Cosmetic.AncientLightJellyfishBlessing1, emoji: blessing3 },
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientLightJellyfishBlessing2,
					cost: { seasonalCandles: 16 },
					emoji: blessing3,
				},
				{
					name: "Hair accessory",
					cosmetic: Cosmetic.AncientLightJellyfishHairAccessory,
					emoji: hairAccessoryEmoji,
				},
				{
					name: "Cape",
					cosmetic: Cosmetic.AncientLightJellyfishCape,
					cost: { seasonalCandles: 42 },
					emoji: capeEmoji1,
				},
				{ name: "Blessing 3", cosmetic: Cosmetic.AncientLightJellyfishBlessing3, emoji: blessing3 },
				{
					name: "Seasonal heart",
					cosmetic: Cosmetic.AncientLightJellyfishSeasonalHeart,
					cost: { seasonalCandles: 3 },
					emoji: SEASON_EMOJIS.ShatteringHeart,
				},
			],
			current: [
				{
					name: "Blessing 1",
					cosmetic: Cosmetic.AncientLightJellyfishBlessing1,
					cost: { candles: 5 },
					emoji: blessing3,
				},
				{
					name: "Hair",
					cosmetic: Cosmetic.AncientLightJellyfishHair,
					cost: { candles: 45 },
					emoji: hairEmoji2,
				},
				{
					name: "Heart",
					cosmetic: Cosmetic.AncientLightJellyfishSeasonalHeart,
					cost: { candles: 3 },
					emoji: MISCELLANEOUS_EMOJIS.Heart,
				},
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientLightJellyfishBlessing2,
					cost: { candles: 5 },
					emoji: blessing3,
				},
				{
					name: "Wing buff",
					cosmetic: Cosmetic.AncientLightJellyfishWingBuff,
					cost: { ascendedCandles: 2 },
					emoji: MISCELLANEOUS_EMOJIS.WingBuff,
				},
				{
					name: "Blessing 3",
					cosmetic: Cosmetic.AncientLightJellyfishBlessing3,
					cost: { candles: 5 },
					emoji: blessing3,
				},
				{
					name: "Hair accessory",
					cosmetic: Cosmetic.AncientLightJellyfishHairAccessory,
					cost: { candles: 50 },
					emoji: hairAccessoryEmoji,
				},
				{
					name: "Cape",
					cosmetic: Cosmetic.AncientLightJellyfishCape,
					cost: { candles: 80 },
					emoji: capeEmoji1,
				},
			],
		},
		visits: {
			returning: [6],
		},
	}),
	new SeasonalSpirit({
		name: SpiritName.AncientLight2,
		seasonId: SeasonId.Shattering,
		offer: {
			seasonal: [
				{
					name: "Music sheet",
					cosmetic: Cosmetic.AncientLightMantaMusicSheet,
					cost: { seasonalCandles: 27 },
					emoji: musicSheet,
				},
				{ name: "Blessing 1", cosmetic: Cosmetic.AncientLightMantaBlessing1, emoji: blessing3 },
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientLightMantaBlessing2,
					cost: { seasonalCandles: 16 },
					emoji: blessing3,
				},
				{ name: "Hair", cosmetic: Cosmetic.AncientLightMantaHair, emoji: hairEmoji1 },
				{
					name: "Cape",
					cosmetic: Cosmetic.AncientLightMantaCape,
					cost: { seasonalCandles: 35 },
					emoji: capeEmoji2,
				},
				{ name: "Blessing 3", cosmetic: Cosmetic.AncientLightMantaBlessing3, emoji: blessing3 },
				{
					name: "Blessing 4",
					cosmetic: Cosmetic.AncientLightMantaBlessing4,
					cost: { seasonalCandles: 16 },
					emoji: blessing3,
				},
				{ name: "Outfit", cosmetic: Cosmetic.AncientLightMantaOutfit, emoji: outfitEmoji },
				{
					name: "Seasonal heart",
					cosmetic: Cosmetic.AncientLightMantaSeasonalHeart,
					cost: { seasonalCandles: 3 },
					emoji: SEASON_EMOJIS.ShatteringHeart,
				},
			],
			current: [
				{
					name: "Blessing 1",
					cosmetic: Cosmetic.AncientLightMantaBlessing1,
					cost: { candles: 5 },
					emoji: blessing3,
				},
				{
					name: "Music sheet",
					cosmetic: Cosmetic.AncientLightMantaMusicSheet,
					cost: { candles: 15 },
					emoji: musicSheet,
				},
				{
					name: "Heart",
					cosmetic: Cosmetic.AncientLightMantaSeasonalHeart,
					cost: { candles: 3 },
					emoji: MISCELLANEOUS_EMOJIS.Heart,
				},
				{
					name: "Blessing 2",
					cosmetic: Cosmetic.AncientLightMantaBlessing2,
					cost: { candles: 5 },
					emoji: blessing3,
				},
				{
					name: "Hair",
					cosmetic: Cosmetic.AncientLightMantaHair,
					cost: { candles: 50 },
					emoji: hairEmoji1,
				},
				{
					name: "Wing buff",
					cosmetic: Cosmetic.AncientLightMantaWingBuff,
					cost: { ascendedCandles: 2 },
					emoji: MISCELLANEOUS_EMOJIS.WingBuff,
				},
				{
					name: "Blessing 3",
					cosmetic: Cosmetic.AncientLightMantaBlessing3,
					cost: { candles: 5 },
					emoji: blessing3,
				},
				{
					name: "Outfit",
					cosmetic: Cosmetic.AncientLightMantaOutfit,
					cost: { candles: 75 },
					emoji: outfitEmoji,
				},
				{
					name: "Cape",
					cosmetic: Cosmetic.AncientLightMantaCape,
					cost: { candles: 80 },
					emoji: capeEmoji2,
				},
			],
		},
		visits: {
			returning: [6],
		},
	}),
] as const;
