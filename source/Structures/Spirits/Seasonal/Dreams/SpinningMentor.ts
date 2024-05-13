/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season/index.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../Base.js";

const emote = SpiritEmote.SpinTrick;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask39;
const hairEmoji = HAIR_EMOJIS.Hair72;
const capeEmoji = CAPE_EMOJIS.Cape45;

export default new SeasonalSpirit({
	name: SpiritName.SpinningMentor,
	season: SeasonName.Dreams,
	emote,
	realm: Realm.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { item: "Hair", cost: { seasonalCandles: 13 }, emoji: hairEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Mask", cost: { seasonalCandles: 23 }, emoji: maskEmoji })
			.set(1 << 9, { item: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 11, { item: "Blessing 3", cost: { seasonalCandles: 29 }, emoji: blessing2 })
			.set(1 << 10, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.DreamsHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Hair", cost: { candles: 44 }, emoji: hairEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Mask", cost: { candles: 42 }, emoji: maskEmoji })
			.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 10, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(59, skyDate(2_022, 4, 14))
			.set(91, skyDate(2_023, 7, 6)),
	},
});
