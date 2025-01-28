import { RealmName, SeasonId, SpiritEmote, SpiritName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
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
	name: SpiritName.MindfulMiner,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
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
	},
});
