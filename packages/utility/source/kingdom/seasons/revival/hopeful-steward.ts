import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new GuideSpirit({
	id: SpiritId.HopefulSteward,
	seasonId: SeasonId.Revival,
	area: AreaName.AviaryVillage,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.HopefulStewardQuest1,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.HopefulStewardHeart1,
					cost: { candles: 3 },
				},
				{
					translation: CosmeticCommon.Pendant,
					cosmetic: Cosmetic.RevivalPendant,
					seasonPass: true,
					thirdHeight: true,
					children: [
						{
							translation: CosmeticCommon.UltimateHair,
							cosmetic: Cosmetic.HopefulStewardUltimateHair,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
						{
							translation: CosmeticCommon.UltimateCape,
							cosmetic: Cosmetic.HopefulStewardUltimateCape,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{
					translation: CosmeticCommon.HighFive,
					cosmetic: Cosmetic.HopefulStewardHighFive,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.HopefulStewardHeart3,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.HopefulStewardQuest4,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.HopefulStewardHeart4,
					cost: { candles: 3 },
				},
				{ translation: CosmeticCommon.Hug, cosmetic: Cosmetic.HopefulStewardFriendActionHug },
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.HopefulStewardQuest5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
					cosmetic: Cosmetic.HopefulStewardHeart5,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.HopefulStewardQuest6,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 5 },
					cosmetic: Cosmetic.HopefulStewardHeart6,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.HopefulStewardQuest7,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 6 },
					cosmetic: Cosmetic.HopefulStewardHeart7,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
					cosmetic: Cosmetic.HopefulStewardQuest8,
				},
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 7 },
					cosmetic: Cosmetic.HopefulStewardQuest9,
				},
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 8 },
					cosmetic: Cosmetic.HopefulStewardQuest10,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.HopefulStewardHair,
					cost: { candles: 46 },
				},
			],
		],
	},
});
