import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.CarnivalJuggler,
	seasonId: SeasonId.Carnival,
	emote: SpiritEmote.BallSpinTrick,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteBallSpinTrick1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CarnivalJugglerBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.CarnivalJugglerMask,
					cost: { seasonalCandles: 19 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CarnivalJugglerBlessing2,
					cost: { seasonalCandles: 7 },
				},
				{
					cosmetic: Cosmetic.EmoteBallSpinTrick2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBallSpinTrick3,
					level: 3,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.CarnivalJugglerBlessing3,
					cost: { seasonalCandles: 10 },
				},
				{
					cosmetic: Cosmetic.CarnivalJugglerNeckAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.CarnivalJugglerOutfit,
					cost: { seasonalCandles: 28 },
				},
				{
					cosmetic: Cosmetic.CarnivalJugglerTrust,
				},
				{
					cosmetic: Cosmetic.EmoteBallSpinTrick4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.CarnivalJugglerWhiteDye,
					seasonPass: true,
				}
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.CarnivalJugglerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
