import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Cough;

export default new GuideSpirit({
	id: SpiritId.BlueBirdGuide,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		inProgress: true,
		hasInfographic: false,
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.BlueBirdGuideQuest1 },
			{ name: "Heart 1", cosmetic: Cosmetic.BlueBirdGuideHeart1 },
			{ name: "Pendant", cosmetic: Cosmetic.BlueBirdPendant },
			{
				name: "Ultimate face accessory",
				cosmetic: Cosmetic.BlueBirdGuideUltimateFaceAccessory,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.BlueBirdGuideUltimateCape,
				cost: { seasonalHearts: 3 },
			},
			{
				name: `${emote} 1`,
				cosmetic: Cosmetic.EmoteCough1,
			},
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteCough2,
				cost: { hearts: 3 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.BlueBirdGuideQuest2 },
			{ name: "Heart 2", cosmetic: Cosmetic.BlueBirdGuideHeart2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCough3,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteCough4,
				cost: { hearts: 5 },
			},
			{ name: "Quest 3", cosmetic: Cosmetic.BlueBirdGuideQuest3 },
			{ name: "Heart 3", cosmetic: Cosmetic.BlueBirdGuideHeart3 },
		],
	},
});
