/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	EMOTES_EMOJIS,
	SEASON_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	MASK_EMOJIS,
	HAIR_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
	type ItemsData,
} from "../../Base.js";

const emote = Emote.Respect;
const emoteEmoji = EMOTES_EMOJIS.Respect;
const maskEmoji = MASK_EMOJIS.Mask26;
const hairEmoji = HAIR_EMOJIS.Hair51;

export default new SeasonalSpirit({
	name: SpiritName.RespectfulPianist,
	season: SeasonName.Rhythm,
	emote,
	realm: Realm.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { item: "Hair", cost: { seasonalCandles: 14 }, emoji: hairEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: null })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { seasonalCandles: 18 } })
			.set(1 << 9, { item: "Winter piano", cost: null })
			.set(1 << 10, { item: "Duck mask", cost: { seasonalCandles: 20 }, emoji: maskEmoji })
			.set(1 << 11, { item: "Blessing 3", cost: null })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RhythmHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Hair", cost: { candles: 26 }, emoji: hairEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Winter piano", cost: { candles: 75 } })
			.set(1 << 10, { item: "Duck mask", cost: { candles: 48 }, emoji: maskEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(28, skyDate(2_021, 2, 4)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(3, skyDate(2_023, 7, 3)),
	},
});
