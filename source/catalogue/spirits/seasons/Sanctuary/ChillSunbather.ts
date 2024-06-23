import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

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
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, emoji: emoteEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { seasonalCandles: 16 }, emoji: blessing2 })
			.set(1 << 4, { name: "Face accessory", emoji: faceAccessoryEmoji })
			.set(1 << 7, { name: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, emoji: emoteEmoji })
			.set(1 << 9, { name: "Hair accessory", cost: { seasonalCandles: 20 }, emoji: hairAccessoryEmoji })
			.set(1 << 10, { name: "Blessing 2", emoji: blessing2 })
			.set(1 << 11, { name: "Cape", cost: { seasonalCandles: 22 }, emoji: capeEmoji })
			.set(1 << 12, { name: "Blessing 3", emoji: blessing2 })
			.set(1 << 5, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart }),
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Sunlounger", cost: { candles: 20 }, emoji: placeablePropEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Face accessory", cost: { candles: 66 }, emoji: faceAccessoryEmoji })
			.set(1 << 5, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 7, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 9, { name: "Hair accessory", cost: { candles: 44 }, emoji: hairAccessoryEmoji })
			.set(1 << 10, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 11, { name: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(42, skyDate(2_021, 8, 19))
			.set(104, skyDate(2_024, 1, 4)),
	},
});
