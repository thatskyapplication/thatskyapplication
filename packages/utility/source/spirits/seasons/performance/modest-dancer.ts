import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.DuetDance;

export default new SeasonalSpirit({
	id: SpiritId.ModestDancer,
	seasonId: SeasonId.Performance,
	action,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.FriendActionDuetDance1 },
			{
				cosmetic: Cosmetic.ModestDancerBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.ModestDancerMusicSheet },
			{
				cosmetic: Cosmetic.ModestDancerMask,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.ModestDancerBlessing2 },
			{
				cosmetic: Cosmetic.ModestDancerBlessing3,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.FriendActionDuetDance2 },
			{
				cosmetic: Cosmetic.ModestDancerOutfit,
				cost: { seasonalCandles: 30 },
			},
			{ cosmetic: Cosmetic.ModestDancerHair },
			{
				cosmetic: Cosmetic.ModestDancerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.FriendActionDuetDance1 },
			{
				cosmetic: Cosmetic.ModestDancerMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.ModestDancerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ModestDancerMask,
				cost: { candles: 30 },
			},
			{
				cosmetic: Cosmetic.ModestDancerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.ModestDancerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.ModestDancerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.FriendActionDuetDance2,
				cost: { hearts: 8 },
			},
			{
				cosmetic: Cosmetic.ModestDancerHair,
				cost: { candles: 40 },
			},
			{
				cosmetic: Cosmetic.ModestDancerOutfit,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		returning: [7],
	},
});
