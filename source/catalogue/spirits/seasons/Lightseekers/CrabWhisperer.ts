import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const call = SpiritCall.Crab;
const callEmoji = SpiritCallToEmoji[call];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask16;
const hairEmoji = HAIR_EMOJIS.Hair40;
const capeEmoji = CAPE_EMOJIS.Cape16;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp14;

export default new SeasonalSpirit({
	name: SpiritName.CrabWhisperer,
	season: SeasonName.Lightseekers,
	call,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 3, { name: "Mask", cost: { seasonalCandles: 12 }, emoji: maskEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 6, { name: "Blessing 2", cost: { seasonalCandles: 14 }, emoji: blessing2 })
			.set(1 << 7, { name: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 10, { name: "Blessing 3", cost: { seasonalCandles: 16 }, emoji: blessing2 })
			.set(1 << 11, { name: "Blessing 4", cost: null, emoji: blessing2 })
			.set(1 << 8, { name: "Hair", cost: { seasonalCandles: 18 }, emoji: hairEmoji })
			.set(1 << 9, { name: "Cape", cost: null, emoji: capeEmoji }),
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { name: "Pipe", cost: { candles: 20 }, emoji: placeablePropEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { name: "Mask", cost: { candles: 30 }, emoji: maskEmoji })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 7, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 8, { name: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 9, { name: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(6, skyDate(2_020, 4, 9))
			.set(43, skyDate(2_021, 9, 1)),
		returning: [4],
	},
});
