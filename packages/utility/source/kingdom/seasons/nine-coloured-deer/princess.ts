import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

const emote = SpiritEmote.FloatSpin;

export default new SeasonalSpirit({
	id: SpiritId.Princess,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	area: AreaName.CrescentOasis,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteFloatSpin1 },
				{ cosmetic: Cosmetic.EmoteFloatSpin2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.PrincessMask,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PrincessBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PrincessBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{ translation: CosmeticCommon.Hair, cosmetic: Cosmetic.PrincessHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteFloatSpin3,
					cost: { seasonalCandles: 22 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteFloatSpin4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.PrincessOutfit,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.PrincessBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.PrincessBlessing4,
					cost: { seasonalCandles: 32 },
				},
				{ translation: CosmeticCommon.Cape, cosmetic: Cosmetic.PrincessCape, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.PrincessSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteFloatSpin1 },
				{ cosmetic: Cosmetic.EmoteFloatSpin2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PrincessBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.PrincessMask,
					cost: { candles: 36 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PrincessSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.PrincessWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteFloatSpin3, cost: { hearts: 3 }, level: 3 },
				{ cosmetic: Cosmetic.EmoteFloatSpin4, cost: { hearts: 6 }, level: 4 },
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.PrincessHair,
					cost: { candles: 45 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PrincessBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.PrincessOutfit,
					cost: { candles: 71 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.PrincessCape,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		returning: [{ start: skyDate(2026, 8, 28), end: skyDate(2026, 9, 11) }],
	},
});
