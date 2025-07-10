import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.PullUp;

export default new SeasonalSpirit({
	id: SpiritId.OveractiveOverachiever,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmotePullUp1 },
			{ cosmetic: Cosmetic.EmotePullUp2 },
			{
				cosmetic: Cosmetic.OveractiveOverachieverBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{
				cosmetic: Cosmetic.OveractiveOverachieverMantaOcarina,
			},
			{
				cosmetic: Cosmetic.EmotePullUp3,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.EmotePullUp4 },
			{
				cosmetic: Cosmetic.OveractiveOverachieverCape,
				cost: { seasonalCandles: 30 },
			},
			{ cosmetic: Cosmetic.OveractiveOverachieverBlessing2 },
			{
				cosmetic: Cosmetic.OveractiveOverachieverBlessing3,
				cost: { seasonalCandles: 32 },
			},
			{ cosmetic: Cosmetic.OveractiveOverachieverHair },
			{
				cosmetic: Cosmetic.OveractiveOverachieverSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
