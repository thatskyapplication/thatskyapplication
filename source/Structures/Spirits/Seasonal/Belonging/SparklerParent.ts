/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	SEASON_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	MASK_EMOJIS,
	HAIR_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../Base.js";

const emote = SpiritEmote.Sparkler;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask21;
const hairEmoji = HAIR_EMOJIS.Hair47;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp12;

export default new SeasonalSpirit({
	name: SpiritName.SparklerParent,
	season: SeasonName.Belonging,
	emote,
	realm: Realm.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 10 }, emoji: blessing1 })
			.set(1 << 3, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 12 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { item: "Hair", cost: { seasonalCandles: 14 }, emoji: hairEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.BelongingHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Mask", cost: { candles: 36 }, emoji: maskEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { item: "Hair", cost: { candles: 34 }, emoji: hairEmoji })
			.set(1 << 10, { item: "Pinwheel", cost: { candles: 33 }, emoji: placeablePropEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(9, skyDate(2_020, 5, 14))
			.set(32, skyDate(2_021, 4, 1))
			.set(51, skyDate(2_021, 12, 23))
			.set(90, skyDate(2_023, 6, 22)),
	},
});
