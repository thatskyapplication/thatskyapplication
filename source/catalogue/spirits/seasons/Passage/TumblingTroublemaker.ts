import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
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
	season: SeasonName.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 8 }, emoji: blessing3 },
			{ name: "Hair", bit: 1 << 3, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 4, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 6, cost: { seasonalCandles: 28 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 7, emoji: capeEmoji },
			{ name: "Blessing 3", bit: 1 << 8, cost: { seasonalCandles: 32 }, emoji: blessing3 },
			{ name: "Face accessory", bit: 1 << 9, emoji: faceAccessoryEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 10,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PassageHeart,
			},
		],
	},
});
