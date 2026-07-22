import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new GuideSpirit({
	id: SpiritId.VaseWithFifteenSunflowers,
	seasonId: SeasonId.DearVanGogh,
	area: AreaName.StarryGallery,
	offer: {
		inProgress: true,
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersQuest1,
				},
				null,
				{
					translation: CosmeticCommon.Pendant,
					cosmetic: Cosmetic.DearVanGoghPendant,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersQuest2,
				},
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 1 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersProp1,
				},
				{
					translation: CosmeticCommon.UltimateHair,
					cosmetic: Cosmetic.VaseWithFifteenSunflowersUltimateHair,
					cost: { seasonalHearts: 1 },
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersQuest3,
				},
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 2 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersProp2,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersHeart1,
				},
			],
			[
				null,
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 3 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersProp3,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersQuest4,
				},
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 4 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersProp4,
				},
				{
					translation: CosmeticCommon.UltimateCape,
					cosmetic: Cosmetic.VaseWithFifteenSunflowersUltimateCape,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersQuest5,
				},
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 5 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersProp5,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersQuest6,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersHeart2,
				},
			],
			[
				null,
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 6 },
					cosmetic: Cosmetic.VaseWithFifteenSunflowersProp6,
				},
				{
					translation: CosmeticCommon.UltimateProp,
					cosmetic: Cosmetic.VaseWithFifteenSunflowersUltimateProp,
					cost: { seasonalHearts: 1 },
					seasonPass: true,
				},
			],
		],
	},
});
