/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { EMOTES_EMOJIS, HAIR_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.PullUp;
const emoteEmoji = EMOTES_EMOJIS.PullUp;
const hairEmoji = HAIR_EMOJIS.Hair124;

export default new SeasonalSpirit({
	name: SpiritName.OveractiveOverachiever,
	season: SeasonName.Passage,
	emote,
	realm: Realm.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 14 } })
			.set(1 << 3, { item: "Manta ocarina", cost: null })
			.set(1 << 4, { item: `${emote} 3`, cost: { seasonalCandles: 22 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { item: "Cape", cost: { seasonalCandles: 30 } })
			.set(1 << 7, { item: "Blessing 2", cost: null })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 32 } })
			.set(1 << 9, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PassageHeart }),
	},
});
