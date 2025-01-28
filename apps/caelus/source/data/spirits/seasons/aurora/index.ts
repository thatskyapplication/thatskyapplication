import { URL } from "node:url";
import { SeasonId } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../utility/emojis.js";
import AURORA from "./aurora.js";
import MindfulMiner from "./mindful-miner.js";
import RunningWayfarer from "./running-wayfarer.js";
import SeedOfHope from "./seed-of-hope.js";
import WarriorOfLove from "./warrior-of-love.js";

export default new Season({
	id: SeasonId.AURORA,
	start: skyDate(2_022, 10, 17),
	end: skyDate(2_023, 1, 2, 2),
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
	patchNotesURL: String(new URL("p0190", LINK_REDIRECTOR_URL)),
});
