import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import { skyDate } from "../../../../Utility2/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility2/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility2/spirits.js";

const emote = SpiritEmote.Ouch;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask52;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory15;
const capeEmoji = CAPE_EMOJIS.Cape72;

export default new SeasonalSpirit({
	name: SpiritName.BumblingBoatswain,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteOuch1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteOuch2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BumblingBoatswainBlessing1,
				cost: { seasonalCandles: 8 },
				emoji: blessing3,
			},
			{ name: "Mask", cosmetic: Cosmetic.BumblingBoatswainMask, emoji: maskEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.BumblingBoatswainMusicSheet,
				cost: { seasonalCandles: 12 },
				emoji: musicSheet,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.BumblingBoatswainBlessing2, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteOuch3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteOuch4, emoji: emoteEmoji },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.BumblingBoatswainBlessing3,
				cost: { seasonalCandles: 20 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.BumblingBoatswainCape, emoji: capeEmoji },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.BumblingBoatswainHairAccessory,
				cost: { seasonalCandles: 24 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.BumblingBoatswainBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BumblingBoatswainSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AbyssHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteOuch1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteOuch2, cost: { hearts: 4 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BumblingBoatswainBlessing1,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.BumblingBoatswainMask,
				cost: { candles: 40 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BumblingBoatswainSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BumblingBoatswainWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteOuch3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteOuch4, cost: { hearts: 6 }, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.BumblingBoatswainMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BumblingBoatswainBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.BumblingBoatswainHairAccessory,
				cost: { candles: 35 },
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.BumblingBoatswainCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			124,
			skyDate(2_024, 10, 10),
		),
	},
});
