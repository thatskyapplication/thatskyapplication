import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.BellyScratch;

export default new SeasonalSpirit({
	id: SpiritId.ChillSunbather,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteBellyScratch1 },
				{ cosmetic: Cosmetic.EmoteBellyScratch2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ChillSunbatherBlessing1,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.ChillSunbatherFaceAccessory,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBellyScratch3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBellyScratch4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.ChillSunbatherHairAccessory,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ChillSunbatherBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ChillSunbatherCape,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ChillSunbatherBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ChillSunbatherSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBellyScratch1 },
				{
					cosmetic: Cosmetic.EmoteBellyScratch2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.ChillSunbatherSunlounger,
					cost: { candles: 20 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ChillSunbatherBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.ChillSunbatherFaceAccessory,
					cost: { candles: 66 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ChillSunbatherSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ChillSunbatherWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBellyScratch3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteBellyScratch4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					cosmetic: Cosmetic.ChillSunbatherHairAccessory,
					cost: { candles: 44 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ChillSunbatherBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ChillSunbatherCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 8, 19), end: skyDate(2021, 8, 23) },
			{ start: skyDate(2024, 1, 4), end: skyDate(2024, 1, 8) },
		],
	},
});
