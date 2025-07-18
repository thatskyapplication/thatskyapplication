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
			{ cosmetic: Cosmetic.EmoteKabuki1 },
			{ cosmetic: Cosmetic.EmoteKabuki2 },
			{
				cosmetic: Cosmetic.ProvokingPerformerMusicSheet,
				cost: { seasonalCandles: 10 },
			},
			{
				translation: CosmeticCommon.Blessing,
				cosmetic: Cosmetic.ProvokingPerformerBlessing1,
			},
			{
				cosmetic: Cosmetic.EmoteKabuki3,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.EmoteKabuki4 },
			{
				cosmetic: Cosmetic.ProvokingPerformerHair,
				cost: { seasonalCandles: 14 },
			},
			{
				cosmetic: Cosmetic.ProvokingPerformerMask,
				cost: { hearts: 5 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteKabuki1 },
			{
				cosmetic: Cosmetic.EmoteKabuki2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.ProvokingPerformerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ProvokingPerformerMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.ProvokingPerformerHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.ProvokingPerformerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteKabuki3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteKabuki4,
				cost: { hearts: 6 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.ProvokingPerformerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ProvokingPerformerMask,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.ProvokingPerformerHair,
				cost: { candles: 34 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 3, 12), end: skyDate(2020, 3, 16) },
			{ start: skyDate(2020, 10, 1), end: skyDate(2020, 10, 5) },
			{ start: skyDate(2023, 3, 30), end: skyDate(2023, 4, 3) },
		],
		travellingErrors: [4],
	},
});
