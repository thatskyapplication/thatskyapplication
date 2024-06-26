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
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.BellyScratch;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory10;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory02;
const capeEmoji = CAPE_EMOJIS.Cape33;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp14;

export default new SeasonalSpirit({
	name: SpiritName.ChillSunbather,
	season: SeasonName.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { seasonalCandles: 16 }, emoji: blessing2 },
			{ name: "Face accessory", bit: 1 << 4, emoji: faceAccessoryEmoji },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, emoji: emoteEmoji },
			{
				name: "Hair accessory",
				bit: 1 << 9,
				cost: { seasonalCandles: 20 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 2", bit: 1 << 10, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 11, cost: { seasonalCandles: 22 }, emoji: capeEmoji },
			{ name: "Blessing 3", bit: 1 << 12, emoji: blessing2 },
			{
				name: "Seasonal heart",
				bit: 1 << 5,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.SanctuaryHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Sunlounger", bit: 1 << 2, cost: { candles: 20 }, emoji: placeablePropEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Face accessory", bit: 1 << 4, cost: { candles: 66 }, emoji: faceAccessoryEmoji },
			{ name: "Heart", bit: 1 << 5, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 6,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 7, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Hair accessory", bit: 1 << 9, cost: { candles: 44 }, emoji: hairAccessoryEmoji },
			{ name: "Blessing 2", bit: 1 << 10, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 11, cost: { candles: 70 }, emoji: capeEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(42, skyDate(2_021, 8, 19))
			.set(104, skyDate(2_024, 1, 4)),
	},
});
