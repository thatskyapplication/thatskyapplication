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
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Navigate;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const colourTrail = MISCELLANEOUS_EMOJIS.SpellColourTrail;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const hairEmoji = HAIR_EMOJIS.Hair94;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory12;
const capeEmoji = CAPE_EMOJIS.Cape66;

export default new SeasonalSpirit({
	name: SpiritName.LivelyNavigator,
	season: SeasonName.Flight,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair accessory", bit: 1 << 4, cost: { candles: 45 }, emoji: hairAccessoryEmoji },
			{ name: "Heart", bit: 1 << 12, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 13,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Music sheet", bit: 1 << 10, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, cost: { candles: 55 }, emoji: hairEmoji },
			{ name: "Cape", bit: 1 << 9, cost: { candles: 70 }, emoji: capeEmoji },
		],
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 12 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, emoji: hairEmoji },
			{
				name: "Hair accessory",
				bit: 1 << 4,
				cost: { seasonalCandles: 16 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Trail spell 1", bit: 1 << 8, cost: { seasonalCandles: 24 }, emoji: colourTrail },
			{ name: "Cape", bit: 1 << 9, emoji: capeEmoji },
			{ name: "Music sheet", bit: 1 << 10, cost: { seasonalCandles: 28 }, emoji: musicSheet },
			{ name: "Trail spell 2", bit: 1 << 11, emoji: colourTrail },
			{
				name: "Seasonal heart",
				bit: 1 << 12,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.FlightHeart,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			94,
			skyDate(2_023, 8, 17),
		),
	},
});
