import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Peek;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit18;
const maskEmoji = MASK_EMOJIS.Mask37;
const capeEmoji = CAPE_EMOJIS.Cape43;

export default new SeasonalSpirit({
	id: SpiritId.PeekingPostman,
	seasonId: SeasonId.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePeek1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmotePeek2, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.PeekingPostmanMusicSheet,
				cost: { seasonalCandles: 12 },
				emoji: musicSheet,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.PeekingPostmanBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePeek3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmotePeek4, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.PeekingPostmanOutfit,
				cost: { seasonalCandles: 21 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.PeekingPostmanBlessing2, emoji: blessing2 },
			{
				name: "Cape",
				cosmetic: Cosmetic.PeekingPostmanCape,
				cost: { seasonalCandles: 27 },
				emoji: capeEmoji,
			},
			{ name: "Rabbit mask", cosmetic: Cosmetic.PeekingPostmanRabbitMask, emoji: maskEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PeekingPostmanSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DreamsHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePeek1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmotePeek2, cost: { hearts: 4 }, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.PeekingPostmanMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PeekingPostmanBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Rabbit mask",
				cosmetic: Cosmetic.PeekingPostmanRabbitMask,
				cost: { candles: 54 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PeekingPostmanSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PeekingPostmanWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmotePeek3, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmotePeek4, cost: { hearts: 6 }, emoji: emoteEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.PeekingPostmanCape,
				cost: { candles: 65 },
				emoji: capeEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PeekingPostmanBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.PeekingPostmanOutfit,
				cost: { candles: 70 },
				emoji: outfitEmoji,
			},
		],
	},
	keywords: ["rabbit", "rabbit mask"],
	visits: {
		travelling: [64],
	},
});
