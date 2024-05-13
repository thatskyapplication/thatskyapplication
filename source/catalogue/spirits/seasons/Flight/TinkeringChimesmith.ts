/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
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
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory10;
const heldProp = HELD_PROPS_EMOJIS.HeldProp24;

export default new SeasonalSpirit({
	name: SpiritName.TinkeringChimesmith,
	season: SeasonName.Flight,
	stance,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { seasonalCandles: 16 }, emoji: blessing2 })
			.set(1 << 7, { name: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 6, { name: "Hair accessory", cost: { seasonalCandles: 22 }, emoji: hairAccessoryEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 9, { name: "Trail spell 1", cost: { seasonalCandles: 26 }, emoji: colourTrail })
			.set(1 << 8, { name: "Kalimba", cost: null, emoji: heldProp })
			.set(1 << 2, { name: "Hair", cost: { seasonalCandles: 28 }, emoji: hairEmoji })
			.set(1 << 10, { name: "Trail spell 2", cost: null, emoji: colourTrail })
			.set(1 << 3, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.FlightHeart }),
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { name: "Hair", cost: { candles: 45 }, emoji: hairEmoji })
			.set(1 << 3, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 6, { name: "Hair accessory", cost: { candles: 35 }, emoji: hairAccessoryEmoji })
			.set(1 << 7, { name: "Outfit", cost: { candles: 70 }, emoji: outfitEmoji })
			.set(1 << 8, { name: "Kalimba", cost: { candles: 75 }, emoji: heldProp }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(87, skyDate(2_023, 5, 11)),
	},
});
