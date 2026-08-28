import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

const emote = SpiritEmote.Whistle;

export default new SeasonalSpirit({
	id: SpiritId.HerbGatherer,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	area: AreaName.CrescentOasis,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteWhistle1 },
				{ cosmetic: Cosmetic.EmoteWhistle2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HerbGathererBlessing1,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.HerbGathererOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.HerbGathererHair,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HerbGathererBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWhistle3,
					cost: { seasonalCandles: 30 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteWhistle4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Prop,
					cosmetic: Cosmetic.HerbGathererProp,
					cost: { seasonalCandles: 36 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.HerbGathererBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.HerbGathererSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteWhistle1 },
				{ cosmetic: Cosmetic.EmoteWhistle2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HerbGathererBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.HerbGathererOutfit,
					cost: { candles: 64 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.HerbGathererSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.HerbGathererWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteWhistle3, cost: { hearts: 3 }, level: 3 },
				{ cosmetic: Cosmetic.EmoteWhistle4, cost: { hearts: 6 }, level: 4 },
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.HerbGathererHair,
					cost: { candles: 38 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HerbGathererBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Prop,
					cosmetic: Cosmetic.HerbGathererProp,
					cost: { candles: 17 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.HerbGathererBlessing3,
					cost: { candles: 5 },
				},
			],
		],
	},
	visits: {
		returning: [{ start: skyDate(2026, 8, 28), end: skyDate(2026, 9, 11) }],
	},
});
