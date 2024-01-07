/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	EMOTES_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.Moping;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const emoteEmoji = EMOTES_EMOJIS.Moping;
const outfitEmoji = OUTFIT_EMOJIS.Outfit44;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory23;
const hairEmoji = HAIR_EMOJIS.Hair123;

export default new SeasonalSpirit({
	name: SpiritName.MelancholyMope,
	season: SeasonName.Passage,
	emote,
	realm: Realm.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Face accessory", cost: { seasonalCandles: 6 }, emoji: faceAccessoryEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 18 }, emoji: blessing3 })
			.set(1 << 5, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 26 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Outfit", cost: { seasonalCandles: 28 }, emoji: outfitEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PassageHeart }),
	},
});
