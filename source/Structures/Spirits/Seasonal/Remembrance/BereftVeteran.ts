/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CAPE_EMOJIS, EMOTES_EMOJIS, HAIR_EMOJIS, MASK_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.Grieving;
const emoteEmoji = EMOTES_EMOJIS.Grieving;
const maskEmoji = MASK_EMOJIS.Mask73;
const hairEmoji = HAIR_EMOJIS.Hair120;
const capeEmoji = CAPE_EMOJIS.Cape101;

export default new SeasonalSpirit({
	name: SpiritName.BereftVeteran,
	season: SeasonName.Remembrance,
	emote,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 6 }, emoji: maskEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: null })
			.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 18 } })
			.set(1 << 5, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 30 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Cape", cost: { seasonalCandles: 34 }, emoji: capeEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RemembranceHeart }),
	},
});
