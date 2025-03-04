import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.RemembranceGuide,
	seasonId: SeasonId.Remembrance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.RemembranceGuideQuest1,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.RemembranceGuideHeart1,
				cost: { candles: 3 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.RemembrancePendant },
			{
				name: "Ultimate neck accessory",
				cosmetic: Cosmetic.RemembranceGuideUltimateNeckAccessory,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate prop",
				cosmetic: Cosmetic.RemembranceGuideUltimateProp,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.RemembranceGuideQuest2,
			},
			{
				name: "Chimes",
				cosmetic: Cosmetic.RemembranceGuideChimes,
				cost: { candles: 30 },
			},
			{
				name: FriendAction.HighFive,
				cosmetic: Cosmetic.RemembranceGuideHighFive,
			},
			{
				name: "Shared space spell 1",
				cosmetic: Cosmetic.RemembranceGuideSharedSpaceSpell1,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.RemembranceGuideQuest3,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.RemembranceGuideHeart2,
				cost: { candles: 3 },
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.RemembranceGuideQuest4,
			},
			{
				name: "Kettle",
				cosmetic: Cosmetic.RemembranceGuideKettle,
				cost: { candles: 50 },
			},
			{
				name: FriendAction.DoubleFive,
				cosmetic: Cosmetic.RemembranceGuideDoubleFive,
			},
			{
				name: "Shared space spell 2",
				cosmetic: Cosmetic.RemembranceGuideSharedSpaceSpell2,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.RemembranceGuideQuest5,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.RemembranceGuideHeart3,
				cost: { candles: 3 },
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.RemembranceGuideQuest6,
			},
			{
				name: "Potted plant",
				cosmetic: Cosmetic.RemembranceGuidePottedPlant,
				cost: { candles: 40 },
			},
			{
				name: "Quest 7",
				cosmetic: Cosmetic.RemembranceGuideQuest7,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.RemembranceGuideHeart4,
				cost: { candles: 3 },
			},
			{
				name: "Quest 8",
				cosmetic: Cosmetic.RemembranceGuideQuest8,
			},
			{
				name: "Crab plushie",
				cosmetic: Cosmetic.RemembranceGuideCrabPlushie,
				cost: { hearts: 19 },
			},
			{
				name: "Manta plushie",
				cosmetic: Cosmetic.RemembranceGuideMantaPlushie,
				cost: { hearts: 17 },
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.RemembranceGuideFriendActionHug,
			},
			{
				name: "Shared space spell 3",
				cosmetic: Cosmetic.RemembranceGuideSharedSpaceSpell3,
			},
			{
				name: "Quest 9",
				cosmetic: Cosmetic.RemembranceGuideQuest9,
			},
			{
				name: "Shared space spell 4",
				cosmetic: Cosmetic.RemembranceGuideSharedSpaceSpell4,
			},
			{
				name: "Quest 10",
				cosmetic: Cosmetic.RemembranceGuideQuest10,
			},
		],
	},
});
