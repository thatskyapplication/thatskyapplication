import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Gloat;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit21;
const hairEmoji = HAIR_EMOJIS.Hair86;

export default new SeasonalSpirit({
	name: SpiritName.GloatingNarcissist,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGloat1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGloat2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GloatingNarcissistBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.GloatingNarcissistMusicSheet, emoji: musicSheet },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGloat3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGloat4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GloatingNarcissistBlessing2,
				cost: { seasonalCandles: 22 },
				emoji: blessing2,
			},
			{ name: "Outfit", cosmetic: Cosmetic.GloatingNarcissistOutfit, emoji: outfitEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.GloatingNarcissistHair,
				cost: { seasonalCandles: 26 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.GloatingNarcissistBlessing3, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.GloatingNarcissistSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.LittlePrinceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGloat1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteGloat2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.GloatingNarcissistSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GloatingNarcissistBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.GloatingNarcissistMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.GloatingNarcissistHair,
				cost: { candles: 46 },
				emoji: hairEmoji,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.GloatingNarcissistWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGloat3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteGloat4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GloatingNarcissistBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.GloatingNarcissistOutfit,
				cost: { candles: 65 },
				emoji: outfitEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			92,
			skyDate(2_023, 7, 20),
		),
	},
});
