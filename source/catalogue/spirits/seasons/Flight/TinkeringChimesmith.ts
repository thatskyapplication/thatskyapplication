import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Tinker;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const colourTrail = MISCELLANEOUS_EMOJIS.SpellColourTrail;
const outfitEmoji = OUTFIT_EMOJIS.Outfit26;
const hairEmoji = HAIR_EMOJIS.Hair92;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory11;
const heldProp = HELD_PROPS_EMOJIS.HeldProp24;

export default new SeasonalSpirit({
	name: SpiritName.TinkeringChimesmith,
	season: SeasonName.Flight,
	stance,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { seasonalCandles: 16 }, emoji: blessing2 },
			{ name: "Outfit", bit: 1 << 7, emoji: outfitEmoji },
			{ name: "Hair accessory", bit: 1 << 6, cost: { seasonalCandles: 22 }, emoji: hairAccessoryEmoji },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing2 },
			{ name: "Trail spell 1", bit: 1 << 9, cost: { seasonalCandles: 26 }, emoji: colourTrail },
			{ name: "Kalimba", bit: 1 << 8, emoji: heldProp },
			{ name: "Hair", bit: 1 << 2, cost: { seasonalCandles: 28 }, emoji: hairEmoji },
			{ name: "Trail spell 2", bit: 1 << 10, emoji: colourTrail },
			{ name: "Seasonal heart", bit: 1 << 3, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.FlightHeart },
		],
		current: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 2, cost: { candles: 45 }, emoji: hairEmoji },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 4, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair accessory", bit: 1 << 6, cost: { candles: 35 }, emoji: hairAccessoryEmoji },
			{ name: "Outfit", bit: 1 << 7, cost: { candles: 70 }, emoji: outfitEmoji },
			{ name: "Kalimba", bit: 1 << 8, cost: { candles: 75 }, emoji: heldProp },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(87, skyDate(2_023, 5, 11)),
	},
});
