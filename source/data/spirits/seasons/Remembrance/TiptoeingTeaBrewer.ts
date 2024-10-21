import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility2/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility2/spirits.js";

const emote = SpiritEmote.Tiptoeing;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit42;
const hairEmoji = HAIR_EMOJIS.Hair121;
const capeEmoji = CAPE_EMOJIS.Cape100;

export default new SeasonalSpirit({
	name: SpiritName.TiptoeingTeaBrewer,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTiptoeing1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteTiptoeing2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.TiptoeingTeaBrewerHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTiptoeing3,
				cost: { seasonalCandles: 24 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteTiptoeing4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing2,
				cost: { seasonalCandles: 34 },
				emoji: blessing3,
			},
			{ name: "Outfit", cosmetic: Cosmetic.TiptoeingTeaBrewerOutfit, emoji: outfitEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.TiptoeingTeaBrewerCape,
				cost: { seasonalCandles: 38 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TiptoeingTeaBrewerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RemembranceHeart,
			},
		],
	},
});
