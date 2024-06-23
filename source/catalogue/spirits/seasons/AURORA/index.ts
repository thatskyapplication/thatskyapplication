import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
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
	name: SeasonName.AURORA,
	start: skyDate(2_022, 10, 17),
	end: skyDate(2_023, 1, 2),
	guide: AURORA,
	spirits: [RunningWayfarer, MindfulMiner, WarriorOfLove, SeedOfHope],
	items: [
		{ name: "Tiara We Can Touch", bit: 1 << 0, cost: { money: 4.99 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory21 },
		{ name: "Runaway Hairstyle", bit: 1 << 1, cost: { money: 2.99 }, emoji: HAIR_EMOJIS.Hair115 },
		{ name: "Runaway Outfit", bit: 1 << 2, cost: { money: 9.99 }, emoji: OUTFIT_EMOJIS.Outfit39 },
		{ name: "Voice of AURORA", bit: 1 << 3, cost: { money: 14.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp31 },
		{ name: "To The Love Outfit", bit: 1 << 4, cost: { money: 9.99 }, emoji: OUTFIT_EMOJIS.Outfit38 },
		{ name: "Giving In Cape", bit: 1 << 5, cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape95 },
		{ name: "Wings of AURORA", bit: 1 << 6, cost: { money: 24.99 }, emoji: CAPE_EMOJIS.Cape96 },
	],
	seasonalCandlesRotation: null,
});
