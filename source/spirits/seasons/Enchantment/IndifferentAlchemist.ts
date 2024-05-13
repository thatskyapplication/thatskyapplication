/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../Utility/spirits.js";

const emote = SpiritEmote.Shrug;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask29;
const hairEmoji = HAIR_EMOJIS.Hair57;
const capeEmoji = CAPE_EMOJIS.Cape27;

export default new SeasonalSpirit({
	name: SpiritName.IndifferentAlchemist,
	season: SeasonName.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing2 })
			.set(1 << 3, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { item: "Hair", cost: { seasonalCandles: 18 }, emoji: hairEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 11, { item: "Blessing 3", cost: { seasonalCandles: 20 }, emoji: blessing2 })
			.set(1 << 10, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.EnchantmentHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Mask", cost: { candles: 42 }, emoji: maskEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { item: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 10, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(21, skyDate(2_020, 10, 29))
			.set(69, skyDate(2_022, 9, 1)),
		returning: [5],
	},
});
