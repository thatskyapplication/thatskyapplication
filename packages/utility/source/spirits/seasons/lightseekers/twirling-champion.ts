import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.TripleAxel;

export default new SeasonalSpirit({
	id: SpiritId.TwirlingChampion,
	seasonId: SeasonId.Lightseekers,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteTripleAxel1 },
				{ cosmetic: Cosmetic.EmoteTripleAxel2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.TwirlingChampionBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.TwirlingChampionMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteTripleAxel3,
					cost: { seasonalCandles: 14 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteTripleAxel4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TwirlingChampionHair,
					cost: { seasonalCandles: 16 },
				},
			],
			[{ cosmetic: Cosmetic.TwirlingChampionPanflute, seasonPass: true }],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteTripleAxel1 },
				{
					cosmetic: Cosmetic.EmoteTripleAxel2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TwirlingChampionBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.TwirlingChampionMask,
					cost: { candles: 24 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.TwirlingChampionHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					cost: { ascendedCandles: 2 },
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.TwirlingChampionWingBuff,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteTripleAxel3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteTripleAxel4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TwirlingChampionBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.TwirlingChampionPanflute,
					cost: { candles: 60 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TwirlingChampionHair,
					cost: { candles: 34 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 9, 17), end: skyDate(2020, 9, 21) },
			{ start: skyDate(2022, 1, 6), end: skyDate(2022, 1, 10) },
			{ start: skyDate(2024, 2, 1), end: skyDate(2024, 2, 5) },
		],
	},
});
