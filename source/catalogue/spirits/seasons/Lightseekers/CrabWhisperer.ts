import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const call = SpiritCall.Crab;
const callEmoji = SpiritCallToEmoji[call];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask16;
const hairEmoji = HAIR_EMOJIS.Hair40;
const capeEmoji = CAPE_EMOJIS.Cape16;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp15;

export default new SeasonalSpirit({
	name: SpiritName.CrabWhisperer,
	season: SeasonName.Lightseekers,
	call,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${call} call`, bit: 1 << 0, emoji: callEmoji },
			{ name: "Mask", bit: 1 << 3, cost: { seasonalCandles: 12 }, emoji: maskEmoji },
			{ name: "Blessing 1", bit: 1 << 2, emoji: blessing2 },
			{ name: "Blessing 2", bit: 1 << 6, cost: { seasonalCandles: 14 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 7, emoji: musicSheet },
			{ name: "Blessing 3", bit: 1 << 10, cost: { seasonalCandles: 16 }, emoji: blessing2 },
			{ name: "Blessing 4", bit: 1 << 11, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 8, cost: { seasonalCandles: 18 }, emoji: hairEmoji },
			{ name: "Cape", bit: 1 << 9, emoji: capeEmoji },
		],
		current: [
			{ name: `${call} call`, bit: 1 << 0, emoji: callEmoji },
			{ name: "Pipe", bit: 1 << 1, cost: { candles: 20 }, emoji: placeablePropEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 3, cost: { candles: 30 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 5,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Blessing 2", bit: 1 << 6, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 7, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Hair", bit: 1 << 8, cost: { candles: 42 }, emoji: hairEmoji },
			{ name: "Cape", bit: 1 << 9, cost: { candles: 70 }, emoji: capeEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(6, skyDate(2_020, 4, 9))
			.set(43, skyDate(2_021, 9, 1)),
		returning: [4],
	},
});
