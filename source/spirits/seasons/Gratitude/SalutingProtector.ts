/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../Utility/spirits.js";

const emote = SpiritEmote.Acknowledge;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask08;
const capeEmoji = CAPE_EMOJIS.Cape13;

export default new SeasonalSpirit({
	name: SpiritName.SalutingProtector,
	season: SeasonName.Gratitude,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { item: "Music sheet", cost: { seasonalCandles: 16 }, emoji: musicSheet })
			.set(1 << 2, { item: "Blessing", cost: null, emoji: blessing2 })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { item: "Cape", cost: { seasonalCandles: 20 }, emoji: capeEmoji })
			.set(1 << 10, { item: "Mask", cost: { hearts: 5 }, emoji: maskEmoji }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { item: "Cape", cost: { candles: 75 }, emoji: capeEmoji })
			.set(1 << 10, { item: "Mask", cost: { candles: 42 }, emoji: maskEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set("Error", skyDate(2_020, 5, 28))
			.set(53, skyDate(2_022, 1, 20)),
	},
});
