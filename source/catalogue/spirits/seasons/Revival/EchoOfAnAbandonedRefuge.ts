/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const shoeEmoji = SHOE_EMOJIS.Shoe10;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory30;
const capeEmoji = CAPE_EMOJIS.Cape112;

export default new SeasonalSpirit({
	name: SpiritName.EchoOfAnAbandonedRefuge,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Blessing 1", cost: { seasonalCandles: 18 }, emoji: blessing3 })
			.set(1 << 1, { name: "Shoes", cost: null, emoji: shoeEmoji })
			.set(1 << 2, { name: "Music sheet", cost: { seasonalCandles: 24 }, emoji: musicSheet })
			.set(1 << 3, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 4, { name: "Blessing 3", cost: { seasonalCandles: 32 }, emoji: blessing3 })
			.set(1 << 5, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 6, { name: "Hair accessory", cost: { seasonalCandles: 42 }, emoji: hairAccessoryEmoji })
			.set(1 << 7, { name: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 8, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
