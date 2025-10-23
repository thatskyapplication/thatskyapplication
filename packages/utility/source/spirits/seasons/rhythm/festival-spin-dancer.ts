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
			[
				{ cosmetic: Cosmetic.EmoteSpinDance1 },
				{ cosmetic: Cosmetic.EmoteSpinDance2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.FestivalSpinDancerBlessing1,
					cost: { seasonalCandles: 10 },
				},
				{ cosmetic: Cosmetic.FestivalSpinDancerMusicSheet, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteSpinDance3,
					cost: { seasonalCandles: 12 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteSpinDance4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.FestivalSpinDancerHair,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.FestivalSpinDancerOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.FestivalSpinDancerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteSpinDance1 },
				{
					cosmetic: Cosmetic.EmoteSpinDance2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
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
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.FestivalSpinDancerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.FestivalSpinDancerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSpinDance3,
					cost: { hearts: 5 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteSpinDance4,
					cost: { hearts: 10 },
					level: 4,
				},
			],
			[
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
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.FestivalSpinDancerOutfit,
					cost: { candles: 65 },
				},
			],
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
