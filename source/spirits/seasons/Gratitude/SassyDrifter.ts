/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../Utility/spirits.js";

const stance = SpiritStance.Sassy;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask11;
const hairEmoji = HAIR_EMOJIS.Hair37;

export default new SeasonalSpirit({
	name: SpiritName.SassyDrifter,
	season: SeasonName.Gratitude,
	stance,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 2, { item: "Hair", cost: { seasonalCandles: 6 }, emoji: hairEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 8 }, emoji: blessing2 })
			.set(1 << 6, { item: "Weasel mask", cost: null, emoji: maskEmoji }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { item: "Hair", cost: { candles: 26 }, emoji: hairEmoji })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 6, { item: "Weasel mask", cost: { candles: 48 }, emoji: maskEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(1, skyDate(2_020, 1, 31))
			.set(10, skyDate(2_020, 5, 28))
			.set(39, skyDate(2_021, 7, 8))
			.set(76, skyDate(2_022, 12, 8))
			.set(111, skyDate(2_024, 4, 11)),
	},
	keywords: ["weasel", "weasel mask"],
});
