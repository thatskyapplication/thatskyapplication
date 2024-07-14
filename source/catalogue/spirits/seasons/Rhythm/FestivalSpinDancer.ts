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
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.SpinDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit13;
const hairEmoji = HAIR_EMOJIS.Hair49;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp18;

export default new SeasonalSpirit({
	name: SpiritName.FestivalSpinDancer,
	season: SeasonName.Rhythm,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSpinDance1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSpinDance2, emoji: emoteEmoji },
			{
				name: "Blessing",
				cosmetic: Cosmetic.FestivalSpinDancerBlessing1,
				cost: { seasonalCandles: 10 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.FestivalSpinDancerMusicSheet, emoji: musicSheet },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSpinDance3,
				cost: { seasonalCandles: 12 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSpinDance4, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.FestivalSpinDancerHair,
				cost: { seasonalCandles: 14 },
				emoji: hairEmoji,
			},
			{ name: "Outfit", cosmetic: Cosmetic.FestivalSpinDancerOutfit, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.FestivalSpinDancerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RhythmHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSpinDance1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSpinDance2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FestivalSpinDancerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.FestivalSpinDancerMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.FestivalSpinDancerSeasonalHeart,
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
				cosmetic: Cosmetic.EmoteSpinDance3,
				cost: { hearts: 5 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSpinDance4,
				cost: { hearts: 10 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.FestivalSpinDancerHair,
				cost: { candles: 34 },
				emoji: hairEmoji,
			},
			{ name: "Prop", cost: { candles: 30 }, emoji: placeablePropEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.FestivalSpinDancerOutfit,
				cost: { candles: 65 },
				emoji: outfitEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(17, skyDate(2_020, 9, 3))
			.set(46, skyDate(2_021, 10, 14))
			.set(103, skyDate(2_023, 12, 21)),
	},
});
