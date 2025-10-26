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
			[
				{ cosmetic: Cosmetic.EmoteDoze1 },
				{ cosmetic: Cosmetic.EmoteDoze2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SnoozingCarpenterBlessing1,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SnoozingCarpenterHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteDoze3,
					cost: { seasonalCandles: 12 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteDoze4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.SnoozingCarpenterCape,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SnoozingCarpenterBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.SnoozingCarpenterSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteDoze1 },
				{ cosmetic: Cosmetic.EmoteDoze2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SnoozingCarpenterBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SnoozingCarpenterHair,
					cost: { candles: 34 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SnoozingCarpenterSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SnoozingCarpenterWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteDoze3, cost: { hearts: 3 }, level: 3 },
				{
					cosmetic: Cosmetic.EmoteDoze4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SnoozingCarpenterBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.SnoozingCarpenterCape,
					cost: { candles: 65 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 5, 27), end: skyDate(2021, 5, 31) },
			{ start: skyDate(2023, 4, 27), end: skyDate(2023, 5, 1) },
		],
	},
});
