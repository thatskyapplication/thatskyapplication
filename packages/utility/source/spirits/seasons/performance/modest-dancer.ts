import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
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
			[{ cosmetic: Cosmetic.FriendActionDuetDance1 }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ModestDancerBlessing1,
					cost: { seasonalCandles: 8 },
				},
				{ cosmetic: Cosmetic.ModestDancerMusicSheet, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ModestDancerMask,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ModestDancerBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ModestDancerBlessing3,
					cost: { seasonalCandles: 26 },
				},
				{ cosmetic: Cosmetic.FriendActionDuetDance2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ModestDancerOutfit,
					cost: { seasonalCandles: 30 },
				},
				{ cosmetic: Cosmetic.ModestDancerHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.ModestDancerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.FriendActionDuetDance1 },
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.ModestDancerMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ModestDancerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ModestDancerMask,
					cost: { candles: 30 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ModestDancerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ModestDancerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ModestDancerBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.FriendActionDuetDance2,
					cost: { hearts: 8 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.ModestDancerHair,
					cost: { candles: 40 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ModestDancerOutfit,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		returning: [7],
	},
});
