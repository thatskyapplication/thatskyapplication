/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Injured;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit40;
const maskEmoji = MASK_EMOJIS.Mask74;
const capeEmoji = CAPE_EMOJIS.Cape102;

export default new SeasonalSpirit({
	name: SpiritName.WoundedWarrior,
	season: SeasonName.Remembrance,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing3 })
			.set(1 << 2, { name: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 3, { name: "Outfit", cost: { seasonalCandles: 30 }, emoji: outfitEmoji })
			.set(1 << 4, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 5, { name: "Blessing 3", cost: { seasonalCandles: 36 }, emoji: blessing3 })
			.set(1 << 6, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 7, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RemembranceHeart }),
	},
});
