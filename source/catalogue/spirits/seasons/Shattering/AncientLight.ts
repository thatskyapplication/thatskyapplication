/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
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
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory22;
const capeEmoji1 = CAPE_EMOJIS.Cape85;
const capeEmoji2 = CAPE_EMOJIS.Cape86;

export default [
	new SeasonalSpirit({
		name: SpiritName.AncientLight1,
		season: SeasonName.Shattering,
		offer: {
			hasInfographic: false,
			seasonal: new Collection<number, FriendshipTreeItem>()
				.set(1 << 0, { name: "Hair", cost: { seasonalCandles: 35 }, emoji: hairEmoji2 })
				.set(1 << 1, { name: "Blessing 1", cost: null, emoji: blessing3 })
				.set(1 << 2, { name: "Blessing 2", cost: { seasonalCandles: 16 }, emoji: blessing3 })
				.set(1 << 3, { name: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
				.set(1 << 4, { name: "Cape", cost: { seasonalCandles: 42 }, emoji: capeEmoji1 })
				.set(1 << 5, { name: "Blessing 3", cost: null, emoji: blessing3 })
				.set(1 << 6, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ShatteringHeart }),
		},
	}),
	new SeasonalSpirit({
		name: SpiritName.AncientLight2,
		season: SeasonName.Shattering,
		offer: {
			hasInfographic: false,
			seasonal: new Collection<number, FriendshipTreeItem>()
				.set(1 << 0, { name: "Music sheet", cost: { seasonalCandles: 27 }, emoji: musicSheet })
				.set(1 << 1, { name: "Blessing 1", cost: null, emoji: blessing3 })
				.set(1 << 2, { name: "Blessing 2", cost: { seasonalCandles: 16 }, emoji: blessing3 })
				.set(1 << 3, { name: "Hair", cost: null, emoji: hairEmoji1 })
				.set(1 << 4, { name: "Cape", cost: { seasonalCandles: 35 }, emoji: capeEmoji2 })
				.set(1 << 5, { name: "Blessing 3", cost: null, emoji: blessing3 })
				.set(1 << 4, { name: "Blessing 4", cost: { seasonalCandles: 16 }, emoji: blessing3 })
				.set(1 << 5, { name: "Outfit", cost: null, emoji: outfitEmoji })
				.set(1 << 6, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ShatteringHeart }),
		},
	}),
] as const;
