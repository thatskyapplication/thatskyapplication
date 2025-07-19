import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.SpinDance;

export default new SeasonalSpirit({
	id: SpiritId.FestivalSpinDancer,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteSpinDance1 },
			{ cosmetic: Cosmetic.EmoteSpinDance2 },
			{
				translation: CosmeticCommon.Blessing,
				cosmetic: Cosmetic.FestivalSpinDancerBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.FestivalSpinDancerMusicSheet },
			{
				cosmetic: Cosmetic.EmoteSpinDance3,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.EmoteSpinDance4 },
			{
				cosmetic: Cosmetic.FestivalSpinDancerHair,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.FestivalSpinDancerOutfit },
			{
				cosmetic: Cosmetic.FestivalSpinDancerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteSpinDance1 },
			{
				cosmetic: Cosmetic.EmoteSpinDance2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.FestivalSpinDancerBlessing1,
				cost: { candles: 5 },
			},
			{
				translation: CosmeticCommon.MusicSheet,
				cosmetic: Cosmetic.FestivalSpinDancerMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.FestivalSpinDancerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.FestivalSpinDancerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteSpinDance3,
				cost: { hearts: 5 },
			},
			{
				cosmetic: Cosmetic.EmoteSpinDance4,
				cost: { hearts: 10 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.FestivalSpinDancerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.FestivalSpinDancerHair,
				cost: { candles: 34 },
			},
			{
				cosmetic: Cosmetic.FestivalSpinDancerProp,
				cost: { candles: 30 },
			},
			{
				cosmetic: Cosmetic.FestivalSpinDancerOutfit,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 9, 3), end: skyDate(2020, 9, 7) },
			{ start: skyDate(2021, 10, 14), end: skyDate(2021, 10, 18) },
			{ start: skyDate(2023, 12, 21), end: skyDate(2023, 12, 25) },
		],
	},
});
