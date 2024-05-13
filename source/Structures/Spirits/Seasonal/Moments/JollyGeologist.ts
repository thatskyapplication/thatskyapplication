/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit } from "../../Base.js";

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
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Face accessory", cost: { seasonalCandles: 8 }, emoji: faceAccessoryEmoji })
			.set(1 << 3, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 4, { item: `${emote} 3`, cost: { seasonalCandles: 20 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { item: "Blessing 1", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 7, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 8, { item: "Music sheet", cost: { seasonalCandles: 34 }, emoji: musicSheet })
			.set(1 << 9, { item: "Prop", cost: null, emoji: placeablePropEmoji })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.MomentsHeart }),
	},
});
