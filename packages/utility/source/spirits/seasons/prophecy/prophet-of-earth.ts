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
			{ cosmetic: Cosmetic.EmoteDustOff1 },
			{ cosmetic: Cosmetic.EmoteDustOff2 },
			{
				cosmetic: Cosmetic.ProphetOfEarthHair,
				cost: { seasonalCandles: 12 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.ProphetOfEarthBlessing1,
			},
			{
				cosmetic: Cosmetic.EmoteDustOff3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.EmoteDustOff4 },
			{
				translation: CosmeticCommon.MusicSheet,
				cosmetic: Cosmetic.ProphetOfEarthMusicSheet,
				cost: { seasonalCandles: 21 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.ProphetOfEarthBlessing2,
			},
			{
				cosmetic: Cosmetic.ProphetOfEarthCape,
				cost: { seasonalCandles: 27 },
			},
			{ cosmetic: Cosmetic.ProphetOfEarthMask },
			{
				cosmetic: Cosmetic.ProphetOfEarthSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteDustOff1 },
			{
				cosmetic: Cosmetic.EmoteDustOff2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.ProphetOfEarthProp,
				cost: { candles: 15 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.ProphetOfEarthBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ProphetOfEarthHair,
				cost: { candles: 44 },
			},
			{
				cosmetic: Cosmetic.ProphetOfEarthSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.ProphetOfEarthWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteDustOff3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteDustOff4,
				cost: { hearts: 6 },
			},
			{
				translation: CosmeticCommon.MusicSheet,
				cosmetic: Cosmetic.ProphetOfEarthMusicSheet,
				cost: { candles: 15 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.ProphetOfEarthBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ProphetOfEarthCape,
				cost: { candles: 75 },
			},
			{
				cosmetic: Cosmetic.ProphetOfEarthMask,
				cost: { candles: 44 },
			},
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
