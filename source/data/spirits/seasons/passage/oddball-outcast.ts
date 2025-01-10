import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.HackySack;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit46;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace30;
const hairEmoji = HAIR_EMOJIS.Hair125;

export default new SeasonalSpirit({
	name: SpiritName.OddballOutcast,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHackySack1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteHackySack2, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.OddballOutcastHair,
				cost: { seasonalCandles: 14 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.OddballOutcastBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.OddballOutcastBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing3,
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.OddballOutcastNeckAccessory,
				emoji: necklaceEmoji,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHackySack3,
				cost: { seasonalCandles: 24 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteHackySack4, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.OddballOutcastOutfit,
				cost: { seasonalCandles: 32 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.OddballOutcastBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.OddballOutcastSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PassageHeart,
			},
		],
	},
	visits: {
		returning: [7],
	},
});
