import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Moping;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit45;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory23;
const hairEmoji = HAIR_EMOJIS.Hair123;

export default new SeasonalSpirit({
	name: SpiritName.MelancholyMope,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteMoping1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteMoping2, emoji: emoteEmoji },
			{
				name: "Face accessory",
				cosmetic: Cosmetic.MelancholyMopeFaceAccessory,
				cost: { seasonalCandles: 6 },
				emoji: faceAccessoryEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.MelancholyMopeBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MelancholyMopeBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.MelancholyMopeHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteMoping3,
				cost: { seasonalCandles: 26 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteMoping4, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.MelancholyMopeOutfit,
				cost: { seasonalCandles: 28 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.MelancholyMopeBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MelancholyMopeSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PassageHeart,
			},
		],
	},
});
