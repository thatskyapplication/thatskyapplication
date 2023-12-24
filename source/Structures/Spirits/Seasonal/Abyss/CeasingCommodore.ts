/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CAPE_EMOJIS, EMOTES_EMOJIS, HAIR_EMOJIS, MASK_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.CalmDown;
const emoteEmoji = EMOTES_EMOJIS.CalmDown;
const maskEmoji = MASK_EMOJIS.Mask53;
const hairEmoji = HAIR_EMOJIS.Hair99;
const capeEmoji = CAPE_EMOJIS.Cape69;

export default new SeasonalSpirit({
	name: SpiritName.CeasingCommodore,
	season: SeasonName.Abyss,
	emote,
	realm: Realm.GoldenWasteland,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 6 } })
			.set(1 << 3, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 4, { item: "Mask", cost: { seasonalCandles: 8 }, emoji: maskEmoji })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Cape", cost: { seasonalCandles: 20 }, emoji: capeEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AbyssHeart }),
	},
});
