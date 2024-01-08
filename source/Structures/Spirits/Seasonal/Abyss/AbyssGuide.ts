/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, GuideSpirit, SpiritName } from "../../Base.js";

const heartEmoji = MISCELLANEOUS_EMOJIS.Heart;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory15;

export default new GuideSpirit({
	name: SpiritName.AbyssGuide,
	season: SeasonName.Abyss,
	realm: Realm.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: "Heart 1", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace18 })
			.set(1 << 3, { item: "Ultimate face accessory", cost: { seasonalHearts: 1 }, emoji: faceAccessoryEmoji })
			.set(1 << 4, { item: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape73 })
			.set(1 << 5, { item: "Ultimate mask", cost: { seasonalHearts: 1 }, emoji: MASK_EMOJIS.Mask55 })
			.set(1 << 6, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 7, { item: "Heart 2", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 8, { item: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 9, { item: "Heart 3", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 10, { item: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { item: "Heart 4", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 12, { item: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 13, { item: "Heart 5", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 14, { item: "Mask", cost: { candles: 48 }, emoji: MASK_EMOJIS.Mask56 }),
	},
});
