import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Laidback;

export default new SeasonalSpirit({
	id: SpiritId.LaidbackPioneer,
	seasonId: SeasonId.Lightseekers,
	stance,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.StanceLaidback },
			{
				cosmetic: Cosmetic.LaidbackPioneerMask,
				cost: { seasonalCandles: 6 },
			},
			{ cosmetic: Cosmetic.LaidbackPioneerBlessing1 },
			{
				cosmetic: Cosmetic.LaidbackPioneerBlessing2,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.LaidbackPioneerMusicSheet },
			{
				cosmetic: Cosmetic.LaidbackPioneerHair,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.LaidbackPioneerBlessing3 },
			{
				cosmetic: Cosmetic.LaidbackPioneerBlessing4,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.LaidbackPioneerUmbrella },
		],
		current: [
			{ cosmetic: Cosmetic.StanceLaidback },
			{
				cosmetic: Cosmetic.LaidbackPioneerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LaidbackPioneerMask,
				cost: { candles: 30 },
			},
			{
				cosmetic: Cosmetic.LaidbackPioneerHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.LaidbackPioneerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.LaidbackPioneerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LaidbackPioneerMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.LaidbackPioneerHair,
				cost: { candles: 18 },
			},
			{
				cosmetic: Cosmetic.LaidbackPioneerUmbrella,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 2, 27), end: skyDate(2020, 3, 2) },
			{ start: skyDate(2020, 11, 26), end: skyDate(2020, 11, 30) },
			{ start: skyDate(2022, 10, 13), end: skyDate(2022, 10, 17) },
			{ start: skyDate(2025, 6, 5), end: skyDate(2025, 6, 9) },
		],
	},
	hasMarketingVideo: true,
	keywords: ["umbrella"],
});
