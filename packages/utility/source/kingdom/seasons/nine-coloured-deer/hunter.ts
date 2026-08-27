import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

const emote = SpiritEmote.Flex;

export default new SeasonalSpirit({
	id: SpiritId.Hunter,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	area: AreaName.CrescentOasis,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteFlex1 },
				{ cosmetic: Cosmetic.EmoteFlex2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.HunterOutfit,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HunterBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteFlex3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteFlex4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HunterBlessing2,
					cost: { seasonalCandles: 28 },
				},
				{ translation: CosmeticCommon.Hair, cosmetic: Cosmetic.HunterHair, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.HunterCape,
					cost: { seasonalCandles: 34 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.HunterBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.HunterSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteFlex1 },
				{ cosmetic: Cosmetic.EmoteFlex2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HunterBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.HunterOutfit,
					cost: { candles: 63 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.HunterSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.HunterWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteFlex3, cost: { hearts: 3 }, level: 3 },
				{ cosmetic: Cosmetic.EmoteFlex4, cost: { hearts: 6 }, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HunterBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.HunterHair,
					cost: { candles: 45 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.HunterCape,
					cost: { candles: 77 },
				},
			],
		],
	},
	visits: {
		returning: [{ start: skyDate(2026, 8, 28), end: skyDate(2026, 9, 11) }],
	},
});
