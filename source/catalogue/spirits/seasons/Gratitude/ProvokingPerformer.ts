import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Kabuki;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask06;
const hairEmoji = HAIR_EMOJIS.Hair38;

export default new SeasonalSpirit({
	name: SpiritName.ProvokingPerformer,
	season: SeasonName.Gratitude,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteKabuki1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteKabuki2, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProvokingPerformerMusicSheet,
				cost: { seasonalCandles: 10 },
				emoji: musicSheet,
			},
			{ name: "Blessing", cosmetic: Cosmetic.ProvokingPerformerBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteKabuki3,
				cost: { seasonalCandles: 12 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteKabuki4, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.ProvokingPerformerHair,
				cost: { seasonalCandles: 14 },
				emoji: hairEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProvokingPerformerMask,
				cost: { hearts: 5 },
				emoji: maskEmoji,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteKabuki1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteKabuki2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProvokingPerformerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProvokingPerformerMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProvokingPerformerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ProvokingPerformerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteKabuki3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteKabuki4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProvokingPerformerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProvokingPerformerMask,
				cost: { candles: 42 },
				emoji: maskEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProvokingPerformerHair,
				cost: { candles: 34 },
				emoji: hairEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(4, skyDate(2_020, 3, 12))
			.set(19, skyDate(2_020, 10, 1))
			.set(84, skyDate(2_023, 3, 30))
			.set("Error", skyDate(2_023, 4, 13)),
	},
});
