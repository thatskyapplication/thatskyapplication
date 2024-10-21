import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
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
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBellyScratch1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBellyScratch2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ChillSunbatherBlessing1,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ChillSunbatherFaceAccessory,
				emoji: faceAccessoryEmoji,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBellyScratch3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBellyScratch4, emoji: emoteEmoji },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.ChillSunbatherHairAccessory,
				cost: { seasonalCandles: 20 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ChillSunbatherBlessing2, emoji: blessing2 },
			{
				name: "Cape",
				cosmetic: Cosmetic.ChillSunbatherCape,
				cost: { seasonalCandles: 22 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.ChillSunbatherBlessing3, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ChillSunbatherSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.SanctuaryHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBellyScratch1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBellyScratch2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Sunlounger",
				cosmetic: Cosmetic.ChillSunbatherSunlounger,
				cost: { candles: 20 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ChillSunbatherBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ChillSunbatherFaceAccessory,
				cost: { candles: 66 },
				emoji: faceAccessoryEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ChillSunbatherSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ChillSunbatherWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBellyScratch3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBellyScratch4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.ChillSunbatherHairAccessory,
				cost: { candles: 44 },
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ChillSunbatherBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ChillSunbatherCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(42, skyDate(2_021, 8, 19))
			.set(104, skyDate(2_024, 1, 4)),
	},
});
