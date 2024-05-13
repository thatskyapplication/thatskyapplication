/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit50;
const hairEmoji = HAIR_EMOJIS.Hair131;
const capeEmoji = CAPE_EMOJIS.Cape114;

export default new SeasonalSpirit({
	name: SpiritName.MemoryOfALostVillage,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Blessing 1", cost: { seasonalCandles: 20 }, emoji: blessing3 })
			.set(1 << 1, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 2, { name: "Outfit", cost: { seasonalCandles: 32 }, emoji: outfitEmoji })
			.set(1 << 3, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 4, { name: "Blessing 3", cost: { seasonalCandles: 38 }, emoji: blessing3 })
			.set(1 << 5, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
