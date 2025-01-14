import { RealmName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
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
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHackySack1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteHackySack2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.OddballOutcastBlessing1,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.OddballOutcastHair,
				cost: { candles: 40 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.OddballOutcastSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.OddballOutcastWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHackySack3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteHackySack4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.OddballOutcastBlessing2,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.OddballOutcastNeckAccessory,
				cost: { candles: 65 },
				emoji: necklaceEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.OddballOutcastOutfit,
				cost: { candles: 65 },
				emoji: outfitEmoji,
			},
		],
	},
	visits: {
		returning: [7],
	},
});
