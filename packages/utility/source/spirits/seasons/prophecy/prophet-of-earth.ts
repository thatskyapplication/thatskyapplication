import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.DustOff;

export default new SeasonalSpirit({
	id: SpiritId.ProphetOfEarth,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteDustOff1 },
				{ cosmetic: Cosmetic.EmoteDustOff2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ProphetOfEarthHair,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ProphetOfEarthBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteDustOff3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteDustOff4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.ProphetOfEarthMusicSheet,
					cost: { seasonalCandles: 21 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ProphetOfEarthBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ProphetOfEarthCape,
					cost: { seasonalCandles: 27 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ProphetOfEarthMask,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ProphetOfEarthSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteDustOff1 },
				{
					cosmetic: Cosmetic.EmoteDustOff2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.ProphetOfEarthProp,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ProphetOfEarthBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ProphetOfEarthHair,
					cost: { candles: 44 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ProphetOfEarthSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ProphetOfEarthWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteDustOff3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteDustOff4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.ProphetOfEarthMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ProphetOfEarthBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ProphetOfEarthCape,
					cost: { candles: 75 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ProphetOfEarthMask,
					cost: { candles: 44 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2022, 2, 3), end: skyDate(2022, 2, 7) },
			{ start: skyDate(2024, 8, 29), end: skyDate(2024, 9, 6) },
			{ start: skyDate(2025, 7, 31), end: skyDate(2025, 8, 4) },
		],
		travellingErrors: [3],
		returning: [2],
	},
});
