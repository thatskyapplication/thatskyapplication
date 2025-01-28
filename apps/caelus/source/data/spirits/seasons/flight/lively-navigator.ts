import { RealmName, SeasonId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

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
	seasonId: SeasonId.Flight,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNavigate1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteNavigate2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LivelyNavigatorBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.LivelyNavigatorHair, emoji: hairEmoji },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.LivelyNavigatorHairAccessory,
				cost: { seasonalCandles: 16 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.LivelyNavigatorBlessing2, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteNavigate3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteNavigate4, emoji: emoteEmoji },
			{
				name: "Trail spell 1",
				cosmetic: Cosmetic.LivelyNavigatorTrailSpell1,
				cost: { seasonalCandles: 24 },
				emoji: colourTrail,
			},
			{ name: "Cape", cosmetic: Cosmetic.LivelyNavigatorCape, emoji: capeEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.LivelyNavigatorMusicSheet,
				cost: { seasonalCandles: 28 },
				emoji: musicSheet,
			},
			{ name: "Trail spell 2", cosmetic: Cosmetic.LivelyNavigatorTrailSpell2, emoji: colourTrail },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.LivelyNavigatorSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.FlightHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNavigate1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteNavigate2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LivelyNavigatorBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.LivelyNavigatorHairAccessory,
				cost: { candles: 45 },
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LivelyNavigatorSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LivelyNavigatorWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteNavigate3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteNavigate4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.LivelyNavigatorMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LivelyNavigatorBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LivelyNavigatorHair,
				cost: { candles: 55 },
				emoji: hairEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.LivelyNavigatorCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [94],
	},
});
