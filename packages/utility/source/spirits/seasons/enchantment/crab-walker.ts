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
			[
				{ cosmetic: Cosmetic.EmoteCrabWalk1 },
				{ cosmetic: Cosmetic.EmoteCrabWalk2, level: 2, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.CrabWalkerHair,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CrabWalkerBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteCrabWalk3,
					cost: { seasonalCandles: 14 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteCrabWalk4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CrabWalkerBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.CrabWalkerCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.CrabWalkerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteCrabWalk1 },
				{
					cosmetic: Cosmetic.EmoteCrabWalk2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CrabWalkerBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.CrabWalkerHair,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.CrabWalkerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.CrabWalkerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteCrabWalk3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteCrabWalk4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CrabWalkerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.CrabWalkerCape,
					cost: { candles: 60 },
				},
			],
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
