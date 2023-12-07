/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { EMOTES_EMOJIS, OUTFIT_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.Anxious;
const emoteEmoji = EMOTES_EMOJIS.Anxious;

export default new SeasonalSpirit({
	name: SpiritName.AnxiousAngler,
	season: SeasonName.Abyss,
	emote,
	realm: Realm.GoldenWasteland,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 8 } })
			.set(1 << 3, { item: "Mask", cost: null })
			.set(1 << 4, { item: "Hair", cost: { seasonalCandles: 14 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 22 } })
			.set(1 << 9, { item: "Cape", cost: null })
			.set(1 << 10, { item: "Outfit", cost: { seasonalCandles: 38 }, emoji: OUTFIT_EMOJIS.Outfit29 })
			.set(1 << 11, { item: "Blessing 4", cost: null })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AbyssHeart }),
	},
});
