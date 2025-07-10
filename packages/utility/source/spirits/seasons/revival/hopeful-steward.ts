import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.HopefulSteward,
	seasonId: SeasonId.Revival,
	offer: {
		current: [
			{
				cosmetic: Cosmetic.HopefulStewardQuest1,
			},
			{
				cosmetic: Cosmetic.HopefulStewardHeart1,
				cost: { candles: 3 },
			},
			{ cosmetic: Cosmetic.RevivalPendant },
			{
				cosmetic: Cosmetic.HopefulStewardUltimateHair,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.HopefulStewardUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			// {
			// 				// 	cosmetic: Cosmetic.HopefulStewardQuest2,
			// 	emoji: MISCELLANEOUS_EMOJIS.Quest,
			// },
			// {
			// 				// 	cosmetic: Cosmetic.HopefulStewardHeart2,
			// 	cost: { candles: 3 },
			// 	emoji: MISCELLANEOUS_EMOJIS.Heart,
			// },
			{
				cosmetic: Cosmetic.HopefulStewardQuest3,
			},
			{
				cosmetic: Cosmetic.HopefulStewardHeart3,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.HopefulStewardQuest4,
			},
			{
				cosmetic: Cosmetic.HopefulStewardHeart4,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.HopefulStewardFriendActionHug,
			},
			{
				cosmetic: Cosmetic.HopefulStewardQuest5,
			},
			{
				cosmetic: Cosmetic.HopefulStewardHeart5,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.HopefulStewardQuest6,
			},
			{
				cosmetic: Cosmetic.HopefulStewardHeart6,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.HopefulStewardQuest7,
			},
			{
				cosmetic: Cosmetic.HopefulStewardHeart7,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.HopefulStewardQuest8,
			},
			{
				cosmetic: Cosmetic.HopefulStewardQuest9,
			},
			{
				cosmetic: Cosmetic.HopefulStewardQuest10,
			},
			{
				cosmetic: Cosmetic.HopefulStewardHair,
				cost: { candles: 46 },
			},
		],
	},
});
