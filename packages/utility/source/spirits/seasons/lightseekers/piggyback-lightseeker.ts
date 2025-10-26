import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.Carry;

export default new SeasonalSpirit({
	id: SpiritId.PiggybackLightseeker,
	seasonId: SeasonId.Lightseekers,
	action,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[{ cosmetic: Cosmetic.FriendActionCarry1 }],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.PiggybackLightseekerMask,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PiggybackLightseekerBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PiggybackLightseekerBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{ cosmetic: Cosmetic.FriendActionCarry2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.PiggybackLightseekerHair,
					cost: { seasonalCandles: 20 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.PiggybackLightseekerCape,
					seasonPass: true,
				},
			],
		],
		current: [
			[{ cosmetic: Cosmetic.FriendActionCarry1 }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PiggybackLightseekerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.PiggybackLightseekerMask,
					cost: { candles: 24 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PiggybackLightseekerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.PiggybackLightseekerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PiggybackLightseekerBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.FriendActionCarry2,
					level: 2,
					cost: { hearts: 8 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.PiggybackLightseekerHair,
					cost: { candles: 26 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.PiggybackLightseekerCape,
					cost: { candles: 60 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 4, 16), end: skyDate(2020, 4, 20) },
			{ start: skyDate(2021, 3, 4), end: skyDate(2021, 3, 8) },
			{ start: skyDate(2023, 2, 2), end: skyDate(2023, 2, 6) },
			{ start: skyDate(2025, 2, 13), end: skyDate(2025, 2, 17) },
		],
	},
});
