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
			{ cosmetic: Cosmetic.EmoteScold1 },
			{ cosmetic: Cosmetic.EmoteScold2 },
			{
				cosmetic: Cosmetic.ScoldingStudentMask,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.ScoldingStudentBlessing1 },
			{
				cosmetic: Cosmetic.EmoteScold3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.EmoteScold4 },
			{
				cosmetic: Cosmetic.ScoldingStudentHair,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.ScoldingStudentBlessing2 },
			{
				cosmetic: Cosmetic.ScoldingStudentBlessing3,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.ScoldingStudentCape },
			{
				cosmetic: Cosmetic.ScoldingStudentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteScold1 },
			{
				cosmetic: Cosmetic.EmoteScold2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.ScoldingStudentBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ScoldingStudentMask,
				cost: { candles: 24 },
			},
			{
				cosmetic: Cosmetic.ScoldingStudentSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.ScoldingStudentWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteScold3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteScold4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.ScoldingStudentBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ScoldingStudentHair,
				cost: { candles: 50 },
			},
			{
				cosmetic: Cosmetic.ScoldingStudentCape,
				cost: { candles: 70 },
			},
		],
	},
	keywords: ["clover", "clover cape"],
	visits: {
		travelling: [
			{ start: skyDate(2022, 8, 18), end: skyDate(2022, 8, 22) },
			{ start: skyDate(2024, 12, 5), end: skyDate(2024, 12, 9) },
		],
	},
});
