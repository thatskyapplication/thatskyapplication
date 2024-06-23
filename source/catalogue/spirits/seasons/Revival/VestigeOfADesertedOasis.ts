import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const shoeEmoji = SHOE_EMOJIS.Shoe09;
const hairEmoji = HAIR_EMOJIS.Hair130;
const capeEmoji = CAPE_EMOJIS.Cape111;

export default new SeasonalSpirit({
	name: SpiritName.VestigeOfADesertedOasis,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Hair", cost: { seasonalCandles: 16 }, emoji: hairEmoji })
			.set(1 << 1, { name: "Blessing 1", emoji: blessing3 })
			.set(1 << 2, { name: "Blessing 2", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 3, { name: "Cape", emoji: capeEmoji })
			.set(1 << 4, { name: "Shoes", cost: { seasonalCandles: 38 }, emoji: shoeEmoji })
			.set(1 << 5, { name: "Blessing 3", emoji: blessing3 })
			.set(1 << 6, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
