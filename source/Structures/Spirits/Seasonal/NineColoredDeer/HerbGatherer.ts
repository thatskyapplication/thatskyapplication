/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { EMOTE_EMOJIS, MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.Whistle;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const emoteEmoji = EMOTE_EMOJIS.Whistle;

export default new SeasonalSpirit({
	name: SpiritName.HerbGatherer,
	season: SeasonName.NineColoredDeer,
	emote,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 16 }, emoji: blessing3 })
			.set(1 << 3, { item: "Outfit", cost: null })
			.set(1 << 4, { item: "Hair", cost: { seasonalCandles: 26 } })
			.set(1 << 5, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 30 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Prop", cost: { seasonalCandles: 36 } })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, {
				item: "Seasonal heart",
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColoredDeerHeart,
			}),
	},
});
