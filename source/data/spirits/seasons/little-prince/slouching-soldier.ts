import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Slouch;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const hairEmoji = HAIR_EMOJIS.Hair85;
const capeEmoji = CAPE_EMOJIS.Cape60;

export default new SeasonalSpirit({
	name: SpiritName.SlouchingSoldier,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSlouch1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSlouch2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SlouchingSoldierBlessing1,
				cost: { seasonalCandles: 10 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.SlouchingSoldierHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSlouch3,
				cost: { seasonalCandles: 14 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSlouch4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SlouchingSoldierBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.SlouchingSoldierMusicSheet, emoji: musicSheet },
			{
				name: "Cape",
				cosmetic: Cosmetic.SlouchingSoldierCape,
				cost: { seasonalCandles: 22 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.SlouchingSoldierBlessing3, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SlouchingSoldierSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.LittlePrinceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSlouch1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSlouch2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SlouchingSoldierSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SlouchingSoldierBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SlouchingSoldierMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SlouchingSoldierHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SlouchingSoldierWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSlouch3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSlouch4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SlouchingSoldierBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SlouchingSoldierCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			81,
			skyDate(2_023, 2, 16),
		),
	},
});
