import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { RealmName } from "../../geography.js";

const emote = SpiritEmote.PullUp;

export default new SeasonalSpirit({
	id: SpiritId.OveractiveOverachiever,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IsleOfDawn,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmotePullUp1 },
				{ cosmetic: Cosmetic.EmotePullUp2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.OveractiveOverachieverBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{
					cosmetic: Cosmetic.OveractiveOverachieverMantaOcarina,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmotePullUp3,
					cost: { seasonalCandles: 22 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmotePullUp4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.OveractiveOverachieverCape,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.OveractiveOverachieverBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.OveractiveOverachieverBlessing3,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.OveractiveOverachieverHair,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.OveractiveOverachieverSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmotePullUp1 },
				{ cosmetic: Cosmetic.EmotePullUp2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.OveractiveOverachieverBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.OveractiveOverachieverMantaOcarina,
					cost: { candles: 45 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.OveractiveOverachieverSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.OveractiveOverachieverWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmotePullUp3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmotePullUp4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.OveractiveOverachieverBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.OveractiveOverachieverHair,
					cost: { candles: 50 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.OveractiveOverachieverCape,
					cost: { candles: 65 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2026, 4, 23), end: skyDate(2026, 4, 27) }],
	},
});
