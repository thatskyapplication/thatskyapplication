import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const call = SpiritCall.BabyManta;
const callEmoji = SpiritCallToEmoji[call];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const colourTrail = MISCELLANEOUS_EMOJIS.SpellColourTrail;
const outfitEmoji = OUTFIT_EMOJIS.Outfit27;
const hairEmoji = HAIR_EMOJIS.Hair93;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory09;
const capeEmoji = CAPE_EMOJIS.Cape65;

export default new SeasonalSpirit({
	name: SpiritName.LightWhisperer,
	season: SeasonName.Flight,
	call,
	realm: RealmName.HiddenForest,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { name: "Hair accessory", cost: { candles: 45 }, emoji: hairAccessoryEmoji })
			.set(1 << 9, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 10, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 4, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { name: "Hair", cost: { candles: 50 }, emoji: hairEmoji })
			.set(1 << 7, { name: "Outfit", cost: { candles: 65 }, emoji: outfitEmoji })
			.set(1 << 6, { name: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing2 })
			.set(1 << 2, { name: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
			.set(1 << 3, { name: "Hair", cost: { seasonalCandles: 22 }, emoji: hairEmoji })
			.set(1 << 4, { name: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 5, { name: "Trail spell 1", cost: { seasonalCandles: 26 }, emoji: colourTrail })
			.set(1 << 6, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 7, { name: "Outfit", cost: { seasonalCandles: 28 }, emoji: outfitEmoji })
			.set(1 << 8, { name: "Trail spell 2", cost: null, emoji: colourTrail })
			.set(1 << 9, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.FlightHeart }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(108, skyDate(2_024, 2, 29)),
	},
});
