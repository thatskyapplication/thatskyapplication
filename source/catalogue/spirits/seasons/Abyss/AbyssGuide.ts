import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const heartEmoji = MISCELLANEOUS_EMOJIS.Heart;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory15;

export default new GuideSpirit({
	name: SpiritName.AbyssGuide,
	season: SeasonName.Abyss,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { name: "Heart 1", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 2, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace18 })
			.set(1 << 3, { name: "Ultimate face accessory", cost: { seasonalHearts: 1 }, emoji: faceAccessoryEmoji })
			.set(1 << 4, { name: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape73 })
			.set(1 << 5, { name: "Ultimate mask", cost: { seasonalHearts: 1 }, emoji: MASK_EMOJIS.Mask55 })
			.set(1 << 6, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 7, { name: "Heart 2", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 8, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 9, { name: "Heart 3", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 10, { name: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { name: "Heart 4", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 12, { name: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 13, { name: "Heart 5", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 14, { name: "Mask", cost: { candles: 48 }, emoji: MASK_EMOJIS.Mask56 }),
	},
});
