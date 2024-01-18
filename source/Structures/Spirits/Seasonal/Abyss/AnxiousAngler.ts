/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	EMOTE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.Anxious;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const emoteEmoji = EMOTE_EMOJIS.Anxious;
const outfitEmoji = OUTFIT_EMOJIS.Outfit29;
const maskEmoji = MASK_EMOJIS.Mask57;
const hairEmoji = HAIR_EMOJIS.Hair100;
const capeEmoji = CAPE_EMOJIS.Cape71;

export default new SeasonalSpirit({
	name: SpiritName.AnxiousAngler,
	season: SeasonName.Abyss,
	emote,
	realm: Realm.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { item: "Hair", cost: { candles: 45 }, emoji: hairEmoji })
			.set(1 << 12, { item: "heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 13, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 3, { item: "Mask", cost: { candles: 35 }, emoji: maskEmoji })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing3 })
			.set(1 << 9, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji })
			.set(1 << 10, { item: "Outfit", cost: { candles: 65 }, emoji: outfitEmoji }),
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 8 }, emoji: blessing2 })
			.set(1 << 3, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 4, { item: "Hair", cost: { seasonalCandles: 14 }, emoji: hairEmoji })
			.set(1 << 5, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 22 }, emoji: blessing3 })
			.set(1 << 9, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 10, { item: "Outfit", cost: { seasonalCandles: 38 }, emoji: outfitEmoji })
			.set(1 << 11, { item: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AbyssHeart }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(105, skyDate(2_024, 1, 18)),
	},
});
