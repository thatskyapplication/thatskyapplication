import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants-2.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.JollyDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory29;
const hairEmoji = HAIR_EMOJIS.Hair129;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp28;

export default new SeasonalSpirit({
	name: SpiritName.JollyGeologist,
	seasonId: SeasonId.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteJollyDance1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteJollyDance2, emoji: emoteEmoji },
			{
				name: "Face accessory",
				cosmetic: Cosmetic.JollyGeologistFaceAccessory,
				cost: { seasonalCandles: 8 },
				emoji: faceAccessoryEmoji,
			},
			{ name: "Hair", cosmetic: Cosmetic.JollyGeologistHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteJollyDance3,
				cost: { seasonalCandles: 20 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteJollyDance4, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.JollyGeologistBlessing1,
				cost: { seasonalCandles: 28 },
				emoji: blessing3,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.JollyGeologistBlessing2, emoji: blessing3 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.JollyGeologistMusicSheet,
				cost: { seasonalCandles: 34 },
				emoji: musicSheet,
			},
			{ name: "Prop", cosmetic: Cosmetic.JollyGeologistProp, emoji: placeablePropEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.JollyGeologistSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MomentsHeart,
			},
		],
	},
});
