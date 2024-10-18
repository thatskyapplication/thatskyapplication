import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Somersault;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory24;
const hairEmoji = HAIR_EMOJIS.Hair122;
const capeEmoji = CAPE_EMOJIS.Cape102;

export default new SeasonalSpirit({
	name: SpiritName.TumblingTroublemaker,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSomersault1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSomersault2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing1,
				cost: { seasonalCandles: 8 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.TumblingTroublemakerHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSomersault3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSomersault4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing2,
				cost: { seasonalCandles: 28 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.TumblingTroublemakerCape, emoji: capeEmoji },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing3,
				cost: { seasonalCandles: 32 },
				emoji: blessing3,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.TumblingTroublemakerFaceAccessory,
				emoji: faceAccessoryEmoji,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TumblingTroublemakerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PassageHeart,
			},
		],
	},
});
