import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
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
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory10;
const capeEmoji = CAPE_EMOJIS.Cape65;

export default new SeasonalSpirit({
	name: SpiritName.LightWhisperer,
	season: SeasonName.Flight,
	call,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${call} call`, bit: 1 << 0, emoji: callEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair accessory", bit: 1 << 2, cost: { candles: 45 }, emoji: hairAccessoryEmoji },
			{ name: "Heart", bit: 1 << 9, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 10, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 4, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, cost: { candles: 50 }, emoji: hairEmoji },
			{ name: "Outfit", bit: 1 << 7, cost: { candles: 65 }, emoji: outfitEmoji },
			{ name: "Cape", bit: 1 << 6, cost: { candles: 70 }, emoji: capeEmoji },
		],
		seasonal: [
			{ name: `${call} call`, bit: 1 << 0, emoji: callEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { seasonalCandles: 14 }, emoji: blessing2 },
			{ name: "Hair accessory", bit: 1 << 2, emoji: hairAccessoryEmoji },
			{ name: "Hair", bit: 1 << 3, cost: { seasonalCandles: 22 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 4, emoji: blessing2 },
			{ name: "Trail spell 1", bit: 1 << 5, cost: { seasonalCandles: 26 }, emoji: colourTrail },
			{ name: "Cape", bit: 1 << 6, emoji: capeEmoji },
			{ name: "Outfit", bit: 1 << 7, cost: { seasonalCandles: 28 }, emoji: outfitEmoji },
			{ name: "Trail spell 2", bit: 1 << 8, emoji: colourTrail },
			{ name: "Seasonal heart", bit: 1 << 9, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.FlightHeart },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(108, skyDate(2_024, 2, 29)),
	},
});
