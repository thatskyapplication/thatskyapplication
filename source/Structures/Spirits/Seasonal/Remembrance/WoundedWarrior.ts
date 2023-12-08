/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { MASK_EMOJIS, OUTFIT_EMOJIS, SEASON_EMOJIS, STANCES_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit, SpiritName, Stance } from "../../Base.js";

const stance = Stance.Injured;
const stanceEmoji = STANCES_EMOJIS.Injured;
const outfitEmoji = OUTFIT_EMOJIS.Outfit40;
const maskEmoji = MASK_EMOJIS.Mask74;

export default new SeasonalSpirit({
	name: SpiritName.WoundedWarrior,
	season: SeasonName.Remembrance,
	stance,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 14 } })
			.set(1 << 2, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 3, { item: "Outfit", cost: { seasonalCandles: 30 }, emoji: outfitEmoji })
			.set(1 << 4, { item: "Blessing 2", cost: null })
			.set(1 << 5, { item: "Blessing 3", cost: { seasonalCandles: 36 } })
			.set(1 << 6, { item: "Cape", cost: null })
			.set(1 << 7, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RemembranceHeart }),
	},
});
