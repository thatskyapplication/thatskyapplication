/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	EMOTE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, Emote, SeasonalSpirit } from "../../Base.js";

const emote = Emote.BellyScratch;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const emoteEmoji = EMOTE_EMOJIS.BellyScratch;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory10;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory02;
const capeEmoji = CAPE_EMOJIS.Cape33;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp13;

export default new SeasonalSpirit({
	name: SpiritName.ChillSunbather,
	season: SeasonName.Sanctuary,
	emote,
	realm: Realm.DaylightPrairie,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: { seasonalCandles: 16 }, emoji: blessing2 })
			.set(1 << 4, { item: "Face accessory", cost: null, emoji: faceAccessoryEmoji })
			.set(1 << 7, { item: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 8, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { item: "Hair accessory", cost: { seasonalCandles: 20 }, emoji: hairAccessoryEmoji })
			.set(1 << 10, { item: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 11, { item: "Cape", cost: { seasonalCandles: 22 }, emoji: capeEmoji })
			.set(1 << 12, { item: "Blessing 3", cost: null, emoji: blessing2 })
			.set(1 << 5, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Sunlounger", cost: { candles: 20 }, emoji: placeablePropEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { item: "Face accessory", cost: { candles: 66 }, emoji: faceAccessoryEmoji })
			.set(1 << 5, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 7, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 8, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 9, { item: "Hair accessory", cost: { candles: 44 }, emoji: hairAccessoryEmoji })
			.set(1 << 10, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 11, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(42, skyDate(2_021, 8, 19))
			.set(104, skyDate(2_024, 1, 4)),
	},
});
