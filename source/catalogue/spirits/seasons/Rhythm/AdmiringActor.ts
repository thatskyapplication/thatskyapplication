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
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.BlowKiss;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit14;
const maskEmoji = MASK_EMOJIS.Mask24;

export default new SeasonalSpirit({
	name: SpiritName.AdmiringActor,
	season: SeasonName.Rhythm,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBlowKiss1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBlowKiss2, emoji: emoteEmoji },
			{
				name: "Blessing",
				cosmetic: Cosmetic.AdmiringActorBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.AdmiringActorMusicSheet, emoji: musicSheet },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBlowKiss3,
				cost: { seasonalCandles: 14 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBlowKiss4, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.AdmiringActorOutfit,
				cost: { seasonalCandles: 16 },
				emoji: outfitEmoji,
			},
			{ name: "Mask", cosmetic: Cosmetic.AdmiringActorMask, emoji: maskEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.AdmiringActorSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RhythmHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBlowKiss1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBlowKiss2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.AdmiringActorBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.AdmiringActorMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.AdmiringActorSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBlowKiss3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBlowKiss4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.AdmiringActorOutfit,
				cost: { candles: 65 },
				emoji: outfitEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.AdmiringActorMask,
				cost: { candles: 42 },
				emoji: maskEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(20, skyDate(2_020, 10, 15))
			.set(38, skyDate(2_021, 6, 24))
			.set(89, skyDate(2_023, 6, 8)),
	},
});
