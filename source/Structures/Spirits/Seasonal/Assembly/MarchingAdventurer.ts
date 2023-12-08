/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { EMOTES_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.Marching;
const emoteEmoji = EMOTES_EMOJIS.Marching;
const maskEmoji = MASK_EMOJIS.Mask45;

export default new SeasonalSpirit({
	name: SpiritName.MarchingAdventurer,
	season: SeasonName.Assembly,
	emote,
	realm: Realm.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Hair", cost: { seasonalCandles: 12 } })
			.set(1 << 2, { item: "Blessing 1", cost: null })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 14 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { item: "Blessing 2", cost: { seasonalCandles: 16 } })
			.set(1 << 3, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 10, { item: "Tiki torch", cost: { seasonalCandles: 22 } })
			.set(1 << 11, { item: "Blessing 3", cost: null })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AssemblyHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Mask", cost: { candles: 30 }, emoji: maskEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Hair", cost: { candles: 45 } })
			.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 10, { item: "Tiki torch", cost: { candles: 55 } }),
	},
	visits: {
		returning: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(1, skyDate(2_023, 3, 6)),
	},
});
