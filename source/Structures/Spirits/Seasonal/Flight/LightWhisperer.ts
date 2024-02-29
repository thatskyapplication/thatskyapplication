/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CALL_EMOJIS,
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, Call, SeasonalSpirit, SpiritName } from "../../Base.js";

const call = Call.BabyManta;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const colourTrail = MISCELLANEOUS_EMOJIS.SpellColourTrail;
const callEmoji = CALL_EMOJIS.BabyManta;
const outfitEmoji = OUTFIT_EMOJIS.Outfit27;
const hairEmoji = HAIR_EMOJIS.Hair93;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory09;
const capeEmoji = CAPE_EMOJIS.Cape65;

export default new SeasonalSpirit({
	name: SpiritName.LightWhisperer,
	season: SeasonName.Flight,
	call,
	realm: Realm.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { item: "Hair accessory", cost: { candles: 45 }, emoji: hairAccessoryEmoji })
			.set(1 << 9, { item: "Heart", cost: { candles: 3 }, emoji: SEASON_EMOJIS.FlightHeart })
			.set(1 << 10, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 4, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Hair", cost: { candles: 50 }, emoji: hairEmoji })
			.set(1 << 7, { item: "Outfit", cost: { candles: 65 }, emoji: outfitEmoji })
			.set(1 << 6, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing2 })
			.set(1 << 2, { item: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
			.set(1 << 3, { item: "Hair", cost: { seasonalCandles: 22 }, emoji: hairEmoji })
			.set(1 << 4, { item: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 5, { item: "Trail spell 1", cost: { seasonalCandles: 26 }, emoji: colourTrail })
			.set(1 << 6, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 7, { item: "Outfit", cost: { seasonalCandles: 28 }, emoji: outfitEmoji })
			.set(1 << 8, { item: "Trail spell 2", cost: null, emoji: colourTrail })
			.set(1 << 9, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.FlightHeart }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(108, skyDate(2_024, 2, 29)),
	},
});
