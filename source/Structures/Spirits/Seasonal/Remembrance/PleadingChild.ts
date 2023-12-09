/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { EMOTES_EMOJIS, NECKLACE_EMOJIS, OUTFIT_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.Pleading;
const emoteEmoji = EMOTES_EMOJIS.Pleading;
const outfitEmoji = OUTFIT_EMOJIS.Outfit39;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace25;

export default new SeasonalSpirit({
	name: SpiritName.PleadingChild,
	season: SeasonName.Remembrance,
	emote,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Neck accessory", cost: { seasonalCandles: 16 }, emoji: necklaceEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: null })
			.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 20 } })
			.set(1 << 5, { item: "Hair", cost: null })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 26 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Outfit", cost: { seasonalCandles: 36 }, emoji: outfitEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RemembranceHeart }),
	},
});
