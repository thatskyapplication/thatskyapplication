import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Scold;

export default new SeasonalSpirit({
	id: SpiritId.ScoldingStudent,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteScold1 },
				{ cosmetic: Cosmetic.EmoteScold2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ScoldingStudentMask,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ScoldingStudentBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteScold3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteScold4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ScoldingStudentHair,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ScoldingStudentBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ScoldingStudentBlessing3,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ScoldingStudentCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ScoldingStudentSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteScold1 },
				{
					cosmetic: Cosmetic.EmoteScold2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ScoldingStudentBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ScoldingStudentMask,
					cost: { candles: 24 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ScoldingStudentSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ScoldingStudentWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteScold3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteScold4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ScoldingStudentBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ScoldingStudentHair,
					cost: { candles: 50 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ScoldingStudentCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	keywords: ["clover", "clover cape"],
	visits: {
		travelling: [
			{ start: skyDate(2022, 8, 18), end: skyDate(2022, 8, 22) },
			{ start: skyDate(2024, 12, 5), end: skyDate(2024, 12, 9) },
		],
		returning: [12],
	},
});
