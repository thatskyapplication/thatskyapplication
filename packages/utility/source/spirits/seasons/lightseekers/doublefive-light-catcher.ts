import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.DoubleFive;

export default new SeasonalSpirit({
	id: SpiritId.DoublefiveLightCatcher,
	seasonId: SeasonId.Lightseekers,
	action,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[{ cosmetic: Cosmetic.FriendActionDoubleFive1 }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.DoublefiveLightCatcherBlessing1,
					cost: { seasonalCandles: 4 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.DoublefiveLightCatcherHair,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.DoublefiveLightCatcherMask,
					cost: { seasonalCandles: 6 },
				},
				{ cosmetic: Cosmetic.FriendActionDoubleFive2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.DoublefiveLightCatcherBlessing2,
					cost: { seasonalCandles: 8 },
				},
			],
			[{ cosmetic: Cosmetic.DoublefiveLightCatcherFlute, seasonPass: true }],
		],
		current: [
			[{ cosmetic: Cosmetic.FriendActionDoubleFive1 }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.DoublefiveLightCatcherBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.DoublefiveLightCatcherMask,
					cost: { candles: 24 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.DoublefiveLightCatcherHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.DoublefiveLightCatcherWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.DoublefiveLightCatcherBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.FriendActionDoubleFive2,
					cost: { hearts: 7 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.DoublefiveLightCatcherFlute,
					cost: { candles: 55 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.DoublefiveLightCatcherHair,
					cost: { candles: 34 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 2, 14, 12), end: skyDate(2020, 2, 17) },
			{ start: skyDate(2021, 4, 15), end: skyDate(2021, 4, 19) },
			{ start: skyDate(2022, 7, 21), end: skyDate(2022, 7, 27) },
			{ start: skyDate(2024, 5, 23), end: skyDate(2024, 5, 27) },
		],
	},
});
