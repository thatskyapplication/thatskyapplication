import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
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
		seasonal: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallBabyManta, emoji: callEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LightWhispererBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing2,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.LightWhispererHairAccessory,
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LightWhispererHair,
				cost: { seasonalCandles: 22 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.LightWhispererBlessing2, emoji: blessing2 },
			{
				name: "Trail spell 1",
				cosmetic: Cosmetic.LightWhispererTrailSpell1,
				cost: { seasonalCandles: 26 },
				emoji: colourTrail,
			},
			{ name: "Cape", cosmetic: Cosmetic.LightWhispererCape, emoji: capeEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.LightWhispererOutfit,
				cost: { seasonalCandles: 28 },
				emoji: outfitEmoji,
			},
			{ name: "Trail spell 2", cosmetic: Cosmetic.LightWhispererTrailSpell2, emoji: colourTrail },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.LightWhispererSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.FlightHeart,
			},
		],
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallBabyManta, emoji: callEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LightWhispererBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.LightWhispererHairAccessory,
				cost: { candles: 45 },
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LightWhispererSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LightWhispererWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LightWhispererBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LightWhispererHair,
				cost: { candles: 50 },
				emoji: hairEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.LightWhispererOutfit,
				cost: { candles: 65 },
				emoji: outfitEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.LightWhispererCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			108,
			skyDate(2_024, 2, 29),
		),
	},
});
