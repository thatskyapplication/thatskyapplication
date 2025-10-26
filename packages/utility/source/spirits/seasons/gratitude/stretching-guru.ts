import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Yoga;

export default new SeasonalSpirit({
	id: SpiritId.StretchingGuru,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteYoga1 },
				{ cosmetic: Cosmetic.EmoteYoga2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.StretchingGuruHair,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.StretchingGuruBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteYoga3,
					cost: { seasonalCandles: 8 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteYoga4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.StretchingGuruBlessing2,
					cost: { seasonalCandles: 10 },
				},
			],
			[
				{
					cosmetic: Cosmetic.StretchingGuruCape,
					cost: { hearts: 5 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteYoga1 },
				{ cosmetic: Cosmetic.EmoteYoga2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.StretchingGuruBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.StretchingGuruHair,
					cost: { candles: 26 },
				},
				{
					cost: { candles: 3 },
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.StretchingGuruHeart,
				},
			],
			[
				{
					cost: { ascendedCandles: 2 },
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.StretchingGuruWingBuff,
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteYoga3, cost: { hearts: 3 }, level: 3 },
				{ cosmetic: Cosmetic.EmoteYoga4, cost: { hearts: 6 }, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.StretchingGuruBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.StretchingGuruCape,
					cost: { candles: 65 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 4, 30), end: skyDate(2020, 5, 4) },
			{ start: skyDate(2022, 3, 17), end: skyDate(2022, 3, 21) },
			{ start: skyDate(2025, 4, 10), end: skyDate(2025, 4, 14) },
		],
	},
});
