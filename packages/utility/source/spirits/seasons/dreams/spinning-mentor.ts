import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.SpinTrick;

export default new SeasonalSpirit({
	id: SpiritId.SpinningMentor,
	seasonId: SeasonId.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteSpinTrick1 },
			{ cosmetic: Cosmetic.EmoteSpinTrick2 },
			{
				cosmetic: Cosmetic.SpinningMentorHair,
				cost: { seasonalCandles: 13 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.SpinningMentorBlessing1,
			},
			{
				cosmetic: Cosmetic.EmoteSpinTrick3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.EmoteSpinTrick4 },
			{
				cosmetic: Cosmetic.SpinningMentorMask,
				cost: { seasonalCandles: 23 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.SpinningMentorBlessing2,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.SpinningMentorBlessing3,
				cost: { seasonalCandles: 29 },
			},
			{ cosmetic: Cosmetic.SpinningMentorCape },
			{
				cosmetic: Cosmetic.SpinningMentorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteSpinTrick1 },
			{
				cosmetic: Cosmetic.EmoteSpinTrick2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.SpinningMentorBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.SpinningMentorHair,
				cost: { candles: 44 },
			},
			{
				cosmetic: Cosmetic.SpinningMentorSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.SpinningMentorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteSpinTrick3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteSpinTrick4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.SpinningMentorMask,
				cost: { candles: 42 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.SpinningMentorBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.SpinningMentorCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2022, 4, 14), end: skyDate(2022, 4, 18) },
			{ start: skyDate(2023, 7, 6), end: skyDate(2023, 7, 10) },
			{ start: skyDate(2024, 8, 15), end: skyDate(2024, 8, 19) },
		],
	},
});
