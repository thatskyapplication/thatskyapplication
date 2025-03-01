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
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.RaiseTheRoof;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit35;
const maskEmoji = MASK_EMOJIS.Mask69;
const hairEmoji = HAIR_EMOJIS.Hair114;
const capeEmoji = CAPE_EMOJIS.Cape91;

export default new SeasonalSpirit({
	id: SpiritId.MindfulMiner,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRaiseTheRoof1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteRaiseTheRoof2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MindfulMinerBlessing1,
				cost: { seasonalCandles: 10 },
				emoji: blessing3,
			},
			{ name: "Mask", cosmetic: Cosmetic.MindfulMinerMask, emoji: maskEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRaiseTheRoof3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteRaiseTheRoof4, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.MindfulMinerHair,
				cost: { seasonalCandles: 24 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.MindfulMinerBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.MindfulMinerBlessing3,
				cost: { seasonalCandles: 28 },
				emoji: blessing3,
			},
			{ name: "Outfit", cosmetic: Cosmetic.MindfulMinerOutfit, emoji: outfitEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.MindfulMinerCape,
				cost: { seasonalCandles: 32 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.MindfulMinerBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MindfulMinerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AuroraHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRaiseTheRoof1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteRaiseTheRoof2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MindfulMinerBlessing1,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.MindfulMinerMask,
				cost: { candles: 35 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MindfulMinerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MindfulMinerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRaiseTheRoof3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteRaiseTheRoof4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.MindfulMinerHair,
				cost: { candles: 40 },
				emoji: hairEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MindfulMinerBlessing2,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.MindfulMinerOutfit,
				cost: { hearts: 55 },
				emoji: outfitEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.MindfulMinerCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [135],
	},
});
