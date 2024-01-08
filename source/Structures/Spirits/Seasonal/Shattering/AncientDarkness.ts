/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
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
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit, SpiritName } from "../../Base.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask65;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace22;
const hairEmoji = HAIR_EMOJIS.Hair108;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory21;
const capeEmoji = CAPE_EMOJIS.Cape83;
const heldProp = HELD_PROPS_EMOJIS.HeldProp29;

export default [
	new SeasonalSpirit({
		name: SpiritName.AncientDarkness1,
		season: SeasonName.Shattering,
		offer: {
			hasInfographic: false,
			seasonal: new Collection<number, ItemsData>()
				.set(1 << 0, { item: "Hair accessory", cost: { seasonalCandles: 27 }, emoji: hairAccessoryEmoji })
				.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing3 })
				.set(1 << 2, { item: "Blessing 2", cost: { seasonalCandles: 16 }, emoji: blessing3 })
				.set(1 << 3, { item: "Mask", cost: null, emoji: maskEmoji })
				.set(1 << 4, { item: "Music sheet", cost: { seasonalCandles: 35 } })
				.set(1 << 5, { item: "Blessing 3", cost: null, emoji: blessing3 })
				.set(1 << 6, { item: "Blessing 4", cost: { seasonalCandles: 16 }, emoji: blessing3 })
				.set(1 << 7, { item: "Cape", cost: null, emoji: capeEmoji })
				.set(1 << 8, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ShatteringHeart }),
		},
	}),
	new SeasonalSpirit({
		name: SpiritName.AncientDarkness2,
		season: SeasonName.Shattering,
		offer: {
			hasInfographic: false,
			seasonal: new Collection<number, ItemsData>()
				.set(1 << 0, { item: "Neck accessory", cost: { seasonalCandles: 35 }, emoji: necklaceEmoji })
				.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing3 })
				.set(1 << 2, { item: "Blessing 2", cost: { seasonalCandles: 16 }, emoji: blessing3 })
				.set(1 << 3, { item: "Dark horn", cost: null, emoji: heldProp })
				.set(1 << 4, { item: "Hair", cost: { seasonalCandles: 42 }, emoji: hairEmoji })
				.set(1 << 5, { item: "Blessing 3", cost: null, emoji: blessing3 })
				.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ShatteringHeart }),
		},
	}),
] as const;
