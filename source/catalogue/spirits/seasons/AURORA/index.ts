import { Collection } from "discord.js";
import { Season } from "../../../../Structures/Season.js";
import { type ItemRaw, SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import AURORA from "./AURORA.js";
import MindfulMiner from "./MindfulMiner.js";
import RunningWayfarer from "./RunningWayfarer.js";
import SeedOfHope from "./SeedOfHope.js";
import WarriorOfLove from "./WarriorOfLove.js";

export default new Season({
	name: SeasonName.Aurora,
	start: skyDate(2_022, 10, 17),
	end: skyDate(2_023, 1, 2),
	guide: AURORA,
	spirits: [RunningWayfarer, MindfulMiner, WarriorOfLove, SeedOfHope],
	inAppPurchases: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Tiara We Can Touch", cost: { money: 4.99 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory21 })
		.set(1 << 1, { name: "Runaway Hairstyle", cost: { money: 2.99 }, emoji: HAIR_EMOJIS.Hair115 })
		.set(1 << 2, { name: "Runaway Outfit", cost: { money: 9.99 }, emoji: OUTFIT_EMOJIS.Outfit39 })
		.set(1 << 3, { name: "Voice of AURORA", cost: { money: 14.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp31 })
		.set(1 << 4, { name: "To The Love Outfit", cost: { money: 9.99 }, emoji: OUTFIT_EMOJIS.Outfit38 })
		.set(1 << 5, { name: "Giving In Cape", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape95 })
		.set(1 << 6, { name: "Wings of AURORA", cost: { money: 24.99 }, emoji: CAPE_EMOJIS.Cape96 }),
	seasonalCandlesRotation: null,
});
