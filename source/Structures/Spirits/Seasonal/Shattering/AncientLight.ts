/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit } from "../../Base.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit34;
const hairEmoji1 = HAIR_EMOJIS.Hair109;
const hairEmoji2 = HAIR_EMOJIS.Hair110;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory22;
const capeEmoji1 = CAPE_EMOJIS.Cape85;
const capeEmoji2 = CAPE_EMOJIS.Cape86;

export default [
	new SeasonalSpirit({
		name: SpiritName.AncientLight1,
		season: SeasonName.Shattering,
		offer: {
			hasInfographic: false,
			seasonal: new Collection<number, ItemsData>()
				.set(1 << 0, { item: "Hair", cost: { seasonalCandles: 35 }, emoji: hairEmoji2 })
				.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing3 })
				.set(1 << 2, { item: "Blessing 2", cost: { seasonalCandles: 16 }, emoji: blessing3 })
				.set(1 << 3, { item: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
				.set(1 << 4, { item: "Cape", cost: { seasonalCandles: 42 }, emoji: capeEmoji1 })
				.set(1 << 5, { item: "Blessing 3", cost: null, emoji: blessing3 })
				.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ShatteringHeart }),
		},
	}),
	new SeasonalSpirit({
		name: SpiritName.AncientLight2,
		season: SeasonName.Shattering,
		offer: {
			hasInfographic: false,
			seasonal: new Collection<number, ItemsData>()
				.set(1 << 0, { item: "Music sheet", cost: { seasonalCandles: 27 }, emoji: musicSheet })
				.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing3 })
				.set(1 << 2, { item: "Blessing 2", cost: { seasonalCandles: 16 }, emoji: blessing3 })
				.set(1 << 3, { item: "Hair", cost: null, emoji: hairEmoji1 })
				.set(1 << 4, { item: "Cape", cost: { seasonalCandles: 35 }, emoji: capeEmoji2 })
				.set(1 << 5, { item: "Blessing 3", cost: null, emoji: blessing3 })
				.set(1 << 4, { item: "Blessing 4", cost: { seasonalCandles: 16 }, emoji: blessing3 })
				.set(1 << 5, { item: "Outfit", cost: null, emoji: outfitEmoji })
				.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ShatteringHeart }),
		},
	}),
] as const;
