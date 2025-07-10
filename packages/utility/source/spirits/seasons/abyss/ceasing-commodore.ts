import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.CalmDown;

export default new SeasonalSpirit({
	id: SpiritId.CeasingCommodore,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteCalmDown1 },
			{ cosmetic: Cosmetic.EmoteCalmDown2 },
			{
				cosmetic: Cosmetic.CeasingCommodoreBlessing1,
				cost: { seasonalCandles: 6 },
			},
			{ cosmetic: Cosmetic.CeasingCommodoreHair },
			{
				cosmetic: Cosmetic.CeasingCommodoreMask,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.CeasingCommodoreBlessing2 },
			{
				cosmetic: Cosmetic.EmoteCalmDown3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.EmoteCalmDown4 },
			{
				cosmetic: Cosmetic.CeasingCommodoreCape,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.CeasingCommodoreBlessing3 },
			{
				cosmetic: Cosmetic.CeasingCommodoreSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteCalmDown1 },
			{
				cosmetic: Cosmetic.EmoteCalmDown2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.CeasingCommodoreBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.CeasingCommodoreHair,
				cost: { candles: 45 },
			},
			{
				cosmetic: Cosmetic.CeasingCommodoreSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.CeasingCommodoreWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteCalmDown3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteCalmDown4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.CeasingCommodoreBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.CeasingCommodoreMask,
				cost: { candles: 40 },
			},
			{
				cosmetic: Cosmetic.CeasingCommodoreCape,
				cost: { candles: 20 },
			},
		],
	},
	visits: {
		returning: [5],
	},
});
