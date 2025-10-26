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
			[
				{ cosmetic: Cosmetic.EmoteSpinTrick1 },
				{ cosmetic: Cosmetic.EmoteSpinTrick2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SpinningMentorHair,
					cost: { seasonalCandles: 13 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SpinningMentorBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSpinTrick3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteSpinTrick4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.SpinningMentorMask,
					cost: { seasonalCandles: 23 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SpinningMentorBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.SpinningMentorBlessing3,
					cost: { seasonalCandles: 29 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.SpinningMentorCape,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.SpinningMentorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteSpinTrick1 },
				{
					cosmetic: Cosmetic.EmoteSpinTrick2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SpinningMentorBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SpinningMentorHair,
					cost: { candles: 44 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SpinningMentorSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SpinningMentorWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSpinTrick3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteSpinTrick4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.SpinningMentorMask,
					cost: { candles: 42 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SpinningMentorBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.SpinningMentorCape,
					cost: { candles: 70 },
				},
			],
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
