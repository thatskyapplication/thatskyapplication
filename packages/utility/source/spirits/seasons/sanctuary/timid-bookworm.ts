import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TimidBookworm,
	seasonId: SeasonId.Sanctuary,
	stance: Cosmetic.StanceTimid,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[{ cosmetic: Cosmetic.StanceTimid }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TimidBookwormBlessing1,
					cost: { seasonalCandles: 8 },
				},
				{ cosmetic: Cosmetic.TimidBookwormMusicSheet, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TimidBookwormHair,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TimidBookwormBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.TimidBookwormBlessing3,
					cost: { seasonalCandles: 12 },
				},
				{ cosmetic: Cosmetic.TimidBookwormCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.TimidBookwormSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.StanceTimid },
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.TimidBookwormMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TimidBookwormBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TimidBookwormHair,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.TimidBookwormSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.TimidBookwormWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TimidBookwormBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.TimidBookwormCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	keywords: ["butterfly", "butterfly cape"],
	visits: {
		travelling: [
			{ start: skyDate(2021, 6, 10), end: skyDate(2021, 6, 14) },
			{ start: skyDate(2022, 7, 7), end: skyDate(2022, 7, 11) },
			{ start: skyDate(2024, 5, 9), end: skyDate(2024, 5, 13) },
		],
	},
});
