import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.JollyDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory29;
const hairEmoji = HAIR_EMOJIS.Hair129;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp28;

export default new SeasonalSpirit({
	name: SpiritName.JollyGeologist,
	season: SeasonName.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Face accessory", bit: 1 << 2, cost: { seasonalCandles: 8 }, emoji: faceAccessoryEmoji },
			{ name: "Hair", bit: 1 << 3, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 4, cost: { seasonalCandles: 20 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 6, cost: { seasonalCandles: 28 }, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 7, emoji: blessing3 },
			{ name: "Music sheet", bit: 1 << 8, cost: { seasonalCandles: 34 }, emoji: musicSheet },
			{ name: "Prop", bit: 1 << 9, emoji: placeablePropEmoji },
			{ name: "Seasonal heart", bit: 1 << 10, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.MomentsHeart },
		],
	},
});
