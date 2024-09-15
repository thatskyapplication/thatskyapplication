import { Season } from "../../../../Structures/Season.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
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
		{
			name: "Runaway Hairstyle",
			cosmetic: Cosmetic.RunawayHairstyle,
			cost: { money: 2.99 },
			emoji: HAIR_EMOJIS.Hair115,
		},
		{
			name: "Tiara We Can Touch",
			cosmetic: Cosmetic.TiaraWeCanTouch,
			cost: { money: 4.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory21,
		},
		{
			name: "Voice of AURORA",
			cosmetic: Cosmetic.VoiceOfAURORA,
			cost: { money: 14.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp31,
		},
		{
			name: "Runaway Outfit",
			cosmetic: Cosmetic.RunawayOutfit,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit39,
		},
		{
			name: "To The Love Outfit",
			cosmetic: Cosmetic.ToTheLoveOutfit,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit38,
		},
		{
			name: "Giving In Cape",
			cosmetic: Cosmetic.GivingInCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape95,
		},
		{
			name: "Wings of AURORA",
			cosmetic: Cosmetic.WingsOfAURORA,
			cost: { money: 24.99 },
			emoji: CAPE_EMOJIS.Cape96,
		},
	],
	seasonalCandlesRotation: null,
});
