import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Facepalm;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask49;
const hairEmoji = HAIR_EMOJIS.Hair80;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp10;

export default new SeasonalSpirit({
	name: SpiritName.BaffledBotanist,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFacepalm1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteFacepalm2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BaffledBotanistBlessing1,
				cost: { seasonalCandles: 10 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.BaffledBotanistHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFacepalm3,
				cost: { seasonalCandles: 12 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteFacepalm4, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.BaffledBotanistMask,
				cost: { seasonalCandles: 14 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.BaffledBotanistBlessing2, emoji: blessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.BaffledBotanistBlessing3,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: "Prop", cosmetic: Cosmetic.BaffledBotanistProp, emoji: placeablePropEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BaffledBotanistSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AssemblyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFacepalm1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteFacepalm2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BaffledBotanistBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.BaffledBotanistMask,
				cost: { candles: 24 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BaffledBotanistSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BaffledBotanistWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFacepalm3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteFacepalm4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BaffledBotanistHair,
				cost: { candles: 45 },
				emoji: hairEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BaffledBotanistBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.BaffledBotanistProp,
				cost: { candles: 45 },
				emoji: placeablePropEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(78, skyDate(2_023, 1, 5))
			.set(123, skyDate(2_024, 9, 26)),
		returning: [1],
	},
});
