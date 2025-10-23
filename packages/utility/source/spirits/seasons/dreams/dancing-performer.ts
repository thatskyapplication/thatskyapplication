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
			[
				{ cosmetic: Cosmetic.EmoteShowDance1 },
				{ cosmetic: Cosmetic.EmoteShowDance2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.DancingPerformerBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{ cosmetic: Cosmetic.DancingPerformerHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteShowDance3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteShowDance4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.DancingPerformerBlessing2,
					cost: { seasonalCandles: 21 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.DancingPerformerMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.DancingPerformerCape,
					cost: { seasonalCandles: 27 },
				},
				{ cosmetic: Cosmetic.DancingPerformerLute, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.DancingPerformerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteShowDance1 },
				{
					cosmetic: Cosmetic.EmoteShowDance2,
					cost: { hearts: 4 },
				},
			],
			[
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
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.DancingPerformerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.DancingPerformerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteShowDance3,
					cost: { hearts: 3 },
				},
				{
					cosmetic: Cosmetic.EmoteShowDance4,
					cost: { hearts: 6 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.DancingPerformerMask,
					cost: { candles: 48 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.DancingPerformerBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.DancingPerformerLute,
					cost: { candles: 70 },
				},
			],
			[
				{
					cosmetic: Cosmetic.DancingPerformerCape,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 4, 25), end: skyDate(2024, 4, 29) }],
	},
});
