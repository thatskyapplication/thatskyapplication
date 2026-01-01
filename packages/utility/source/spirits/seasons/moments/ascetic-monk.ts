import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.BlindfoldBalancePose;

export default new SeasonalSpirit({
	id: SpiritId.AsceticMonk,
	seasonId: SeasonId.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose1 },
				{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.AsceticMonkBlessing1,
					cost: { seasonalCandles: 6 },
				},
				{ translation: CosmeticCommon.Mask, cosmetic: Cosmetic.AsceticMonkMask, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.AsceticMonkHair,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.AsceticMonkBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBlindfoldBalancePose3,
					cost: { seasonalCandles: 26 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.AsceticMonkOutfit,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.AsceticMonkBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.AsceticMonkSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose1 },
				{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose2, level: 2, cost: { hearts: 4 } },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.AsceticMonkBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cost: { candles: 45 },
					cosmetic: Cosmetic.AsceticMonkMask,
				},
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.AsceticMonkSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.AsceticMonkWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBlindfoldBalancePose3,
					cost: { hearts: 3 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose4, cost: { hearts: 6 }, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.AsceticMonkBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.AsceticMonkHair,
					cost: { candles: 32 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.AsceticMonkOutfit,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2026, 1, 1), end: skyDate(2026, 1, 5) }],
	},
});
