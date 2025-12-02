import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.PullUp;

export default new SeasonalSpirit({
	id: SpiritId.OveractiveOverachiever,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IsleOfDawn,
	offer: {
		hasInfographic: false,
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
	},
});
