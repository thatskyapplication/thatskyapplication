import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.ShowDance;

export default new SeasonalSpirit({
	id: SpiritId.DancingPerformer,
	seasonId: SeasonId.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteShowDance1 },
			{ cosmetic: Cosmetic.EmoteShowDance2 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.DancingPerformerBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.DancingPerformerHair },
			{
				cosmetic: Cosmetic.EmoteShowDance3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.EmoteShowDance4 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.DancingPerformerBlessing2,
				cost: { seasonalCandles: 21 },
			},
			{ cosmetic: Cosmetic.DancingPerformerMask },
			{
				cosmetic: Cosmetic.DancingPerformerCape,
				cost: { seasonalCandles: 27 },
			},
			{ cosmetic: Cosmetic.DancingPerformerLute },
			{
				cosmetic: Cosmetic.DancingPerformerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteShowDance1 },
			{
				cosmetic: Cosmetic.EmoteShowDance2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.DancingPerformerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.DancingPerformerHair,
				cost: { candles: 45 },
			},
			{
				cosmetic: Cosmetic.DancingPerformerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.DancingPerformerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteShowDance3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteShowDance4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.DancingPerformerMask,
				cost: { candles: 48 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.DancingPerformerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.DancingPerformerLute,
				cost: { candles: 70 },
			},
			{
				cosmetic: Cosmetic.DancingPerformerCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 4, 25), end: skyDate(2024, 4, 29) }],
	},
});
