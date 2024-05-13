/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../../Utility/seasons.js";
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
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing3 })
			.set(1 << 2, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 3, { item: "Outfit", cost: { seasonalCandles: 30 }, emoji: outfitEmoji })
			.set(1 << 4, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 5, { item: "Blessing 3", cost: { seasonalCandles: 36 }, emoji: blessing3 })
			.set(1 << 6, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 7, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RemembranceHeart }),
	},
});
