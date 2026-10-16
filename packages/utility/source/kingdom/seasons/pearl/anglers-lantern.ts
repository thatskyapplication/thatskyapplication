import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit, SpiritKind } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new GuideSpirit({
	id: SpiritId.AnglersLantern,
	kind: SpiritKind.Entity,
	seasonId: SeasonId.Pearl,
	area: AreaName.PearlVillage,
	offer: {
		hasInfographic: false,
		inProgress: true,
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.AnglersLanternQuest1,
				},
				null,
				{
					translation: CosmeticCommon.Pendant,
					cosmetic: Cosmetic.PearlPendant,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.AnglersLanternQuest2,
				},
				null,
				{
					translation: CosmeticCommon.UltimateHairAccessory,
					cosmetic: Cosmetic.AnglersLanternUltimateHairAccessory,
					cost: { seasonalHearts: 1 },
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.AnglersLanternQuest3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.AnglersLanternHeart1,
				},
				{
					translation: CosmeticCommon.UltimateProp,
					cosmetic: Cosmetic.AnglersLanternUltimateProp,
					cost: { seasonalHearts: 1 },
					seasonPass: true,
				},
			],
			[null],
			[
				null,
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.AnglersLanternHeart2,
				},
				{
					translation: CosmeticCommon.UltimateCape,
					cosmetic: Cosmetic.AnglersLanternUltimateCape,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[null],
			[
				null,
				{
					translation: CosmeticCommon.Prop,
					cosmetic: Cosmetic.AnglersLanternProp,
					cost: { candles: 32 },
				},
			],
		],
	},
});
