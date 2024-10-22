import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Chuckle;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const outfitEmoji = OUTFIT_EMOJIS.Outfit20;
const maskEmoji = MASK_EMOJIS.Mask46;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp11;

export default new SeasonalSpirit({
	name: SpiritName.ChucklingScout,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteChuckle1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteChuckle2, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.ChucklingScoutMask,
				cost: { seasonalCandles: 12 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.ChucklingScoutBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteChuckle3,
				cost: { seasonalCandles: 14 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteChuckle4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ChucklingScoutBlessing2,
				cost: { seasonalCandles: 17 },
				emoji: blessing2,
			},
			{ name: "Outfit", cosmetic: Cosmetic.ChucklingScoutOutfit, emoji: outfitEmoji },
			{
				name: "Prop",
				cosmetic: Cosmetic.ChucklingScoutProp,
				cost: { seasonalCandles: 20 },
				emoji: placeablePropEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.ChucklingScoutBlessing3, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ChucklingScoutSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AssemblyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteChuckle1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteChuckle2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ChucklingScoutBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ChucklingScoutMask,
				cost: { candles: 36 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ChucklingScoutSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ChucklingScoutWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteChuckle3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteChuckle4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ChucklingScoutOutfit,
				cost: { candles: 65 },
				emoji: outfitEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ChucklingScoutBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ChucklingScoutProp,
				cost: { candles: 45 },
				emoji: placeablePropEmoji,
			},
		],
	},
	visits: {
		returning: [1],
	},
});
