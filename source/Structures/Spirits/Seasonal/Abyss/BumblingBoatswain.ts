/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { EMOTES_EMOJIS, MASK_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.Ouch;
const emoteEmoji = EMOTES_EMOJIS.Ouch;
const maskEmoji = MASK_EMOJIS.Mask52;

export default new SeasonalSpirit({
	name: SpiritName.BumblingBoatswain,
	season: SeasonName.Abyss,
	emote,
	realm: Realm.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 8 } })
			.set(1 << 3, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 4, { item: "Music sheet", cost: { seasonalCandles: 12 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 20 } })
			.set(1 << 9, { item: "Cape", cost: null })
			.set(1 << 10, { item: "Hair", cost: { seasonalCandles: 24 } })
			.set(1 << 11, { item: "Blessing 4", cost: null })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AbyssHeart }),
	},
});
