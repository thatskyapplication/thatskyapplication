import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Kabuki;

export default new SeasonalSpirit({
	id: SpiritId.ProvokingPerformer,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteKabuki1 },
				{ cosmetic: Cosmetic.EmoteKabuki2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.ProvokingPerformerMusicSheet,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.ProvokingPerformerBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteKabuki3,
					cost: { seasonalCandles: 12 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteKabuki4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ProvokingPerformerHair,
					cost: { seasonalCandles: 14 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ProvokingPerformerMask,
					cost: { hearts: 5 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteKabuki1 },
				{
					cosmetic: Cosmetic.EmoteKabuki2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ProvokingPerformerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.ProvokingPerformerMusicSheet,
					cost: { candles: 15 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ProvokingPerformerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ProvokingPerformerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteKabuki3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteKabuki4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ProvokingPerformerBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ProvokingPerformerMask,
					cost: { candles: 42 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ProvokingPerformerHair,
					cost: { candles: 34 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 3, 12), end: skyDate(2020, 3, 16) },
			{ start: skyDate(2020, 10, 1), end: skyDate(2020, 10, 5) },
			{ start: skyDate(2023, 3, 30), end: skyDate(2023, 4, 3) },
			{ start: skyDate(2025, 9, 11), end: skyDate(2025, 9, 15) },
		],
		travellingErrors: [4],
	},
});
