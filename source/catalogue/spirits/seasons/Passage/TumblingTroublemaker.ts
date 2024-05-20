import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

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
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 8 }, emoji: blessing3 })
			.set(1 << 3, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 4, { name: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 5, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { name: "Blessing 2", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 7, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 8, { name: "Blessing 3", cost: { seasonalCandles: 32 }, emoji: blessing3 })
			.set(1 << 9, { name: "Face accessory", cost: null, emoji: faceAccessoryEmoji })
			.set(1 << 10, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PassageHeart }),
	},
});
