import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Moping;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit44;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory23;
const hairEmoji = HAIR_EMOJIS.Hair123;

export default new SeasonalSpirit({
	name: SpiritName.MelancholyMope,
	season: SeasonName.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Face accessory", cost: { seasonalCandles: 6 }, emoji: faceAccessoryEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 4, { name: "Blessing 2", cost: { seasonalCandles: 18 }, emoji: blessing3 })
			.set(1 << 5, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 26 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { name: "Outfit", cost: { seasonalCandles: 28 }, emoji: outfitEmoji })
			.set(1 << 9, { name: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PassageHeart }),
	},
});
