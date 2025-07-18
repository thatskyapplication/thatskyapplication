import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Doze;

export default new SeasonalSpirit({
	id: SpiritId.SnoozingCarpenter,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteDoze1 },
			{ cosmetic: Cosmetic.EmoteDoze2 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.SnoozingCarpenterBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.SnoozingCarpenterHair },
			{
				cosmetic: Cosmetic.EmoteDoze3,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.EmoteDoze4 },
			{
				cosmetic: Cosmetic.SnoozingCarpenterCape,
				cost: { seasonalCandles: 14 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.SnoozingCarpenterBlessing2,
			},
			{
				cosmetic: Cosmetic.SnoozingCarpenterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteDoze1 },
			{ cosmetic: Cosmetic.EmoteDoze2, cost: { hearts: 4 } },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.SnoozingCarpenterBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.SnoozingCarpenterHair,
				cost: { candles: 34 },
			},
			{
				cosmetic: Cosmetic.SnoozingCarpenterSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.SnoozingCarpenterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ cosmetic: Cosmetic.EmoteDoze3, cost: { hearts: 3 } },
			{
				cosmetic: Cosmetic.EmoteDoze4,
				cost: { hearts: 6 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.SnoozingCarpenterBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.SnoozingCarpenterCape,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 5, 27), end: skyDate(2021, 5, 31) },
			{ start: skyDate(2023, 4, 27), end: skyDate(2023, 5, 1) },
		],
	},
});
