/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../Utility/spirits.js";

const emote = SpiritEmote.Yoga;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const hairEmoji = HAIR_EMOJIS.Hair39;
const capeEmoji = CAPE_EMOJIS.Cape14;

export default new SeasonalSpirit({
	name: SpiritName.StretchingGuru,
	season: SeasonName.Gratitude,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { item: "Hair", cost: { seasonalCandles: 6 }, emoji: hairEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 8 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { seasonalCandles: 10 }, emoji: blessing2 })
			.set(1 << 9, { item: "Cape", cost: { hearts: 5 }, emoji: capeEmoji }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Hair", cost: { candles: 26 }, emoji: hairEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { item: "Cape", cost: { candles: 65 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(8, skyDate(2_020, 4, 30))
			.set(57, skyDate(2_022, 3, 17)),
	},
});
