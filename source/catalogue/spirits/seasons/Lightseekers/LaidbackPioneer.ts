/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	SeasonalSpirit,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { HAIR_EMOJIS, HELD_PROPS_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Laidback;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask14;
const hairEmoji = HAIR_EMOJIS.Hair43;
const heldProp = HELD_PROPS_EMOJIS.HeldProp11;

export default new SeasonalSpirit({
	name: SpiritName.LaidbackPioneer,
	season: SeasonName.Lightseekers,
	stance,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 6 }, emoji: maskEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 8 }, emoji: blessing2 })
			.set(1 << 6, { item: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 7, { item: "Hair", cost: { seasonalCandles: 10 }, emoji: hairEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing2 })
			.set(1 << 10, { item: "Blessing 4", cost: { seasonalCandles: 20 }, emoji: blessing2 })
			.set(1 << 8, { item: "Umbrella", cost: null, emoji: heldProp }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { item: "Mask", cost: { candles: 30 }, emoji: maskEmoji })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 6, { item: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 7, { item: "Hair", cost: { candles: 18 }, emoji: hairEmoji })
			.set(1 << 8, { item: "Umbrella", cost: { candles: 75 }, emoji: heldProp }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(3, skyDate(2_020, 2, 27))
			.set(23, skyDate(2_020, 11, 26))
			.set(72, skyDate(2_022, 10, 13)),
	},
	hasMarketingVideo: true,
	keywords: ["umbrella"],
});
