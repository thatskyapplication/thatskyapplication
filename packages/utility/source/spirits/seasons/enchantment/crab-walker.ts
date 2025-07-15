import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.CrabWalk;

export default new SeasonalSpirit({
	id: SpiritId.CrabWalker,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteCrabWalk1 },
			{ cosmetic: Cosmetic.EmoteCrabWalk2 },
			{
				cosmetic: Cosmetic.CrabWalkerHair,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.CrabWalkerBlessing1 },
			{
				cosmetic: Cosmetic.EmoteCrabWalk3,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.EmoteCrabWalk4 },
			{
				cosmetic: Cosmetic.CrabWalkerBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.CrabWalkerCape },
			{
				cosmetic: Cosmetic.CrabWalkerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteCrabWalk1 },
			{
				cosmetic: Cosmetic.EmoteCrabWalk2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.CrabWalkerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.CrabWalkerHair,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.CrabWalkerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.CrabWalkerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteCrabWalk3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteCrabWalk4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.CrabWalkerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.CrabWalkerCape,
				cost: { candles: 60 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 2, 18), end: skyDate(2021, 2, 22) },
			{ start: skyDate(2023, 3, 16), end: skyDate(2023, 3, 20) },
			{ start: skyDate(2025, 1, 16), end: skyDate(2025, 1, 20) },
		],
		travellingErrors: [2],
	},
});
