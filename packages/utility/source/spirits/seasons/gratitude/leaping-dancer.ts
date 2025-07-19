import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Leap;

export default new SeasonalSpirit({
	id: SpiritId.LeapingDancer,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteLeap1 },
			{ cosmetic: Cosmetic.EmoteLeap2 },
			{
				cosmetic: Cosmetic.LeapingDancerSmallBell,
				cost: { seasonalCandles: 10 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.LeapingDancerBlessing1,
			},
			{
				cosmetic: Cosmetic.EmoteLeap3,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.EmoteLeap4 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.LeapingDancerBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{
				cosmetic: Cosmetic.LeapingDancerMask,
				cost: { hearts: 5 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteLeap1 },
			{ cosmetic: Cosmetic.EmoteLeap2, cost: { hearts: 4 } },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.LeapingDancerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LeapingDancerSmallBell,
				cost: { candles: 40 },
			},
			{
				translation: CosmeticCommon.Heart,
				cosmetic: Cosmetic.LeapingDancingHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.LeapingDancingWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ cosmetic: Cosmetic.EmoteLeap3, cost: { hearts: 3 } },
			{ cosmetic: Cosmetic.EmoteLeap4, cost: { hearts: 6 } },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.LeapingDancerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LeapingDancerMask,
				cost: { candles: 54 },
			},
		],
	},
	keywords: ["fox", "fox mask"],
	visits: {
		travelling: [
			{ start: skyDate(2020, 6, 25), end: skyDate(2020, 6, 29) },
			{ start: skyDate(2021, 3, 18), end: skyDate(2021, 3, 22) },
			{ start: skyDate(2024, 6, 6), end: skyDate(2024, 6, 10) },
		],
		returning: [3],
	},
});
