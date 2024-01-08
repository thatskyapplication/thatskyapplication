/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { EMOTES_EMOJIS, HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.Kabuki;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const emoteEmoji = EMOTES_EMOJIS.Kabuki;
const maskEmoji = MASK_EMOJIS.Mask06;
const hairEmoji = HAIR_EMOJIS.Hair38;

export default new SeasonalSpirit({
	name: SpiritName.ProvokingPerformer,
	season: SeasonName.Gratitude,
	emote,
	realm: Realm.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { item: "Music sheet", cost: { seasonalCandles: 10 } })
			.set(1 << 2, { item: "Blessing", cost: null, emoji: blessing2 })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 12 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 10, { item: "Hair", cost: { seasonalCandles: 14 }, emoji: hairEmoji })
			.set(1 << 9, { item: "Mask", cost: { hearts: 5 }, emoji: maskEmoji }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { item: "Mask", cost: { candles: 42 }, emoji: maskEmoji })
			.set(1 << 10, { item: "Hair", cost: { candles: 34 }, emoji: hairEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(4, skyDate(2_020, 3, 12))
			.set(19, skyDate(2_020, 10, 1))
			.set(84, skyDate(2_023, 3, 30))
			.set("Error", skyDate(2_023, 4, 13)),
	},
});
